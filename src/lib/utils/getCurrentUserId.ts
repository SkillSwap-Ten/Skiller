import { toast } from "react-toastify";

// Función para obtener el ID del usuario del localStorage
export const getCurrentUserId = (): number | null => {
    const idString = localStorage.getItem("userId");
    if (!idString) {
        console.error("ID del usuario no disponible. Inicia sesión.");
        toast.info("ID del usuario no disponible. Inicia sesión.");
        return null;
    }
    return Number.parseInt(idString, 10);
};