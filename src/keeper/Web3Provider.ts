import * as Web3 from "web3"
import ConfigProvider from "../ConfigProvider"

export default class Web3Provider {

    /**
     * Set a Web3 instance.
     * @param {Web3} Web3 New Web3 instance.
     */
    public static setWeb3(web3: Web3) {
        Web3Provider.web3 = web3
    }

    /**
     * Returns Web3 instance.
     * @return {Web3}
     */
    public static getWeb3(): Web3 {
        if (Web3Provider.web3 === null) {
            const config = ConfigProvider.getConfig()
            const web3Provider = config.web3Provider || new Web3.providers.HttpProvider(config.nodeUri)
            Web3Provider.web3 = new Web3(Web3.givenProvider || web3Provider)
        }
        return Web3Provider.web3
    }

    /**
     * Web3 instance.
     * @type {Web3}
     */
    private static web3: Web3 = null
}
