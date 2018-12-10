import * as HDWalletProvider from "truffle-hdwallet-provider"
import Config from "../models/Config"
import * as config from "./config/config.json"

if (false) {
    const seedphrase = "xxx"

    // @ts-ignore
    config.web3Provider = new HDWalletProvider(
        seedphrase,
        config.nodeUri,
        0, 10,
    )
}

export default config as Config
