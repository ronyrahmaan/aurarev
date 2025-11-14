'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, MessageSquare, Calendar } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  // Mock data for now (will be replaced with real data)
  const stats = [
    {
      title: 'Total Reviews',
      value: '1,234',
      change: '+12%',
      trend: 'up' as const,
      sparkline: [10, 12, 8, 14, 16, 18, 20],
      icon: Star,
      color: 'blue' as const,
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '-0.1',
      trend: 'down' as const,
      sparkline: [4.8, 4.9, 4.9, 4.8, 4.8, 4.7, 4.8],
      icon: TrendingUp,
      color: 'green' as const,
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: '+5%',
      trend: 'up' as const,
      sparkline: [85, 86, 84, 87, 88, 89, 89],
      icon: MessageSquare,
      color: 'purple' as const,
    },
    {
      title: 'AI Blurbs',
      value: '456',
      change: '23 this week',
      trend: 'neutral' as const,
      sparkline: [420, 425, 430, 438, 445, 450, 456],
      icon: Calendar,
      color: 'orange' as const,
    },
  ]

  const recentReviews = [] // Will be populated with real data

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
              {/* Reviews will be mapped here */}
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
              <Badge variant="outline" className="text-gray-400 border-gray-600">
                Not Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Connect your Google Business account to start pulling reviews automatically.
            </p>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Connect Google Account →
            </button>
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