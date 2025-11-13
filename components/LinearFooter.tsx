import Link from 'next/link'
import { Star, Twitter, Linkedin, Github, Youtube } from 'lucide-react'

const footerLinks = {
  Product: [
    { href: '/features', label: 'Features' },
    { href: '/integrations', label: 'Integrations' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/changelog', label: 'Changelog' },
    { href: '/roadmap', label: 'Roadmap' },
  ],
  Solutions: [
    { href: '/solutions/restaurants', label: 'Restaurants' },
    { href: '/solutions/healthcare', label: 'Healthcare' },
    { href: '/solutions/retail', label: 'Retail' },
    { href: '/solutions/services', label: 'Services' },
    { href: '/solutions/enterprise', label: 'Enterprise' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Documentation' },
    { href: '/api', label: 'API Reference' },
    { href: '/help', label: 'Help Center' },
    { href: '/community', label: 'Community' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
    { href: '/press', label: 'Press Kit' },
    { href: '/partners', label: 'Partners' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/security', label: 'Security' },
    { href: '/gdpr', label: 'GDPR' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function LinearFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Footer grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">AuraRev</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Automate your review management and grow your business with AI-powered insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-tertiary hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-text-tertiary">
              <p>© 2024 AuraRev Inc.</p>
              <p className="hidden sm:block">•</p>
              <p>All rights reserved.</p>
            </div>

            {/* Status and theme toggle */}
            <div className="flex items-center gap-6">
              <Link
                href="/status"
                className="text-sm text-text-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                All systems operational
              </Link>
              <button
                className="text-sm text-text-secondary hover:text-white transition-colors"
                onClick={() => {
                  // Theme toggle logic would go here
                }}
              >
                Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}