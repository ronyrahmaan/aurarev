import { NextResponse, type NextRequest } from 'next/server'
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const pathname = request.nextUrl.pathname

  // If it's the root path, just continue
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Check if the current path is protected (starts with /dashboard)
  if (pathname.startsWith('/dashboard')) {
    console.log('🔐 Middleware: Checking auth for dashboard path:', pathname)

    // Get the token from the request
    const token = getAuthTokenFromRequest(request)
    console.log('🔐 Middleware: Token found:', token ? 'YES' : 'NO', token ? `(${token.substring(0, 20)}...)` : '')

    // If no token is found, redirect to login
    if (!token) {
      console.log('🔐 Middleware: No token found, redirecting to login')
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }

    // Verify the token
    const payload = verifyToken(token)
    console.log('🔐 Middleware: Token verification result:', payload ? 'VALID' : 'INVALID')
    if (!payload) {
      console.log('🔐 Middleware: Invalid token, redirecting to login')
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }

    console.log('🔐 Middleware: Authentication successful for user:', payload.userId)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}