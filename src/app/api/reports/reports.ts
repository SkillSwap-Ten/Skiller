import { IReportByIdResponse } from '@/src/core/dto/reports/reports.dto';
import { IReport } from '@/src/core/models/reports/reports.model';
import apiClient from '../apiClient';

export const getReportById = async (reportId: number): Promise<IReport> => {
    try {
        const response: IReportByIdResponse = await apiClient(`ReportGet/GetReportById/${reportId}`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (response?.message === "Success") {
            return response.data.response;
        } else {
            throw new Error(response?.message || 'Error al obtener estado de la conexión');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const postReport = async (reportData: Omit<IReport, "id">, token: string) => {
    try {
        const response = await apiClient('ReportsPost/PostReportCreate', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reportData),
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const putReportByAction = async (reportToUpdate: IReport) => {
    try {
        const response = await apiClient(`UsersPut/PutReportByAction`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportToUpdate),
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteReportById = async (reportId: number) => {
    try {
        const response = await apiClient(`ReportDelete/DeleteReportById/${reportId}`, {
            method: "DELETE",
            headers: {
                'accept': "*/*",
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

