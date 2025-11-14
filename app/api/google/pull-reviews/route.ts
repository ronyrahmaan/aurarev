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

    // Create Google My Business client
    const mybusiness = createGoogleMyBusinessClient(accessToken)

    // Get business accounts
    const accountsResponse = await mybusiness.accounts.list()
    const accounts = accountsResponse.data.accounts || []

    if (accounts.length === 0) {
      return NextResponse.json(
        { error: 'No Google Business profiles found' },
        { status: 404 }
      )
    }

    let allReviews = []
    let businessesFound = 0

    // Process each business account
    for (const account of accounts) {
      try {
        // Get locations for this account
        const locationsResponse = await mybusiness.accounts.locations.list({
          parent: account.name
        })

        const locations = locationsResponse.data.locations || []
        businessesFound += locations.length

        // Process each location
        for (const location of locations) {
          try {
            // Get reviews for this location
            const reviewsResponse = await mybusiness.accounts.locations.reviews.list({
              parent: location.name
            })

            const reviews = reviewsResponse.data.reviews || []

            // Process each review
            for (const review of reviews) {
              const existingReview = await prisma.review.findUnique({
                where: {
                  platformReviewId: review.name || ''
                }
              })

              if (!existingReview) {
                // Create new review
                const newReview = await prisma.review.create({
                  data: {
                    userId: userId,
                    platformReviewId: review.name || '',
                    platform: 'google',
                    author: review.reviewer?.displayName || 'Anonymous',
                    rating: review.starRating || 0,
                    text: review.comment || '',
                    reviewDate: review.createTime ? new Date(review.createTime) : new Date(),
                    businessName: location.title || 'Unknown Business',
                    businessLocation: location.storefrontAddress ?
                      `${location.storefrontAddress.addressLines?.join(' ')}, ${location.storefrontAddress.locality}` :
                      'Unknown Location',
                    metadata: {
                      reviewerProfilePhotoUrl: review.reviewer?.profilePhotoUrl,
                      isAnonymous: review.reviewer?.isAnonymous,
                      locationName: location.name,
                      accountName: account.name
                    }
                  }
                })
                allReviews.push(newReview)
              }
            }
          } catch (locationError) {
            console.error(`Error processing location ${location.name}:`, locationError)
            // Continue with other locations
          }
        }
      } catch (accountError) {
        console.error(`Error processing account ${account.name}:`, accountError)
        // Continue with other accounts
      }
    }

    // Update last sync time
    await prisma.connectedAccount.update({
      where: { id: googleAccount.id },
      data: { lastSyncAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      message: `Successfully pulled reviews from ${businessesFound} business location(s)`,
      data: {
        newReviews: allReviews.length,
        businessesFound: businessesFound,
        reviews: allReviews
      }
    })

  } catch (error) {
    console.error('Google reviews pulling error:', error)
    return NextResponse.json(
      { error: 'Failed to pull Google reviews' },
      { status: 500 }
    )
  }
}