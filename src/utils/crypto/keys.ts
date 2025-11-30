import {arrayBufferToBase64, base64ToArrayBuffer} from "@/utils/crypto/conversion.ts";

const PEM_PUBLIC_HEADER = "-----BEGIN PUBLIC KEY-----"
const PEM_PUBLIC_FOOTER =  "-----END PUBLIC KEY-----"

const PEM_PRIVATE_HEADER = "-----BEGIN PRIVATE KEY-----"
const PEM_PRIVATE_FOOTER = "-----END PRIVATE KEY-----"

const ALGORITHM = {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
}
export const generateKeyPair = async (): Promise<CryptoKeyPair> => {
    return await window.crypto.subtle.generateKey(
        ALGORITHM,
        true,
        ["encrypt", "decrypt"],
    )

}

export const exportPublicKeyToPEM = async (key: CryptoKey): Promise<string> => {
    const exported = await window.crypto.subtle.exportKey("spki", key);
    const exportedAsBase64 = arrayBufferToBase64(exported);

    return `${PEM_PUBLIC_HEADER}\n${exportedAsBase64}\n${PEM_PUBLIC_FOOTER}`;
}

export const importPublicKeyFromPEM = async (key: string): Promise<CryptoKey> => {
    const keyClear = key
        .replace(PEM_PUBLIC_HEADER, "")
        .replace(PEM_PUBLIC_FOOTER, "")
        .replace(/\s/g, "")

    const keyData = base64ToArrayBuffer(keyClear)

    return await window.crypto.subtle.importKey("spki", keyData, ALGORITHM, true, ["encrypt"])
}

export const exportPrivateKeyToPEM = async (key: CryptoKey): Promise<string> => {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key);
    const exportedAsBase64 = arrayBufferToBase64(exported)

    return `${PEM_PRIVATE_HEADER}\n${exportedAsBase64}\n${PEM_PRIVATE_FOOTER}`
}

export const importPrivateKeyFromPEM = async (key: string): Promise<CryptoKey> => {
    const keyClear = key
        .replace(PEM_PRIVATE_HEADER, "")
        .replace(PEM_PRIVATE_FOOTER, "")
        .replace(/\s/g, "")

    const keyData = base64ToArrayBuffer(keyClear)

    return await window.crypto.subtle.importKey("pkcs8", keyData, ALGORITHM, true, ["decrypt"])
}