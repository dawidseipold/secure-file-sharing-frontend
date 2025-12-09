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
    filename: string
    mime_type: string
}

export interface FileRecord {
    id: { tb: string; id: { String: string } }
    sender_id: string
    expiration: string
    created_at: string
}
