// Función que valida el token JWT (solo verifica expiración simple aquí)
export function isValidToken(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000;
    } catch (error) {
        console.error("Error al validar el token:", error);
        return false;
    }
}