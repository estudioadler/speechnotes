'use server'

import { cookies } from 'next/headers'

export async function login(email: string, password: string) {
  // This is a placeholder for your actual authentication logic
  // You should replace this with your own authentication mechanism
  if (email === 'user@example.com' && password === 'password') {
    // Set a cookie to maintain the session
    cookies().set('session', 'logged-in', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return { success: true }
  } else {
    return { success: false, error: 'Invalid email or password' }
  }
}

