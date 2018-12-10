import Authentication from "./Authentication"
import PublicKey from "./PublicKey"
import Service from "./Service"

export default class DDO {

    public static serialize(ddo: DDO): string {
        return JSON.stringify(ddo, null, 2)
    }

    public static deserialize(ddoString: string): DDO {
        const ddo = JSON.parse(ddoString)

        return ddo as DDO
    }

    public "@context": string = "https://w3id.org/future-method/v1"
    public id: string
    public publicKey: PublicKey[]
    public authentication: Authentication[]
    public service: Service[]

    public constructor(ddo?: {
        id?: string,
        publicKey?: PublicKey[],
        authentication?: Authentication[],
        service?: Service[],
    }) {
        this.authentication = ddo ? ddo.authentication ? ddo.authentication : [] : []
        this.id = ddo ? ddo.id ? ddo.id : null : null
        this.publicKey = ddo ? ddo.publicKey ? ddo.publicKey : [] : []
        this.service = ddo ? ddo.service ? ddo.service : [] : []
    }

    public findServiceById(serviceDefinitionId: string): Service {

        if (!serviceDefinitionId) {
            throw new Error("serviceDefinitionId not set")
        }

        const service: Service = this.service.find((s) => s.serviceDefinitionId === serviceDefinitionId)

        return service
    }

    public findServiceByType(serviceType: string): Service {

        if (!serviceType) {
            throw new Error("serviceType not set")
        }

        const service: Service = this.service.find((s) => s.type === serviceType)

        return service
    }
}
