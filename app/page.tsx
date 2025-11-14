'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GlowBox } from '@/components/ui/glow-box'
import {
  ArrowRight,
  Star,
  RefreshCw,
  Sparkles,
  Mail,
  TrendingUp,
  Calendar,
  Smile,
  Check,
  Zap,
  Shield,
  Users,
  Building2,
  ChevronRight,
  PlayCircle,
  Quote,
  ArrowUpRight,
  Globe,
  Cpu,
  MessageSquare,
  BarChart3,
  Clock,
  Target,
  Layers,
  FileText,
  Search,
  Filter,
  Download,
  Send,
  PenTool,
  Copy,
  Palette,
  Timer,
  Bot,
  LineChart,
  Activity,
  ThumbsUp,
  AlertCircle,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Customer logos
const customerLogos = [
  { name: 'Stripe', logo: 'STRIPE' },
  { name: 'Square', logo: 'SQUARE' },
  { name: 'Shopify', logo: 'SHOPIFY' },
  { name: 'Google', logo: 'GOOGLE' },
  { name: 'Yelp', logo: 'YELP' },
  { name: 'Facebook', logo: 'META' },
]

// Platform integrations
const platforms = [
  { name: 'Google My Business', icon: Globe },
  { name: 'Yelp', icon: Star },
  { name: 'Facebook', icon: ThumbsUp },
  { name: 'Stripe', icon: Zap },
  { name: 'Square', icon: Building2 },
  { name: 'Shopify', icon: Shield },
  { name: 'WordPress', icon: Globe },
  { name: 'WooCommerce', icon: Target },
]

// Testimonials
const testimonials = [
  {
    quote: "AuraRev transformed how we manage customer feedback. We've seen a 40% increase in positive reviews since implementing it.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStartup Inc",
    rating: 5,
  },
  {
    quote: "The AI-generated blurbs save us hours every week. It's like having a copywriter on demand for all our marketing materials.",
    author: "Michael Rodriguez",
    role: "Owner",
    company: "Local Restaurant Group",
    rating: 5,
  },
  {
    quote: "Finally, a review management tool that actually works. The automation features are game-changing for our multi-location business.",
    author: "Emily Watson",
    role: "Operations Manager",
    company: "Retail Chain Co",
    rating: 5,
  },
]

// Stats
const stats = [
  { value: '10M+', label: 'Reviews Processed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '2 hrs', label: 'Saved Weekly' },
  { value: '4.9/5', label: 'Customer Rating' },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('collection')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>

      {/* Hero Section - Clean dark background like Linear */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#08090a] pt-20 px-6">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />

        <div className="relative mx-auto max-w-7xl py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 text-center ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            {/* Main headline */}
            <h1 className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] mb-6 leading-[1.1]",
              "animate-fade-in-up",
              isVisible && "opacity-100"
            )}>
              <span className="text-white/95">AuraRev is a purpose-built tool for</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                managing and monetizing reviews
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#9ca3af] mb-8 animate-fade-in-up animation-delay-200 leading-relaxed">
              Automatically collect reviews, generate AI trust blurbs, and display social proof that converts
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-black border-0 px-7 py-3 h-12 text-[15px] font-medium rounded-lg transition-all duration-150"
              >
                See AuraRev in action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-7 py-3 h-12 text-[15px] font-medium bg-transparent border border-white/[0.12] text-white hover:bg-white/[0.04] hover:border-white/[0.16] rounded-lg transition-all duration-150"
              >
                Start free trial
              </Button>
            </div>

            {/* Trust text */}
            <p className="mt-6 text-[13px] text-[#6b7280] animate-fade-in-up animation-delay-400">
              No credit card required • Setup in 2 minutes • Cancel anytime
            </p>
            </div>
          </div>

          {/* Dashboard preview mockup */}
          <div className="mt-16 relative animate-fade-in-up animation-delay-500">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-1 backdrop-blur-sm ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)]">
                <div className="rounded-xl bg-[#0f1011] p-4">
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  {/* Mock dashboard content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-900/50 rounded-lg p-4 flex items-start gap-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-gray-800/50 rounded w-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                        <div className="text-3xl font-bold text-blue-400 mb-1">4.9</div>
                        <div className="text-xs text-gray-500">Average Rating</div>
                      </div>
                      <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                        <div className="text-3xl font-bold text-green-400 mb-1">+47%</div>
                        <div className="text-xs text-gray-500">5-Star Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Subtle background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-8 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <p className="text-center text-[13px] text-[#6b7280] mb-8 font-medium uppercase tracking-wider">
              Trusted by industry leaders
            </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {customerLogos.map((customer, index) => (
              <div
                key={customer.name}
                className={cn(
                  "flex items-center justify-center h-12",
                  "opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer",
                  "grayscale hover:grayscale-0",
                  "animate-fade-in",
                  `animation-delay-${(index + 1) * 100}`
                )}
              >
                <div className="text-base font-semibold text-[#6b7280] hover:text-white/80 transition-colors duration-200">
                  {customer.logo}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Made for Modern Businesses - Primary dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-3 tracking-[-0.02em]">
                Made for modern businesses
              </h2>
            <p className="text-base text-[#9ca3af]">
              Purpose-built tools to transform reviews into revenue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Purpose-built for reviews */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-8 hover:border-white/[0.12] transition-all duration-200">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">
                  Purpose-built for reviews
                </h3>
                <p className="text-[14px] text-[#9ca3af] leading-relaxed">
                  Unified dashboard for all review platforms with intelligent filtering and real-time sync
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Card 2: Designed to boost reputation */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-8 hover:border-white/[0.12] transition-all duration-200">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">
                  Designed to boost reputation
                </h3>
                <p className="text-[14px] text-[#9ca3af] leading-relaxed">
                  AI-powered insights and automated responses that improve your ratings
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* Card 3: Crafted to convert */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-8 hover:border-white/[0.12] transition-all duration-200">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">
                  Crafted to convert
                </h3>
                <p className="text-[14px] text-[#9ca3af] leading-relaxed">
                  Beautiful widgets and trust signals that drive sales and build confidence
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Product Feature Section A: Review Collection Hub - Lighter background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                All your reviews in one intelligent dashboard
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Stop jumping between platforms. AuraRev syncs reviews from Google, Yelp, and Facebook in real-time, giving you a unified command center for reputation management.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Real-time sync from Google, Yelp, Facebook</p>
                    <p className="text-sm text-gray-500 mt-1">Reviews appear instantly, synced every 15 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Smart filtering and search</p>
                    <p className="text-sm text-gray-500 mt-1">Find any review instantly with advanced filters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Sentiment indicators</p>
                    <p className="text-sm text-gray-500 mt-1">AI identifies positive, negative, and neutral sentiment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Quick response interface</p>
                    <p className="text-sm text-gray-500 mt-1">Reply to reviews without leaving AuraRev</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                <div className="bg-gray-950 p-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-white">Review Dashboard</div>
                      <Badge className="bg-green-600/10 text-green-400 border-green-600/20 text-xs">Live</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8">
                        <Filter className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-900 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="text-sm font-medium text-white">Customer Name</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">via Google</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            Excellent service! The team was professional and delivered beyond expectations...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Section B: AI Trust Blurb Generator - Dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                <div className="bg-gray-950 p-4 border-b border-gray-800">
                  <div className="text-sm font-medium text-white mb-3">AI Trust Blurb Generator</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8">
                      <PenTool className="w-3 h-3 mr-1" />
                      Customize
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <p className="text-sm text-blue-400 mb-2">Generated Blurb #1</p>
                    <p className="text-white font-medium">
                      "Rated 4.9★ for exceptional customer service"
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">Generated Blurb #2</p>
                    <p className="text-white font-medium">
                      "Customers love our 'fast delivery and friendly staff'"
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="border border-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">Generated Blurb #3</p>
                    <p className="text-white font-medium">
                      "98% recommend us for 'quality and value'"
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-7">
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Transform reviews into marketing gold
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Our AI analyzes your best reviews and instantly generates compelling marketing copy. Use these trust signals in ads, emails, website headers, and more.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">One-click generation</p>
                    <p className="text-sm text-gray-500 mt-1">Instant AI-powered blurbs from your reviews</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Multiple variations</p>
                    <p className="text-sm text-gray-500 mt-1">Generate different styles for various use cases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Customizable tone</p>
                    <p className="text-sm text-gray-500 mt-1">Professional, casual, or enthusiastic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Copy to clipboard</p>
                    <p className="text-sm text-gray-500 mt-1">Use anywhere with one click</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Section C: Smart Widget Display - Lighter background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Display social proof that converts
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Add beautiful, customizable widgets to your website that showcase real reviews and build instant trust with visitors.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">5 widget styles</p>
                    <p className="text-sm text-gray-500 mt-1">Carousel, popup, sidebar, banner, and feed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">A/B testing built-in</p>
                    <p className="text-sm text-gray-500 mt-1">Test different styles and positions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Mobile responsive</p>
                    <p className="text-sm text-gray-500 mt-1">Perfect on every device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Conversion tracking</p>
                    <p className="text-sm text-gray-500 mt-1">Measure impact on sales</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Preview Widgets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
                  View Gallery
                </Button>
              </div>
            </div>

            <div className="relative">
              {/* Widget showcase */}
              <div className="space-y-4">
                {/* Popup widget example */}
                <div className="relative">
                  <div className="rounded-lg bg-gray-900 border border-gray-800 p-4 shadow-2xl">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-white">Sarah M.</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">
                          "Best service I've ever experienced!"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Verified purchase • 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-blue-600/20 blur-xl" />
                </div>

                {/* Banner widget example */}
                <div className="rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm text-white">
                        <span className="font-semibold">4.9/5</span> based on <span className="font-semibold">2,847 reviews</span>
                      </p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7">
                      Read Reviews
                    </Button>
                  </div>
                </div>

                {/* Sidebar widget example */}
                <div className="rounded-lg bg-gray-900 border border-gray-800 p-4">
                  <p className="text-xs text-gray-500 mb-3">RECENT REVIEWS</p>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="pb-3 border-b border-gray-800 last:border-0">
                        <div className="flex gap-1 mb-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          "Absolutely amazing experience from start to finish..."
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Section D: Automated Outreach - Dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                <div className="bg-gray-950 p-4 border-b border-gray-800">
                  <div className="text-sm font-medium text-white">Automated Review Requests</div>
                </div>
                <div className="p-4">
                  {/* Workflow visualization */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Customer makes purchase</p>
                        <p className="text-xs text-gray-500">Transaction detected via Stripe/Square</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <Timer className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Smart delay (24-72 hours)</p>
                        <p className="text-xs text-gray-500">Optimal timing for best response rates</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <Send className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Personalized request sent</p>
                        <p className="text-xs text-gray-500">Via email or SMS with custom template</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-600/20 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Review submitted</p>
                        <p className="text-xs text-gray-500">Automatically synced to dashboard</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-blue-400">Success Rate</p>
                      <p className="text-2xl font-bold text-white">3.2x</p>
                    </div>
                    <p className="text-xs text-gray-500">More reviews than manual requests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Never miss a review opportunity
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Automatically request reviews from happy customers at the perfect moment. Integrate with your payment systems and watch your review count grow.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Post-purchase automation</p>
                    <p className="text-sm text-gray-500 mt-1">Triggers after successful transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Smart timing</p>
                    <p className="text-sm text-gray-500 mt-1">24-72 hours for optimal response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Personalized templates</p>
                    <p className="text-sm text-gray-500 mt-1">A/B tested for maximum conversion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Multi-channel</p>
                    <p className="text-sm text-gray-500 mt-1">Email and SMS support</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Feature Section E: Weekly Intelligence - Lighter background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Stay ahead of your reputation
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Receive comprehensive weekly reports that analyze trends, identify issues, and provide actionable insights to improve your business.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Trend analysis</p>
                    <p className="text-sm text-gray-500 mt-1">Track rating changes over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Competitor insights</p>
                    <p className="text-sm text-gray-500 mt-1">See how you stack up</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Action recommendations</p>
                    <p className="text-sm text-gray-500 mt-1">AI-powered suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Export to PDF</p>
                    <p className="text-sm text-gray-500 mt-1">Share with your team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                <div className="bg-gray-950 p-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">Weekly Intelligence Report</div>
                      <div className="text-xs text-gray-500 mt-0.5">Week of Nov 4-10, 2024</div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white h-8">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-950 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Overall Rating</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-white">4.8</p>
                        <span className="text-xs text-green-400">+0.2</span>
                      </div>
                    </div>
                    <div className="bg-gray-950 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Reviews This Week</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-white">47</p>
                        <span className="text-xs text-green-400">+12%</span>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment breakdown */}
                  <div className="bg-gray-950 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-3">Sentiment Analysis</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="text-xs text-gray-400 flex-1">Positive</p>
                        <p className="text-xs font-medium text-white">78%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <p className="text-xs text-gray-400 flex-1">Neutral</p>
                        <p className="text-xs font-medium text-white">17%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <p className="text-xs text-gray-400 flex-1">Negative</p>
                        <p className="text-xs font-medium text-white">5%</p>
                      </div>
                    </div>
                  </div>

                  {/* Key insights */}
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                    <p className="text-xs text-blue-400 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Key Insight
                    </p>
                    <p className="text-sm text-white">
                      "Customer service" mentioned 23 times positively this week
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Visualization Section - Dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-3 tracking-[-0.02em]">
                See how AuraRev works
              </h2>
              <p className="text-base text-[#9ca3af]">
              A complete review management ecosystem that runs on autopilot
              </p>
            </div>

            {/* Interactive workflow animation */}
            <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Workflow steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
                {/* Step 1: Review comes in */}
                <div className="text-center group">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">Review comes in</p>
                  <p className="text-xs text-gray-500 mt-1">From any platform</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>

                {/* Step 2: AI processes */}
                <div className="text-center group">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">AI processes</p>
                  <p className="text-xs text-gray-500 mt-1">Analyzes sentiment</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>

                {/* Step 3: Blurb generated */}
                <div className="text-center group">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">Blurb generated</p>
                  <p className="text-xs text-gray-500 mt-1">Marketing copy ready</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>

                {/* Step 4: Widget updates */}
                <div className="text-center group">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">Widget updates</p>
                  <p className="text-xs text-gray-500 mt-1">Live on website</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>

                {/* Step 5: Report compiled */}
                <div className="text-center group">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white">Report compiled</p>
                  <p className="text-xs text-gray-500 mt-1">Weekly insights</p>
                </div>
              </div>

              {/* Animated connection line */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5">
                <div className="h-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
                <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"></div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section - Gradient background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-2">10+ hrs</p>
              <p className="text-sm text-white/80">saved weekly</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-2">3.2x</p>
              <p className="text-sm text-white/80">more reviews</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-2">47%</p>
              <p className="text-sm text-white/80">increase in 5-stars</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-2">500K+</p>
              <p className="text-sm text-white/80">reviews managed</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Showcase - Lighter background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-3 tracking-[-0.02em]">
                Works with your existing tools
              </h2>
              <p className="text-base text-[#9ca3af]">
                Connect AuraRev to your favorite platforms for seamless automation
              </p>
            </div>

          <div className="relative">
            <div className="flex items-center justify-center">
              {/* Center logo */}
              <div className="relative z-10 h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <Star className="h-14 w-14 text-white" />
              </div>

              {/* Orbiting integrations */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-80 w-80 animate-spin-slow">
                  {platforms.map((platform, index) => {
                    const angle = (index * 360) / platforms.length;
                    const Icon = platform.icon;
                    return (
                      <div
                        key={platform.name}
                        className="absolute h-16 w-16 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-blue-600/50 hover:bg-gray-850 transition-all cursor-pointer group"
                        style={{
                          transform: `rotate(${angle}deg) translateX(160px) rotate(-${angle}deg)`
                        }}
                      >
                        <Icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Outer ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-96 w-96 rounded-full border border-gray-800/30"></div>
              </div>
            </div>

            {/* Integration details */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-medium text-white">Google</p>
                <p className="text-xs text-gray-500 mt-1">Reviews & Maps</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-sm font-medium text-white">Yelp</p>
                <p className="text-xs text-gray-500 mt-1">Business reviews</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center mx-auto mb-3">
                  <ThumbsUp className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-sm font-medium text-white">Facebook</p>
                <p className="text-xs text-gray-500 mt-1">Page reviews</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-orange-600/10 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-white">Stripe</p>
                <p className="text-xs text-gray-500 mt-1">Payment triggers</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-3 tracking-[-0.02em]">
                Loved by businesses everywhere
              </h2>
              <p className="text-base text-[#9ca3af]">
                Join thousands of businesses transforming their reputation with AuraRev
              </p>
            </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 p-6 hover:border-blue-600/50 transition-all"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-600/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 relative z-10 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Lighter background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-3 tracking-[-0.02em]">
                Simple, transparent pricing
              </h2>
              <p className="text-base text-[#9ca3af]">
                Choose the plan that fits your business needs
              </p>
            </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Starter */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-gray-700 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">1 location</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">100 review requests/mo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Basic widgets</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Email support</span>
                </li>
              </ul>
              <Button className="w-full border-gray-700 text-white hover:bg-gray-800" variant="outline">
                Get started
              </Button>
            </div>

            {/* Growth - Popular */}
            <div className="relative rounded-2xl bg-gradient-to-b from-blue-900/20 to-gray-900 border-2 border-blue-600/50 p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">POPULAR</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Growth</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$99</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">3 locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">500 requests/mo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">AI blurbs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0">
                Get started
              </Button>
            </div>

            {/* Scale */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-gray-700 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">Scale</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$249</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">10 locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Unlimited requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">White-label options</span>
                </li>
              </ul>
              <Button className="w-full border-gray-700 text-white hover:bg-gray-800" variant="outline">
                Get started
              </Button>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-gray-700 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Unlimited locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">SLA guarantee</span>
                </li>
              </ul>
              <Button className="w-full border-gray-700 text-white hover:bg-gray-800" variant="outline">
                Contact sales
              </Button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Dark background */}
      <section className="py-16 bg-[#08090a]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/[0.15] backdrop-blur-sm p-12 text-center ring-2 ring-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)] transition-all duration-500">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white/95 mb-4 tracking-[-0.02em]">
              Ready to transform your review management?
            </h2>
            <p className="text-lg text-[#9ca3af] mb-8">
            Join 1000+ businesses already using AuraRev
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-black border-0 px-7 py-3 h-12 text-[15px] font-medium rounded-lg transition-all duration-150"
            >
              Start 14-day free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-7 py-3 h-12 text-[15px] font-medium bg-transparent border border-white/[0.12] text-white hover:bg-white/[0.04] hover:border-white/[0.16] rounded-lg transition-all duration-150"
            >
              Book a demo
            </Button>
          </div>

          <p className="mt-8 text-[13px] text-[#6b7280]">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
          </div>
        </div>
      </section>
    </>
  )
}