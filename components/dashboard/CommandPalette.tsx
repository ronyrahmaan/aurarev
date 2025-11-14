'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search, Home, Star, BarChart3, Grid3X3, Zap, Link2, Settings,
  FileText, Download, RefreshCw, MessageSquare, Users, CreditCard,
  ArrowRight, Command
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: any
  category: 'navigation' | 'action' | 'search' | 'help'
  action: () => void
  keywords?: string[]
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      icon: Home,
      category: 'navigation',
      action: () => {
        router.push('/dashboard')
        setOpen(false)
      },
      keywords: ['home', 'overview']
    },
    {
      id: 'nav-reviews',
      title: 'Go to Reviews',
      icon: Star,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/reviews')
        setOpen(false)
      },
      keywords: ['feedback', 'ratings']
    },
    {
      id: 'nav-analytics',
      title: 'Go to Analytics',
      icon: BarChart3,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/analytics')
        setOpen(false)
      },
      keywords: ['charts', 'insights', 'metrics']
    },
    {
      id: 'nav-widgets',
      title: 'Go to Widgets',
      icon: Grid3X3,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/widgets')
        setOpen(false)
      },
      keywords: ['embed', 'builder']
    },
    {
      id: 'nav-automations',
      title: 'Go to Automations',
      icon: Zap,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/automations')
        setOpen(false)
      },
      keywords: ['workflows', 'triggers']
    },
    {
      id: 'nav-integrations',
      title: 'Go to Integrations',
      icon: Link2,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/integrations')
        setOpen(false)
      },
      keywords: ['connect', 'api']
    },
    {
      id: 'nav-settings',
      title: 'Go to Settings',
      icon: Settings,
      category: 'navigation',
      action: () => {
        router.push('/dashboard/settings')
        setOpen(false)
      },
      keywords: ['preferences', 'account']
    },
    // Actions
    {
      id: 'action-pull-reviews',
      title: 'Pull Latest Reviews',
      description: 'Sync reviews from all connected platforms',
      icon: RefreshCw,
      category: 'action',
      action: () => {
        console.log('Pulling reviews...')
        setOpen(false)
      },
      keywords: ['sync', 'refresh', 'update']
    },
    {
      id: 'action-generate-blurb',
      title: 'Generate AI Blurb',
      description: 'Create marketing content from recent reviews',
      icon: MessageSquare,
      category: 'action',
      action: () => {
        console.log('Generating blurb...')
        setOpen(false)
      },
      keywords: ['ai', 'create', 'marketing']
    },
    {
      id: 'action-export-report',
      title: 'Export Weekly Report',
      description: 'Download PDF summary of this week',
      icon: Download,
      category: 'action',
      action: () => {
        console.log('Exporting report...')
        setOpen(false)
      },
      keywords: ['pdf', 'download', 'summary']
    },
    {
      id: 'action-invite-team',
      title: 'Invite Team Member',
      description: 'Add a new user to your account',
      icon: Users,
      category: 'action',
      action: () => {
        router.push('/dashboard/settings?tab=team')
        setOpen(false)
      },
      keywords: ['add', 'user', 'collaborate']
    }
  ]

  const filteredCommands = commands.filter(command => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords?.some(keyword => keyword.includes(searchLower))
    )
  })

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  const categoryLabels = {
    navigation: 'Navigation',
    action: 'Actions',
    search: 'Search',
    help: 'Help'
  }

  // Keyboard event handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Handle arrow key navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault()
        filteredCommands[selectedIndex].action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredCommands, selectedIndex])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  return (
    <>
      {/* Trigger hint in UI */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
      >
        <Search className="h-3 w-3" />
        <span>Search...</span>
        <div className="flex items-center gap-1 ml-auto">
          <kbd className="px-1.5 py-0.5 text-xs bg-white/[0.05] border border-white/[0.1] rounded">
            <Command className="h-3 w-3 inline" />
          </kbd>
          <kbd className="px-1.5 py-0.5 text-xs bg-white/[0.05] border border-white/[0.1] rounded">
            K
          </kbd>
        </div>
      </button>

      {/* Command Palette Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-[rgb(23,24,26)] border border-white/[0.08]">
          <div className="flex items-center gap-3 px-4 border-b border-white/[0.08]">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="border-0 bg-transparent focus:ring-0 text-white placeholder:text-gray-500 h-12"
            />
            <kbd className="px-2 py-1 text-xs text-gray-400 bg-white/[0.05] border border-white/[0.1] rounded">
              ESC
            </kbd>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {Object.keys(groupedCommands).length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No results found for "{search}"
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-white/[0.02]">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </div>
                  {items.map((command, index) => {
                    const Icon = command.icon
                    const globalIndex = filteredCommands.indexOf(command)
                    const isSelected = globalIndex === selectedIndex

                    return (
                      <button
                        key={command.id}
                        onClick={command.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isSelected
                            ? 'bg-white/[0.05] text-white'
                            : 'text-gray-300 hover:bg-white/[0.02] hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${
                          isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-white/[0.05] text-gray-400'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{command.title}</p>
                          {command.description && (
                            <p className="text-xs text-gray-500">{command.description}</p>
                          )}
                        </div>
                        {isSelected && (
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2 border-t border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white/[0.05] border border-white/[0.1] rounded">↑</kbd>
                <kbd className="px-1 py-0.5 bg-white/[0.05] border border-white/[0.1] rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white/[0.05] border border-white/[0.1] rounded">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white/[0.05] border border-white/[0.1] rounded">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}