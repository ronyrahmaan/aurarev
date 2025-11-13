'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Star,
  Check,
  Globe,
  Sparkles,
  Send,
  BarChart3,
  Clock,
  Shield,
  ChevronRight
} from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="bg-[#08090a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6 animate-fade-in-up">
            AuraRev is a purpose-built
            <br />
            tool for{' '}
            <span className="text-gradient">
              managing and monetizing
            </span>
            <br />
            reviews
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Automatically collect reviews, generate AI trust blurbs, and display social proof that converts
          </p>

          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-white text-black px-6 py-2.5 rounded-md font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
              See AuraRev in action
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 px-6 py-2.5">
              Start free trial
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>

          {/* Dashboard Preview */}
          <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="rounded-xl bg-[#0f1012] border border-gray-900 p-2">
              <div className="flex gap-1.5 p-3">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#08090a] rounded-lg border border-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-white">Excellent service and great product!</p>
                      <p className="text-xs text-gray-500 mt-1">John Doe • via Google • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-gray-400 hover:text-white">Reply</button>
                    <button className="text-xs text-gray-400 hover:text-white">Share</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#08090a] rounded-lg border border-gray-900">
                    <p className="text-2xl font-medium text-white">4.9</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                  <div className="p-4 bg-[#08090a] rounded-lg border border-gray-900">
                    <p className="text-2xl font-medium text-green-500">+47%</p>
                    <p className="text-sm text-gray-500">5-Star Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-8">Powering review management for leading businesses</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
            {['Stripe', 'Shopify', 'Square', 'Google', 'Yelp', 'Meta'].map((name) => (
              <span key={name} className="text-lg text-gray-400 font-medium">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              Made for modern businesses
            </h2>
            <p className="text-lg text-gray-400">
              Purpose-built tools to transform reviews into revenue
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0f1012] border border-gray-900 hover:bg-[#131416] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Purpose-built for reviews</h3>
              <p className="text-sm text-gray-400">
                Unified dashboard for all review platforms with intelligent filtering and real-time sync
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0f1012] border border-gray-900 hover:bg-[#131416] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI-powered insights</h3>
              <p className="text-sm text-gray-400">
                Generate compelling marketing copy and respond to reviews with AI assistance
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0f1012] border border-gray-900 hover:bg-[#131416] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Actionable analytics</h3>
              <p className="text-sm text-gray-400">
                Track trends, measure impact, and get weekly intelligence reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                All your reviews in one intelligent dashboard
              </h2>
              <p className="text-gray-400 mb-6">
                Stop jumping between platforms. AuraRev syncs reviews from Google, Yelp, and Facebook in real-time, giving you a unified command center for reputation management.
              </p>
              <div className="space-y-3">
                {[
                  'Real-time sync from multiple platforms',
                  'Smart filtering and search',
                  'Sentiment analysis and insights',
                  'Quick response interface'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-xl bg-[#0f1012] border border-gray-900">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-[#08090a] rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Great experience with the team...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              See how AuraRev works
            </h2>
            <p className="text-gray-400">
              A complete review management ecosystem that runs on autopilot
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: Globe, label: 'Review comes in' },
              { icon: Sparkles, label: 'AI processes' },
              { icon: Send, label: 'Blurb generated' },
              { icon: BarChart3, label: 'Widget updates' },
              { icon: Clock, label: 'Report compiled' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs text-gray-400">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-medium mb-1">10+ hrs</p>
              <p className="text-sm text-gray-500">saved weekly</p>
            </div>
            <div>
              <p className="text-3xl font-medium mb-1">3.2x</p>
              <p className="text-sm text-gray-500">more reviews</p>
            </div>
            <div>
              <p className="text-3xl font-medium mb-1">47%</p>
              <p className="text-sm text-gray-500">increase in 5-stars</p>
            </div>
            <div>
              <p className="text-3xl font-medium mb-1">500K+</p>
              <p className="text-sm text-gray-500">reviews managed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Starter', price: '$49', features: ['1 location', '100 review requests/mo', 'Basic widgets', 'Email support'] },
              { name: 'Growth', price: '$99', features: ['3 locations', '500 requests/mo', 'AI blurbs', 'Priority support'], popular: true },
              { name: 'Scale', price: '$249', features: ['10 locations', 'Unlimited requests', 'API access', 'White-label options'] }
            ].map((plan) => (
              <div key={plan.name} className={`p-6 rounded-xl border ${plan.popular ? 'border-white bg-white/5' : 'border-gray-900 bg-[#0f1012]'}`}>
                {plan.popular && (
                  <span className="text-xs text-white bg-white/20 px-2 py-1 rounded-full">POPULAR</span>
                )}
                <h3 className="text-lg font-medium mt-4 mb-2">{plan.name}</h3>
                <p className="text-2xl font-medium mb-6">{plan.price}<span className="text-sm text-gray-500">/mo</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-transparent border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'}`}>
                  Get started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Ready to transform your review management?
          </h2>
          <p className="text-gray-400 mb-8">
            Join 1000+ businesses already using AuraRev
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-white text-black px-6 py-2.5 rounded-md font-medium hover:bg-gray-200">
              Start 14-day free trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 px-6 py-2.5">
              Book a demo
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}