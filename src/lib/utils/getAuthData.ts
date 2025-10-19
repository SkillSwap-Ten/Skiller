import store from "@/src/lib/store";
import { toast } from "react-toastify";

/**
 * Get authentication-related data from Redux or localStorage.
 * @param key - One of: "token" | "userId" | "role" | "email"
 * @returns The requested value (string or number), or null if not found.
 */

// Sobrecargas para que TypeScript infiera el tipo correcto según la clave
export function getAuthData(key: "token" | "email"): string | null;
export function getAuthData(key: "id" | "role"): number | null;

// Implementación principal
export function getAuthData(
    key: "token" | "id" | "role" | "email"
): string | number | null {
    try {
        const state = store.getState();
        const user = state.auth?.user?.data?.response;

        // Primero intenta obtener desde Redux
        if (user) {
            switch (key) {
                case "token":
                    return user.token ?? null;
                case "id":
                    return user.id ?? null;
                case "role":
                    return user.role ?? null;
                case "email":
                    return user.email ?? null;
            }
        }

        // Fallback a localStorage
        const storageKey =
            key === "token"
                ? "authToken"
                : key === "id"
                    ? "userId"
                    : key === "role"
                        ? "userRole"
                        : null;

        if (!storageKey) return null; // Si es email o algo no soportado
        const localValue = localStorage.getItem(storageKey);

        if (!localValue) return null;

        if (key === "id" || key === "role") return Number(localValue);
        return localValue;
    } catch (error) {
        console.error("Error fetching Auth data:", error);
        toast.info("Datos del usuario no disponible. Por favor, inicia sesión.");
        return null;
    }
}
