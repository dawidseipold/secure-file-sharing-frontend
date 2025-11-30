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