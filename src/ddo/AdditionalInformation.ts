import StructuredMarkup from "./StructuredMarkup"

/**
 * Additional Information of Assets Metadata.
 * @see https://github.com/oceanprotocol/OEPs/tree/master/8#additional-information
 */
export default class AdditionalInformation {
    /**
     * An indication of update latency - i.e. How often are updates expected (seldom,
     * annually, quarterly, etc.), or is the resource static that is never expected
     * to get updated.
     * @type {string}
     * @example "yearly"
     */
    public updateFrecuency: string = "yearly"

    /**
     * A link to machine-readable structured markup (such as ttl/json-ld/rdf)
     * describing the dataset.
     * @type {StructuredMarkup[]}
     */
    public structuredMarkup: StructuredMarkup[] = [
        {
            uri: "http://skos.um.es/unescothes/C01194/jsonld",
            mediaType: "application/ld+json",
        } as StructuredMarkup,
        {
            uri: "http://skos.um.es/unescothes/C01194/turtle",
            mediaType: "text/turtle",
        } as StructuredMarkup,
    ]

    /**
     * Checksum of attributes to be able to compare if there are changes in
     * the asset that you are purchasing.
     * @type {string}
     */
    public checksum: string
}
