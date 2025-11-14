'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Code, Eye, Smartphone, Monitor, Moon, Sun, Copy, Check } from 'lucide-react'

export default function WidgetsPage() {
  const [widgetStyle, setWidgetStyle] = useState('carousel')
  const [widgetTheme, setWidgetTheme] = useState('dark')
  const [displayCount, setDisplayCount] = useState('5')
  const [autoRotate, setAutoRotate] = useState(true)
  const [showPlatformIcon, setShowPlatformIcon] = useState(true)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)

  const embedCode = `<script src="https://aurarev.com/widget.js"></script>
<div
  id="aurarev-widget"
  data-style="${widgetStyle}"
  data-theme="${widgetTheme}"
  data-count="${displayCount}"
  data-auto-rotate="${autoRotate}"
  data-show-platform="${showPlatformIcon}"
></div>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget Settings */}
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardHeader>
            <CardTitle className="text-white">Widget Settings</CardTitle>
            <CardDescription className="text-gray-400">
              Customize how reviews appear on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Style Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300">Display Style</Label>
              <Select value={widgetStyle} onValueChange={setWidgetStyle}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="grid">Grid Layout</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                  <SelectItem value="popup">Popup Modal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <Label className="text-gray-300">Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWidgetTheme('light')}
                  className={`flex-1 ${
                    widgetTheme === 'light'
                      ? 'bg-white text-black border-white'
                      : 'bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWidgetTheme('dark')}
                  className={`flex-1 ${
                    widgetTheme === 'dark'
                      ? 'bg-gray-800 text-white border-blue-500'
                      : 'bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWidgetTheme('auto')}
                  className={`flex-1 ${
                    widgetTheme === 'auto'
                      ? 'bg-gradient-to-r from-gray-800 to-white text-black border-blue-500'
                      : 'bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]'
                  }`}
                >
                  Auto
                </Button>
              </div>
            </div>

            {/* Display Count */}
            <div className="space-y-2">
              <Label className="text-gray-300">Reviews to Display</Label>
              <Select value={displayCount} onValueChange={setDisplayCount}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 reviews</SelectItem>
                  <SelectItem value="5">5 reviews</SelectItem>
                  <SelectItem value="10">10 reviews</SelectItem>
                  <SelectItem value="15">15 reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Settings Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Auto-rotate</Label>
                  <p className="text-xs text-gray-400">Automatically cycle through reviews</p>
                </div>
                <Switch checked={autoRotate} onCheckedChange={setAutoRotate} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Platform Icons</Label>
                  <p className="text-xs text-gray-400">Show Google/Yelp/Facebook icons</p>
                </div>
                <Switch checked={showPlatformIcon} onCheckedChange={setShowPlatformIcon} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Live Preview</CardTitle>
                <CardDescription className="text-gray-400">
                  See how your widget will look
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`${
                    previewDevice === 'desktop'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-white/[0.02] border-white/[0.08] text-gray-400'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`${
                    previewDevice === 'mobile'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-white/[0.02] border-white/[0.08] text-gray-400'
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`${
                previewDevice === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
              } ${
                widgetTheme === 'light'
                  ? 'bg-white text-black'
                  : widgetTheme === 'dark'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gradient-to-b from-gray-900 to-gray-800 text-white'
              } rounded-lg p-6 shadow-2xl transition-all duration-300`}
            >
              {/* Mock Widget Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Badge
                    className={`${
                      widgetTheme === 'light'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    4.8 ★
                  </Badge>
                </div>

                {widgetStyle === 'carousel' && (
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 border-opacity-20">
                      <div className="flex items-center gap-2 mb-2">
                        {showPlatformIcon && (
                          <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                            Google
                          </span>
                        )}
                        <span className="text-yellow-400">★★★★★</span>
                      </div>
                      <p className="text-sm opacity-90">
                        "Amazing service! The team went above and beyond."
                      </p>
                      <p className="text-xs opacity-60 mt-2">- Sarah J.</p>
                    </div>
                  </div>
                )}

                {widgetStyle === 'grid' && (
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].slice(0, previewDevice === 'mobile' ? 2 : 4).map((i) => (
                      <div key={i} className="border rounded-lg p-3 border-opacity-20">
                        <div className="text-yellow-400 text-sm">★★★★★</div>
                        <p className="text-xs opacity-90 mt-1">Great!</p>
                      </div>
                    ))}
                  </div>
                )}

                {widgetStyle === 'list' && (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-2 border-opacity-20">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Customer {i}</span>
                          <span className="text-yellow-400 text-sm">★★★★★</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embed Code */}
      <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Code className="h-5 w-5" />
            Embed Code
          </CardTitle>
          <CardDescription className="text-gray-400">
            Copy this code and paste it into your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-black/50 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{embedCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.05]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              <strong>Installation Instructions:</strong>
            </p>
            <ol className="mt-2 space-y-1 text-sm text-gray-300">
              <li>1. Copy the embed code above</li>
              <li>2. Paste it into your website's HTML where you want reviews to appear</li>
              <li>3. The widget will automatically load and display your latest reviews</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}