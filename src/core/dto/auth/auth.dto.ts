export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserRegisterRequest {
    email: string;
    password: string;
    name: string;
    lastName: string;
    birthdate: Date | undefined | string;
    description: string;
    jobTitle: string;
    urlLinkedin: string | null;
    urlGithub: string | null;
    urlBehance?: string | null;
    urlImage: string;
    phoneNumber: string | null;
    category: string;
    abilities: string;
}

export interface IUserAuthResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: {
            id: number;
            role: number;
            email: string;
            token: string;
        }
    }
}

export interface IUserAuthError {
    error: {
        statusCode: number,
        message: string,
        error: string
    }
}