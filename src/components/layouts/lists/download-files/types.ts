export type SurrealId = string | { tb: string; id: string | { String: string } }

export interface FileListItem {
    id: SurrealId
    sender_id: string
    created_at: string
}

export interface DecryptedData {
    blob: Blob
    filename: string
    note?: string
}
