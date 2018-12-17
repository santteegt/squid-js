import * as assert from "assert"
import Aquarius from "../../src/aquarius/Aquarius"
import SearchQuery from "../../src/aquarius/query/SearchQuery"
import DDO from "../../src/ddo/DDO"
import IdGenerator from "../../src/ocean/IdGenerator"
import WebServiceConnectorProvider from "../../src/utils/WebServiceConnectorProvider"
import config from "../config"
import WebServiceConnectorMock from "../mocks/WebServiceConnector.mock"

describe("Aquarius", () => {

    const aquarius: Aquarius = new Aquarius(config)
    describe("#queryMetadata()", () => {

        const query = {
            offset: 100,
            page: 0,
            query: {
                value: 1,
            },
            sort: {
                value: 1,
            },
            text: "Office",
        } as SearchQuery

        it("should query metadata", async () => {

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock([new DDO()]))

            const result: DDO[] = await aquarius.queryMetadata(query)
            assert(result)
            assert(result.length !== null)
        })

        it("should query metadata and return real ddo", async () => {

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock([new DDO()]))

            const result: DDO[] = await aquarius.queryMetadata(query)
            assert(result)
            assert(result[0].findServiceById)
        })
    })

    describe("#queryMetadataByText()", () => {

        const query = {
            offset: 100,
            page: 0,
            query: {
                value: 1,
            },
            sort: {
                value: 1,
            },
            text: "Office",
        } as SearchQuery

        it("should query metadata by text", async () => {

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock([new DDO()]))

            const result: DDO[] = await aquarius.queryMetadataByText(query)
            assert(result)
            assert(result.length !== null)
        })

        it("should query metadata and return real ddo", async () => {

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock([new DDO()]))

            const result: DDO[] = await aquarius.queryMetadataByText(query)
            assert(result)
            assert(result[0].findServiceById)
        })

    })

    describe("#storeDDO()", () => {

        it("should store a ddo", async () => {

            const did: string = `did:op:${IdGenerator.generateId()}`
            const ddo: DDO = new DDO({
                id: did,
            })

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock(ddo))

            const result: DDO = await aquarius.storeDDO(ddo)
            assert(result)
            assert(result.id === ddo.id)
        })
    })

    describe("#retrieveDDO()", () => {

        it("should store a ddo", async () => {

            const did: string = `did:op:${IdGenerator.generateId()}`
            const ddo: DDO = new DDO({
                id: did,
            })

            // @ts-ignore
            WebServiceConnectorProvider.setConnector(new WebServiceConnectorMock(ddo))

            const storageResult: DDO = await aquarius.storeDDO(ddo)
            assert(storageResult)

            assert(storageResult.id === did)

            const restrieveResult: DDO = await aquarius.retrieveDDO(did)
            assert(restrieveResult)

            assert(restrieveResult.id === did)
            assert(restrieveResult.id === storageResult.id)
        })
    })
})
