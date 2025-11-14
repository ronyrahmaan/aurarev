'use client'

import { useEffect, useState } from 'react'
import { QueryProvider } from '@/lib/query-provider'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CommandPalette } from '@/components/dashboard/CommandPalette'
import {
  Home,
  Star,
  Settings,
  LogOut,
  RefreshCw,
  ChevronDown,
  BarChart3,
  Grid3X3,
  Zap,
  Link2,
  Menu,
  X
} from 'lucide-react'

interface User {
  id: string
  email: string
  fullName: string
  businessName: string
  plan: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userStr))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) return null

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Widgets', href: '/dashboard/widgets', icon: Grid3X3 },
    { name: 'Automations', href: '/dashboard/automations', icon: Zap },
    { name: 'Integrations', href: '/dashboard/integrations', icon: Link2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[rgb(8,9,10)]">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-[rgb(15,16,17)] border-r border-white/[0.08] p-0">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.08]">
            <Star className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">AuraRev</span>
          </div>
          <nav className="flex-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 border-l-2 border-blue-500'
                      : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-[rgb(15,16,17)] lg:border-r lg:border-white/[0.08] lg:block">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.08]">
          <Star className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold text-white">AuraRev</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-600/10 text-blue-400 border-l-2 border-blue-500'
                    : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section at bottom */}
        <div className="border-t border-white/[0.08] p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600/20 text-blue-400">
                    {user.fullName?.[0] || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white">{user.businessName}</p>
                  <p className="text-xs text-gray-400">{user.plan} plan</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled>
                <span className="text-xs text-gray-500">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header bar */}
        <header className="sticky top-0 z-40 bg-[rgb(15,16,17)] border-b border-white/[0.08] backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:bg-white/[0.05]"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl lg:text-2xl font-semibold text-white">
                {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <CommandPalette />
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Pull Reviews
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
      </div>
    </div>
  )
}