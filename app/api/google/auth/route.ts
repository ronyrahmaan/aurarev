/**
 * Google OAuth initiation endpoint
 * GET /api/google/auth?userId=123
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-oauth'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from session
    const session = await getSession(request)

    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.userId

    // Generate Google OAuth URL with userId in state
    const authUrl = getGoogleAuthUrl(userId)

    // Redirect user to Google OAuth consent screen
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Google auth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Google authentication' },
      { status: 500 }
    )
  }
}