'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Star, ThumbsUp, ThumbsDown, MessageSquare, Share2,
  Flag, MoreVertical, Globe, Calendar, User
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ReviewCardProps {
  id: string
  platform: 'google' | 'yelp' | 'facebook'
  author: {
    name: string
    avatar?: string
  }
  rating: 1 | 2 | 3 | 4 | 5
  date: Date
  text: string
  response?: string
  blurb?: string
  sentiment: 'positive' | 'negative' | 'neutral'
  helpful?: number
  verified?: boolean
  onRespond?: () => void
  onGenerateBlurb?: () => void
  onFlag?: () => void
  onShare?: () => void
}

export function ReviewCard({
  id,
  platform,
  author,
  rating,
  date,
  text,
  response,
  blurb,
  sentiment,
  helpful = 0,
  verified = false,
  onRespond,
  onGenerateBlurb,
  onFlag,
  onShare
}: ReviewCardProps) {
  const platformConfig = {
    google: {
      icon: Globe,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      name: 'Google Business'
    },
    yelp: {
      icon: Star,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      name: 'Yelp'
    },
    facebook: {
      icon: Globe,
      color: 'text-blue-500 bg-blue-600/10 border-blue-600/20',
      name: 'Facebook'
    }
  }

  const sentimentConfig = {
    positive: 'text-green-400 bg-green-500/10 border-green-500/20',
    negative: 'text-red-400 bg-red-500/10 border-red-500/20',
    neutral: 'text-gray-400 bg-gray-500/10 border-gray-500/20'
  }

  const PlatformIcon = platformConfig[platform].icon

  return (
    <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              {author.avatar ? (
                <AvatarImage src={author.avatar} alt={author.name} />
              ) : (
                <AvatarFallback className="bg-white/[0.05] text-white">
                  {author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white">{author.name}</h3>
                {verified && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <PlatformIcon className="h-3 w-3" />
                  {platformConfig[platform].name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${sentimentConfig[sentiment]} border`}>
              {sentiment}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[rgb(23,24,26)] border-white/[0.08]">
                <DropdownMenuItem onClick={onShare} className="text-gray-300 hover:text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onFlag} className="text-gray-300 hover:text-white">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag as Important
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/[0.08]" />
                <DropdownMenuItem className="text-red-400 hover:text-red-300">
                  Hide Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">{rating}.0 rating</span>
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <p className="text-gray-200 leading-relaxed">{text}</p>
        </div>

        {/* Response Section */}
        {response && (
          <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                Business Response
              </Badge>
            </div>
            <p className="text-sm text-gray-300">{response}</p>
          </div>
        )}

        {/* AI Blurb Section */}
        {blurb && (
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                AI Generated Blurb
              </Badge>
            </div>
            <p className="text-sm text-gray-300 italic">{blurb}</p>
          </div>
        )}

        {/* Helpful Section */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            {helpful > 0 && (
              <span className="text-xs text-gray-500">
                {helpful} {helpful === 1 ? 'person' : 'people'} found this helpful
              </span>
            )}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-gray-400 hover:text-green-400 hover:bg-green-500/10"
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                Helpful
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!blurb && (
              <Button
                size="sm"
                variant="outline"
                onClick={onGenerateBlurb}
                className="bg-white/[0.02] border-white/[0.08] text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-500/30"
              >
                Generate Blurb
              </Button>
            )}
            {!response && (
              <Button
                size="sm"
                onClick={onRespond}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Respond
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}