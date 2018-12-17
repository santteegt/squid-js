import {Receipt} from "web3-utils"
import ContractBase from "../ContractBase"

export default class PaymentConditions extends ContractBase {

    public static async getInstance(): Promise<PaymentConditions> {
        const paymentConditions: PaymentConditions = new PaymentConditions("PaymentConditions")
        await paymentConditions.init()
        return paymentConditions
    }

    public async lockPayment(serviceAgreementId: string, assetId: string, price: number, consumerAddress: string)
        : Promise<Receipt> {
        return this.send("lockPayment", consumerAddress, [
            serviceAgreementId, "0x" + assetId, price,
        ])
    }
}
