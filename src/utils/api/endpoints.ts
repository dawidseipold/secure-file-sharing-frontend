import type {FileResponse, KeyResponse, PublishResponse, UploadResponse} from "@/types/api.ts";
import {apiClient} from "@/utils/api/client.ts";

// POST /keys
export const publishKey = async (keyConent: string): Promise<PublishResponse> => {
    const response = await apiClient.post<PublishResponse>('/keys', keyConent, {
        headers: {
            'Content-Type': 'text/plain',
        }
    });

    return response.data;
}

// GET /keys/{user_id}
export const getKey = async (userId: string): Promise<KeyResponse> => {
    const response = await apiClient.get<KeyResponse>(`/keys/${userId}`);

    return response.data;
}

// POST /upload
export const uploadFile = async (formData: FormData): Promise<UploadResponse> => {
    const response = await apiClient.post<UploadResponse>('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

// GET /download/{file_id}
export const downloadFile = async (fileId: string): Promise<FileResponse> => {
    const response = await apiClient.get<FileResponse>(`/download/${fileId}`);

    return response.data;
}