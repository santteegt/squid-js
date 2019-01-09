/**
 * Curation attributes of Assets Metadata.
 * @see https://github.com/oceanprotocol/OEPs/tree/master/8#curation-attributes
 */
export default class Curation {
    /**
     * Decimal value between 0 and 1. 0 is the default value.
     * @type {number}
     * @example 0.93
     */
    public rating: number = 0.93

    /**
     * Number of votes. 0 is the default value.
     * @type {number}
     * @example 123
     */
    public numVotes: number = 123

    /**
     * Schema applied to calculate the rating.
     * @type {number}
     * @example "Binary Votting"
     */
    public schema?: string = "Binary Votting"
}
