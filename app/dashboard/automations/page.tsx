'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Zap, Clock, Mail, MessageSquare, Users, Target,
  Plus, Edit2, Trash2, Play, Pause, CheckCircle, XCircle, Loader2, Star
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  trigger: string
  action: string
  status: 'active' | 'paused' | 'draft'
  lastRun?: Date
  successRate: number
}

export default function AutomationsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'Review Request Email',
      trigger: '24 hours after purchase',
      action: 'Send review request email',
      status: 'active',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
      successRate: 94
    },
    {
      id: '2',
      name: 'Negative Review Alert',
      trigger: '1-3 star review received',
      action: 'Send SMS alert to manager',
      status: 'active',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
      successRate: 100
    },
    {
      id: '3',
      name: 'Weekly Performance Report',
      trigger: 'Every Monday at 9 AM',
      action: 'Email weekly analytics',
      status: 'paused',
      successRate: 88
    }
  ]

  const triggers = [
    { value: 'post-purchase-24h', label: '24 hours after purchase', icon: Clock },
    { value: 'post-purchase-48h', label: '48 hours after purchase', icon: Clock },
    { value: 'post-purchase-72h', label: '72 hours after purchase', icon: Clock },
    { value: 'post-purchase-1w', label: '1 week after purchase', icon: Clock },
    { value: 'low-rating', label: 'Low rating received (1-3 stars)', icon: Target },
    { value: 'high-rating', label: 'High rating received (4-5 stars)', icon: Target },
    { value: 'weekly', label: 'Weekly (choose day)', icon: Clock },
    { value: 'monthly', label: 'Monthly (choose date)', icon: Clock }
  ]

  const actions = [
    { value: 'email-customer', label: 'Send email to customer', icon: Mail },
    { value: 'sms-customer', label: 'Send SMS to customer', icon: MessageSquare },
    { value: 'email-team', label: 'Alert team via email', icon: Mail },
    { value: 'sms-team', label: 'Alert team via SMS', icon: MessageSquare },
    { value: 'generate-blurb', label: 'Generate AI blurb', icon: Zap },
    { value: 'post-response', label: 'Auto-post response', icon: MessageSquare }
  ]

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Automation Workflows</h2>
          <p className="text-gray-400 text-sm mt-1">
            Automate review collection and response management
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{workflow.name}</CardTitle>
                  <Badge className={`mt-2 ${getStatusColor(workflow.status)}`}>
                    {workflow.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {workflow.status === 'paused' && <Pause className="h-3 w-3 mr-1" />}
                    {workflow.status}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle edit
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle delete
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Trigger</p>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <Clock className="h-3 w-3 text-blue-400" />
                    {workflow.trigger}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Action</p>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <Zap className="h-3 w-3 text-purple-400" />
                    {workflow.action}
                  </p>
                </div>
              </div>

              {workflow.lastRun && (
                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Success Rate</span>
                    <span className="text-sm font-medium text-white">{workflow.successRate}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        workflow.successRate >= 90
                          ? 'bg-green-500'
                          : workflow.successRate >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${workflow.successRate}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Toggle status
                  }}
                >
                  {workflow.status === 'active' ? (
                    <>
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Activate
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    // View details
                  }}
                >
                  View Details →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Workflow Panel */}
      {isCreating && (
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Create New Workflow</CardTitle>
                <CardDescription className="text-gray-400">
                  Set up automated actions based on triggers
                </CardDescription>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsCreating(false)}
                className="text-gray-400 hover:text-white hover:bg-white/[0.05]"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Workflow Name */}
            <div className="space-y-2">
              <Label className="text-gray-300">Workflow Name</Label>
              <Input
                placeholder="e.g., Post-Purchase Review Request"
                className="bg-white/[0.02] border-white/[0.08] text-white"
              />
            </div>

            {/* Trigger Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300">When this happens...</Label>
              <Select>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-white">
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  {triggers.map((trigger) => {
                    const Icon = trigger.icon
                    return (
                      <SelectItem key={trigger.value} value={trigger.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-400" />
                          {trigger.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Action Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300">Do this...</Label>
              <Select>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-white">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action) => {
                    const Icon = action.icon
                    return (
                      <SelectItem key={action.value} value={action.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-400" />
                          {action.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Message Template */}
            <div className="space-y-2">
              <Label className="text-gray-300">Message Template</Label>
              <Textarea
                placeholder="Hi {customer_name}, thanks for your recent purchase..."
                className="bg-white/[0.02] border-white/[0.08] text-white min-h-[120px]"
              />
              <p className="text-xs text-gray-500">
                Available variables: {'{customer_name}'}, {'{business_name}'}, {'{purchase_date}'}, {'{product_name}'}
              </p>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.08]">
              <h4 className="text-sm font-medium text-white">Advanced Settings</h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Enable A/B Testing</Label>
                  <p className="text-xs text-gray-400">Test different message variations</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Limit Send Frequency</Label>
                  <p className="text-xs text-gray-400">Max 1 message per customer per week</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                Create Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Analytics */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
        <CardHeader>
          <CardTitle className="text-white">Workflow Performance</CardTitle>
          <CardDescription className="text-gray-400">
            Track the effectiveness of your automations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white/[0.02] rounded-lg border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Total Sent</span>
                <Mail className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">3,456</p>
              <p className="text-xs text-green-400 mt-1">+23% this week</p>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-lg border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Response Rate</span>
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">34%</p>
              <p className="text-xs text-green-400 mt-1">+5% improvement</p>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-lg border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Reviews Generated</span>
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">892</p>
              <p className="text-xs text-green-400 mt-1">+18% this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}