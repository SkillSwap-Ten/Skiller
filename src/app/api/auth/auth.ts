import apiClient from '../apiClient';

// Función para solicitar correo de cambio de contraseña
export const postRecoverPasswordRequest = async (email: string) => {
    try {
        const response = await apiClient(`Auth/RequestEmail`,
            {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};

// Función para cambiar mi contraseña
export const postSetNewPassword = async (token: string, password: string) => {
    try {
        const response = await apiClient(`Auth/ResetPassword`,
            {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: password,
                }),
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};