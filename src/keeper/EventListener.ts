import Event from "./Event"

export default class EventListener {

    public static subscribe(contractName: string,
                            eventName: string,
                            filter: any): Event {

        const event = new Event(contractName, eventName, filter)
        EventListener.events.push(event)

        return event
    }

    public static unsubscribe(event): boolean {
        event.stopListen()
        const i = EventListener.events.indexOf(event)
        if (i > -1) {
            EventListener.events.splice(i, 1)
        }
        return true
    }

    public static count() {
        return EventListener.events.length
    }

    private static events: Event[] = []
}
