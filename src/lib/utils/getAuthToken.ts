// Función para obtener el token
export const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Token no disponible. Inicia sesión.");
        return null;
    }
    return token;
};