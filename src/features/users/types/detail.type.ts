import { IUser, IUserForImages } from "../../../core/models/users/users.model";

export interface IDetailUserProps {
    userData?: IUserForImages | null;
    loading: boolean;
    error: string | null;
    userDetail?: IUser | null;
}