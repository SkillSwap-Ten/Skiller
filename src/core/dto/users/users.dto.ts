import { IUser, IUserForImages, IUserSorted } from "../../models/users/users.model";

export interface IUserByIdResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IUser;
    };
}

export interface IAllUsersResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IUser[];
    };
}

export interface ISortedUsersResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IUserSorted[];
    };
}

export interface IUsersForImagesResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IUserForImages[];
    };
}