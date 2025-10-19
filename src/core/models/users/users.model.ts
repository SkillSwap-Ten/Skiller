// Estas tres interfaces de User se deben de integrar en una sola que traiga todos estos atributos
// y al final de 4 solo quedarían 2 ENDPOINTS (AllUsers (trae Array con IUser[]) 
// y UserById (trae Object con IUser))

// AÑADIR la 'password: string', correctamente hasheada para evitar errores.

export interface IUser {
    id?: number;
    name?: string;
    lastName?: string;
    urlImage: string;
    jobTitle?: string;
    description?: string;
    birthdate?: string;
    email?: string;
    password?: string;
    category?: string;
    phoneNumber?: string;
    abilities?: string;
    urlLinkedin?: string;
    urlGithub?: string;
    urlBehance?: string;
    idStateUser?: number;
    idRoleUser?: number;
    nameStateUser?: string;
    roleName?: RoleName;
    suspensionDate?: string | null;
    reactivationDate?: string | null;
}

export interface IUserSorted {
    id: number;
    name: string;
    urlImage: string;
    category: string;
    createdAt: string;
}

export interface IUserForImages {
    id: number;
    fullName: string;
    jobTitle?: string;
    qualification?: number;
    countMatches?: number;
    description?: string;
    abilities?: string;
    urlImage?: string;
    createdAt?: string;
}

export enum RoleName {
    Administrador = "Administrador",
    Usuario = "Usuario",
}

export interface IUsersState {
    users: IUser[];
    loading: boolean;
    error: string | null;
}
