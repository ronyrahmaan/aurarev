'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-black/60 backdrop-blur-lg border-b border-white/5'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-10">
              <div className="h-6 w-6 rounded bg-white flex items-center justify-center">
                <Star className="h-3.5 w-3.5 text-black" />
              </div>
              <span className="text-[15px] font-medium text-white">AuraRev</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex gap-1">
                {/* Product Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white/60 hover:text-white/90 text-[14px] font-normal px-3 py-2 h-8 data-[state=open]:text-white [&>svg]:hidden">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 bg-[#1A1B1E] border border-white/10 rounded-lg shadow-xl">
                      {productItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                                    <Icon className="h-4 w-4 text-white/70" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white/90 mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
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
                  <NavigationMenuTrigger className="bg-transparent text-white/60 hover:text-white/90 text-[14px] font-normal px-3 py-2 h-8 data-[state=open]:text-white [&>svg]:hidden">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 bg-[#1A1B1E] border border-white/10 rounded-lg shadow-xl">
                      {resourceItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                                    <Icon className="h-4 w-4 text-white/70" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white/90 mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
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
                    className="inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-2 text-[14px] font-normal text-white/60 transition-colors hover:text-white/90"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                {/* Customers Link */}
                <NavigationMenuItem>
                  <Link
                    href="/customers"
                    className="inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-2 text-[14px] font-normal text-white/60 transition-colors hover:text-white/90"
                  >
                    Customers
                  </Link>
                </NavigationMenuItem>

                {/* Now Link */}
                <NavigationMenuItem>
                  <Link
                    href="/now"
                    className="inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-2 text-[14px] font-normal text-white/60 transition-colors hover:text-white/90"
                  >
                    Now
                  </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="inline-flex h-8 w-max items-center justify-center rounded-md px-3 py-2 text-[14px] font-normal text-white/60 transition-colors hover:text-white/90"
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
              className="text-[14px] font-normal text-white/60 hover:text-white/90 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/app"
              className="text-[14px] font-normal text-white/60 hover:text-white/90 transition-colors"
            >
              Open app
            </Link>
            <Link
              href="/login"
              className="text-[14px] font-normal text-white/60 hover:text-white/90 transition-colors"
            >
              Log in
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-white hover:bg-gray-200 text-black border-0 px-4 py-1.5 h-[32px] text-[14px] font-medium rounded-md transition-all duration-150"
              >
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5 text-white/60" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-[#1A1B1E] border-white/10">
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