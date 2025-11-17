'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, MessageSquare, Calendar, RefreshCw } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { useRouter } from 'next/navigation'
import { useDashboard } from '@/hooks/useDashboard'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const { data, loading, error, refresh } = useDashboard()

  // Loading state
  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-600 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-b from-red-500/[0.04] to-red-500/[0.02] border border-red-500/[0.08]">
          <CardContent className="p-6 text-center">
            <div className="text-red-400 mb-4">
              <Star className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-white font-semibold mb-2">Failed to load dashboard</h3>
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <Button onClick={refresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // No data available
  if (!data) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardContent className="p-6 text-center">
            <div className="text-gray-400 mb-4">
              <Star className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-white font-semibold mb-2">No data available</h3>
            <p className="text-gray-400 text-sm">Connect your accounts to start seeing data.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Build stats from real data
  const stats = [
    {
      title: 'Total Reviews',
      value: data.overview.totalReviews.toLocaleString(),
      change: data.overview.monthGrowth > 0 ? `+${data.overview.monthGrowth}%` : `${data.overview.monthGrowth}%`,
      trend: data.overview.monthGrowth > 0 ? 'up' as const : data.overview.monthGrowth < 0 ? 'down' as const : 'neutral' as const,
      sparkline: data.trends.monthly.slice(-7).map(m => m.count),
      icon: Star,
      color: 'blue' as const,
    },
    {
      title: 'Average Rating',
      value: data.overview.averageRating.toFixed(1),
      change: data.overview.averageRating >= 4.5 ? 'Excellent' : data.overview.averageRating >= 4.0 ? 'Good' : 'Needs work',
      trend: data.overview.averageRating >= 4.0 ? 'up' as const : 'down' as const,
      sparkline: data.trends.monthly.slice(-7).map(m => m.averageRating),
      icon: TrendingUp,
      color: 'green' as const,
    },
    {
      title: 'Positive Reviews',
      value: `${data.overview.positivePercentage}%`,
      change: `${data.sentiment.positive} total`,
      trend: data.overview.positivePercentage >= 80 ? 'up' as const : 'neutral' as const,
      sparkline: data.trends.monthly.slice(-7).map(m => m.positive),
      icon: MessageSquare,
      color: 'purple' as const,
    },
    {
      title: 'This Week',
      value: data.overview.thisWeekCount.toString(),
      change: `${data.overview.thisMonthCount} this month`,
      trend: 'neutral' as const,
      sparkline: [data.overview.thisWeekCount, data.overview.thisMonthCount],
      icon: Calendar,
      color: 'orange' as const,
    },
  ]

  const recentReviews = data.recentActivity || []

  return (
    <div className="space-y-6">
      {/* Stats Grid - Clone of HubSpot Dashboard style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Middle Section: Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <QuickActions
            onViewAnalytics={() => router.push('/dashboard/analytics')}
          />
        </div>
      </div>

      {/* Recent Reviews Section */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-white">Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {recentReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">No reviews yet</h3>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">
                Connect your Google Business account to start pulling reviews automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="flex items-start space-x-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-white truncate">
                        {review.reviewerName}
                      </p>
                      <div className="flex items-center ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.aiBlurb ? (
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                        {review.aiBlurb}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {review.reviewText}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </p>
                      {review.sentiment && (
                        <Badge variant="outline" className={`text-xs ${
                          review.sentiment === 'positive' ? 'text-green-400 border-green-600' :
                          review.sentiment === 'negative' ? 'text-red-400 border-red-600' :
                          'text-gray-400 border-gray-600'
                        }`}>
                          {review.sentiment}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              Google Account Status
              {data.connection.google.connected ? (
                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-400 border-gray-600">
                  Not Connected
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.connection.google.connected ? (
              <div>
                {data.connection.google.businessName && (
                  <p className="text-sm text-white font-medium mb-2">
                    {data.connection.google.businessName}
                  </p>
                )}
                <p className="text-sm text-gray-400 mb-4">
                  {data.connection.google.lastSync ? (
                    `Last synced: ${new Date(data.connection.google.lastSync).toLocaleDateString()}`
                  ) : (
                    'Ready to sync reviews'
                  )}
                </p>
                <button
                  onClick={() => router.push('/dashboard/integrations')}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Manage Connection →
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-400 mb-4">
                  Connect your Google Business account to start pulling reviews automatically.
                </p>
                <button
                  onClick={() => router.push('/dashboard/integrations')}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Connect Google Account →
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              Email Notifications
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              You'll receive weekly summaries every Monday at 9:00 AM.
            </p>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Configure Settings →
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}