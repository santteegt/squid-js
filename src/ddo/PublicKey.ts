export default class PublicKey {
    public id: string = "did:op:123456789abcdefghi#keys-1"
    public type: string = "Ed25519VerificationKey2018"
    public owner: string = "did:op:123456789abcdefghi"
    public publicKeyPem?: string = "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n"
    public publicKeyBase58?: string = "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
}
