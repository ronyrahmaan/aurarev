'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, MessageSquare, Calendar } from 'lucide-react'

export default function DashboardPage() {
  // Mock data for now (will be replaced with real data)
  const stats = [
    {
      title: 'Total Reviews',
      value: '0',
      change: 'No reviews yet',
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Average Rating',
      value: '—',
      change: 'No ratings yet',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'AI Blurbs Generated',
      value: '0',
      change: 'Start pulling reviews',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Last Sync',
      value: 'Never',
      change: 'Connect Google account',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  const recentReviews = [] // Will be populated with real data

  return (
    <div className="space-y-6">
      {/* Stats Grid - Clone of HubSpot Dashboard style */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reviews Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {recentReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No reviews yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Google Account Status
              <Badge variant="outline" className="text-gray-500">
                Not Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Connect your Google Business account to start pulling reviews automatically.
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Connect Google Account →
            </button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Email Notifications
              <Badge className="bg-green-100 text-green-700">
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              You'll receive weekly summaries every Monday at 9:00 AM.
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Configure Settings →
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}