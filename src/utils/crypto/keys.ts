import {arrayBufferToBase64} from "@/utils/crypto/conversion.ts";

export const generateKeyPair = async (): Promise<CryptoKeyPair> => {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"],
    )
}

export const exportPublicKeyToPEM = async (key: CryptoKey): Promise<string> => {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    const exportedAsBase64 = arrayBufferToBase64(exported);

    return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
}