import Event from "./Event"
import Parameter from "./Parameter"

export default class Method {
    public name: string
    public contractName: string
    public methodName: string
    public timeout: number
    public parameters: Parameter[]
    public events: Event[]
    public dependencies: string[]
    public dependencyTimeoutFlags: number[]
    public isTerminalCondition: boolean
}
