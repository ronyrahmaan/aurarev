'use client'

import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change: string | number
  trend?: 'up' | 'down' | 'neutral'
  sparkline?: number[]
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange'
}

export function MetricCard({
  title,
  value,
  change,
  trend = 'neutral',
  sparkline = [],
  icon: Icon,
  color
}: MetricCardProps) {
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  }

  const trendClasses = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  }

  const maxSparkline = Math.max(...sparkline)
  const minSparkline = Math.min(...sparkline)
  const range = maxSparkline - minSparkline || 1

  return (
    <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.15] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2),0_0_60px_rgba(59,130,246,0.1)] transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className={cn('rounded-lg p-2 border', colorClasses[color])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-3xl font-bold text-white">{value}</p>

          {sparkline.length > 0 && (
            <div className="h-8 flex items-end gap-0.5">
              {sparkline.map((val, i) => {
                const height = ((val - minSparkline) / range) * 100
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex-1 rounded-t transition-all duration-300',
                      colorClasses[color].split(' ')[1]
                    )}
                    style={{
                      height: `${height}%`,
                      minHeight: '2px',
                      opacity: 0.3 + (i / sparkline.length) * 0.7
                    }}
                  />
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-medium', trendClasses[trend])}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {change}
            </span>
            <span className="text-xs text-gray-500">from last week</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}