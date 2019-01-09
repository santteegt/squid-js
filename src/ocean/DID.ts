import IdGenerator from "./IdGenerator"

const prefix = "did:op:"

/**
 * Decentralized ID.
 */
export default class DID {

    /**
     * Parses a DID from a string.
     * @param  {string} didString DID in string.
     * @return {DID}
     */
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

    /**
     * Returns a new DID.
     * @return {DID}
     */
    public static generate(): DID {
        return new DID(IdGenerator.generateId())
    }

    /**
     * ID.
     * @type {string}
     */
    private id: string

    private constructor(id: string) {
        this.id = id
    }

    /**
     * Returns the DID.
     * @return {string}
     */
    public getDid(): string {
        return `${prefix}${this.id}`
    }

    /**
     * Returns the ID.
     * @return {string}
     */
    public getId(): string {
        return this.id
    }
}
