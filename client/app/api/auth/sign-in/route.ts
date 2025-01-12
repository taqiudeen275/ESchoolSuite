/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/sign-in/route.ts
import { NextResponse } from 'next/server';
import apiClient from '@/lib/apiClient';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Send sign-in request to the CORRECT backend API endpoint for JWT login
    const response = await apiClient.post('/users/login/', { // Corrected endpoint
      username,
      password,
    });

    // Updated to handle JWT access and refresh tokens
    const { refresh, access } = response.data;

    (await cookies()).set('access', access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 5, // 5 minutes (adjust as needed)
    });
    (await cookies()).set('refresh', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 14, // 14 days (adjust as needed)
    });

    return NextResponse.json({ message: 'Successfully signed in!' }, { status: 200 });
  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.response?.data?.detail || 'Failed to sign in', // Using "detail" as error message
      },
      { status: error.response?.status || 500 }
    );
  }
}