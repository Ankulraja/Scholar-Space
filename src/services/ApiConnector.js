import axios from "axios";
import authManager from "./authManager";

export const axiosInstance = axios.create({});
axiosInstance.defaults.withCredentials = true;


axiosInstance.interceptors.request.use(
  async (config) => {
    let token = authManager.getToken();

    if (!token) {

      try {
        token = await authManager.refreshAccessToken();
      } catch (e) {
      }
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (originalRequest._retry) return Promise.reject(error);

    if (error.response && error.response.status === 401) {
      originalRequest._retry = true;
      try {
        const newToken = await authManager.refreshAccessToken();
        if (newToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

const ApiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers: headers || null,
    params: params || null,
  });
};

export default ApiConnector;