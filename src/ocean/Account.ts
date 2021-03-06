import BigNumber from "bignumber.js"
import * as EthJsUtils from "ethereumjs-util"
import Keeper from "../keeper/Keeper"
import Web3Provider from "../keeper/Web3Provider"
import Balance from "../models/Balance"
import OceanBase from "./OceanBase"

/**
 * Account information.
 */
export default class Account extends OceanBase {
    private balance: Balance

    /**
     * Balance of Ocean Token.
     * @return {Promise<number>}
     */
    public async getOceanBalance(): Promise<number> {
        return (await Keeper.getInstance()).token.balanceOf(this.id)
    }

    /**
     * Balance of Ether.
     * @return {Promise<number>}
     */
    public async getEtherBalance(): Promise<number> {
        // Logger.log("getting balance for", account);
        return Web3Provider
            .getWeb3()
            .eth
            .getBalance(this.id, "latest")
            .then((balance: string): number => {
                // Logger.log("balance", balance);
                return new BigNumber(balance).toNumber()
            })
    }

    /**
     * Balances of Ether and Ocean Token.
     * @return {Promise<Balance>}
     */
    public async getBalance(): Promise<Balance> {

        if (!this.balance) {
            this.balance = {
                eth: await this.getEtherBalance(),
                ocn: await this.getOceanBalance(),
            } as Balance
        }

        return this.balance
    }

    /**
     * Request Ocean Tokens.
     * @param  {number} amount Tokens to be requested.
     * @return {Promise<number>}
     */
    public async requestTokens(amount: number): Promise<number> {
        await (await Keeper.getInstance())
            .market
            .requestTokens(amount, this.id)
        return amount
    }

    /**
     * Returns the account public key.
     * @return {Promise<string>}
     */
    public async getPublicKey(): Promise<string> {

        const web3 = Web3Provider.getWeb3()

        const msg = web3.utils.sha3(this.getId())
        const sig = await web3.eth.sign(msg, this.getId())
        const {v, r, s} = EthJsUtils.fromRpcSig(sig)

        return EthJsUtils.ecrecover(EthJsUtils.toBuffer(msg), v, r, s).toString("hex")
    }
}
