// Función que valida el token JWT (solo verifica expiración simple aquí)
export function isValidToken(token: string): boolean {
    try {
        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
        ); return payload.exp > Date.now() / 1000;
    } catch (error) {
        console.error("Error al validar el token:", error);
        return false;
    }
}