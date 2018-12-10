import {Logger, Ocean} from "../squid"
import config from "./config"

(async () => {

    const ocean: Ocean = await Ocean.getInstance(config)

    const accounts = await ocean.getAccounts()

    Logger.log(JSON.stringify(accounts, null, 2))
})()
