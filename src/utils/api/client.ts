import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000", // TODO: Replace with env variable, also based if PROD or DEV
    timeout: 30_000
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            console.error('API Error Response:', error.response.data);
        } else {
            console.error('API Network Error:', error.message);
        }

        return Promise.reject(error);
    }
)
