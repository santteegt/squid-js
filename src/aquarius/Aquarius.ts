import {URL} from "whatwg-url"
import DDO from "../ddo/DDO"
import Config from "../models/Config"
import Logger from "../utils/Logger"
import WebServiceConnectorProvider from "../utils/WebServiceConnectorProvider"
import SearchQuery from "./query/SearchQuery"

const apiPath = "/api/v1/aquarius/assets/ddo"

export default class Aquarius {

    private url: string

    constructor(config: Config) {

        this.url = config.aquariusUri
    }

    public async getAccessUrl(accessToken: any, payload: any): Promise<string> {

        const accessUrl: string = await WebServiceConnectorProvider.getConnector()
            .post(`${accessToken.service_endpoint}/${accessToken.resource_id}`, payload)
            .then((response: any): string => {
                if (response.ok) {
                    return response.text()
                }
                Logger.error("Failed: ", response.status, response.statusText)
                return null
            })
            .then((consumptionUrl: string): string => {
                Logger.error("Success accessing consume endpoint: ", consumptionUrl)
                return consumptionUrl
            })
            .catch((error) => {
                Logger.error("Error fetching the data asset consumption url: ", error)
                return null
            })

        return accessUrl
    }

    public async queryMetadata(query: SearchQuery): Promise<DDO[]> {

        const result: DDO[] = await WebServiceConnectorProvider.getConnector()
            .post(`${this.url}${apiPath}/query`, JSON.stringify(query))
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as DDO[]
                }
                Logger.error("queryMetadata failed:", response.status, response.statusText)
                return [] as DDO[]
            })
            .then((ddos) => {
                return ddos.map((ddo): DDO => {
                    return new DDO(ddo as DDO)
                })
            })
            .catch((error) => {
                Logger.error("Error fetching querying metadata: ", error)
                return [] as DDO[]
            })

        return result
    }

    public async queryMetadataByText(query: SearchQuery): Promise<DDO[]> {

        const fullUrl = new URL(`${this.url}${apiPath}/query`)
        fullUrl.searchParams.append("text", query.text)
        fullUrl.searchParams.append("sort", decodeURIComponent(JSON.stringify(query.sort)))
        fullUrl.searchParams.append("offset", query.offset.toString())
        fullUrl.searchParams.append("page", query.page.toString())
        const result: DDO[] = await WebServiceConnectorProvider.getConnector()
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json() as DDO[]
                }
                Logger.log("queryMetadataByText failed:", response.status, response.statusText)
                return [] as DDO[]
            })
            .then((ddos) => {
                return ddos.map((ddo): DDO => {
                    return new DDO(ddo as DDO)
                })
            })
            .catch((error) => {
                Logger.error("Error fetching querying metadata by text: ", error)
                return [] as DDO[]
            })

        return result
    }

    public async storeDDO(ddo: DDO): Promise<DDO> {
        const fullUrl = `${this.url}${apiPath}`
        const result: DDO = await WebServiceConnectorProvider.getConnector()
            .post(fullUrl, DDO.serialize(ddo))
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }
                Logger.error("storeDDO failed:", response.status, response.statusText, ddo)
                return null as DDO
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch((error) => {
                Logger.error("Error fetching querying metadata: ", error)
                return null as DDO
            })

        return result
    }

    public async retrieveDDO(did: string): Promise<DDO> {
        const fullUrl = `${this.url}${apiPath}/${did}`
        const result = await WebServiceConnectorProvider.getConnector()
            .get(fullUrl)
            .then((response: any) => {
                if (response.ok) {
                    return response.json()
                }
                Logger.log("retrieveDDO failed:", response.status, response.statusText, did)
                return null as DDO
            })
            .then((response: DDO) => {
                return new DDO(response) as DDO
            })
            .catch((error) => {
                Logger.error("Error fetching querying metadata: ", error)
                return null as DDO
            })

        return result
    }

    public getServiceEndpoint(did) {
        return `${this.url}/api/v1/aquarius/assets/metadata/${did}`
    }
}
