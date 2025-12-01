import {base64ToArrayBuffer} from "@/utils/crypto/conversion.ts";

const KEY_SIZE = 512;
const IV_SIZE = 12;

export const generateAesKey = async (): Promise<CryptoKey>  => {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ['encrypt', 'decrypt']
    )
}

export const exportAesKey = async (key: CryptoKey): Promise<ArrayBuffer> => {
    return await window.crypto.subtle.exportKey("raw", key)
}

export const importAesKey = async (data: ArrayBuffer): Promise<CryptoKey> => {
    return await window.crypto.subtle.importKey("raw", data, { name: "AES-GCM", length: 256 }, true, ['encrypt', 'decrypt'])
}

export const encryptFile = async (file: File, recipientPublicKey: CryptoKey): Promise<Blob> => {
    const fileBuffer = await file.arrayBuffer();
    const aesKey = await generateAesKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedFile = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        aesKey,
        fileBuffer
    )

    const encryptedKey = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        recipientPublicKey,
        await exportAesKey(aesKey)
    )

    return new Blob([encryptedKey, iv, encryptedFile], { type: "application/octet-stream" })
}

export const decryptFile = async (encryptedData: Base64URLString, privateKey: CryptoKey): Promise<Blob> => {
    const encryptedDataBuffer = base64ToArrayBuffer(encryptedData);

    const encryptedKeyBuffer = encryptedDataBuffer.slice(0, KEY_SIZE);
    const encryptedFileBuffer = encryptedDataBuffer.slice(KEY_SIZE + IV_SIZE);
    const ivBuffer = encryptedDataBuffer.slice(KEY_SIZE, KEY_SIZE + IV_SIZE);

    const decryptedKey = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedKeyBuffer
    )

    const aesKey = await importAesKey(decryptedKey)

    const decryptedFile = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: ivBuffer,
        },
        aesKey,
        encryptedFileBuffer
    )

    return new Blob([decryptedFile], { type: "" })
}