import {Receipt} from "web3-utils"
import ValueType from "../../models/ValueType"
import Web3Provider from "../Web3Provider"
import ContractBase from "./ContractBase"

export default class DIDRegistry extends ContractBase {

    public static async getInstance(): Promise<DIDRegistry> {
        const didRegistry: DIDRegistry = new DIDRegistry("DIDRegistry")
        await didRegistry.init()
        return didRegistry
    }

    public async registerAttribute(did: string, type: ValueType, key: string,
                                   value: string, ownerAddress: string): Promise<Receipt> {

        return this.send("registerAttribute",
            ownerAddress, ["0x" + did, type, Web3Provider.getWeb3().utils.fromAscii(key), value],
        )
    }

    public async getOwner(did: string): Promise<string> {

        return this.call("getOwner",
            ["0x" + did],
        )
    }

    public async getUpdateAt(did: string): Promise<number> {

        const blockNum = await this.call("getUpdateAt",
            ["0x" + did],
        )

        return parseInt(blockNum, 10)
    }

}
