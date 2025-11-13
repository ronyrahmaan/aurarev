'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Star, ChevronDown } from 'lucide-react'

export default function LinearNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide on auth/dashboard pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return null
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${
      isScrolled ? 'backdrop-blur-md bg-[#08090a]/80 border-b border-gray-900' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-white flex items-center justify-center">
                <Star className="w-4 h-4 text-black" />
              </div>
              <span className="font-medium text-white">AuraRev</span>
            </Link>

            {/* Nav Items */}
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                Product <ChevronDown className="w-3 h-3" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                Resources <ChevronDown className="w-3 h-3" />
              </button>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link href="/customers" className="text-gray-400 hover:text-white transition-colors text-sm">
                Customers
              </Link>
              <Link href="/now" className="text-gray-400 hover:text-white transition-colors text-sm">
                Now
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hidden md:block text-gray-400 hover:text-white transition-colors text-sm">
              Docs
            </Link>
            <div className="hidden md:block h-4 w-px bg-gray-800"></div>
            <Link href="/app" className="hidden md:block text-gray-400 hover:text-white transition-colors text-sm">
              Open app
            </Link>
            <div className="hidden md:block h-4 w-px bg-gray-800"></div>
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
              Log in
            </Link>
            <Link href="/signup" className="bg-white text-black px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}