'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Customer logos (using placeholder text for now)
const customerLogos = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'FoodChain', logo: 'FC' },
  { name: 'HealthPlus', logo: 'H+' },
  { name: 'RetailMax', logo: 'RM' },
  { name: 'ServicePro', logo: 'SP' },
  { name: 'AutoDeal', logo: 'AD' },
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

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gradient-primary text-white py-2 text-center text-sm animate-fade-in">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-2">
          <Badge className="bg-white/20 text-white border-white/30 text-xs">New</Badge>
          <span>AI-Powered Review Insights are here!</span>
          <Link href="/blog/ai-insights" className="inline-flex items-center gap-1 font-medium hover:underline">
            Learn more <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-purple/10 to-transparent animate-gradient" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(42 45 53) 1px, transparent 1px),
                             linear-gradient(to bottom, rgb(42 45 53) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Hero heading with gradient */}
            <h1 className={cn(
              "text-6xl sm:text-7xl font-bold tracking-tight mb-8",
              "animate-fade-in-up",
              isVisible && "opacity-100"
            )}>
              <span className="gradient-text">Automate Your</span>
              <br />
              <span className="text-white">Review Management</span>
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-text-secondary mb-10 animate-fade-in-up animation-delay-200">
              Pull Google reviews automatically, generate AI-powered marketing copy,
              and get weekly insights—all on autopilot.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Button
                size="lg"
                className="gradient-primary text-white border-0 px-8 py-6 text-base font-medium btn-lift shadow-glow"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-medium bg-transparent border-border text-white hover:bg-bg-hover"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-tertiary animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent-green" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-text-tertiary p-1">
            <div className="h-2 w-1 rounded-full bg-text-tertiary mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="py-16 bg-bg-secondary border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-text-tertiary mb-8 uppercase tracking-wider">
            Trusted by leading businesses
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {customerLogos.map((customer, index) => (
              <div
                key={customer.name}
                className={cn(
                  "flex items-center justify-center h-12",
                  "opacity-50 hover:opacity-100 transition-opacity cursor-pointer",
                  "animate-fade-in",
                  `animation-delay-${(index + 1) * 100}`
                )}
              >
                <div className="text-2xl font-bold text-text-secondary">
                  {customer.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">How it works</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Three steps to review automation
            </h2>
            <p className="text-lg text-text-secondary">
              Get started in minutes, see results immediately
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary-purple/50" />

            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">01</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Connect Google</h3>
                <p className="text-text-secondary">
                  Link your Google Business account with one-click OAuth authentication
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">02</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Processes</h3>
                <p className="text-text-secondary">
                  Our AI analyzes reviews and generates marketing-ready content instantly
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">03</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Get Insights</h3>
                <p className="text-text-secondary">
                  Receive weekly reports and use AI blurbs in your marketing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Features</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to manage reviews
            </h2>
            <p className="text-lg text-text-secondary">
              Powerful features to automate and optimize your review management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Automated Sync
              </h3>
              <p className="text-sm text-text-secondary">
                Reviews pulled automatically every day. Set it and forget it.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                AI Marketing Copy
              </h3>
              <p className="text-sm text-text-secondary">
                Transform reviews into compelling testimonials instantly.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Weekly Summaries
              </h3>
              <p className="text-sm text-text-secondary">
                Get comprehensive reports delivered to your inbox.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Trend Analysis
              </h3>
              <p className="text-sm text-text-secondary">
                Track reputation changes and identify patterns.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Smile className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Sentiment Analysis
              </h3>
              <p className="text-sm text-text-secondary">
                Understand customer emotions with AI-powered insights.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-bg-tertiary border-border card-hover p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Response Templates
              </h3>
              <p className="text-sm text-text-secondary">
                AI-suggested responses to address customer feedback.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Dashboard</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">
                See your reviews come to life
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Our intuitive dashboard gives you complete control over your review management with real-time insights.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent-green mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Real-time sync</p>
                    <p className="text-sm text-text-secondary">Reviews appear instantly as they're posted</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent-green mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Advanced filtering</p>
                    <p className="text-sm text-text-secondary">Sort by rating, date, sentiment, and more</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent-green mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Export anywhere</p>
                    <p className="text-sm text-text-secondary">Download reports in PDF, CSV, or API</p>
                  </div>
                </li>
              </ul>

              <Button className="gradient-primary text-white border-0 btn-lift">
                Explore Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-bg-tertiary to-bg-secondary border border-border overflow-hidden">
                <div className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-white font-medium">Interactive Demo</p>
                    <p className="text-sm text-text-secondary mt-2">Coming soon</p>
                  </div>
                </div>
              </div>
              {/* Floating metrics */}
              <div className="absolute -top-4 -right-4 bg-bg-tertiary rounded-lg border border-border px-4 py-2">
                <p className="text-xs text-text-tertiary">Avg Rating</p>
                <p className="text-xl font-bold text-white">4.8 ⭐</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-bg-tertiary rounded-lg border border-border px-4 py-2">
                <p className="text-xs text-text-tertiary">Reviews/mo</p>
                <p className="text-xl font-bold text-white">+127</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Integrations</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Connects with your favorite tools
            </h2>
            <p className="text-lg text-text-secondary">
              Seamlessly integrate with your existing workflow
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center">
              {/* Center logo */}
              <div className="relative z-10 h-24 w-24 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Star className="h-12 w-12 text-white" />
              </div>

              {/* Orbiting logos */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-64 w-64 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-16 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Google</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-16 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-white">OpenAI</span>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Slack</span>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by businesses everywhere
            </h2>
            <p className="text-lg text-text-secondary">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-bg-tertiary border-border p-6 relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>
                <p className="text-text-secondary mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-xs text-text-tertiary">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to transform your review management?
          </h2>
          <p className="text-xl text-text-secondary mb-10">
            Join hundreds of businesses already automating their reviews with AuraRev
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-primary text-white border-0 px-8 py-6 text-base font-medium btn-lift shadow-glow"
            >
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-medium bg-transparent border-border text-white hover:bg-bg-hover"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-text-tertiary">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>
      </section>
    </>
  )
}