'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Building2, Bell, Users, CreditCard, Link2, Upload,
  Check, X, Loader2, Globe, MessageSquare, Mail
} from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const integrations = [
    {
      name: 'Google Business',
      icon: Globe,
      status: 'connected',
      description: 'Syncing reviews from 2 locations',
      color: 'blue'
    },
    {
      name: 'Yelp',
      icon: MessageSquare,
      status: 'not_connected',
      description: 'Connect to pull Yelp reviews',
      color: 'red'
    },
    {
      name: 'Facebook',
      icon: Globe,
      status: 'not_connected',
      description: 'Connect Facebook page reviews',
      color: 'blue'
    }
  ]

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="bg-white/[0.02] border border-white/[0.08]">
          <TabsTrigger value="business" className="data-[state=active]:bg-white/[0.05]">
            <Building2 className="h-4 w-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white/[0.05]">
            <Link2 className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white/[0.05]">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-white/[0.05]">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-white/[0.05]">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="space-y-4">
          <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-white">Business Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your business details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-name" className="text-gray-300">Business Name</Label>
                  <Input
                    id="business-name"
                    defaultValue="Acme Corp"
                    className="bg-white/[0.02] border-white/[0.08] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://acmecorp.com"
                    className="bg-white/[0.02] border-white/[0.08] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="contact@acmecorp.com"
                  className="bg-white/[0.02] border-white/[0.08] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="bg-white/[0.02] border-white/[0.08] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                <select
                  id="timezone"
                  className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-md text-white"
                >
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="CST">Central Time (CST)</option>
                  <option value="MST">Mountain Time (MST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Business Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-gray-500" />
                  </div>
                  <Button
                    variant="outline"
                    className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-white">Connected Platforms</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your review platform connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration) => {
                const Icon = integration.icon
                const isConnected = integration.status === 'connected'

                return (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        integration.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                        integration.color === 'red' ? 'bg-red-500/10 text-red-400' :
                        'bg-gray-500/10 text-gray-400'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{integration.name}</p>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isConnected ? (
                        <>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/[0.02] border-white/[0.08] text-gray-400 hover:bg-white/[0.05]"
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Receive email alerts for new reviews</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">SMS Alerts</Label>
                  <p className="text-sm text-gray-400">Get text messages for urgent reviews</p>
                </div>
                <Switch
                  checked={smsAlerts}
                  onCheckedChange={setSmsAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Weekly Reports</Label>
                  <p className="text-sm text-gray-400">Receive weekly summary emails</p>
                </div>
                <Switch
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <Label className="text-white mb-3 block">Alert Thresholds</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="text-gray-300 w-32">Low Rating Alert</Label>
                    <select className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-md text-white">
                      <option>3 stars or below</option>
                      <option>2 stars or below</option>
                      <option>1 star only</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="text-gray-300 w-32">Response Time</Label>
                    <select className="flex-1 px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-md text-white">
                      <option>24 hours</option>
                      <option>48 hours</option>
                      <option>72 hours</option>
                      <option>1 week</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-white">Team Members</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your team access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">John Doe</p>
                      <p className="text-sm text-gray-400">john@acmecorp.com</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Owner
                  </Badge>
                </div>

                <Button
                  className="w-full bg-white/[0.02] border border-white/[0.08] text-white hover:bg-white/[0.05]"
                  variant="outline"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-white">Current Plan</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Professional Plan</h3>
                    <p className="text-sm text-gray-300">$99/month</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">Unlimited review pulls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">500 AI blurbs per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">Priority support</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  )
}