/**
 * Google OAuth callback handler
 * GET /api/google/callback?code=...&state=userId
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleTokens, validateGoogleToken } from '@/lib/google-oauth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state') // This is the userId
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      console.error('Google OAuth error:', error)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/integrations?error=google_auth_failed`)
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/integrations?error=missing_parameters`)
    }

    const userId = state

    // Exchange code for tokens
    const tokens = await getGoogleTokens(code)

    if (!tokens.access_token) {
      throw new Error('No access token received')
    }

    // Validate token and get user info
    const userInfo = await validateGoogleToken(tokens.access_token)

    // Save or update Google account connection
    await prisma.connectedAccount.upsert({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'google'
        }
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined,
        expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
        accountEmail: userInfo.email || undefined,
        accountName: userInfo.name || undefined,
        isActive: true
        // Note: businessId and businessName should be set later via Configure button
      },
      create: {
        userId: userId,
        platform: 'google',
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined,
        expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
        accountEmail: userInfo.email || undefined,
        accountName: userInfo.name || undefined,
        isActive: true
        // Note: businessId and businessName will be set later via Configure button
      }
    })

    // Redirect back to integrations page with success
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/integrations?success=google_connected`)

  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/integrations?error=connection_failed`)
  }
}