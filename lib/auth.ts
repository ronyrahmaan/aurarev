import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function createSession(userId: string, email: string) {
  const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' })
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })
  return token
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

export async function getSession(request?: NextRequest) {
  try {
    let token: string | undefined

    if (request) {
      // Use request object if provided (for API routes)
      token = request.cookies.get('auth-token')?.value
    } else {
      // Use Next.js cookies() function for server components
      const cookieStore = await cookies()
      token = cookieStore.get('auth-token')?.value
    }

    if (!token) return null

    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    return payload
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

export function getAuthTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('auth-token')?.value || null
}

export function verifyToken(token: string) {
  try {
    console.log('🔑 JWT: Verifying token with secret:', JWT_SECRET.substring(0, 10) + '...')
    const result = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    console.log('🔑 JWT: Token verification successful for user:', result.userId)
    return result
  } catch (error) {
    console.log('🔑 JWT: Token verification failed:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}