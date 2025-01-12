/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/sign-in/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import serverApiClient from '@/lib/serverApiClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const response = await serverApiClient.post('/users/login/', {
      username,
      password,
    });

    const { refresh, access } = response.data;
    
    // Get the cookies instance once to avoid multiple async calls
    const cookieStore = cookies();

    // Set access token
    (await
      // Set access token
      cookieStore).set('access', access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 5, // 5 minutes
    });

    // Set refresh token
    (await
      // Set refresh token
      cookieStore).set('refresh', refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    return NextResponse.json({ message: 'Successfully signed in!' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.detail || 'Failed to sign in',
      },
      { status: error.response?.status || 500 }
    );
  }
}