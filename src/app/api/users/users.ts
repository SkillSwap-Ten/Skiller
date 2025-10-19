import apiClient from '../apiClient';
import { IUser, IUserForImages, IUserSorted } from '../../../core/models/users/users.model';
import { IAllUsersResponse, IUserByIdResponse, IUsersForImagesResponse } from '@/src/core/dto/users/users.dto';

// Función para obtener un usuario por su ID
export const getUserById = async (userId: number): Promise<IUser> => {
    try {
        const response: IUserByIdResponse = await apiClient(`UsersGet/GetUserById/${userId}`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (response && response?.message === "Success") {
            return response.data.response;
        } else {
            throw new Error(response?.message || 'Error al obtener solicitudes');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para obtener todos los usuarios
export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const response: IAllUsersResponse = await apiClient('UsersGet/GetUsersAll', {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (response && response?.message === "Success") {
            return response.data.response;
        } else {
            throw new Error(response?.message || 'Error al obtener solicitudes');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para obtener todos los usuarios ordenados
export const getAllUsersSorted = async (): Promise<IUserSorted[]> => {
    try {
        const response: IUserSorted[] = await apiClient('UsersGet/GetUserSortedCreated', {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (response) {
            return response;
        } else {
            throw new Error('Error al obtener solicitudes');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para obtener los usuarios con imágenes
export const getUsersForImages = async (): Promise<IUserForImages[]> => {
    try {
        const response: IUsersForImagesResponse = await apiClient('UsersGet/GetUsersForImages', {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (response && response?.message === "Success") {
            return response.data.response;
        } else {
            throw new Error(response?.message || 'Error al obtener solicitudes');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para cambiar mis datos por mi ID
export const putUserByUser = async (userToUpdate: IUser, userId: number) => {
    try {
        const response = await apiClient(`UsersPut/PutUserByUser?id=${userId}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToUpdate),
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para cambiar datos de un usuario por su ID
export const putUserByAdmin = async (userToUpdate: IUser, userId: number) => {
    try {
        const response = await apiClient(`UsersPut/PutUserByAdmin?id=${userId}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToUpdate),
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para eliminar un usuario por su ID
export const deleteUserById = async (userId: number) => {
    try {
        const response = await apiClient(`UsersDelete/DeleteUserById?id=${userId}`, {
            method: "DELETE",
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Función para cambiar el estado de un usuario por su ID
export const putUserAccountState = async (userId: number, action: string) => {
    try {
        const response = await apiClient(`UsersPut/PutUserByAction?id=${userId}&action=${action}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        return response.data.response.estado;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



