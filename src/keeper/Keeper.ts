// import Logger from "../utils/Logger"
import OceanAuth from "./contracts/Auth"
import AccessConditions from "./contracts/conditions/AccessConditions"
import PaymentConditions from "./contracts/conditions/PaymentConditions"
import DIDRegistry from "./contracts/DIDRegistry"
import OceanMarket from "./contracts/Market"
import ServiceAgreement from "./contracts/ServiceAgreement"
import OceanToken from "./contracts/Token"
import Web3Provider from "./Web3Provider"

export default class Keeper {

    public static async getInstance() {

        if (Keeper.instance === null) {
            Keeper.instance = new Keeper()

            Keeper.instance.market = await OceanMarket.getInstance()
            Keeper.instance.auth = await OceanAuth.getInstance()
            Keeper.instance.token = await OceanToken.getInstance()
            Keeper.instance.serviceAgreement = await ServiceAgreement.getInstance()
            Keeper.instance.accessConditions = await AccessConditions.getInstance()
            Keeper.instance.paymentConditions = await PaymentConditions.getInstance()
            Keeper.instance.didRegistry = await DIDRegistry.getInstance()
        }
        return Keeper.instance
    }

    private static instance: Keeper = null

    public token: OceanToken
    public market: OceanMarket
    public auth: OceanAuth
    public serviceAgreement: ServiceAgreement
    public accessConditions: AccessConditions
    public paymentConditions: PaymentConditions
    public didRegistry: DIDRegistry

    public async getNetworkName(): Promise<string> {
        return Web3Provider.getWeb3().eth.net.getId()
            .then((networkId) => {
                let network: string = "Unknown"

                switch (networkId) {
                    case 1:
                        network = "Main"
                        break
                    case 2:
                        network = "Morden"
                        break
                    case 3:
                        network = "Ropsten"
                        break
                    case 4:
                        network = "Rinkeby"
                        break
                    case 77:
                        network = "POA_Sokol"
                        break
                    case 99:
                        network = "POA_Core"
                        break
                    case 42:
                        network = "Kovan"
                        break
                    case 8996:
                        network = "Spree"
                        // network = "ocean_poa_net_local"
                        break
                    case 8995:
                        network = "Nile"
                        break
                    default:
                        // Logger.log(`NetworkId ${networkId} not found defaulting`)
                        network = "Development"
                }
                return network
            })
    }
}
