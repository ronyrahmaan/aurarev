/**
 * Initiate Google OAuth connection
 * POST /api/google/connect
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-oauth'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user from session
    const session = await getSession(request)

    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Generate Google OAuth URL with userId in state
    const authUrl = getGoogleAuthUrl(session.userId)

    return NextResponse.json({
      success: true,
      authUrl: authUrl
    })

  } catch (error) {
    console.error('Google connect error:', error)
    return NextResponse.json(
      { error: 'Failed to generate Google authorization URL' },
      { status: 500 }
    )
  }
}