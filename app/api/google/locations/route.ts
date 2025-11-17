/**
 * Google Business Locations Endpoint
 * GET /api/google/locations - Get available business locations for connected account
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getGoogleBusinessAccounts, getGoogleBusinessLocations, refreshGoogleToken } from '@/lib/google-oauth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

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

    // Get business accounts and locations
    try {
      const accounts = await getGoogleBusinessAccounts(accessToken)
      const allLocations = []

      for (const account of accounts) {
        try {
          const locations = await getGoogleBusinessLocations(accessToken, account.name!)
          for (const location of locations) {
            allLocations.push({
              accountName: account.name,
              accountDisplayName: account.accountName,
              locationName: location.name,
              locationDisplayName: location.title,
              address: location.storefrontAddress,
              phoneNumber: location.primaryPhone,
              website: location.websiteUri
            })
          }
        } catch (locationError) {
          console.error(`Error fetching locations for account ${account.name}:`, locationError)
          // Continue with other accounts
        }
      }

      return NextResponse.json({
        success: true,
        locations: allLocations,
        currentLocation: googleAccount.businessId
      })
    } catch (accountError) {
      console.error('Error fetching Google Business accounts:', accountError)
      return NextResponse.json(
        { error: 'Failed to fetch Google Business locations' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Google locations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Google Business locations' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/google/locations - Set selected business location
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, locationName, locationDisplayName } = await request.json()

    if (!userId || !locationName) {
      return NextResponse.json(
        { error: 'User ID and location name are required' },
        { status: 400 }
      )
    }

    // Update the connected account with selected business location
    const updatedAccount = await prisma.connectedAccount.update({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'google'
        }
      },
      data: {
        businessId: locationName,
        businessName: locationDisplayName
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Business location updated successfully',
      businessId: updatedAccount.businessId,
      businessName: updatedAccount.businessName
    })

  } catch (error) {
    console.error('Update business location error:', error)
    return NextResponse.json(
      { error: 'Failed to update business location' },
      { status: 500 }
    )
  }
}