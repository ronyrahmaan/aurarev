'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  Active,
  Over
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import {
  CSS,
} from '@dnd-kit/utilities'
import { GripVertical, Settings, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DragDropItem {
  id: string
  type: 'metric' | 'chart' | 'feed' | 'custom'
  title: string
  size: 'small' | 'medium' | 'large' | 'wide'
  component: React.ReactNode
  removable?: boolean
}

interface DragDropGridProps {
  items: DragDropItem[]
  onItemsChange: (items: DragDropItem[]) => void
  editable?: boolean
  className?: string
  columns?: number
}

export function DragDropGrid({
  items,
  onItemsChange,
  editable = false,
  className,
  columns = 4
}: DragDropGridProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveId(active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over?.id)

      onItemsChange(arrayMove(items, oldIndex, newIndex))
    }

    setActiveId(null)
  }

  function handleRemoveItem(id: string) {
    onItemsChange(items.filter(item => item.id !== id))
  }

  const getSizeClasses = (size: DragDropItem['size']) => {
    const baseClasses = "bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg transition-all duration-200"

    switch (size) {
      case 'small':
        return `${baseClasses} col-span-1 row-span-1 min-h-[200px]`
      case 'medium':
        return `${baseClasses} col-span-2 row-span-1 min-h-[200px]`
      case 'large':
        return `${baseClasses} col-span-2 row-span-2 min-h-[400px]`
      case 'wide':
        return `${baseClasses} col-span-4 row-span-1 min-h-[200px]`
      default:
        return `${baseClasses} col-span-1 row-span-1 min-h-[200px]`
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {editable && (
        <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-white">Dashboard Edit Mode</h3>
            <p className="text-xs text-gray-400 mt-1">
              Drag and drop components to rearrange your dashboard
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onItemsChange(items)}
            className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
          >
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
          <div
            className={cn(
              "grid gap-6 auto-rows-auto",
              `grid-cols-${columns}`
            )}
            style={{
              gridAutoRows: 'minmax(200px, auto)'
            }}
          >
            {items.map((item) => (
              <SortableGridItem
                key={item.id}
                item={item}
                editable={editable}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="transform rotate-3 shadow-2xl">
              <OverlayItem
                item={items.find(item => item.id === activeId)!}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

interface SortableGridItemProps {
  item: DragDropItem
  editable: boolean
  onRemove: () => void
}

function SortableGridItem({ item, editable, onRemove }: SortableGridItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        getSizeClasses(item.size),
        isDragging && "opacity-50 z-50",
        editable && "hover:border-blue-500/50"
      )}
    >
      {editable && (
        <div className="flex items-center justify-between p-3 border-b border-white/[0.08]">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-white transition-colors"
          >
            <GripVertical className="h-4 w-4" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {item.removable && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onRemove}
              className="h-6 w-6 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              aria-label={`Remove ${item.title}`}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      <div className={cn("p-6", editable && "pt-3")}>
        {item.component}
      </div>
    </div>
  )
}

function OverlayItem({ item }: { item: DragDropItem }) {
  return (
    <div className={cn(getSizeClasses(item.size), "shadow-2xl")}>
      <div className="p-6 opacity-80">
        {item.component}
      </div>
    </div>
  )
}

function getSizeClasses(size: DragDropItem['size']) {
  const baseClasses = "bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-lg"

  switch (size) {
    case 'small':
      return `${baseClasses} w-full min-h-[200px]`
    case 'medium':
      return `${baseClasses} w-full min-h-[200px]`
    case 'large':
      return `${baseClasses} w-full min-h-[400px]`
    case 'wide':
      return `${baseClasses} w-full min-h-[200px]`
    default:
      return `${baseClasses} w-full min-h-[200px]`
  }
}

// Component library for drag-drop items
export const DragDropComponents = {
  MetricCard: ({ title, value, trend }: { title: string; value: string; trend: string }) => (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-green-400">{trend}</p>
      </div>
    </div>
  ),

  Chart: ({ title, type }: { title: string; type: string }) => (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <div className="h-32 bg-white/[0.02] rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm">{type} Chart</p>
      </div>
    </div>
  ),

  Feed: ({ title, items }: { title: string; items: number }) => (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <div className="space-y-2">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="h-8 bg-white/[0.02] rounded animate-pulse" />
        ))}
      </div>
    </div>
  ),

  Custom: ({ content }: { content: string }) => (
    <div className="flex items-center justify-center h-32 text-gray-400">
      <p className="text-sm">{content}</p>
    </div>
  )
}