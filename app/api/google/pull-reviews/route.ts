/**
 * Google Reviews Pulling Endpoint
 * POST /api/google/pull-reviews
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createGoogleMyBusinessClient, refreshGoogleToken } from '@/lib/google-oauth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user's Google account connection
    const googleAccount = await prisma.connectedAccount.findUnique({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'google'
        }
      }
    })

    if (!googleAccount) {
      return NextResponse.json(
        { error: 'Google account not connected' },
        { status: 404 }
      )
    }

    if (!googleAccount.isActive) {
      return NextResponse.json(
        { error: 'Google account connection is inactive' },
        { status: 403 }
      )
    }

    let accessToken = googleAccount.accessToken

    // Check if token needs refresh
    if (googleAccount.expiresAt && googleAccount.expiresAt < new Date()) {
      if (!googleAccount.refreshToken) {
        return NextResponse.json(
          { error: 'Google account needs re-authorization' },
          { status: 401 }
        )
      }

      try {
        const newTokens = await refreshGoogleToken(googleAccount.refreshToken)
        accessToken = newTokens.access_token!

        // Update tokens in database
        await prisma.connectedAccount.update({
          where: { id: googleAccount.id },
          data: {
            accessToken: newTokens.access_token!,
            expiresAt: newTokens.expiry_date ? new Date(newTokens.expiry_date) : null,
            refreshToken: newTokens.refresh_token || googleAccount.refreshToken
          }
        })
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to refresh Google token. Please reconnect your account.' },
          { status: 401 }
        )
      }
    }

    // Google My Business API v4 has been deprecated by Google
    // The reviews endpoint is no longer available through the googleapis library
    return NextResponse.json({
      error: 'Google My Business API v4 has been deprecated. Review pulling is currently unavailable. Please check Google Business Profile documentation for alternatives.',
      deprecationNotice: 'Google deprecated the My Business API v4 in 2021. Consider using the Google Business Profile API or manual export options.'
    }, { status: 503 })

  } catch (error) {
    console.error('Google reviews pulling error:', error)
    return NextResponse.json(
      { error: 'Failed to pull Google reviews' },
      { status: 500 }
    )
  }
}