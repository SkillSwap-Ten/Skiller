import { ReactNode } from "react";
import { IReport } from "../../../core/models/reports/reports.model";
import { IUser, IUserForImages } from "../../../core/models/users/users.model";

export interface IAdminReportFormProps {
  dataToEdit: IReport | null;
  onUpdateData: (report: IReport) => void;
  setDataToEdit: (data: IReport | null) => void;
  onClose: () => void;
}

export interface IAdminUserFormProps {
  dataToEdit: IUser | null;
  onUpdateData: (user: IUser) => void;
  setDataToEdit: (data: IUser | null) => void;
  onClose: () => void;
};

export interface IUserFormProps {
  dataToEdit: IUser | null;
  onUpdateData: (user: IUser) => void;
  setDataToEdit: (data: IUser | null) => void;
  onClose: () => void;
};

export interface IRequestFormProps {
  receivingUser: IUserForImages;
  onClose: () => void;
};

export interface IReportFormProps {
  closeModal: () => void;
  reportedUser: IUserForImages;
};

export interface IFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string,
  children: ReactNode
}