'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, FileText, Download, BarChart3, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface QuickActionsProps {
  onPullReviews?: () => void
  onGenerateBlurb?: () => void
  onExportReport?: () => void
  onViewAnalytics?: () => void
}

export function QuickActions({
  onPullReviews,
  onGenerateBlurb,
  onExportReport,
  onViewAnalytics
}: QuickActionsProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const handleAction = async (action: string, callback?: () => void) => {
    setLoadingAction(action)
    if (callback) {
      await callback()
    } else {
      // Simulate action for demo
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    setLoadingAction(null)
  }

  const actions = [
    {
      id: 'pull',
      title: 'Pull Latest Reviews',
      description: 'Sync reviews from all platforms',
      icon: RefreshCw,
      color: 'blue',
      onClick: () => handleAction('pull', onPullReviews)
    },
    {
      id: 'blurb',
      title: 'Generate AI Blurb',
      description: 'Create marketing content from reviews',
      icon: FileText,
      color: 'purple',
      onClick: () => handleAction('blurb', onGenerateBlurb)
    },
    {
      id: 'export',
      title: 'Export Weekly Report',
      description: 'Download PDF summary',
      icon: Download,
      color: 'green',
      onClick: () => handleAction('export', onExportReport)
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Detailed insights & trends',
      icon: BarChart3,
      color: 'orange',
      onClick: () => handleAction('analytics', onViewAnalytics)
    }
  ]

  const colorClasses = {
    blue: 'hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    purple: 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]',
    green: 'hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
    orange: 'hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]'
  }

  const iconColorClasses = {
    blue: 'text-blue-400 bg-blue-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    green: 'text-green-400 bg-green-500/10',
    orange: 'text-orange-400 bg-orange-500/10'
  }

  return (
    <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            const isLoading = loadingAction === action.id
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={loadingAction !== null}
                className={`
                  group relative p-4 rounded-lg
                  bg-white/[0.02] border border-white/[0.08]
                  transition-all duration-200
                  hover:bg-white/[0.04]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${colorClasses[action.color as keyof typeof colorClasses]}
                `}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`p-3 rounded-lg ${iconColorClasses[action.color as keyof typeof iconColorClasses]}`}>
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}