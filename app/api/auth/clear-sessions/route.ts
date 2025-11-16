import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Clear NextAuth session cookies
    const cookieStore = cookies()

    // Get all cookies and clear the NextAuth ones
    const nextAuthCookies = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.csrf-token',
      '__Host-next-auth.csrf-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url'
    ]

    const response = NextResponse.json({
      message: 'Sessions cleared successfully',
      action: 'Please refresh the page'
    }, { status: 200 })

    // Clear all NextAuth cookies
    nextAuthCookies.forEach(cookieName => {
      response.cookies.set(cookieName, '', {
        maxAge: 0,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
    })

    return response
  } catch (error) {
    console.error('Clear sessions error:', error)
    return NextResponse.json(
      { message: 'Failed to clear sessions' },
      { status: 500 }
    )
  }
}