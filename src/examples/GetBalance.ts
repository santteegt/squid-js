import {Logger, Ocean} from "../squid"
import config from "./config"

(async () => {
    const ocean: Ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()

    Logger.log(await accounts[0].getBalance())

    process.exit(0)
})()
