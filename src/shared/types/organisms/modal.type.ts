import { IUser, IUserForImages } from "@/src/core/models/users/users.model";
import { IReport } from "@/src/core/models/reports/reports.model";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToInteractWith?: IUserForImages;
}

export interface IModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


export interface IModalUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  dataToEdit: IUser | null;
  onUpdateData: (user: IUser) => void;
  setDataToEdit: (data: IUser | null) => void;
}

export interface IModalReportFormProps {
  isOpen: boolean;
  dataToEdit: IReport | null;
  onUpdateData: (user: IReport) => void;
  setDataToEdit: (data: IReport | null) => void;
  onClose: () => void;
}

export interface IModalResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}