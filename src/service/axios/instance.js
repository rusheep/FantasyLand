import axios from "axios";

const defaultConfig = {
  timeout: import.meta.env.VITE_SERVICE_TIMEOUT,
  baseURL: import.meta.env.VITE_URL,
};

export default class Http {
  constructor() {
    this.axiosInstance = axios.create(defaultConfig);
    this.httpInterceptorRequest();
    this.httpInterceptorResponse();
  }

  httpInterceptorRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  httpInterceptorResponse() {
    this.axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  async get(url, params) {
    const response = await this.axiosInstance.get(url, { params });
    return response.data;
  }

  async post(url, data) {
    const response = await this.axiosInstance.post(url, data);
    return response.data;
  }

  async patch(url, data) {
    const response = await this.axiosInstance.patch(url, data);
    return response.data;
  }

  async delete(url, data) {
    const response = await this.axiosInstance.delete(url, data);
    return response.data;
  }
}
