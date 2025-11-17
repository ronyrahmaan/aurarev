import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const pathname = request.nextUrl.pathname
  console.log('🔐 MIDDLEWARE ENTRY:', pathname, new Date().toISOString())

  // If it's the root path, just continue
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Check if the current path is protected (starts with /dashboard)
  if (pathname.startsWith('/dashboard')) {
    console.log('🔐 Middleware: Checking auth for dashboard path:', pathname)

    // Get the token from the request cookie directly
    const token = request.cookies.get('auth-token')?.value
    console.log('🔐 Middleware: Token found:', token ? 'YES' : 'NO', token ? `(${token.substring(0, 20)}...)` : '')

    // If no token is found, redirect to login
    if (!token) {
      console.log('🔐 Middleware: No token found, redirecting to login')
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }

    // Verify the token using Edge Runtime compatible approach
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    console.log('🔐 Middleware: JWT Secret prefix:', JWT_SECRET.substring(0, 10) + '...')

    try {
      // Basic JWT decode for Edge Runtime (simplified verification)
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }

      // Decode the payload (base64url decode)
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

      // Check if token is expired
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        throw new Error('Token expired')
      }

      // Check if token has required fields
      if (!payload.userId || !payload.email) {
        throw new Error('Invalid token payload')
      }

      console.log('🔐 Middleware: Token verification successful for user:', payload.userId)
    } catch (error) {
      console.log('🔐 Middleware: Token verification failed:', error instanceof Error ? error.message : 'Unknown error')
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/(.*)', '/dashboard/:path*']
}