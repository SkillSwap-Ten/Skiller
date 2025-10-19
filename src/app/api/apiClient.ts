import { getAuthData } from "@/src/lib/utils/getAuthData";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthData('token');

    if (token === null) {
        throw new Error("Token no disponible");
    }

    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
        body: options.body ? options.body : undefined,
    };

    const response = await fetch(`${BASE_API_URL}/${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API request failed');
    }

    const responseText = await response.text();
    if (responseText) {
        return JSON.parse(responseText);
    }

    return {};
};

export default apiClient;


