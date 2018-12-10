import Condition from "./Condition"
import Contract from "./Contract"
import MetaData from "./MetaData"

export default class Service {
    public type: string = "OpenIdConnectVersion1.0Service"
    public serviceDefinitionId?: string
    public templateId?: string
    public serviceEndpoint: string = "https://openid.example.com/"
    public purchaseEndpoint?: string
    public description?: string = "My public social inbox"
    public metadata?: MetaData = {} as MetaData
    public serviceAgreementContract?: Contract
    public conditions?: Condition[] = []
}
