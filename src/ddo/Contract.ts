import Event from "./Event"

export default class Contract {
    public contractName: string
    public fulfillmentOperator: number
    public events: Event[]
}
