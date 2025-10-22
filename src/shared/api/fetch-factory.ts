import axios from "axios";
import { env } from "@/shared/config/env";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = env.apiBaseUrl;
const ACCESS_TOKEN_KEY = 'access_token';

// Helper functions để quản lý token qua localStorage
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const setAccessToken = (token: string | null) => {
    if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
};
const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export interface FetchFactoryConfig extends AxiosRequestConfig { }
export class FetchFactory {
    private instance: AxiosInstance;
    constructor(config?: FetchFactoryConfig) {
        this.instance = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            ...config
        });
        this.setupInterceptors();
    }
    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                const token = getAccessToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Handle 401 Unauthorized - Token expired (chỉ retry 1 lần duy nhất)
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    clearAccessToken();
                    try {
                        // Gọi refresh token API (không qua interceptor để tránh loop)
                        const response = await axios.post(
                            `${API_BASE_URL}/auth/processNewToken`,
                            {},
                            { withCredentials: true }
                        );
                        const newAccessToken = response.data.accessToken;
                        setAccessToken(newAccessToken);

                        // Retry request gốc với token mới
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        }
                        return this.instance(originalRequest);
                    } catch (refreshError) {
                        // Refresh token thất bại -> redirect về login
                        clearAccessToken();
                        window.location.href = '/#/login';
                        return Promise.reject(refreshError);
                    }
                }

                // Nếu đã retry hoặc không phải lỗi 401 -> reject luôn
                return Promise.reject(error);
            }
        );
    }
    public getInstance(): AxiosInstance {
        return this.instance;
    }
    // method for http request
    public get<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.get<T>(url, config);
    }
    public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.post<T>(url, data, config);
    }
    public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.put<T>(url, data, config);
    }
    public patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.patch<T>(url, data, config);
    }
    public delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete<T>(url, config);
    }
}
export const fetchFactory = new FetchFactory();