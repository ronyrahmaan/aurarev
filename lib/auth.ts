import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const COOKIE_NAME = 'auth-token'

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value || null
  } catch (error) {
    return null
  }
}

export function getAuthTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = await getAuthToken()
    if (!token) return null

    const payload = verifyToken(token)
    return payload
  } catch (error) {
    return null
  }
}

export function generateEmailToken(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}