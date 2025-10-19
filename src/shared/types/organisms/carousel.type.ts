import { IUserSorted } from "@/src/core/models/users/users.model";

export type INewUserCarouselProps = IUserSorted;

export type IMatchedUserCarouselProps = {
    userId: number | undefined
}