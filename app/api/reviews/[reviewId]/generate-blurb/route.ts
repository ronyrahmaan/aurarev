/**
 * AI Blurb Generation Endpoint
 * POST /api/reviews/[reviewId]/generate-blurb
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { generateReviewBlurb, analyzeReviewSentiment } from '@/lib/openai'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params

    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      )
    }

    // Get review from database
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: {
            businessName: true
          }
        }
      }
    })

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    if (!review.reviewText || review.reviewText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Review text is empty - cannot generate blurb' },
        { status: 400 }
      )
    }

    // Skip if rating is too low for marketing blurb
    if (review.rating < 3) {
      return NextResponse.json(
        { error: 'Cannot generate marketing blurb for reviews with rating below 3 stars' },
        { status: 400 }
      )
    }

    try {
      // Generate AI blurb
      const businessType = inferBusinessType(review.user.businessName || '')
      const aiBlurb = await generateReviewBlurb(
        review.reviewText,
        review.rating,
        businessType
      )

      // Analyze sentiment for additional context
      const sentimentAnalysis = await analyzeReviewSentiment(
        review.reviewText,
        review.rating
      )

      // Update review in database with generated content
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          aiBlurb: aiBlurb,
          sentiment: sentimentAnalysis.sentiment
        }
      })

      return NextResponse.json({
        success: true,
        reviewId: reviewId,
        aiBlurb: aiBlurb,
        sentiment: sentimentAnalysis.sentiment,
        confidence: sentimentAnalysis.confidence,
        originalRating: review.rating,
        generatedAt: new Date().toISOString()
      })

    } catch (aiError) {
      console.error('AI generation error:', aiError)
      return NextResponse.json(
        { error: `Failed to generate AI content: ${aiError instanceof Error ? aiError.message : 'AI service unavailable'}` },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Generate blurb error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Infer business type from business name for better AI context
 */
function inferBusinessType(businessName: string): string | undefined {
  const name = businessName.toLowerCase()

  // Restaurant/Food related
  if (name.includes('restaurant') || name.includes('cafe') || name.includes('bistro') ||
      name.includes('pizza') || name.includes('kitchen') || name.includes('grill') ||
      name.includes('deli') || name.includes('bakery') || name.includes('bar')) {
    return 'restaurant'
  }

  // Beauty/Salon
  if (name.includes('salon') || name.includes('spa') || name.includes('beauty') ||
      name.includes('hair') || name.includes('nail') || name.includes('massage')) {
    return 'salon'
  }

  // Retail/Shop
  if (name.includes('shop') || name.includes('store') || name.includes('boutique') ||
      name.includes('market') || name.includes('retail')) {
    return 'retail store'
  }

  // Healthcare
  if (name.includes('clinic') || name.includes('dental') || name.includes('medical') ||
      name.includes('doctor') || name.includes('dentist') || name.includes('therapy')) {
    return 'healthcare practice'
  }

  // Fitness
  if (name.includes('gym') || name.includes('fitness') || name.includes('yoga') ||
      name.includes('pilates') || name.includes('training')) {
    return 'fitness center'
  }

  // Services
  if (name.includes('service') || name.includes('repair') || name.includes('cleaning') ||
      name.includes('auto') || name.includes('plumbing') || name.includes('electric')) {
    return 'service business'
  }

  return undefined
}