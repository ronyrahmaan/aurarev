'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart3, TrendingUp, TrendingDown, Minus,
  Download, Maximize2, Info, RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface ChartCardProps {
  title: string
  description?: string
  value?: string | number
  change?: {
    value: number
    label?: string
  }
  trend?: 'up' | 'down' | 'neutral'
  timeRange?: {
    value: string
    onChange: (value: string) => void
    options: { label: string; value: string }[]
  }
  children: React.ReactNode
  className?: string
  loading?: boolean
  error?: string
  onRefresh?: () => void
  onExport?: () => void
  onExpand?: () => void
  info?: string
  badge?: {
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

export function ChartCard({
  title,
  description,
  value,
  change,
  trend,
  timeRange,
  children,
  className,
  loading = false,
  error,
  onRefresh,
  onExport,
  onExpand,
  info,
  badge
}: ChartCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (onRefresh) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [onRefresh])

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <Card className={cn(
      "bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200",
      className
    )}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white">{title}</CardTitle>
              {badge && (
                <Badge
                  variant={badge.variant}
                  className={cn(
                    badge.variant === 'default' && "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  )}
                >
                  {badge.label}
                </Badge>
              )}
              {info && (
                <button
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  title={info}
                >
                  <Info className="h-4 w-4" />
                </button>
              )}
            </div>
            {description && (
              <CardDescription className="text-gray-400">
                {description}
              </CardDescription>
            )}
          </div>

          <div className="flex items-center gap-2">
            {timeRange && (
              <Select value={timeRange.value} onValueChange={timeRange.onChange}>
                <SelectTrigger className="w-32 h-8 bg-white/[0.02] border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRange.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {onRefresh && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                onClick={onRefresh}
              >
                <RefreshCw className={cn(
                  "h-4 w-4",
                  isAnimating && "animate-spin"
                )} />
              </Button>
            )}
            {onExport && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                onClick={onExport}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onExpand && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                onClick={onExpand}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Metrics Summary */}
        {(value || change) && (
          <div className="flex items-baseline gap-3 mt-4">
            {value && (
              <span className="text-3xl font-bold text-white">{value}</span>
            )}
            {change && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change.value > 0 ? '+' : ''}{change.value}%
                </span>
                {change.label && (
                  <span className="text-sm text-gray-500">{change.label}</span>
                )}
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-gray-500">Loading chart data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-red-400" />
              </div>
              <p className="text-sm text-red-400">Failed to load chart</p>
              <p className="text-xs text-gray-500">{error}</p>
              {onRefresh && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onRefresh}
                  className="mt-2 bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Specialized chart card components
export function LineChartCard(props: Omit<ChartCardProps, 'children'> & {
  data: Array<{ date: string; value: number }>
}) {
  const { data, ...rest } = props
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1

  return (
    <ChartCard {...rest}>
      <div className="h-64 flex items-end gap-1">
        {data.map((point, i) => {
          const height = ((point.value - minValue) / range) * 100
          return (
            <div
              key={i}
              className="flex-1 relative group"
              style={{ height: '100%' }}
            >
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t hover:from-blue-500/80 hover:to-blue-400/60 transition-all cursor-pointer"
                style={{ height: `${height}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {point.value}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}

export function BarChartCard(props: Omit<ChartCardProps, 'children'> & {
  data: Array<{ label: string; value: number; color?: string }>
}) {
  const { data, ...rest } = props
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <ChartCard {...rest}>
      <div className="space-y-3">
        {data.map((item, i) => {
          const percentage = (item.value / maxValue) * 100
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm font-medium text-white">{item.value}</span>
              </div>
              <div className="h-8 bg-white/[0.02] rounded-lg overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    item.color || "bg-gradient-to-r from-blue-500/60 to-blue-400/40"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}

export function DonutChartCard(props: Omit<ChartCardProps, 'children'> & {
  data: Array<{ label: string; value: number; color: string }>
}) {
  const { data, ...rest } = props
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <ChartCard {...rest}>
      <div className="flex items-center justify-between">
        <div className="relative h-48 w-48">
          {/* SVG Donut Chart */}
          <svg className="transform -rotate-90 h-full w-full">
            {data.reduce((acc, item, index) => {
              const percentage = (item.value / total) * 100
              const strokeDasharray = `${percentage} ${100 - percentage}`
              const strokeDashoffset = acc

              return [...acc, (acc[acc.length - 1] || 0) + percentage]
            }, [] as number[]).map((offset, index) => {
              const item = data[index]
              const percentage = (item.value / total) * 100

              return (
                <circle
                  key={index}
                  cx="96"
                  cy="96"
                  r="72"
                  stroke={item.color}
                  strokeWidth="24"
                  fill="none"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={`-${offset - percentage}`}
                  className="transition-all duration-500"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item) => {
            const percentage = Math.round((item.value / total) * 100)
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  </div>
                  <div className="text-xs text-gray-500">{percentage}%</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ChartCard>
  )
}