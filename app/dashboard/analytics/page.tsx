'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { TrendingUp, Star, MessageSquare, Users } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up' as const,
      sparkline: [4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8],
      icon: Star,
      color: 'green' as const,
    },
    {
      title: 'Reviews/Week',
      value: '47',
      change: '+15%',
      trend: 'up' as const,
      sparkline: [35, 38, 40, 42, 44, 45, 47],
      icon: TrendingUp,
      color: 'blue' as const,
    },
    {
      title: 'Response Time',
      value: '2.3h',
      change: '-30min',
      trend: 'up' as const,
      sparkline: [3, 2.8, 2.6, 2.5, 2.4, 2.3, 2.3],
      icon: MessageSquare,
      color: 'purple' as const,
    },
    {
      title: 'Customer Satisfaction',
      value: '92%',
      change: '+3%',
      trend: 'up' as const,
      sparkline: [88, 89, 89, 90, 91, 91, 92],
      icon: Users,
      color: 'orange' as const,
    },
  ]

  // Mock chart data
  const reviewVolumeData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: Math.floor(Math.random() * 20) + 30
  }))

  const ratingDistribution = [
    { rating: 5, count: 234, percentage: 52 },
    { rating: 4, count: 156, percentage: 35 },
    { rating: 3, count: 45, percentage: 10 },
    { rating: 2, count: 12, percentage: 2 },
    { rating: 1, count: 3, percentage: 1 },
  ]

  const platformComparison = [
    { platform: 'Google', count: 234, color: 'bg-blue-500' },
    { platform: 'Yelp', count: 123, color: 'bg-red-500' },
    { platform: 'Facebook', count: 93, color: 'bg-blue-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Review Volume Chart */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
        <CardHeader>
          <CardTitle className="text-white">Review Volume Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-1">
            {reviewVolumeData.map((data, i) => {
              const height = (data.count / 50) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative flex-1 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t hover:from-blue-500/80 hover:to-blue-400/60 transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${data.date}: ${data.count} reviews`}
                    />
                  </div>
                  {i % 5 === 0 && (
                    <span className="text-xs text-gray-500 rotate-45 origin-left mt-1">
                      {data.date.split(' ')[0]}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardHeader>
            <CardTitle className="text-white">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm text-white font-medium">{item.rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="h-8 bg-white/[0.02] rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500/60 to-yellow-400/40 flex items-center justify-end pr-2"
                        style={{ width: `${item.percentage}%` }}
                      >
                        <span className="text-xs text-white font-medium">{item.count}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Comparison */}
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardHeader>
            <CardTitle className="text-white">Reviews by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformComparison.map((platform) => {
                const percentage = (platform.count / 450) * 100
                return (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white font-medium">{platform.platform}</span>
                      <span className="text-sm text-gray-400">{platform.count} reviews</span>
                    </div>
                    <div className="h-10 bg-white/[0.02] rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${platform.color} bg-opacity-60 flex items-center justify-center`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Total Reviews</span>
                <span className="text-2xl font-bold text-white">450</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Trends */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
        <CardHeader>
          <CardTitle className="text-white">Sentiment Analysis Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 relative">
            <div className="absolute inset-0 flex items-end">
              {Array.from({ length: 12 }, (_, i) => {
                const positive = Math.floor(Math.random() * 30) + 60
                const negative = Math.floor(Math.random() * 10) + 5
                const neutral = 100 - positive - negative

                return (
                  <div key={i} className="flex-1 flex flex-col gap-0.5">
                    <div
                      className="bg-green-500/60 hover:bg-green-500/80 transition-all cursor-pointer"
                      style={{ height: `${positive}%` }}
                      title={`Positive: ${positive}%`}
                    />
                    <div
                      className="bg-gray-500/60 hover:bg-gray-500/80 transition-all cursor-pointer"
                      style={{ height: `${neutral}%` }}
                      title={`Neutral: ${neutral}%`}
                    />
                    <div
                      className="bg-red-500/60 hover:bg-red-500/80 transition-all cursor-pointer"
                      style={{ height: `${negative}%` }}
                      title={`Negative: ${negative}%`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-green-500 rounded" />
              <span className="text-xs text-gray-400">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-gray-500 rounded" />
              <span className="text-xs text-gray-400">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-red-500 rounded" />
              <span className="text-xs text-gray-400">Negative</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}