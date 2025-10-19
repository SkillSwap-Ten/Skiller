import { IRequests, IRequestMetrics } from "../../models/requests/requests.model";

export interface IRequestResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IRequests[];
    };
}

export interface IRequestMetricsResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: IRequestMetrics;
    };
}

export interface IRequestConnectionsResponse {
    message: string;
    details: {
        text: string;
    };
    data: {
        response: boolean;
    };
}