import BigNumber from "bignumber.js"
import {Receipt} from "web3-utils"
import ContractBase from "./ContractBase"

export default class OceanMarket extends ContractBase {

    public static async getInstance(): Promise<OceanMarket> {
        const market: OceanMarket = new OceanMarket("OceanMarket")
        await market.init()
        return market
    }

    // call functions (costs no gas)
    public async isAssetActive(assetId: string): Promise<boolean> {
        return this.call("checkAsset", [assetId])
    }

    public async verifyOrderPayment(orderId: string): Promise<boolean> {
        return this.call("verifyPaymentReceived", [orderId])
    }

    public async getAssetPrice(assetId: string): Promise<number> {
        return this.call("getAssetPrice", [assetId])
            .then((price: string) => new BigNumber(price).toNumber())
    }

    public async requestTokens(amount: number, receiverAddress: string): Promise<Receipt> {
        return this.send("requestTokens", receiverAddress, [amount])
    }

    public async generateId(input: string): Promise<string> {
        return this.call("generateId", [input])
    }

    public async register(assetId: string, price: number, publisherAddress: string): Promise<Receipt> {
        return this.send("register", publisherAddress, [assetId, price])
    }
}
