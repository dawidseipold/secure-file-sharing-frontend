import type { FileResponse, KeyResponse, PublishResponse, UploadResponse } from "@/types/api.ts"
import { apiClient } from "@/utils/api/client.ts"
import type { FileRecord } from "@/types/metadata.ts" // POST /keys

export const publishKey = async (keyConent: string): Promise<PublishResponse> => {
    const response = await apiClient.post<PublishResponse>("/users", keyConent, {
        headers: {
            "Content-Type": "text/plain",
        },
    })

    return response.data
}

export const getKey = async (userId: string): Promise<KeyResponse> => {
    const response = await apiClient.get<KeyResponse>(`/users/${userId}/key`)

    return response.data
}

export const uploadFile = async (
    formData: FormData,
    onProgress?: (progress: number) => void,
): Promise<UploadResponse> => {
    const response = await apiClient.post<UploadResponse>("/files", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1
            const current = progressEvent.loaded
            const percentage = Math.round((current / total) * 100)

            if (onProgress) {
                onProgress(percentage)
            }
        },
    })

    return response.data
}

export const downloadFile = async (fileId: string): Promise<FileResponse> => {
    const response = await apiClient.get<FileResponse>(`/files/${fileId}`)

    return response.data
}

export const listUserFiles = async (userId: string): Promise<FileRecord[]> => {
    const response = await apiClient.get<FileRecord[]>(`/users/${userId}/files`)
    return response.data
}
