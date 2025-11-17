'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DataTable, Column } from '@/components/dashboard/DataTable'
// import { VirtualizedDataTable } from '@/components/dashboard/VirtualizedDataTable'
import { ReviewCard } from '@/components/dashboard/ReviewCard'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { useQuery } from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Star, Search, Filter, Download, RefreshCw, MessageSquare, Eye } from 'lucide-react'

interface Review {
  id: string
  platform: 'google' | 'yelp' | 'facebook'
  author: string
  rating: number
  date: string
  text: string
  status: 'pending' | 'responded' | 'flagged'
  hasBlurb: boolean
  sentiment?: 'positive' | 'negative' | 'neutral'
}

async function fetchReviews(): Promise<Review[]> {
  try {
    const response = await fetch('/api/reviews', {
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error('Failed to fetch reviews')
    }
    const result = await response.json()
    const reviews = result.data?.reviews || []

    // Transform the database format to the component format
    return reviews.map((review: any) => ({
      id: review.id,
      platform: review.platform,
      author: review.reviewerName || 'Anonymous',
      rating: review.rating,
      date: new Date(review.reviewDate).toISOString().split('T')[0],
      text: review.reviewText || '',
      status: review.aiBlurb ? 'responded' : 'pending',
      hasBlurb: !!review.aiBlurb,
      sentiment: review.sentiment
    }))
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [platformFilter, setPlatformFilter] = useState<string>('all')
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [selectedRows, setSelectedRows] = useState<Review[]>([])

  // Fetch reviews with React Query
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
  })

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    []
  )

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = searchQuery === '' ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.text.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPlatform = platformFilter === 'all' || review.platform === platformFilter
      const matchesRating = ratingFilter === 'all' || review.rating === Number(ratingFilter)

      return matchesSearch && matchesPlatform && matchesRating
    })
  }, [reviews, searchQuery, platformFilter, ratingFilter])

  // Table columns definition
  const columns: Column<Review>[] = [
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      cell: (value) => new Date(value).toLocaleDateString(),
      width: '120px'
    },
    {
      key: 'platform',
      header: 'Platform',
      sortable: true,
      cell: (value: Review['platform']) => {
        const colors = {
          google: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          yelp: 'bg-red-500/20 text-red-400 border-red-500/30',
          facebook: 'bg-blue-600/20 text-blue-500 border-blue-600/30'
        }
        return <Badge className={colors[value]}>{value}</Badge>
      },
      width: '120px'
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      cell: (value: number) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
              }`}
            />
          ))}
        </div>
      ),
      width: '100px'
    },
    {
      key: 'author',
      header: 'Customer',
      sortable: true,
      cell: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'text',
      header: 'Review',
      cell: (value: string) => (
        <p className="truncate max-w-md" title={value}>{value}</p>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      cell: (value: Review['status']) => {
        const colors = {
          pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          responded: 'bg-green-500/20 text-green-400 border-green-500/30',
          flagged: 'bg-red-500/20 text-red-400 border-red-500/30'
        }
        return <Badge className={colors[value]}>{value}</Badge>
      },
      width: '120px'
    },
    {
      key: 'id',
      header: 'Actions',
      align: 'right',
      cell: (_, row: Review) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedReview(row)}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
            aria-label={`View review by ${row.author}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {!row.hasBlurb && (
            <Button
              size="sm"
              variant="ghost"
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              aria-label="Generate AI blurb"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
      width: '150px'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search reviews..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="pl-10 bg-white/[0.02] border-white/[0.08] text-white placeholder:text-gray-500"
              aria-label="Search reviews"
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[150px] bg-white/[0.02] border-white/[0.08] text-white" aria-label="Filter by platform">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="yelp">Yelp</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[150px] bg-white/[0.02] border-white/[0.08] text-white" aria-label="Filter by rating">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
          >
            <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
            More Filters
          </Button>
          <Button
            size="sm"
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
            Pull Reviews
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="flex items-center justify-between p-4">
            <span className="text-sm text-white">
              {selectedRows.length} review{selectedRows.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]">
                <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                Generate Blurbs
              </Button>
              <Button size="sm" variant="outline" className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]">
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Table */}
      {filteredReviews.length === 0 && !isLoading ? (
        <EmptyState
          type="reviews"
          title="No reviews found"
          description={searchQuery ? `No reviews matching "${searchQuery}"` : "Connect your accounts to start pulling reviews"}
          action={{
            label: searchQuery ? 'Clear Search' : 'Connect Accounts',
            onClick: () => searchQuery ? setSearchQuery('') : undefined
          }}
        />
      ) : (
        <DataTable
          data={filteredReviews}
          columns={columns}
          selectable
          onSelectionChange={setSelectedRows}
          loading={isLoading}
          pageSize={25}
          pageSizeOptions={[25, 50, 100]}
          emptyMessage="No reviews found"
          striped
        />
      )}

      {/* Review Detail Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl bg-[rgb(23,24,26)] border-white/[0.08]">
          <DialogHeader>
            <DialogTitle className="text-white">Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <ReviewCard
              id={selectedReview.id}
              platform={selectedReview.platform}
              author={{ name: selectedReview.author }}
              rating={selectedReview.rating as 1 | 2 | 3 | 4 | 5}
              date={new Date(selectedReview.date)}
              text={selectedReview.text}
              sentiment={selectedReview.sentiment || 'neutral'}
              onRespond={() => console.log('Respond to review')}
              onGenerateBlurb={() => console.log('Generate blurb')}
              onFlag={() => console.log('Flag review')}
              onShare={() => console.log('Share review')}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}