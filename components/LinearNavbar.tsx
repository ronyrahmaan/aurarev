'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Star,
  Menu,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Server
} from 'lucide-react'
import { cn } from '@/lib/utils'

const productItems = [
  {
    title: 'How it Works',
    href: '/how-it-works',
    description: 'Step-by-step guide to review automation',
    icon: Zap,
  },
  {
    title: 'Features',
    href: '/features',
    description: 'All capabilities and tools',
    icon: TrendingUp,
  },
  {
    title: 'Integrations',
    href: '/integrations',
    description: 'Google, AI, Email connections',
    icon: Server,
  },
  {
    title: 'Security',
    href: '/security',
    description: 'Enterprise-grade security',
    icon: Shield,
  },
]


const resourceItems = [
  {
    title: 'Blog',
    href: '/blog',
    description: 'Industry insights and tips',
    icon: BookOpen,
  },
  {
    title: 'Documentation',
    href: '/docs',
    description: 'Technical guides and API',
    icon: FileText,
  },
  {
    title: 'Help Center',
    href: '/help',
    description: 'Support articles and FAQs',
    icon: HelpCircle,
  },
  {
    title: 'Community',
    href: '/community',
    description: 'Connect with other users',
    icon: MessageSquare,
  },
]

export default function LinearNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status, update } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const validateSession = async () => {
      if (session && status === 'authenticated') {
        try {
          const response = await fetch('/api/auth/session')
          const serverSession = await response.json()

          if (!serverSession || serverSession === null) {
            await update()
          }
        } catch (error) {
          console.error('Session validation error:', error)
        }
      }
    }

    validateSession()
  }, [session, status, update])

  // Don't show on dashboard or auth pages
  if (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup')) {
    return null
  }

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-200',
        isScrolled
          ? 'bg-[rgba(8,9,10,0.85)] backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 mr-12 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white">AuraRev</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex gap-1">
                {/* Product Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#9ca3af] hover:text-white text-[14px] font-normal px-4 py-2 h-9 data-[state=open]:text-white transition-colors duration-150 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:ml-1">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 bg-[#0f1011] border border-white/[0.08] rounded-xl shadow-2xl backdrop-blur-xl">
                      {productItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-150 hover:bg-white/[0.04] border border-transparent group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-white/[0.12] transition-all duration-150">
                                    <Icon className="h-4 w-4 text-[#9ca3af] group-hover:text-white transition-colors duration-150" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white/90 mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-[#6b7280] leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>


                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#9ca3af] hover:text-white text-[14px] font-normal px-4 py-2 h-9 data-[state=open]:text-white transition-colors duration-150 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:ml-1">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 bg-[#0f1011] border border-white/[0.08] rounded-xl shadow-2xl backdrop-blur-xl">
                      {resourceItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-150 hover:bg-white/[0.04] border border-transparent group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-white/[0.12] transition-all duration-150">
                                    <Icon className="h-4 w-4 text-[#9ca3af] group-hover:text-white transition-colors duration-150" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white/90 mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-[#6b7280] leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing Link */}
                <NavigationMenuItem>
                  <Link
                    href="/pricing"
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[14px] font-normal text-[#9ca3af] transition-colors duration-150 hover:text-white"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                {/* Customers Link */}
                <NavigationMenuItem>
                  <Link
                    href="/customers"
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[14px] font-normal text-[#9ca3af] transition-colors duration-150 hover:text-white"
                  >
                    Customers
                  </Link>
                </NavigationMenuItem>

                {/* Now Link */}
                <NavigationMenuItem>
                  <Link
                    href="/now"
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[14px] font-normal text-[#9ca3af] transition-colors duration-150 hover:text-white"
                  >
                    Now
                  </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-[14px] font-normal text-[#9ca3af] transition-colors duration-150 hover:text-white"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/docs"
              className="text-[14px] font-normal text-[#9ca3af] hover:text-white transition-colors duration-150"
            >
              Docs
            </Link>

            {status === "authenticated" && session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[14px] font-normal text-[#9ca3af] hover:text-white transition-colors duration-150"
                >
                  Dashboard
                </Link>
                <div className="text-[14px] font-normal text-white/70">
                  {session.user.name || session.user.email}
                </div>
                <Button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  variant="ghost"
                  size="sm"
                  className="text-[14px] font-normal text-[#9ca3af] hover:text-white transition-colors duration-150 px-0"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/app"
                  className="text-[14px] font-normal text-[#9ca3af] hover:text-white transition-colors duration-150"
                >
                  Open app
                </Link>
                <Link
                  href="/login"
                  className="text-[14px] font-normal text-[#9ca3af] hover:text-white transition-colors duration-150"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-white hover:bg-white/90 text-black border-0 px-4 py-1.5 h-[34px] text-[14px] font-medium rounded-lg transition-all duration-150"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5 text-white/60" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm linear-box border-gray-800">
              <div className="mt-8 flex flex-col gap-4">
                {/* Mobile menu items */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Product</p>
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>


                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Resources</p>
                    {resourceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/pricing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                  >
                    Pricing
                  </Link>

                  <Link
                    href="/customers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                  >
                    Customers
                  </Link>

                  <Link
                    href="/now"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                  >
                    Now
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                  >
                    Contact
                  </Link>

                  <hr className="border-white/10" />

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[14px] text-white/60 hover:text-white/90 py-2 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="sm"
                        className="w-full bg-white hover:bg-white/90 text-black border-0 h-9 text-[14px] font-medium rounded-md transition-all"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}