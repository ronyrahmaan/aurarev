'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Globe, MessageSquare, Star, Link2, Check, X, Loader2,
  ShoppingBag, CreditCard, Calendar, Mail, Phone, Database,
  AlertCircle, CheckCircle, Settings, ExternalLink, Shield
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  category: 'reviews' | 'payments' | 'crm' | 'marketing' | 'calendar'
  description: string
  icon: any
  status: 'connected' | 'not_connected' | 'error'
  color: string
  features: string[]
  lastSync?: Date
  syncedData?: {
    type: string
    count: number
  }
}

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const integrations: Integration[] = [
    {
      id: 'google-business',
      name: 'Google Business',
      category: 'reviews',
      description: 'Sync reviews from Google Business Profile',
      icon: Globe,
      status: 'connected',
      color: 'blue',
      features: ['Auto-sync reviews', 'Response management', 'Analytics'],
      lastSync: new Date(Date.now() - 30 * 60 * 1000),
      syncedData: { type: 'reviews', count: 234 }
    },
    {
      id: 'yelp',
      name: 'Yelp for Business',
      category: 'reviews',
      description: 'Import and manage Yelp reviews',
      icon: Star,
      status: 'not_connected',
      color: 'red',
      features: ['Review import', 'Rating tracking', 'Competitor analysis']
    },
    {
      id: 'facebook',
      name: 'Facebook Pages',
      category: 'reviews',
      description: 'Connect Facebook page reviews and recommendations',
      icon: Globe,
      status: 'not_connected',
      color: 'blue',
      features: ['Page reviews', 'Recommendations', 'Messenger integration']
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payments',
      description: 'Track payments and trigger review requests',
      icon: CreditCard,
      status: 'connected',
      color: 'purple',
      features: ['Payment tracking', 'Customer data sync', 'Automated triggers'],
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      syncedData: { type: 'customers', count: 1250 }
    },
    {
      id: 'square',
      name: 'Square',
      category: 'payments',
      description: 'Integrate with Square POS and payments',
      icon: ShoppingBag,
      status: 'not_connected',
      color: 'green',
      features: ['POS integration', 'Transaction sync', 'Customer profiles']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'crm',
      description: 'Sync customer data and automate workflows',
      icon: Database,
      status: 'error',
      color: 'orange',
      features: ['Contact sync', 'Deal tracking', 'Marketing automation']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'marketing',
      description: 'Email marketing and campaign management',
      icon: Mail,
      status: 'not_connected',
      color: 'yellow',
      features: ['Email campaigns', 'Audience segmentation', 'Analytics']
    },
    {
      id: 'calendly',
      name: 'Calendly',
      category: 'calendar',
      description: 'Schedule follow-ups and review requests',
      icon: Calendar,
      status: 'not_connected',
      color: 'blue',
      features: ['Appointment booking', 'Automated reminders', 'Follow-up triggers']
    },
    {
      id: 'twilio',
      name: 'Twilio',
      category: 'marketing',
      description: 'SMS notifications and review requests',
      icon: Phone,
      status: 'connected',
      color: 'red',
      features: ['SMS campaigns', 'Two-way messaging', 'Phone verification'],
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
      syncedData: { type: 'messages', count: 456 }
    }
  ]

  const categories = [
    { value: 'all', label: 'All Integrations', count: integrations.length },
    { value: 'reviews', label: 'Review Platforms', count: 3 },
    { value: 'payments', label: 'Payment Systems', count: 2 },
    { value: 'crm', label: 'CRM', count: 1 },
    { value: 'marketing', label: 'Marketing', count: 2 },
    { value: 'calendar', label: 'Scheduling', count: 1 }
  ]

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleConnect = async (integrationId: string) => {
    setConnectingId(integrationId)
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setConnectingId(null)
  }

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            Not Connected
          </Badge>
        )
    }
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Integrations</h2>
        <p className="text-gray-400 text-sm mt-1">
          Connect your favorite tools to automate your workflow
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/[0.02] border-white/[0.08] text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={`${
                selectedCategory === category.value
                  ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                  : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 bg-white/[0.05]">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Connected Integrations Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Connected</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {integrations.filter(i => i.status === 'connected').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {integrations.filter(i => i.status === 'not_connected').length}
                </p>
              </div>
              <Link2 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Needs Attention</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {integrations.filter(i => i.status === 'error').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => {
          const Icon = integration.icon
          const isConnecting = connectingId === integration.id

          return (
            <Card
              key={integration.id}
              className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg border ${getColorClasses(integration.color)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        {integration.description}
                      </CardDescription>
                      <div className="mt-2">
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                  </div>
                  {integration.status === 'connected' && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-white/[0.02] border-white/[0.08] text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Sync Status */}
                {integration.status === 'connected' && integration.lastSync && (
                  <div className="p-3 bg-white/[0.02] rounded-lg border border-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Last synced</p>
                        <p className="text-sm text-gray-300">
                          {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      </div>
                      {integration.syncedData && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{integration.syncedData.type}</p>
                          <p className="text-sm font-medium text-white">
                            {integration.syncedData.count.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-white/[0.02] border-white/[0.08] text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : integration.status === 'error' ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Fix Connection
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/[0.02] border-white/[0.08] text-gray-400 hover:bg-white/[0.05]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                      disabled={isConnecting}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link2 className="h-4 w-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* API Access Card */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-white">API Access</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Build custom integrations with our REST API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-black/30 rounded-lg font-mono text-sm">
              <p className="text-gray-400">API Key</p>
              <div className="flex items-center gap-2 mt-2">
                <code className="text-blue-400">sk_live_****************************3f4d</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
              >
                View Documentation
              </Button>
              <Button
                variant="outline"
                className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
              >
                Generate New Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add missing import
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}