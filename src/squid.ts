import Account from "./ocean/Account"
import Ocean from "./ocean/Ocean"
import ServiceAgreement from "./ocean/ServiceAgreements/ServiceAgreement"
import ServiceAgreementTemplate from "./ocean/ServiceAgreements/ServiceAgreementTemplate"
import Access from "./ocean/ServiceAgreements/Templates/Access"
import FitchainCompute from "./ocean/ServiceAgreements/Templates/FitchainCompute"
import Logger from "./utils/Logger"
import WebServiceConnectorProvider from "./utils/WebServiceConnectorProvider"
import SecretStoreProvider from "./secretstore/SecretStoreProvider"
import IdGenerator from "./ocean/IdGenerator"
import DID from './ocean/DID'

import EventListener from "./keeper/EventListener"

const Templates = {Access, FitchainCompute}

export {
    Ocean,
    ServiceAgreement,
    ServiceAgreementTemplate,
    Logger,
    Templates,
    Account,
    IdGenerator,
    DID,
    EventListener,
    WebServiceConnectorProvider,
    SecretStoreProvider,
}
