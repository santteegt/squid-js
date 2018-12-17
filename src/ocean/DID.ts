import IdGenerator from "./IdGenerator"

const prefix = "did:op:"

export default class DID {

    public static parse(didString: string): DID {
        let did: DID
        if (didString.startsWith(prefix)) {
            const id = didString.split(prefix)[1]
            if (!id.startsWith("0x")) {
                did = new DID(id)
            }
        }

        if (!did) {
            throw new Error(`Parsing DID failed, ${didString}`)
        }

        return did
    }

    public static generate(): DID {
        return new DID(IdGenerator.generateId())
    }

    private id: string

    private constructor(id: string) {

        this.id = id
    }

    public getDid(): string {
        return `${prefix}${this.id}`
    }

    public getId(): string {
        return this.id
    }
}
