'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Star, FileText, BarChart3, Zap, Link2, Users,
  Plus, Upload, RefreshCw, ArrowRight, Sparkles,
  MessageSquare, Settings, Search, Inbox
} from 'lucide-react'

interface EmptyStateProps {
  type?: 'reviews' | 'analytics' | 'widgets' | 'automations' | 'integrations' | 'team' | 'default'
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  illustration?: boolean
}

export function EmptyState({
  type = 'default',
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  illustration = true
}: EmptyStateProps) {
  const configs = {
    reviews: {
      icon: Star,
      title: 'No reviews yet',
      description: 'Connect your Google Business account to start pulling reviews automatically',
      action: { label: 'Connect Google Account', variant: 'default' as const },
      illustration: '⭐'
    },
    analytics: {
      icon: BarChart3,
      title: 'No data to display',
      description: 'Start collecting reviews to see analytics and insights',
      action: { label: 'Pull Reviews', variant: 'default' as const },
      illustration: '📊'
    },
    widgets: {
      icon: Sparkles,
      title: 'No widgets created',
      description: 'Create your first widget to display reviews on your website',
      action: { label: 'Create Widget', variant: 'default' as const },
      illustration: '✨'
    },
    automations: {
      icon: Zap,
      title: 'No automations set up',
      description: 'Create automated workflows to collect and manage reviews',
      action: { label: 'Create Workflow', variant: 'default' as const },
      illustration: '⚡'
    },
    integrations: {
      icon: Link2,
      title: 'No integrations connected',
      description: 'Connect your favorite tools to streamline your workflow',
      action: { label: 'Browse Integrations', variant: 'default' as const },
      illustration: '🔗'
    },
    team: {
      icon: Users,
      title: 'No team members yet',
      description: 'Invite team members to collaborate on review management',
      action: { label: 'Invite Team Member', variant: 'default' as const },
      illustration: '👥'
    },
    default: {
      icon: Inbox,
      title: 'No data available',
      description: 'Get started by adding some data',
      action: { label: 'Get Started', variant: 'default' as const },
      illustration: '📬'
    }
  }

  const config = configs[type]
  const Icon = icon || config.icon
  const displayTitle = title || config.title
  const displayDescription = description || config.description
  const displayAction = action || config.action

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      className
    )}>
      {/* Illustration/Icon Container */}
      <div className="relative mb-6">
        {illustration && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          </div>
        )}
        <div className="relative">
          <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-2">
            <Icon className="h-10 w-10 text-gray-400" />
          </div>
          {illustration && config.illustration && (
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
              {config.illustration}
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-sm space-y-2 mb-6">
        <h3 className="text-lg font-medium text-white">
          {displayTitle}
        </h3>
        <p className="text-sm text-gray-400">
          {displayDescription}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {displayAction && (
          <Button
            variant={displayAction.variant}
            onClick={displayAction.onClick}
            className={cn(
              displayAction.variant === 'default' &&
              "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            )}
          >
            {type === 'reviews' && <Link2 className="h-4 w-4 mr-2" />}
            {type === 'analytics' && <RefreshCw className="h-4 w-4 mr-2" />}
            {type === 'widgets' && <Plus className="h-4 w-4 mr-2" />}
            {type === 'automations' && <Zap className="h-4 w-4 mr-2" />}
            {type === 'integrations' && <Search className="h-4 w-4 mr-2" />}
            {type === 'team' && <Users className="h-4 w-4 mr-2" />}
            {displayAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            variant="ghost"
            onClick={secondaryAction.onClick}
            className="text-gray-400 hover:text-white hover:bg-white/[0.05]"
          >
            {secondaryAction.label}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Additional Help Text */}
      {type === 'reviews' && (
        <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 max-w-md">
          <p className="text-xs text-blue-400">
            <strong>Pro tip:</strong> Once connected, reviews will sync automatically every hour.
            You can also manually pull reviews anytime.
          </p>
        </div>
      )}

      {type === 'analytics' && (
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
          {['Reviews', 'Ratings', 'Insights'].map((item) => (
            <div
              key={item}
              className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.08] text-center"
            >
              <div className="h-8 w-8 mx-auto mb-2 bg-gray-800 rounded-lg animate-pulse" />
              <p className="text-xs text-gray-500">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Specific Empty State Components for common use cases
export function NoReviewsEmptyState({ onConnect }: { onConnect?: () => void }) {
  return (
    <EmptyState
      type="reviews"
      action={onConnect ? { label: 'Connect Google Account', onClick: onConnect } : undefined}
    />
  )
}

export function NoDataEmptyState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      type="analytics"
      action={onRefresh ? { label: 'Refresh Data', onClick: onRefresh } : undefined}
    />
  )
}

export function NoSearchResultsEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search.`}
      illustration={false}
    />
  )
}