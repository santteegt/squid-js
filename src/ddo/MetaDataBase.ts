/**
 * Base attributes of Assets Metadata.
 * @see https://github.com/oceanprotocol/OEPs/tree/master/8#base-attributes
 */
export default class MetaDataBase {

    /**
     * Descriptive name of the Asset.
     * @type {string}
     * @example "UK Weather information 2011"
     */
    public name: string = "UK Weather information 2011"

    /**
     * Type of the Asset. Helps to filter by the type of asset,
     * initially ("dataset", "algorithm", "container", "workflow", "other").
     * @type {string}
     * @example "dataset"
     */
    public type: "dataset" | "algorithm" | "container" | "workflow" | "other" = "dataset"

    /**
     * Details of what the resource is. For a dataset, this attribute
     * explains what the data represents and what it can be used for.
     * @type {string}
     * @example "Weather information of UK including temperature and humidity"
     */
    public description?: string = "Weather information of UK including temperature and humidity"

    /**
     * The date on which the asset was created or was added.
     * @type {string}
     * @example "2012-10-10T17:00:000Z"
     */
    public dateCreated: string = "2012-10-10T17:00:000Z"

    /**
     * Size of the asset (e.g. 18MB). In the absence of a unit (MB, kB etc.), kB will be assumed.
     * @type {string}
     * @example "3.1gb"
     */
    public size: string = "3.1gb"

    /**
     * Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).
     * @type {string}
     * @example "Met Office"
     */
    public author: string = "Met Office"

    /**
     * Short name referencing the license of the asset (e.g. Public Domain, CC-0, CC-BY, No License Specified, etc. ).
     * If it's not specified, the following value will be added: "No License Specified".
     * @type {string}
     * @example "CC-BY"
     */
    public license: string = "CC-BY"

    /**
     * The party holding the legal copyright. Empty by default.
     * @type {string}
     * @example "Met Office"
     */
    public copyrightHolder?: string = "Met Office"

    /**
     * File encoding.
     * @type {string}
     * @example "UTF-8"
     */
    public encoding?: string = "UTF-8"

    /**
     * File compression (e.g. no, gzip, bzip2, etc).
     * @type {string}
     * @example "zip"
     */
    public compression?: string = "zip"

    /**
     * File format, if applicable.
     * @type {string}
     * @example "text/csv"
     */
    public contentType: string = "text/csv"

    /**
     * Example of the concept of this asset. This example is part
     * of the metadata, not an external link.
     * @type {string}
     * @example "423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68"
     */
    public workExample?: string = "423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68"

    /**
     * List of content URLs resolving the Asset files.
     * @type {string | string[]}
     * @example "https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip"
     */
    public contentUrls: string | string[] = [
        "https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip",
        "https://testocnfiles.blob.core.windows.net/testfiles/testzkp.zip",
    ]

    /**
     * Mapping of links for data samples, or links to find out more information.
     * Links may be to either a URL or another Asset. We expect marketplaces to
     * converge on agreements of typical formats for linked data: The Ocean Protocol
     * itself does not mandate any specific formats as these requirements are likely
     * to be domain-specific.
     * @type {any[]}
     */
    public links?: any[] = [
        {
            sample1: "http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/",
        },
        {
            sample2: "http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-averages-25km/",
        },
        {
            fieldsDescription: "http://data.ceda.ac.uk/badc/ukcp09/",
        },
    ]

    /**
     * The language of the content. Please use one of the language
     * codes from the {@link https://tools.ietf.org/html/bcp47 IETF BCP 47 standard}.
     * @type {String}
     * @example "en"
     */
    public inLanguage?: string = "en"

    /**
     * Keywords or tags used to describe this content. Multiple entries in a keyword
     * list are typically delimited by commas. Empty by default.
     * @type {String}
     * @example "weather, uk, 2011, temperature, humidity"
     */
    public tags?: string = "weather, uk, 2011, temperature, humidity"

    /**
     * Price of the asset.
     * @type {String}
     * @example 10
     */
    public price: number = 10
}
