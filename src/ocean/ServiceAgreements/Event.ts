import EventHandler from "./EventHandler"

export default class Event {
    public name: string = "PaymentLocked"
    public actorType: string = "publisher"
    public handler: EventHandler
}
