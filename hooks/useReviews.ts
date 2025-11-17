'use client'

import { useState, useEffect } from 'react'

interface Review {
  id: string
  platform: string
  platformReviewId: string
  reviewerName: string
  reviewerAvatar?: string
  rating: number
  reviewText?: string
  reviewDate: Date
  aiBlurb?: string
  sentiment?: string
  pulledAt: Date
}

interface ReviewsResponse {
  reviews: Review[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: {
    platform?: string
    rating?: string
    sentiment?: string
    search?: string
  }
}

interface UseReviewsParams {
  page?: number
  limit?: number
  platform?: string
  rating?: string
  sentiment?: string
  search?: string
}

export function useReviews(params: UseReviewsParams = {}) {
  const [data, setData] = useState<ReviewsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = async () => {
    try {
      setLoading(true)

      // Build query parameters
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.set('page', params.page.toString())
      if (params.limit) queryParams.set('limit', params.limit.toString())
      if (params.platform) queryParams.set('platform', params.platform)
      if (params.rating) queryParams.set('rating', params.rating)
      if (params.sentiment) queryParams.set('sentiment', params.sentiment)
      if (params.search) queryParams.set('search', params.search)

      const response = await fetch(`/api/reviews?${queryParams.toString()}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.data)
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch reviews')
      }
    } catch (err) {
      console.error('Reviews fetch error:', err)
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [params.page, params.limit, params.platform, params.rating, params.sentiment, params.search])

  const refresh = () => {
    fetchReviews()
  }

  const createReview = async (reviewData: {
    reviewerName: string
    rating: number
    reviewText: string
    reviewDate?: string
  }) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewData)
      })

      if (response.ok) {
        await refresh() // Refresh the list
        return { success: true }
      } else {
        const errorData = await response.json()
        return { success: false, error: errorData.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to create review' }
    }
  }

  const generateBlurb = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/generate-blurb`, {
        method: 'POST',
        credentials: 'include'
      })

      if (response.ok) {
        await refresh() // Refresh to show new blurb
        return { success: true }
      } else {
        const errorData = await response.json()
        return { success: false, error: errorData.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to generate blurb' }
    }
  }

  return {
    data,
    loading,
    error,
    refresh,
    createReview,
    generateBlurb
  }
}