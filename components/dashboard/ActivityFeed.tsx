'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, MessageSquare, RefreshCw, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'review' | 'blurb' | 'response' | 'sync'
  title: string
  description: string
  timestamp: Date
  platform?: 'google' | 'yelp' | 'facebook'
  rating?: number
}

interface ActivityFeedProps {
  items?: ActivityItem[]
}

export function ActivityFeed({ items = [] }: ActivityFeedProps) {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'review':
        return Star
      case 'blurb':
        return MessageSquare
      case 'response':
        return CheckCircle
      case 'sync':
        return RefreshCw
    }
  }

  const getPlatformColor = (platform?: string) => {
    switch (platform) {
      case 'google':
        return 'text-blue-400 bg-blue-500/10'
      case 'yelp':
        return 'text-red-400 bg-red-500/10'
      case 'facebook':
        return 'text-blue-500 bg-blue-600/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
  }

  const mockData: ActivityItem[] = [
    {
      id: '1',
      type: 'review',
      title: 'New 5-star review',
      description: 'Sarah M. left a glowing review on Google',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platform: 'google',
      rating: 5
    },
    {
      id: '2',
      type: 'blurb',
      title: 'AI Blurb generated',
      description: 'Created promotional content from 12 recent reviews',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'response',
      title: 'Response sent',
      description: 'Replied to John D.\'s review on Yelp',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      platform: 'yelp'
    },
    {
      id: '4',
      type: 'sync',
      title: 'Reviews synced',
      description: 'Successfully pulled 23 new reviews',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    }
  ]

  const displayItems = items.length > 0 ? items : mockData

  return (
    <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayItems.map((item) => {
            const Icon = getIcon(item.type)
            return (
              <div
                key={item.id}
                className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div className={`p-2 rounded-lg ${getPlatformColor(item.platform)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    {item.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < item.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}