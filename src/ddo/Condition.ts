import Dependency from "./Dependency"
import Event from "./Event"
import Parameter from "./Parameter"

export default class Condition {
    public name: string
    public contractName: string = "AccessCondition"
    public functionName: string = "lockPayment"
    public timeout: number = 0
    public conditionKey: string = "0x12122434"
    public parameters: Parameter[]
    public events: Event[]
    public dependencies: Dependency[] = []
    public isTerminalCondition: boolean = false
}
