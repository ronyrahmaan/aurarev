import { NextRequest, NextResponse } from 'next/server'
import { getAuthTokenFromRequest, verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const debug = {
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
    cookies: {},
    token: null,
    tokenValid: false,
    verificationError: null,
    jwtSecretPrefix: process.env.JWT_SECRET?.substring(0, 10) + '...' || 'NOT SET',
  }

  try {
    // Get all cookies
    debug.cookies = Object.fromEntries(request.cookies.getAll().map(cookie => [cookie.name, cookie.value.substring(0, 20) + '...']))

    // Get auth token
    const token = getAuthTokenFromRequest(request)
    debug.token = token ? token.substring(0, 30) + '...' : null

    if (token) {
      try {
        const payload = verifyToken(token)
        debug.tokenValid = !!payload
        if (payload) {
          debug.verificationError = null
        }
      } catch (error) {
        debug.verificationError = error instanceof Error ? error.message : 'Unknown error'
      }
    }
  } catch (error) {
    debug.verificationError = error instanceof Error ? error.message : 'Debug error'
  }

  return NextResponse.json(debug)
}