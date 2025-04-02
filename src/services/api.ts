import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在這裡添加認證 token 等
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // 在這裡處理錯誤響應
    return Promise.reject(error);
  }
);

export default api; 