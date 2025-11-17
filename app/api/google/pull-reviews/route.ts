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

    // Pull reviews from Google Business Profile
    try {
      const { getGoogleBusinessReviews } = await import('@/lib/google-oauth')

      if (!googleAccount.businessId) {
        return NextResponse.json(
          { error: 'Business location not configured. Please select a business location in settings.' },
          { status: 400 }
        )
      }

      // Fetch reviews from Google
      const reviews = await getGoogleBusinessReviews(accessToken, googleAccount.businessId)

      // Process and save reviews
      let newReviewsCount = 0
      let processedReviews = 0

      for (const googleReview of reviews) {
        // Check if review already exists
        const existingReview = await prisma.review.findFirst({
          where: {
            platform: 'google',
            platformReviewId: googleReview.reviewId || googleReview.name
          }
        })

        if (!existingReview) {
          const reviewText = googleReview.comment || ''
          const rating = googleReview.starRating || 0

          // Generate AI content for reviews with rating 3+ and text
          let aiBlurb = null
          let sentiment = null

          if (reviewText.trim().length > 0 && rating >= 3) {
            try {
              const { generateReviewBlurb, analyzeReviewSentiment } = await import('@/lib/openai')

              aiBlurb = await generateReviewBlurb(reviewText, rating)
              const sentimentResult = await analyzeReviewSentiment(reviewText, rating)
              sentiment = sentimentResult.sentiment
            } catch (aiError) {
              console.error('AI generation failed for review, saving without AI content:', aiError)
              // Continue without AI content
            }
          } else if (reviewText.trim().length > 0) {
            // Still analyze sentiment for lower-rated reviews
            try {
              const { analyzeReviewSentiment } = await import('@/lib/openai')
              const sentimentResult = await analyzeReviewSentiment(reviewText, rating)
              sentiment = sentimentResult.sentiment
            } catch (aiError) {
              console.error('Sentiment analysis failed:', aiError)
              // Fallback sentiment based on rating
              sentiment = rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral'
            }
          }

          // Transform and save new review with AI content
          await prisma.review.create({
            data: {
              userId: userId,
              platform: 'google',
              platformReviewId: googleReview.reviewId || googleReview.name,
              reviewerName: googleReview.reviewer?.displayName || 'Anonymous',
              reviewerAvatar: googleReview.reviewer?.profilePhotoUrl || null,
              rating: rating,
              reviewText: reviewText,
              reviewDate: googleReview.createTime ? new Date(googleReview.createTime) : new Date(),
              aiBlurb: aiBlurb,
              sentiment: sentiment,
              pulledAt: new Date()
            }
          })
          newReviewsCount++
        }
        processedReviews++
      }

      return NextResponse.json({
        success: true,
        message: `Successfully pulled ${processedReviews} reviews`,
        newReviews: newReviewsCount,
        totalReviews: processedReviews,
        businessName: googleAccount.businessName
      })
    } catch (reviewError) {
      console.error('Error pulling reviews:', reviewError)
      return NextResponse.json(
        { error: `Failed to pull reviews: ${reviewError instanceof Error ? reviewError.message : 'Unknown error'}` },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Google reviews pulling error:', error)
    return NextResponse.json(
      { error: 'Failed to pull Google reviews' },
      { status: 500 }
    )
  }
}