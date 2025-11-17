/**
 * Dashboard Analytics API
 * GET /api/dashboard/analytics - Get comprehensive dashboard analytics for authenticated user
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

    // Get date ranges for calculations
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const previousThirtyDays = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // Get all reviews for this user
    const allReviews = await prisma.review.findMany({
      where: { userId },
      orderBy: { reviewDate: 'desc' }
    })

    // Recent reviews (last 30 days)
    const recentReviews = allReviews.filter(
      review => review.reviewDate >= thirtyDaysAgo
    )

    // This week's reviews
    const thisWeekReviews = allReviews.filter(
      review => review.reviewDate >= sevenDaysAgo
    )

    // Previous period reviews for comparison
    const previousPeriodReviews = allReviews.filter(
      review => review.reviewDate >= previousThirtyDays && review.reviewDate < thirtyDaysAgo
    )

    // Calculate metrics
    const totalReviews = allReviews.length
    const averageRating = allReviews.length > 0
      ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10
      : 0

    const thisWeekCount = thisWeekReviews.length
    const thisMonthCount = recentReviews.length
    const previousMonthCount = previousPeriodReviews.length

    // Growth calculation
    const monthGrowth = previousMonthCount > 0
      ? Math.round(((thisMonthCount - previousMonthCount) / previousMonthCount) * 100)
      : thisMonthCount > 0 ? 100 : 0

    // Sentiment analysis
    const sentimentCounts = allReviews.reduce((acc, review) => {
      const sentiment = review.sentiment || (review.rating >= 4 ? 'positive' : review.rating <= 2 ? 'negative' : 'neutral')
      acc[sentiment] = (acc[sentiment] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const positivePercentage = totalReviews > 0
      ? Math.round((sentimentCounts.positive || 0) / totalReviews * 100)
      : 0

    // Rating distribution
    const ratingDistribution = allReviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    // Recent activity (last 10 reviews with blurbs)
    const recentActivity = allReviews
      .filter(review => review.aiBlurb)
      .slice(0, 10)
      .map(review => ({
        id: review.id,
        reviewerName: review.reviewerName || 'Anonymous',
        rating: review.rating,
        reviewText: review.reviewText ? review.reviewText.substring(0, 100) + '...' : '',
        aiBlurb: review.aiBlurb,
        reviewDate: review.reviewDate,
        sentiment: review.sentiment
      }))

    // Monthly trend data (last 12 months)
    const monthlyTrend = []
    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const monthReviews = allReviews.filter(
        review => review.reviewDate >= monthDate && review.reviewDate < nextMonthDate
      )

      const monthAvgRating = monthReviews.length > 0
        ? Math.round((monthReviews.reduce((sum, r) => sum + r.rating, 0) / monthReviews.length) * 10) / 10
        : 0

      monthlyTrend.push({
        month: monthDate.toISOString().substring(0, 7), // YYYY-MM format
        count: monthReviews.length,
        averageRating: monthAvgRating,
        positive: monthReviews.filter(r => (r.sentiment || (r.rating >= 4 ? 'positive' : 'neutral')) === 'positive').length
      })
    }

    // Check Google connection status
    const googleConnection = await prisma.connectedAccount.findUnique({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'google'
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalReviews,
          averageRating,
          thisWeekCount,
          thisMonthCount,
          monthGrowth,
          positivePercentage
        },
        sentiment: {
          positive: sentimentCounts.positive || 0,
          neutral: sentimentCounts.neutral || 0,
          negative: sentimentCounts.negative || 0,
          positivePercentage
        },
        ratings: {
          distribution: ratingDistribution,
          average: averageRating
        },
        trends: {
          monthly: monthlyTrend
        },
        recentActivity,
        connection: {
          google: {
            connected: !!googleConnection?.isActive,
            businessName: googleConnection?.businessName,
            lastSync: googleConnection ?
              allReviews.length > 0 ? allReviews[0].pulledAt : null
              : null
          }
        }
      }
    })

  } catch (error) {
    console.error('Dashboard analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard analytics' },
      { status: 500 }
    )
  }
}