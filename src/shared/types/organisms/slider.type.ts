import { IUserForImages } from "@/src/core/models/users/users.model";

export interface ISliderMatchProps {
  user: IUserForImages;
  onPass: () => void;
  loading: boolean;
  error: string | null;
}

export interface ISliderFeaturesData {
  title: string
  description: string
  buttonText: string
  buttonIcon: React.ReactNode
  backgroundImage: string
  action: () => void
}

export interface ISliderFeaturesProps {
  openModalReport: () => void
  openModalTips: () => void
  autoAdvance?: boolean
  autoAdvanceInterval?: number
  className?: string
}