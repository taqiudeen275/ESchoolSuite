/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/sign-up/route.ts
import { NextResponse } from 'next/server';
import apiClient from '@/lib/apiClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password,confirmPassword, firstName, lastName, role } = body;

    const response = await apiClient.post('/users/register/', {
      username,
      email,
      password,
      password2: confirmPassword,
      first_name: firstName,
      last_name: lastName,
      role: role,
    });
    
    return NextResponse.json(
      { message: 'Successfully signed up' },
      { status: 201 }
    );
  } catch (error: any) {
    // Return the field-specific errors directly
    if (error.response?.data) {
      return NextResponse.json(
        { errors: error.response.data },
        { status: error.response?.status || 400 }
      );
    }
    
    return NextResponse.json(
      {
        errors: { general: ['An unexpected error occurred'] }
      },
      { status: 500 }
    );
  }
}