import {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    stringToArrayBuffer,
} from "@/utils/crypto/conversion.ts"
import { importPublicKeyFromPEM } from "@/utils/crypto/keys.ts"
import type { MetadataDto } from "@/types/metadata.ts"

const KEY_SIZE = 512
const IV_SIZE = 12

export const generateAesKey = async (): Promise<CryptoKey> => {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    )
}

export const exportAesKey = async (key: CryptoKey): Promise<ArrayBuffer> => {
    return await window.crypto.subtle.exportKey("raw", key)
}

export const importAesKey = async (data: ArrayBuffer): Promise<CryptoKey> => {
    return await window.crypto.subtle.importKey(
        "raw",
        data,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
    )
}

export const encryptFile = async (file: File, recipientPublicKey: CryptoKey): Promise<Blob> => {
    const fileBuffer = await file.arrayBuffer()
    const aesKey = await generateAesKey()
    const iv = window.crypto.getRandomValues(new Uint8Array(12))

    const encryptedFile = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        aesKey,
        fileBuffer,
    )

    const encryptedKey = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        recipientPublicKey,
        await exportAesKey(aesKey),
    )

    return new Blob([encryptedKey, iv, encryptedFile], { type: "application/octet-stream" })
}

export const encryptFileForMultipleRecipients = async (
    file: File,
    recipientsPublicKeys: { userId: string; publicKeyPEM: string }[],
    senderId: string,
    expiration: string,
    note?: string,
) => {
    const aesKey = await generateAesKey()
    const rawAesKey = await exportAesKey(aesKey)
    const fileIv = window.crypto.getRandomValues(new Uint8Array(12))

    const fileBuffer = await file.arrayBuffer()
    const encryptedFileBuffer = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: fileIv,
        },
        aesKey,
        fileBuffer,
    )

    const recipientsEntries = await Promise.all(
        recipientsPublicKeys.map(async (r) => {
            const rsaKey = await importPublicKeyFromPEM(r.publicKeyPEM)

            const encryptedKeyBuffer = await window.crypto.subtle.encrypt(
                {
                    name: "RSA-OAEP",
                },
                rsaKey,
                rawAesKey,
            )

            return {
                user_id: r.userId,
                encrypted_key: arrayBufferToBase64(encryptedKeyBuffer),
            }
        }),
    )

    let encryptedNoteBase64 = null
    let noteIvBase64 = null

    if (note) {
        const noteIv = window.crypto.getRandomValues(new Uint8Array(12))
        const noteBuffer = stringToArrayBuffer(note)
        const encryptedNoteBuffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: noteIv,
            },
            aesKey,
            noteBuffer,
        )

        encryptedNoteBase64 = arrayBufferToBase64(encryptedNoteBuffer)
        noteIvBase64 = arrayBufferToBase64(noteIv.buffer)
    }

    const metadata: MetadataDto = {
        sender_id: senderId,
        recipients: recipientsEntries,
        file_iv: arrayBufferToBase64(fileIv.buffer),
        expiration: expiration,
        note_iv: noteIvBase64,
        encrypted_note: encryptedNoteBase64,
        filename: file.name,
        mime_type: file.type,
    }

    return {
        encryptedBlob: new Blob([encryptedFileBuffer]),
        metadata: metadata,
    }
}

export const decryptFilePackage = async (
    encryptedFileBase64: string,
    metadata: MetadataDto,
    myPrivateKey: CryptoKey,
    myUserId: string,
) => {
    const recipientEntry = metadata.recipients.find((r) => r.user_id === myUserId)

    if (!recipientEntry) {
        throw new Error("You are not on the list of recipients for this file!")
    }

    const encryptedKeyBuffer = base64ToArrayBuffer(recipientEntry.encrypted_key)
    const rawAesKey = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        myPrivateKey,
        encryptedKeyBuffer,
    )

    const aesKey = await importAesKey(rawAesKey)
    const fileIv = base64ToArrayBuffer(metadata.file_iv)
    const encryptedFileBuffer = base64ToArrayBuffer(encryptedFileBase64)

    const decryptedFileBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fileIv },
        aesKey,
        encryptedFileBuffer,
    )

    let decryptedNote: string | null = null

    if (metadata.encrypted_note && metadata.note_iv) {
        try {
            const noteIv = base64ToArrayBuffer(metadata.note_iv)
            const encryptedNoteBuffer = base64ToArrayBuffer(metadata.encrypted_note)

            const decryptedNoteBuffer = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: noteIv,
                },
                aesKey,
                encryptedNoteBuffer,
            )

            decryptedNote = new TextDecoder().decode(decryptedNoteBuffer)
        } catch (e) {
            console.error("Error while decrypting the note: ", e)
            decryptedNote = "[Error while decrypting the note]"
        }
    }

    return {
        blob: new Blob([decryptedFileBuffer], { type: metadata.mime_type }),
        note: decryptedNote,
    }
}

export const decryptFile = async (
    encryptedData: Base64URLString,
    privateKey: CryptoKey,
): Promise<Blob> => {
    const encryptedDataBuffer = base64ToArrayBuffer(encryptedData)

    const encryptedKeyBuffer = encryptedDataBuffer.slice(0, KEY_SIZE)
    const encryptedFileBuffer = encryptedDataBuffer.slice(KEY_SIZE + IV_SIZE)
    const ivBuffer = encryptedDataBuffer.slice(KEY_SIZE, KEY_SIZE + IV_SIZE)

    const decryptedKey = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedKeyBuffer,
    )

    const aesKey = await importAesKey(decryptedKey)

    const decryptedFile = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: ivBuffer,
        },
        aesKey,
        encryptedFileBuffer,
    )

    return new Blob([decryptedFile], { type: "" })
}
