export interface RecipientEntry {
    user_id: string
    encrypted_key: string
}

export interface MetadataDto {
    sender_id: string
    recipients: RecipientEntry[]
    file_iv: string
    expiration: string
    note_iv: string | null
    encrypted_note: string | null
}
