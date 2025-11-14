'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Filter, Download, Settings2
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  cell?: (value: any, row: T) => React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  selectable?: boolean
  onSelectionChange?: (selectedRows: T[]) => void
  onRowClick?: (row: T) => void
  emptyMessage?: string
  className?: string
  stickyHeader?: boolean
  showPagination?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  loading?: boolean
  striped?: boolean
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize: initialPageSize = 10,
  selectable = false,
  onSelectionChange,
  onRowClick,
  emptyMessage = 'No data available',
  className,
  stickyHeader = true,
  showPagination = true,
  showPageSize = true,
  pageSizeOptions = [10, 25, 50, 100],
  loading = false,
  striped = false
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    const sorted = [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key)
      const bValue = getNestedValue(b, sortConfig.key)

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sorted
  }, [data, sortConfig])

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize, showPagination])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  // Helper function to get nested object values
  function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj)
  }

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  // Handle row selection
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    } else {
      const newSelection = new Set(paginatedData.map((_, index) => index))
      setSelectedRows(newSelection)
      onSelectionChange?.(paginatedData)
    }
  }

  const handleSelectRow = (index: number, row: T) => {
    const newSelection = new Set(selectedRows)
    if (newSelection.has(index)) {
      newSelection.delete(index)
    } else {
      newSelection.add(index)
    }
    setSelectedRows(newSelection)

    const selected = paginatedData.filter((_, i) => newSelection.has(i))
    onSelectionChange?.(selected)
  }

  // Handle page size change
  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number(newSize))
    setCurrentPage(1)
  }

  // Pagination controls
  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null

    const isSorted = sortConfig?.key === column.key

    if (!isSorted) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />
    }

    return sortConfig.direction === 'asc'
      ? <ArrowUp className="h-3 w-3 ml-1 text-blue-400" />
      : <ArrowDown className="h-3 w-3 ml-1 text-blue-400" />
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-white/[0.02] rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
        <Table>
          <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-[rgb(23,24,26)]")}>
            <TableRow className="border-white/[0.08] hover:bg-transparent">
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-white/[0.3]"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  className={cn(
                    "text-gray-400",
                    column.className,
                    column.width && `w-[${column.width}]`,
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer select-none hover:text-white transition-colors'
                  )}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className={cn(
                    "flex items-center",
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    {column.header}
                    {getSortIcon(column)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-32 text-center text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const isSelected = selectedRows.has(index)
                return (
                  <TableRow
                    key={index}
                    className={cn(
                      "border-white/[0.08] transition-colors",
                      isSelected && "bg-white/[0.02]",
                      onRowClick && "cursor-pointer hover:bg-white/[0.02]",
                      striped && index % 2 === 0 && "bg-white/[0.01]"
                    )}
                    onClick={() => !selectable && onRowClick?.(row)}
                  >
                    {selectable && (
                      <TableCell
                        className="w-12"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(index, row)}
                          className="border-white/[0.3]"
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = getNestedValue(row, column.key as string)
                      const cellContent = column.cell ? column.cell(value, row) : value

                      return (
                        <TableCell
                          key={column.key as string}
                          className={cn(
                            "text-gray-300",
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right'
                          )}
                        >
                          {cellContent}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400">
              Showing {((currentPage - 1) * pageSize) + 1} to{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
              {sortedData.length} results
            </p>
            {selectedRows.size > 0 && (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {selectedRows.size} selected
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            {showPageSize && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Rows per page:</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="w-20 h-8 bg-white/[0.02] border-white/[0.08] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/[0.02] border-white/[0.08]"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/[0.02] border-white/[0.08]"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="px-3 text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/[0.02] border-white/[0.08]"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/[0.02] border-white/[0.08]"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}