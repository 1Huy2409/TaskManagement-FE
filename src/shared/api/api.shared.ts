import { API_ENDPOINT } from "./api-endpoint";
import { FetchFactory, fetchFactory } from "./fetch-factory";

export { API_ENDPOINT };
export { fetchFactory, FetchFactory };
export const axiosInstance = fetchFactory.getInstance();

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    responseObject: T
    statusCode: number;
}

export interface ApiError {
    name: string;
    message: string;
    statusCode: number;
    code?: string;
}

export const api = {
    auth: {
        login: async <T = any>(data: { username: string; password: string }): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.login, data);
            return res.data;
        },
        requestOTP: async <T = any>(data: { email: string }): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.requestOTP, data);
            return res.data;
        },
        verifyOTP: async <T = any>(data: { email: string; otp: string }): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.verifyOTP, data);
            return res.data;
        },
        completeRegister: async <T = any>(data: { email: string; fullname: string; username: string; password: string }): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.completeRegister, data);
            return res.data;
        },
        refreshToken: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.refreshToken, {}, { withCredentials: true });
            return res.data;
        },
        logout: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.post<ApiResponse<T>>(API_ENDPOINT.auth.logout, {}, { withCredentials: true });
            return res.data;
        },
        verifyToken: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.auth.verify);
            return res.data;
        }
    },
    workspace: {
        getAll: async <T = any>(): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getAll, { withCredentials: true });
            return res.data;
        },
        getBoards: async <T = any>(workspaceId: string): Promise<ApiResponse<T>> => {
            const res = await axiosInstance.get<ApiResponse<T>>(API_ENDPOINT.workspace.getBoards(workspaceId), { withCredentials: true });
            return res.data;
        }
    }
}