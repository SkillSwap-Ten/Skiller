import { IReport } from "../../../core/models/reports/reports.model";
import { IUser, IUserForImages } from "../../../core/models/users/users.model";

export interface ITableRowReportProps {
  report: IReport;
  setDataToEdit: (report: IReport) => void;
  onDeleteData: (reportId: number) => void;
}

export interface ITableRowUserProps {
  user: IUser;
  setDataToEdit: (user: IUser) => void;
  setDataToReport: (user: IUserForImages | null) => void;
  onDeleteData: (userId: number) => void;
}

export interface ITableReportsProps {
  data: IReport[],
  loading: boolean;
  error: string | null;
  dataToEdit: IReport | null;
  onUpdateData: (user: IReport) => void;
  onDeleteData: (reportId: number) => void;
  setDataToEdit: (data: IReport | null) => void;
}

export interface ITableUsersProps {
  data: IUser[],
  loading: boolean;
  error: string | null;
  dataToReport: IUserForImages | null;
  dataToEdit: IUser | null;
  setDataToReport: (user: IUserForImages | null) => void;
  onUpdateData: (user: IUser) => void;
  onDeleteData: (userId: number) => void;
  setDataToEdit: (data: IUser | null) => void;
}