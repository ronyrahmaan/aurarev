/**
 * Reviews API
 * GET /api/reviews - Get paginated reviews for authenticated user
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getSession } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getSession(request)

    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = session.userId

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const platform = searchParams.get('platform') // filter by platform
    const rating = searchParams.get('rating') // filter by rating
    const sentiment = searchParams.get('sentiment') // filter by sentiment
    const search = searchParams.get('search') // search in review text

    // Build where clause
    const where: any = { userId }

    if (platform) {
      where.platform = platform
    }

    if (rating) {
      where.rating = parseInt(rating)
    }

    if (sentiment) {
      where.sentiment = sentiment
    }

    if (search) {
      where.reviewText = {
        contains: search,
        mode: 'insensitive'
      }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get total count for pagination
    const totalReviews = await prisma.review.count({ where })

    // Get reviews with pagination
    const reviews = await prisma.review.findMany({
      where,
      orderBy: [
        { reviewDate: 'desc' },
        { pulledAt: 'desc' }
      ],
      skip,
      take: limit,
      select: {
        id: true,
        platform: true,
        platformReviewId: true,
        reviewerName: true,
        reviewerAvatar: true,
        rating: true,
        reviewText: true,
        reviewDate: true,
        aiBlurb: true,
        sentiment: true,
        pulledAt: true
      }
    })

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalReviews / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page,
          limit,
          total: totalReviews,
          totalPages,
          hasNextPage,
          hasPrevPage
        },
        filters: {
          platform,
          rating,
          sentiment,
          search
        }
      }
    })

  } catch (error) {
    console.error('Reviews fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/reviews - Manually add a review (for testing)
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getSession(request)

    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const {
      platform = 'manual',
      reviewerName,
      rating,
      reviewText,
      reviewDate
    } = await request.json()

    if (!reviewerName || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'Reviewer name, rating, and review text are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Generate AI content if rating is 3+
    let aiBlurb = null
    let sentiment = null

    if (rating >= 3 && reviewText.trim().length > 0) {
      try {
        const { generateReviewBlurb, analyzeReviewSentiment } = await import('@/lib/openai')

        aiBlurb = await generateReviewBlurb(reviewText, rating)
        const sentimentResult = await analyzeReviewSentiment(reviewText, rating)
        sentiment = sentimentResult.sentiment
      } catch (aiError) {
        console.error('AI generation failed:', aiError)
        // Continue without AI content
        sentiment = rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral'
      }
    } else {
      sentiment = rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral'
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: session.userId,
        platform,
        platformReviewId: `manual-${Date.now()}`,
        reviewerName,
        rating,
        reviewText,
        reviewDate: reviewDate ? new Date(reviewDate) : new Date(),
        aiBlurb,
        sentiment,
        pulledAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      review
    })

  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}