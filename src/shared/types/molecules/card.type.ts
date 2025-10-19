import { IUserForImages } from "@/src/core/models/users/users.model";

export interface ICardUserProps {
  userData: IUserForImages;
  key?: number;
}

export interface ICardProfileProps {
  userData: IUserForImages;
}

export interface ICardSidebarProps {
  userData: IUserForImages;
}

export interface ICardAdsDiscoverProps {
  user: IUserForImages;
  loading: boolean;
  error: string | null;
}

export interface ICardFeaturesProps {
  openModalReport: () => void;
  openModalTips: () => void;
  error: string | null;
  loading: boolean;
  userData: IUserForImages | null;
}

export interface ICardMatchProps {
  user: IUserForImages;
  loading: boolean;
  error: string | null;
}