import Web3 from 'web3'
import Logger from './utils/logger'
import Web3Helper from './utils/Web3Helper'
import MetaData from './metadata'
import ContractLoader from './keeper/contractLoader'

const DEFAULT_GAS = 300000
const contractsToLoad = { market: 'OceanMarket', token: 'OceanToken', auth: 'OceanAuth' }

export default class Ocean {
    constructor(config) {
        const web3Provider = config.web3Provider || new Web3.providers.HttpProvider(config.nodeUri)
        this._web3 = new Web3(web3Provider)
        this._defaultGas = config.gas || DEFAULT_GAS
        this._providerUri = config.providerUri || null

        this.helper = new Web3Helper(this._web3)
        this.metadata = new MetaData(this._providerUri)
        this.contracts = {}
        return (async () => {
            this._network = config.network || (await this.helper.getNetworkName()).toLowerCase() || 'development'
            for (const key of contractsToLoad) {
                this.contracts[key] = await ContractLoader.load(contractsToLoad[key], this.helper)
            }

            return this
        })()
    }

    async getAccounts() {
        return Promise.all((await this.helper.getAccounts()).map(async (account) => {
            // await ocean.market.requestTokens(account, 1000)

            return {
                name: account,
                balance: {
                    ocn: await this.contracts.token.getTokenBalance(account),
                    eth: await this.contracts.token.getEthBalance(account)
                }
            }
        }))
    }

    async getOrdersByConsumer(consumerAddress) {
        let accessConsentEvent = this.contracts.auth.AccessConsentRequested({ _consumer: consumerAddress }, {
            fromBlock: 0,
            toBlock: 'latest'
        })

        let _resolve = null
        let _reject = null
        const promise = new Promise((resolve, reject) => {
            _resolve = resolve
            _reject = reject
        })

        const getEvents = () => {
            accessConsentEvent.get((error, logs) => {
                if (error) {
                    _reject(error)
                    throw new Error(error)
                } else {
                    _resolve(logs)
                }
            })
            return promise
        }
        const events = await getEvents().then((events) => events)
        // let orders = await this.buildOrdersFromEvents(events, consumerAddress).then((result) => result)
        let orders = events
            .filter(obj => (obj.args._consumer === consumerAddress))
            .map(async (event) => ({
                ...event.args,
                timeout: event.args._timeout.toNumber(),
                status: await this.auth.getOrderStatus(event.args._id).then((status) => status.toNumber()),
                paid: await this.market.verifyOrderPayment(event.args._id).then((received) => received),
                key: null
            }))
        Logger.debug('got orders: ', orders)
        return orders
    }

    purchaseAsset(
        assetId, publisherId, price, privateKey, publicKey, timeout, senderAddress,
        initialRequestEventHandler, accessCommittedEventHandler, tokenPublishedEventHandler) {
        const { token, market, auth } = this.contracts
        // Allow market contract to transfer funds on the consumer's behalf
        token.approve(market.address, price, { from: senderAddress, gas: 2000000 })
        // Submit the access request
        auth.initiateAccessRequest(
            assetId, publisherId, publicKey,
            timeout, { from: senderAddress, gas: 1000000 }
        )

        const resourceFilter = { _resourceId: assetId, _consumer: senderAddress }
        const initRequestEvent = auth.AccessConsentRequested(resourceFilter)
        let order = {}
        this._listenOnce(
            initRequestEvent,
            'AccessConsentRequested',
            (result, error) => {
                order = initialRequestEventHandler(result, error)
                const requestIdFilter = { _id: order.id }
                const accessCommittedEvent = auth.AccessRequestCommitted(requestIdFilter)
                const tokenPublishedEvent = auth.EncryptedTokenPublished(requestIdFilter)
                this._listenOnce(
                    accessCommittedEvent,
                    'AccessRequestCommitted',
                    (result, error) => {
                        accessCommittedEventHandler(result, order, error)
                    }
                )
                this._listenOnce(
                    tokenPublishedEvent,
                    'EncryptedTokenPublished',
                    (result, error) => {
                        tokenPublishedEventHandler(result, order, error)
                    }
                )
            })
        return order
    }

    // Helper functions (private)
    _listenOnce(event, eventName, callback) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        event.watch((error, result) => {
            event.stopWatching()
            if (error) {
                Logger.log(`Error in keeper ${eventName} event: `, error)
            }
            callback(result, error)
        })
    }

    // The new interface
    async publishDataAsset(assetMetadata, price) {
        // Register on-chain (in the keeper)
        const { market } = this.contracts
        const assetDID = await this.generateDID(assetMetadata)
        const result = await market.register(
            assetDID,
            price,
            { from: this.getCurrentAccount(), gas: this.defaultGas }
        )
        if (!result) {
            throw Error('Register asset in ocean keeper failed.')
        }
        // Register in oceandb
        const assetDDO = this.createAssetDDO(assetDID, assetMetadata)
        this.metadata.publishDataAsset(assetDID, assetDDO)
        return assetDDO
    }

    getCurrentAccount() {
        return this.helper.getCurrentAccount()
    }

    getTokenBalance() {
        return this.contracts.token.getTokenBalance()
    }

    getEthBalance() {
        return this.contracts.token.getEthBalance()
    }

    requestTokens(numTokens) {
        return this.contracts.market.requestTokens(numTokens, { from: this.getCurrentAccount() })
    }

    getMessageHash(message) {
        return this._web3.utils.sha3(message)
    }

    async generateDID(content) {
        return 'did:ocn:' + (await this.contracts.market.generateId(content)).toString()
    }

    createAssetDDO(assetDID, assetMetadata) {
        return {
            '@context': 'https://w3id.org/did/v1',
            id: assetDID,
            publicKey: [],
            authentication: [],
            service: [],
            metadata: assetMetadata
        }
    }

    resolveDID(did) {
        const providerURL = this.contracts.market.resolveAssetDID(did)
        const metadataGuy = new MetaData(providerURL)
        return metadataGuy.getAssetDDO(did)
    }
}
