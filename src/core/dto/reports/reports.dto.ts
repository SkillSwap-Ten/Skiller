import { IReport } from "../../models/reports/reports.model";

export interface IReportByIdResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IReport
    }
}