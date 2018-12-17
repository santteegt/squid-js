import IdGenerator from "../src/ocean/IdGenerator"

export default class TestIdGenerator extends IdGenerator {
    public static generatePrefixedId() {
        return "0x" + this.generateId()
    }
}
