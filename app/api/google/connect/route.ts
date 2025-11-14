/**
 * Initiate Google OAuth connection
 * POST /api/google/connect
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-oauth'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Generate Google OAuth URL
    const authUrl = getGoogleAuthUrl(userId)

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