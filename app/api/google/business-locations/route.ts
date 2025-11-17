/**
 * Get Google Business Locations
 * GET /api/google/business-locations
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'
import { getGoogleBusinessAccounts, getGoogleBusinessLocations, refreshGoogleToken } from '@/lib/google-oauth'

const prisma = new PrismaClient()

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

    try {
      // Get business accounts
      const accounts = await getGoogleBusinessAccounts(accessToken)

      if (!accounts.length) {
        return NextResponse.json({
          success: true,
          accounts: [],
          locations: [],
          message: 'No business accounts found'
        })
      }

      // Get locations for all accounts
      const allLocations = []

      for (const account of accounts) {
        try {
          const locations = await getGoogleBusinessLocations(accessToken, account.name!)

          // Add account info to each location
          const locationsWithAccount = locations.map(location => ({
            ...location,
            accountName: account.name,
            accountDisplayName: account.accountName || account.name
          }))

          allLocations.push(...locationsWithAccount)
        } catch (error) {
          console.error(`Error fetching locations for account ${account.name}:`, error)
          // Continue with other accounts even if one fails
        }
      }

      return NextResponse.json({
        success: true,
        accounts: accounts,
        locations: allLocations,
        currentSelection: {
          businessId: googleAccount.businessId,
          businessName: googleAccount.businessName
        }
      })

    } catch (error) {
      console.error('Error fetching business data:', error)
      return NextResponse.json(
        { error: `Failed to fetch business data: ${error instanceof Error ? error.message : 'Unknown error'}` },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Google business locations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Google business locations' },
      { status: 500 }
    )
  }
}