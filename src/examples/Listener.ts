import {Logger, Ocean} from "../squid"
// tslint:disable-next-line
import EventListener from "../keeper/EventListener"
import config from "./config"

(async () => {
    Ocean.getInstance(config)
})()

const event = EventListener.subscribe("OceanToken", "Transfer", {})

Logger.log(`Listening to Transfer event of OceanToken`)

event.listen((data: any[]) => {

    Logger.log(Date.now())
    Logger.log("From", data[0].returnValues.from)
    Logger.log("To", data[0].returnValues.to)
    Logger.log("Value", data[0].returnValues.value)
})
