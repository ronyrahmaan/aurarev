import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const pathname = request.nextUrl.pathname

  // If it's the root path, just continue
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Check if the current path is protected (starts with /dashboard)
  if (pathname.startsWith('/dashboard')) {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // If no token is found, redirect to login
    if (!token) {
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}