'use client'

import { useState } from 'react'
import { Check, X, ArrowRight, Sparkles, Shield, Zap, Users, Building2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 29,
    annualPrice: 25,
    description: 'Perfect for small businesses getting started',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Up to 3 business locations',
      'Google My Business integration',
      'Weekly email summaries',
      'AI-generated marketing blurbs',
      '100 AI blurbs per month',
      'Basic analytics dashboard',
      'Email support',
      '99.9% uptime SLA',
    ],
    notIncluded: [
      'Custom AI training',
      'API access',
      'White-label options',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    icon: Sparkles,
    monthlyPrice: 79,
    annualPrice: 67,
    description: 'For growing businesses that need more power',
    popular: true,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Up to 10 business locations',
      'All integrations included',
      'Daily & weekly summaries',
      'Advanced AI blurbs',
      'Unlimited AI blurbs',
      'Advanced analytics',
      'API access (1000 calls/month)',
      'Priority email & chat support',
      'Custom email templates',
      'Team collaboration (5 users)',
      '99.9% uptime SLA',
      'Competitor analysis',
    ],
    notIncluded: [
      'Custom AI training',
      'White-label options',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    monthlyPrice: null,
    annualPrice: null,
    description: 'For large organizations with custom needs',
    color: 'from-orange-500 to-red-500',
    features: [
      'Unlimited locations',
      'All integrations + custom',
      'Custom reporting schedule',
      'Custom AI model training',
      'Unlimited AI generation',
      'White-label options',
      'Unlimited API access',
      'Dedicated account manager',
      '24/7 phone & priority support',
      'Unlimited team members',
      'Custom contracts & billing',
      'On-premise deployment option',
      'SAML SSO authentication',
      '99.99% uptime SLA',
      'Custom data retention',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
  },
]

const comparisonFeatures = [
  { category: 'Core Features', features: [
    { name: 'Business locations', starter: 'Up to 3', pro: 'Up to 10', enterprise: 'Unlimited' },
    { name: 'Google My Business sync', starter: true, pro: true, enterprise: true },
    { name: 'Review monitoring', starter: true, pro: true, enterprise: true },
    { name: 'AI marketing blurbs', starter: '100/month', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Email summaries', starter: 'Weekly', pro: 'Daily & Weekly', enterprise: 'Custom schedule' },
  ]},
  { category: 'Analytics & Insights', features: [
    { name: 'Basic analytics', starter: true, pro: true, enterprise: true },
    { name: 'Advanced analytics', starter: false, pro: true, enterprise: true },
    { name: 'Custom reports', starter: false, pro: false, enterprise: true },
    { name: 'Competitor analysis', starter: false, pro: true, enterprise: true },
    { name: 'Sentiment analysis', starter: true, pro: true, enterprise: true },
  ]},
  { category: 'Team & Collaboration', features: [
    { name: 'Team members', starter: '1', pro: '5', enterprise: 'Unlimited' },
    { name: 'User roles & permissions', starter: false, pro: true, enterprise: true },
    { name: 'Activity logs', starter: false, pro: true, enterprise: true },
    { name: 'Internal notes', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Integration & API', features: [
    { name: 'API access', starter: false, pro: '1000 calls/month', enterprise: 'Unlimited' },
    { name: 'Webhooks', starter: false, pro: true, enterprise: true },
    { name: 'Custom integrations', starter: false, pro: false, enterprise: true },
    { name: 'Zapier integration', starter: false, pro: true, enterprise: true },
  ]},
  { category: 'Support & Security', features: [
    { name: 'Email support', starter: true, pro: true, enterprise: true },
    { name: 'Priority support', starter: false, pro: true, enterprise: true },
    { name: 'Phone support', starter: false, pro: false, enterprise: '24/7' },
    { name: 'Dedicated manager', starter: false, pro: false, enterprise: true },
    { name: 'SLA guarantee', starter: '99.9%', pro: '99.9%', enterprise: '99.99%' },
    { name: 'SSO authentication', starter: false, pro: false, enterprise: true },
  ]},
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="min-h-screen bg-[#08090a] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm ring-1 ring-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.25)] transition-all duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-purple/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              PRICING
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Simple, predictable pricing
            </h1>
            <p className="mt-6 text-xl text-text-secondary max-w-3xl mx-auto">
              Start with a 14-day free trial. No credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-text-secondary'}`}>
                Monthly billing
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-text-secondary'}`}>
                Annual billing
              </span>
              {isAnnual && (
                <span className="inline-flex items-center rounded-full bg-accent-green/10 px-2 py-1 text-xs font-medium text-accent-green">
                  Save 15%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice

              return (
                <div
                  key={plan.name}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ring-1 ring-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] ${
                    plan.popular
                      ? 'border-primary bg-bg-secondary shadow-glow scale-105'
                      : 'border-border bg-bg-secondary hover:border-primary/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>

                    <p className="text-text-secondary mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-8">
                      {price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold tracking-tight">
                            ${price}
                          </span>
                          <span className="text-text-secondary">
                            /month
                          </span>
                        </div>
                      ) : (
                        <div className="text-5xl font-bold tracking-tight">
                          Custom
                        </div>
                      )}
                      {isAnnual && price && (
                        <p className="mt-1 text-sm text-text-tertiary">
                          Billed ${price * 12} yearly
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href={plan.cta === 'Contact Sales' ? '/contact' : '/signup'}>
                      <Button
                        size="lg"
                        className={`w-full ${
                          plan.popular
                            ? 'gradient-primary text-white border-0'
                            : 'bg-bg-hover border-border hover:bg-primary hover:border-primary'
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    {/* Features */}
                    <div className="mt-8 space-y-3">
                      <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        What's included
                      </p>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent-green flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-text-secondary">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan.notIncluded.length > 0 && (
                        <>
                          <div className="pt-3" />
                          {plan.notIncluded.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <X className="h-5 w-5 text-text-tertiary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-text-tertiary line-through">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Toggle */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-7xl text-center">
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="border-border"
          >
            {showComparison ? 'Hide' : 'Show'} detailed comparison
            <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </section>

      {/* Comparison Table */}
      {showComparison && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-text-tertiary">
                      Features
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Zap className="h-5 w-5 text-blue-500" />
                        <span>Starter</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span>Professional</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Building2 className="h-5 w-5 text-orange-500" />
                        <span>Enterprise</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category) => (
                    <>
                      <tr key={category.category}>
                        <td colSpan={4} className="pt-8 pb-4 px-4">
                          <h4 className="text-sm font-medium text-text-tertiary uppercase tracking-wider">
                            {category.category}
                          </h4>
                        </td>
                      </tr>
                      {category.features.map((feature, idx) => (
                        <tr key={`${category.category}-${idx}`} className="border-b border-border/50">
                          <td className="py-4 px-4 text-sm text-text-secondary">
                            {feature.name}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="h-5 w-5 text-accent-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-text-tertiary mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-text-secondary">{feature.starter}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof feature.pro === 'boolean' ? (
                              feature.pro ? (
                                <Check className="h-5 w-5 text-accent-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-text-tertiary mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-text-secondary">{feature.pro}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof feature.enterprise === 'boolean' ? (
                              feature.enterprise ? (
                                <Check className="h-5 w-5 text-accent-green mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-text-tertiary mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-text-secondary">{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-8">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, ACH transfers for annual plans, and wire transfers for enterprise contracts."
              },
              {
                q: "Is there a setup fee?",
                a: "No, there are no setup fees for any of our plans. You can start using AuraRev immediately after signing up."
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes, all plans come with a 14-day free trial. No credit card required to start."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
              },
              {
                q: "Do you offer discounts for non-profits?",
                a: "Yes, we offer a 30% discount for qualified non-profit organizations. Contact our sales team for details."
              },
            ].map((faq, idx) => (
              <div key={idx} className="pb-8 border-b border-border last:border-0">
                <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
                <p className="text-text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-purple to-primary p-12 text-center ring-1 ring-white/20 shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] transition-all duration-300">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start your 14-day free trial
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                No credit card required. Get instant access to all features.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >
                    Contact Sales
                  </Button>
                </Link>
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