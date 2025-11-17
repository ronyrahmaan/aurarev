'use client'

import { useState, useEffect } from 'react'

interface DashboardData {
  overview: {
    totalReviews: number
    averageRating: number
    thisWeekCount: number
    thisMonthCount: number
    monthGrowth: number
    positivePercentage: number
  }
  sentiment: {
    positive: number
    neutral: number
    negative: number
    positivePercentage: number
  }
  ratings: {
    distribution: Record<number, number>
    average: number
  }
  trends: {
    monthly: Array<{
      month: string
      count: number
      averageRating: number
      positive: number
    }>
  }
  recentActivity: Array<{
    id: string
    reviewerName: string
    rating: number
    reviewText: string
    aiBlurb?: string
    reviewDate: Date
    sentiment?: string
  }>
  connection: {
    google: {
      connected: boolean
      businessName?: string
      lastSync?: Date | null
    }
  }
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/analytics', {
        credentials: 'include'
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.data)
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const refresh = () => {
    fetchDashboardData()
  }

  return {
    data,
    loading,
    error,
    refresh
  }
}