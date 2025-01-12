// lib/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper functions for cookie management
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

const setCookie = (name: string, value: string, options: { maxAge: number }) => {
  if (typeof document === 'undefined') return;
  
  const secureFlag = process.env.NODE_ENV === 'production' ? '; secure' : '';
  document.cookie = `${name}=${value}; path=/; max-age=${options.maxAge}${secureFlag}; samesite=strict`;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getCookie('refresh');

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;

        // Update access token in cookie and headers
        setCookie('access', access, {
          maxAge: 60 * 60 * 24, // 1 day
        });

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear tokens on refresh error
        deleteCookie('access');
        deleteCookie('refresh');
        apiClient.defaults.headers.common['Authorization'] = '';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;