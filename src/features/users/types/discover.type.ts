import { IUserForImages } from "@/src/core/models/users/users.model";

export interface IDiscoverUsersProps {
    users: IUserForImages[]
    loading: boolean;
    error: string | null;
}