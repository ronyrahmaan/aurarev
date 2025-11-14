'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  animation?: 'pulse' | 'wave' | 'none'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = 'text',
  animation = 'pulse',
  width,
  height
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-lg'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-white/[0.05] via-white/[0.08] to-white/[0.05]',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width,
        height: height || (variant === 'text' ? '1rem' : undefined)
      }}
      aria-label="Loading..."
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 p-3 bg-white/[0.02] rounded-t-lg">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-5" width={i === 0 ? '10%' : i === columns - 1 ? '15%' : '20%'} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-3 bg-white/[0.01] border-t border-white/[0.05]">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-4"
              width={colIndex === 0 ? '10%' : colIndex === columns - 1 ? '15%' : '20%'}
              animation="pulse"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Card Skeleton
export function CardSkeleton({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg p-6 space-y-4">
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  )
}

// Metric Card Skeleton
export function MetricCardSkeleton() {
  return (
    <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton variant="circular" className="h-8 w-8" />
      </div>
      <Skeleton className="h-8 w-32" />
      <div className="flex items-end gap-0.5 h-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1">
            <Skeleton
              variant="rectangular"
              className="w-full"
              height={`${Math.random() * 80 + 20}%`}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

// Review Card Skeleton
export function ReviewCardSkeleton() {
  return (
    <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg p-6 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" className="h-4 w-4" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
        <Skeleton className="h-8 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  )
}

// Chart Skeleton
export function ChartSkeleton({ height = 256 }: { height?: number }) {
  return (
    <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div
        className="flex items-end gap-1"
        style={{ height }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 flex items-end">
            <Skeleton
              variant="rectangular"
              className="w-full"
              height={`${Math.random() * 80 + 20}%`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Activity Feed Skeleton
export function ActivityFeedSkeleton() {
  return (
    <div className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg p-6 space-y-4">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton variant="circular" className="h-8 w-8 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}