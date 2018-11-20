
import * as Web3 from "web3"

interface IPublicKey {
    id?: string
    owner?: string
    type?: string
}

export default class PublicKey {

    public static TYPE_RSA: string = "RsaSignatureAuthentication2018"
    public static PEM: string = "publicKeyPem"
    public static JWK: string = "publicKeyJwk"
    public static HEX: string = "publicKeyHex"
    public static BASE64: string = "publicKeyBase64"
    public static BASE85: string = "publicKeyBase85"

    public id: string
    public owner: string
    public type: string
    public value: string

    public constructor(data?: IPublicKey) {
        this.id = data.id
        this.owner = data.owner
        this.type = data.type
        this.value = data[PublicKey.PEM]
    }

    public toData(): IPublicKey {
        return {
            id: this.id,
            owner: this.owner,
            type: this.type,
            [PublicKey.PEM]: this.value,
        } as IPublicKey
    }

    public isValid(): boolean {
        return this.id && this.id.length > 0
            && this.owner && this.owner.length > 0
            && this.type && this.type.length > 0
            && this.value && this.value.length > 0
    }

    public decodeValue(): string {
        let value = this.value
        let buffer = null
        switch (this.type) {
            case PublicKey.PEM:
                value = this.value
                break
            case PublicKey.JWK:
                // TODO: implement
                break
            case PublicKey.HEX:
                value = Web3.utils.hexToAscii(this.value)
                break
            case PublicKey.BASE64:
                buffer = new Buffer(this.value, "base64")
                value = buffer.toString("ascii")
                break
            case PublicKey.BASE85:
                buffer = new Buffer(this.value, "base85")
                value = buffer.toString("ascii")
                break
        }
        return value
    }
}