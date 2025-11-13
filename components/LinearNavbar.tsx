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
  X,
  ChevronDown,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Building2,
  Heart,
  Store,
  Briefcase,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Server,
  ArrowRight
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

const solutionItems = [
  {
    title: 'For Restaurants',
    href: '/solutions/restaurants',
    description: 'Manage dining reviews',
    icon: Store,
  },
  {
    title: 'For Healthcare',
    href: '/solutions/healthcare',
    description: 'Patient feedback management',
    icon: Heart,
  },
  {
    title: 'For Retail',
    href: '/solutions/retail',
    description: 'E-commerce and store reviews',
    icon: Building2,
  },
  {
    title: 'For Services',
    href: '/solutions/services',
    description: 'Professional service reviews',
    icon: Briefcase,
  },
  {
    title: 'For Enterprise',
    href: '/solutions/enterprise',
    description: 'Large-scale deployments',
    icon: Users,
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
          ? 'bg-[#0A0B0D]/95 backdrop-blur-lg border-b border-[#2A2D35]/80'
          : 'bg-[#0A0B0D]/80 backdrop-blur-md border-b border-[#2A2D35]/50'
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#8B5CF6] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(94,106,210,0.3)] transition-all duration-200">
                <Star className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-[17px] font-semibold text-white">AuraRev</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex gap-1">
                {/* Product Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#A8A9B4] hover:text-white text-[14px] font-medium px-3 py-2 h-9 data-[state=open]:text-white">
                    <span className="flex items-center gap-1">
                      Product
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 bg-[#111318] border border-[#2A2D35] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      {productItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5E6AD2]/10">
                                    <Icon className="h-4 w-4 text-[#5E6AD2]" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-[#6E6F7A] leading-relaxed">
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

                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#A8A9B4] hover:text-white text-[14px] font-medium px-3 py-2 h-9 data-[state=open]:text-white">
                    <span className="flex items-center gap-1">
                      Solutions
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-2 md:w-[600px] md:grid-cols-2 lg:grid-cols-3 bg-[#111318] border border-[#2A2D35] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      {solutionItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5E6AD2]/10">
                                    <Icon className="h-4 w-4 text-[#5E6AD2]" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-[#6E6F7A] leading-relaxed">
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
                  <NavigationMenuTrigger className="bg-transparent text-[#A8A9B4] hover:text-white text-[14px] font-medium px-3 py-2 h-9 data-[state=open]:text-white">
                    <span className="flex items-center gap-1">
                      Resources
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 bg-[#111318] border border-[#2A2D35] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      {resourceItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5E6AD2]/10">
                                    <Icon className="h-4 w-4 text-[#5E6AD2]" />
                                  </div>
                                  <div>
                                    <div className="text-[13px] font-medium text-white mb-0.5">
                                      {item.title}
                                    </div>
                                    <p className="text-[12px] text-[#6E6F7A] leading-relaxed">
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
                    className="inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-[14px] font-medium text-[#A8A9B4] transition-colors hover:text-white"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                {/* Company Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#A8A9B4] hover:text-white text-[14px] font-medium px-3 py-2 h-9 data-[state=open]:text-white">
                    <span className="flex items-center gap-1">
                      Company
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2 bg-[#111318] border border-[#2A2D35] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="block select-none rounded-md px-3 py-2 text-[13px] leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50 text-[#A8A9B4] hover:text-white"
                          >
                            About
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className="block select-none rounded-md px-3 py-2 text-[13px] leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50 text-[#A8A9B4] hover:text-white"
                          >
                            Contact
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/careers"
                            className="block select-none rounded-md px-3 py-2 text-[13px] leading-none no-underline outline-none transition-colors hover:bg-[#2A2D35]/50 text-[#A8A9B4] hover:text-white"
                          >
                            Careers
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/docs"
              className="text-[14px] font-medium text-[#A8A9B4] hover:text-white transition-colors px-3 py-2"
            >
              Docs
            </Link>
            <Link
              href="/login"
              className="text-[14px] font-medium text-[#A8A9B4] hover:text-white transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#5E6AD2] to-[#8B5CF6] hover:from-[#5E6AD2]/90 hover:to-[#8B5CF6]/90 text-white border-0 px-4 py-1.5 h-[32px] text-[14px] font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_4px_14px_0_rgba(94,106,210,0.35)] hover:-translate-y-[1px]"
              >
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5 text-[#A8A9B4] hover:text-white transition-colors" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-[#111318] border-[#2A2D35]">
              <div className="mt-8 flex flex-col gap-4">
                {/* Mobile menu items */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-[#6E6F7A] uppercase tracking-wider">Product</p>
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[14px] text-[#A8A9B4] hover:text-white py-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-[#6E6F7A] uppercase tracking-wider">Solutions</p>
                    {solutionItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[14px] text-[#A8A9B4] hover:text-white py-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[12px] font-semibold text-[#6E6F7A] uppercase tracking-wider">Resources</p>
                    {resourceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[14px] text-[#A8A9B4] hover:text-white py-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/pricing"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[14px] text-[#A8A9B4] hover:text-white py-2 transition-colors"
                  >
                    Pricing
                  </Link>

                  <hr className="border-[#2A2D35]" />

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-[14px] text-[#A8A9B4] hover:text-white py-2 transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-[#5E6AD2] to-[#8B5CF6] hover:from-[#5E6AD2]/90 hover:to-[#8B5CF6]/90 text-white border-0 h-9 text-[14px] font-semibold rounded-lg transition-all"
                      >
                        Get Started
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