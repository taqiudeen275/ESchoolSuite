import axios from 'axios';
import { cookies } from 'next/headers';

const serverApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

serverApiClient.interceptors.request.use(
  async (config) => {
    const token = (await cookies()).get('access')?.value;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serverApiClient;