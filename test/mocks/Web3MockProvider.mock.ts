import * as Web3 from "web3"
import Web3Provider from "../../src/keeper/Web3Provider"

export default class Web3MockProvider {
    public static getWeb3Mock(): Web3 {
        const BaseWeb3 = Web3Provider.getWeb3();
        return {
            ...BaseWeb3,
            eth: {
                ...BaseWeb3.eth,
                getAccounts() {
                    return ["0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e"]
                }
            }
        }
    }
}
