/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/sign-in/route.ts
import { NextResponse } from 'next/server';
import apiClient from '@/lib/apiClient';


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

    const headers = new Headers();
    // Set cookies for both access and refresh tokens with appropriate expirations
    headers.append(
      'Set-Cookie',
      `access=${access}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 15}` // Example: 15 minutes for access token
    );
    headers.append(
      'Set-Cookie',
      `refresh=${refresh}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}` // Example: 30 days for refresh token
    );

    return NextResponse.json(
      { message: 'Successfully signed in' },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.log(error.response?.data)

    return NextResponse.json(
      {
        error: error.response?.data?.detail || 'Failed to sign in', // Using "detail" as error message
      },
      { status: error.response?.status || 500 }
    );
  }
}