import Web3 from 'web3'
import OceanMarket from './keeper/market'
import OceanAuth from './keeper/auth'
import OceanToken from './keeper/token'
import Logger from './utils/logger'
import Web3Helper from './utils/Web3Helper'

const DEFAULT_GAS = 300000

export default class Ocean {
    constructor(config) {
        const web3Provider = config.web3Provider || new Web3.providers.HttpProvider(config.uri)
        this._web3 = new Web3(web3Provider)
        this._defaultGas = config.gas || DEFAULT_GAS
        this._network = config.network || 'development'

        this.helper = new Web3Helper(this._web3)

        const instance = this

        return {
            async getInstance() {
                instance.market = await new OceanMarket(instance._web3, instance._network).getInstance()
                instance.auth = await new OceanAuth(instance._web3, instance._network).getInstance()
                instance.token = await new OceanToken(instance._web3, instance._network).getInstance()

                return instance
            }
        }
    }

    async getOrdersByConsumer(consumerAddress) {
        let accessConsentEvent = this.auth.AccessConsentRequested({ _consumer: consumerAddress }, {
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
                status: await this.getOrderStatus(event.args._id).then((status) => status.toNumber()),
                paid: await this.verifyOrderPayment(event.args._id).then((received) => received),
                key: null
            }))
        Logger.debug('got orders: ', orders)
        return orders
    }

    purchaseAsset(
        assetId, publisherId, price, privateKey, publicKey, timeout, senderAddress,
        initialRequestEventHandler, accessCommittedEventHandler, tokenPublishedEventHandler) {
        const { token, market, auth } = this
        // Allow market contract to transfer funds on the consumer's behalf
        token.approve(market.address, price, { from: senderAddress, gas: 2000000 })
        // Submit the access request
        auth.initiateAccessRequest(
            assetId, publisherId, publicKey,
            timeout, { from: senderAddress, gas: 1000000 }
        )

        const resourceFilter = { _resourceId: assetId, _consumer: senderAddress }
        const initRequestEvent = auth.contract.AccessConsentRequested(resourceFilter)
        let order = {}
        this._listenOnce(
            initRequestEvent,
            'AccessConsentRequested',
            (result, error) => {
                order = initialRequestEventHandler(result, error)
                const requestIdFilter = { _id: order.id }
                const accessCommittedEvent = auth.contract.AccessRequestCommitted(requestIdFilter)
                const tokenPublishedEvent = auth.contract.EncryptedTokenPublished(requestIdFilter)
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
}