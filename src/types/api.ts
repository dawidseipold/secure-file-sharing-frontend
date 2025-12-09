import type { MetadataDto } from "@/types/metadata.ts"

export interface PublishResponse {
    user_id: string
}

export interface KeyResponse {
    key: string
}

export interface UploadResponse {
    file_id: string
}

export interface FileResponse {
    file_content: string
    metadata: MetadataDto
}

export interface ErrorResponse {
    error: string
}
