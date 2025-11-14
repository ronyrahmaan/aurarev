'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Home, Star, BarChart3, Grid3X3, Zap, Link2, Settings,
  ChevronDown, ChevronLeft, ChevronRight, LogOut, User,
  CreditCard, Bell, HelpCircle, Command
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

interface DashboardSidebarProps {
  user?: {
    email: string
    fullName?: string
    businessName: string
    plan: string
    avatar?: string
  }
  onLogout?: () => void
}

export function DashboardSidebar({ user, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star, badge: '12' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Widgets', href: '/dashboard/widgets', icon: Grid3X3 },
    { name: 'Automations', href: '/dashboard/automations', icon: Zap },
    { name: 'Integrations', href: '/dashboard/integrations', icon: Link2, badge: '3' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const secondaryNavigation = [
    { name: 'Help & Support', icon: HelpCircle, action: () => {} },
    { name: 'Keyboard Shortcuts', icon: Command, action: () => {} },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-[rgb(15,16,17)] border-r border-white/[0.08] transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className={cn(
        "flex items-center gap-2 px-4 py-4 border-b border-white/[0.08]",
        isCollapsed && "justify-center"
      )}>
        <Star className="h-8 w-8 text-blue-500 shrink-0" aria-hidden="true" />
        {!isCollapsed && (
          <span className="text-xl font-bold text-white">AuraRev</span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Primary navigation">
        <TooltipProvider delayDuration={0}>
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            const linkContent = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 border-l-2 border-blue-500'
                    : 'text-gray-400 hover:bg-white/[0.05] hover:text-white',
                  isCollapsed && "justify-center px-2"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )

            if (isCollapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.name}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </TooltipProvider>

        {/* Secondary Navigation */}
        {!isCollapsed && (
          <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/[0.05] hover:text-white transition-colors text-left"
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        )}
      </nav>

      {/* User Section */}
      {user && (
        <div className="border-t border-white/[0.08] p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/[0.05] transition-colors",
                  isCollapsed && "justify-center"
                )}
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-blue-600/20 text-blue-400">
                    {user.fullName?.[0] || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-white line-clamp-1">
                        {user.businessName}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {user.plan} plan
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isCollapsed ? "start" : "end"}
              side={isCollapsed ? "right" : "top"}
              className="w-56 bg-[rgb(23,24,26)] border-white/[0.08]"
            >
              <DropdownMenuItem className="text-gray-300">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing & Plans
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.08]" />
              <DropdownMenuItem className="text-xs text-gray-500" disabled>
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.08]" />
              <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Collapse Toggle Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-9 h-6 w-6 rounded-full bg-[rgb(23,24,26)] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05]",
          "shadow-lg"
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}