import {v4} from "uuid"

export default class IdGenerator {
    public static generateId(): string {
        const id = `${v4()}${v4()}`
        return id.replace(/-/g, "")
    }
}
