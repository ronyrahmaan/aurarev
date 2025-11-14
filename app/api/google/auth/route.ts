/**
 * Google OAuth initiation endpoint
 * GET /api/google/auth?userId=123
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-oauth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Generate Google OAuth URL
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