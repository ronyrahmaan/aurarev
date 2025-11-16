import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'All sessions cleared',
      timestamp: new Date().toISOString(),
      clearClientStorage: true
    }, { status: 200 })

    // Comprehensive list of all possible NextAuth cookies
    const cookiesToClear = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.session-token',
      'authjs.session-token',
      '__Secure-authjs.session-token',
      '__Host-authjs.session-token',
      'next-auth.csrf-token',
      '__Secure-next-auth.csrf-token',
      '__Host-next-auth.csrf-token',
      'authjs.csrf-token',
      '__Secure-authjs.csrf-token',
      '__Host-authjs.csrf-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url',
      '__Host-next-auth.callback-url',
      'authjs.callback-url',
      '__Secure-authjs.callback-url',
      '__Host-authjs.callback-url'
    ]

    // Clear each cookie with all possible configurations
    cookiesToClear.forEach(cookieName => {
      // Clear for root domain
      response.cookies.set(cookieName, '', {
        maxAge: -1,
        expires: new Date(0),
        path: '/',
        domain: undefined,
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
      })

      // Clear for current domain (if different)
      response.cookies.set(cookieName, '', {
        maxAge: -1,
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
      })

      // Clear without httpOnly for any client-side cookies
      response.cookies.set(cookieName, '', {
        maxAge: -1,
        expires: new Date(0),
        path: '/',
        secure: true,
        sameSite: 'lax'
      })
    })

    // Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')

    return response
  } catch (error) {
    console.error('Session clearing failed:', error)
    return NextResponse.json(
      { message: 'Session clearing failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}