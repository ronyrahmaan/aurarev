'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Star, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Product', href: '/product' },
  { name: 'Resources', href: '/resources' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Customers', href: '/customers' },
  { name: 'Now', href: '/now' },
  { name: 'Contact', href: '/contact' },
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
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-12">
              <div className="h-7 w-7 rounded bg-white flex items-center justify-center">
                <Star className="h-4 w-4 text-black" />
              </div>
              <span className="text-[16px] font-medium text-white">AuraRev</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-[15px] text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[15px] text-white/70 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-white hover:bg-gray-100 text-black border-0 px-5 py-2 h-[36px] text-[15px] font-medium rounded-md transition-all duration-200"
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
            <SheetContent side="right" className="w-full max-w-sm bg-black border-white/10">
              <div className="mt-8 flex flex-col gap-4">
                {/* Mobile menu items */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 text-[16px] text-white/70 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <hr className="my-4 border-white/10" />

                  <div className="space-y-1">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 text-[16px] text-white/70 hover:text-white transition-colors"
                    >
                      Log in
                    </Link>
                    <div className="px-3 py-2">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          size="sm"
                          className="w-full bg-white hover:bg-gray-100 text-black border-0 h-10 text-[15px] font-medium rounded-md transition-all"
                        >
                          Sign up
                        </Button>
                      </Link>
                    </div>
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