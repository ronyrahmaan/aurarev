'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Globe,
  Lock,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  BarChart3,
  Mail,
  Smartphone,
  Database,
  Settings,
  ChevronRight,
  Play,
  Search,
  Filter,
  Tag,
  Calendar,
  Bot,
  LineChart,
  PieChart,
  FileText,
  Send,
  Bell,
  Layers,
  Workflow,
  GitBranch,
  Code2,
  Palette,
  Terminal
} from 'lucide-react'

const featuresHero = {
  badge: 'FEATURES',
  title: 'Everything you need to manage reviews at scale',
  description: 'Powerful features that automate your review management workflow, from collection to insights.',
}

const coreFeatures = [
  {
    icon: Star,
    title: 'Automated Review Collection',
    description: 'Continuously pull reviews from Google My Business without manual intervention.',
    details: [
      'Real-time synchronization',
      'Historical data import',
      'Multi-location support',
      'Automatic categorization'
    ],
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Marketing Blurbs',
    description: 'Transform reviews into compelling marketing content with advanced AI.',
    details: [
      'Custom tone and style',
      'Multiple format options',
      'Brand voice matching',
      'Sentiment optimization'
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Mail,
    title: 'Weekly Email Summaries',
    description: 'Get comprehensive insights delivered to your inbox every week.',
    details: [
      'Customizable templates',
      'Key metrics highlights',
      'Response suggestions',
      'Team distribution'
    ],
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into review trends, sentiment, and customer feedback.',
    details: [
      'Sentiment analysis',
      'Trend identification',
      'Competitor benchmarking',
      'Custom reports'
    ],
    color: 'from-orange-500 to-red-500',
  },
]

const allFeatures = [
  {
    category: 'Collection & Import',
    icon: Database,
    features: [
      { name: 'Google My Business Integration', description: 'Direct API connection for real-time review sync' },
      { name: 'Multi-location Management', description: 'Manage reviews across all your business locations' },
      { name: 'Historical Data Import', description: 'Import and analyze years of review history' },
      { name: 'Automatic Categorization', description: 'Smart tagging based on content and sentiment' },
      { name: 'Review Monitoring', description: '24/7 monitoring with instant notifications' },
      { name: 'Competitor Tracking', description: 'Monitor and compare competitor reviews' },
    ]
  },
  {
    category: 'AI & Automation',
    icon: Bot,
    features: [
      { name: 'Marketing Content Generation', description: 'Create ads, social posts, and testimonials' },
      { name: 'Response Templates', description: 'AI-generated personalized response suggestions' },
      { name: 'Sentiment Analysis', description: 'Understand customer emotions and intent' },
      { name: 'Theme Extraction', description: 'Identify recurring topics and concerns' },
      { name: 'Language Translation', description: 'Translate reviews to your preferred language' },
      { name: 'Custom AI Models', description: 'Train models on your brand voice and style' },
    ]
  },
  {
    category: 'Analytics & Insights',
    icon: LineChart,
    features: [
      { name: 'Real-time Dashboard', description: 'Live metrics and KPI tracking' },
      { name: 'Trend Analysis', description: 'Identify patterns over time' },
      { name: 'Customer Journey Mapping', description: 'Understand the full customer experience' },
      { name: 'Predictive Analytics', description: 'Forecast review trends and ratings' },
      { name: 'Custom Reports', description: 'Build reports tailored to your needs' },
      { name: 'Data Export', description: 'Export data in multiple formats' },
    ]
  },
  {
    category: 'Communication & Outreach',
    icon: Send,
    features: [
      { name: 'Email Summaries', description: 'Automated weekly and monthly reports' },
      { name: 'Team Notifications', description: 'Alert the right people at the right time' },
      { name: 'Response Management', description: 'Draft, approve, and post responses' },
      { name: 'Review Invitations', description: 'Automated review request campaigns' },
      { name: 'SMS Alerts', description: 'Instant notifications for critical reviews' },
      { name: 'Slack Integration', description: 'Get updates in your team channels' },
    ]
  },
  {
    category: 'Workflow & Collaboration',
    icon: Workflow,
    features: [
      { name: 'Task Assignment', description: 'Assign reviews to team members' },
      { name: 'Approval Workflows', description: 'Multi-step response approval process' },
      { name: 'Team Permissions', description: 'Role-based access control' },
      { name: 'Activity Logs', description: 'Track all actions and changes' },
      { name: 'Internal Notes', description: 'Add context and collaborate on reviews' },
      { name: 'SLA Management', description: 'Set and track response time goals' },
    ]
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    features: [
      { name: 'SOC 2 Compliance', description: 'Enterprise-grade security standards' },
      { name: 'GDPR Compliance', description: 'Full data privacy protection' },
      { name: 'SSO Authentication', description: 'Single sign-on with SAML 2.0' },
      { name: 'API Access Control', description: 'Secure API keys and rate limiting' },
      { name: 'Audit Trail', description: 'Complete history of all activities' },
      { name: 'Data Encryption', description: 'AES-256 encryption at rest and in transit' },
    ]
  },
]

const integrations = [
  { name: 'Google My Business', icon: Globe },
  { name: 'Slack', icon: MessageSquare },
  { name: 'Zapier', icon: Zap },
  { name: 'Salesforce', icon: Database },
  { name: 'HubSpot', icon: Settings },
  { name: 'Microsoft Teams', icon: Users },
]

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="min-h-screen bg-[#08090a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm ring-1 ring-white/10 shadow-glow-blue hover:shadow-glow-blue-lg transition-all duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-purple/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {featuresHero.badge}
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              {featuresHero.title}
            </h1>
            <p className="mt-6 text-xl text-text-secondary max-w-3xl mx-auto">
              {featuresHero.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="gradient-primary text-white border-0 btn-lift"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-transparent hover:bg-bg-hover"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Core Features</h2>
            <p className="mt-4 text-lg text-text-secondary">
              The essential tools that power your review management
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary p-8 hover:border-primary/50 transition-all duration-300 ring-1 ring-white/5 shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="relative">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-secondary mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-accent-green" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Features Section */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Complete Feature Set</h2>
            <p className="mt-4 text-lg text-text-secondary">
              Everything you need in one platform
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-bg-secondary text-text-secondary hover:text-white'
              }`}
            >
              All Features
            </button>
            {allFeatures.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.category
                    ? 'bg-primary text-white'
                    : 'bg-bg-secondary text-text-secondary hover:text-white'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Features List */}
          <div className="space-y-12">
            {allFeatures
              .filter(cat => selectedCategory === 'all' || selectedCategory === cat.category)
              .map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.category}</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {category.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="group p-4 rounded-lg border border-border bg-bg-secondary/50 hover:bg-bg-secondary hover:border-primary/30 transition-all ring-1 ring-white/5 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent-green mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-white">{feature.name}</h4>
                              <p className="mt-1 text-sm text-text-secondary">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Powerful Integrations</h2>
            <p className="mt-4 text-lg text-text-secondary">
              Connect AuraRev with your favorite tools
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, idx) => {
              const Icon = integration.icon
              return (
                <div
                  key={idx}
                  className="group p-6 rounded-lg border border-border bg-bg-secondary/50 hover:bg-bg-secondary hover:border-primary/30 transition-all flex flex-col items-center justify-center ring-1 ring-white/5 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                >
                  <Icon className="h-8 w-8 text-text-secondary group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm text-text-secondary">{integration.name}</span>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-border">
              View All Integrations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-purple to-primary p-12 text-center ring-1 ring-white/20 shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to transform your review management?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses automating their review workflow with AuraRev.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>
    </div>
  )
}