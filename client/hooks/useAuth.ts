/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAuth.ts
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie,  deleteCookie } from 'cookies-next';
import apiClient from '@/lib/apiClient';

export const useAuth = (redirectTo: string = '/dashboard', redirectIfFound: boolean = false) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // Replace 'any' with your user type

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = getCookie('access');
        if (accessToken) {
          // Fetch user data
          const response = await apiClient.get('/users/me/');
          setUser(response.data);

          if (redirectIfFound) {
            router.push(redirectTo);
          }
        } else {
          // No access token, clear user and redirect if necessary
          setUser(null);
          if (!redirectIfFound) {
            router.push('/auth/sign-in');
          }
        }
      } catch (error) {
        console.error('User fetch error:', error);
        setUser(null);
        if (!redirectIfFound) {
          router.push('/auth/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [redirectTo, redirectIfFound, router]);

  const logout = async () => {
    try {
      const refreshToken = getCookie('refresh');
      if (refreshToken) {
        // Blacklist the refresh token on the backend
        await apiClient.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove tokens from cookies and API client headers
      deleteCookie('access');
      deleteCookie('refresh');
      apiClient.defaults.headers.common['Authorization'] = '';

      setUser(null);
      router.push('/auth/sign-in');
    }
  };

  return { isLoading, user, logout };
};