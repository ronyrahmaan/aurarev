# 🚀 AuraRev Website Build Guide - Complete Linear.app Clone

## 📋 Project Overview

AuraRev is a review management platform that:
1. **Automatically collects reviews** from Google, Yelp, and Facebook
2. **Uses AI to generate trust blurbs** - Short marketing copy from reviews
3. **Auto-displays rotating proof banners** on business websites
4. **Sends automated follow-ups** to customers asking for reviews
5. **Generates weekly sentiment reports** for business owners

This guide ensures we build a pixel-perfect Linear.app clone with AuraRev's content.

---

## 🎯 Core Product Features (Must Implement)

### 1. Multi-Platform Review Collection
- **Platforms**: Google My Business, Yelp, Facebook
- **Sync Frequency**: Every 15 minutes
- **Dashboard View**: Unified feed with platform indicators
- **Key Benefit**: "Never miss a review again"

### 2. AI Trust Blurb Generator
- **Examples**:
  - "Rated 4.9★ for exceptional customer service"
  - "Customers love our 'fast delivery and friendly staff'"
  - "98% recommend us for 'quality and value'"
- **Features**: One-click copy, customizable tone, multiple lengths
- **Use Cases**: Website headers, email signatures, ads

### 3. Website Proof Widgets
- **Styles**:
  - Rotating carousel
  - Popup notification
  - Sidebar feed
  - Header banner
- **Customization**: Colors, timing, position, animation
- **Installation**: Simple embed code, < 2 minute setup

### 4. Automated Review Requests
- **Integrations**: Stripe, Square, Shopify, WooCommerce
- **Channels**: Email, SMS
- **Timing**: 24-72 hours post-purchase
- **Templates**: Pre-written, personalized, A/B tested

### 5. Weekly Intelligence Reports
- **Contents**:
  - Overall rating trends
  - Sentiment analysis (positive/negative themes)
  - Competitor comparison
  - Response rate metrics
  - Actionable insights
- **Delivery**: Email every Monday morning

---

## 🏗️ Website Structure (Linear.app Style)

### Navigation Structure
```
Logo | Product ▼ | Resources ▼ | Pricing | Customers | Now | Contact | Docs | Open app | Log in | Sign up
```

#### Product Dropdown
- Review Collection
- AI Insights
- Smart Widgets
- Automation
- Analytics

#### Resources Dropdown
- Blog
- Guides
- API Docs
- Case Studies
- System Status

---

## 📄 Homepage Sections (In Order)

### 1. Hero Section
**Layout**: Full-width, 100vh, gradient background
**Content**:
```
Headline: "AuraRev is a purpose-built tool for managing and monetizing reviews"
Subheadline: "Automatically collect reviews, generate AI trust blurbs, and display social proof that converts"
CTA Primary: "See AuraRev in action →"
CTA Secondary: "Start free trial"
```
**Visual**: Animated dashboard mockup showing review feed

### 2. Trust Bar
**Text**: "Powering review management for leading businesses"
**Logos**: 6-8 customer logos (grayscale, hover to color)

### 3. "Made for Modern Businesses" Section
Three cards with hover effects:

**Card 1: Purpose-built for reviews**
- Icon: Star in gradient circle
- Description: "Unified dashboard for all review platforms"

**Card 2: Designed to boost reputation**
- Icon: Trending up arrow
- Description: "AI-powered insights and responses"

**Card 3: Crafted to convert**
- Icon: Target
- Description: "Beautiful widgets that drive sales"

### 4. Product Feature Sections

#### Section A: Review Collection Hub
**Headline**: "All your reviews in one intelligent dashboard"
**Features**:
- Real-time sync from Google, Yelp, Facebook
- Smart filtering and search
- Sentiment indicators
- Quick response interface
**Visual**: Dashboard interface mockup

#### Section B: AI Trust Blurb Generator
**Headline**: "Transform reviews into marketing gold"
**Features**:
- One-click generation
- Multiple variations
- Customizable tone
- Copy to clipboard
**Visual**: Before/after review transformation

#### Section C: Smart Widget Display
**Headline**: "Display social proof that converts"
**Features**:
- 5 widget styles
- A/B testing built-in
- Mobile responsive
- Conversion tracking
**Visual**: Widget gallery preview

#### Section D: Automated Outreach
**Headline**: "Never miss a review opportunity"
**Features**:
- Post-purchase automation
- Smart timing
- Personalized templates
- Multi-channel (email/SMS)
**Visual**: Automation workflow diagram

#### Section E: Weekly Intelligence
**Headline**: "Stay ahead of your reputation"
**Features**:
- Trend analysis
- Competitor insights
- Action recommendations
- Export to PDF
**Visual**: Report preview

### 5. Workflow Visualization
**Headline**: "See how AuraRev works"
Interactive animation showing:
1. Review comes in →
2. AI processes →
3. Blurb generated →
4. Widget updates →
5. Report compiled

### 6. Metrics Section
Four columns:
- **10+ hrs** saved weekly
- **3.2x** more reviews
- **47%** increase in 5-stars
- **500K+** reviews managed

### 7. Integrations Showcase
**Headline**: "Works with your existing tools"
Orbiting logos animation:
- Center: AuraRev logo
- Orbiting: Google, Yelp, Facebook, Stripe, Square, Shopify, WordPress

### 8. Testimonials
Three cards with:
- 5-star rating
- Customer quote
- Name, role, company
- Profile image

### 9. Pricing Section
**Headline**: "Simple, transparent pricing"

**Starter** - $49/mo
- 1 location
- 100 review requests/mo
- Basic widgets
- Email support

**Growth** - $99/mo (Popular)
- 3 locations
- 500 requests/mo
- AI blurbs
- Priority support

**Scale** - $249/mo
- 10 locations
- Unlimited requests
- API access
- White-label options

**Enterprise** - Custom
- Unlimited locations
- Custom integrations
- Dedicated support
- SLA guarantee

### 10. Final CTA
**Headline**: "Ready to transform your review management?"
**Subheadline**: "Join 1000+ businesses already using AuraRev"
**Buttons**:
- Primary: "Start 14-day free trial"
- Secondary: "Book a demo"
**Trust text**: "No credit card required • Setup in 2 minutes • Cancel anytime"

---

## 🎨 Design System (Matching Linear)

### Colors
```css
/* Backgrounds */
--bg-primary: #0A0B0D;      /* Main dark background */
--bg-secondary: #111318;    /* Slightly lighter */
--bg-tertiary: #1A1D23;     /* Card backgrounds */

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A8A9B4;
--text-tertiary: #6E6F7A;

/* Accent - AuraRev Blue (replacing Linear purple) */
--primary: #3B82F6;         /* Main blue */
--primary-light: #60A5FA;   /* Lighter blue */
--gradient: linear-gradient(135deg, #3B82F6, #60A5FA);
```

### Typography
```css
/* Headings */
--h1: 72px, bold
--h2: 48px, bold
--h3: 36px, semibold
--h4: 24px, semibold

/* Body */
--body-lg: 18px
--body: 16px
--body-sm: 14px
```

### Components
- **Cards**: Dark background, subtle border, hover glow effect
- **Buttons**: Gradient primary, outline secondary
- **Animations**: Fade-in-up on scroll, smooth hovers
- **Spacing**: 8px grid system

---

## 🛠️ Implementation Checklist

### Phase 1: Foundation
- [ ] Update color system to AuraRev blue
- [ ] Create review-specific icons
- [ ] Set up component structure
- [ ] Configure animations

### Phase 2: Homepage
- [ ] Hero section with gradient
- [ ] Trust bar with logos
- [ ] "Made for businesses" cards
- [ ] All 5 product feature sections
- [ ] Workflow visualization
- [ ] Metrics display
- [ ] Integration orbit
- [ ] Testimonials
- [ ] Pricing cards
- [ ] Final CTA

### Phase 3: Product Pages
- [ ] /product/review-collection
- [ ] /product/ai-insights
- [ ] /product/widgets
- [ ] /product/automation
- [ ] /product/analytics

### Phase 4: Solution Pages
- [ ] /solutions/restaurants
- [ ] /solutions/healthcare
- [ ] /solutions/retail
- [ ] /solutions/services

### Phase 5: Resources
- [ ] Blog layout
- [ ] Documentation structure
- [ ] API reference
- [ ] Case studies

### Phase 6: Interactive Elements
- [ ] Dashboard demo
- [ ] AI blurb generator demo
- [ ] Widget preview tool
- [ ] ROI calculator
- [ ] Live review feed

### Phase 7: Polish
- [ ] Loading states
- [ ] Error states
- [ ] Mobile responsive
- [ ] Performance optimization
- [ ] SEO metadata

---

## 💡 Key Differentiators to Highlight

1. **Multi-platform sync** - Not just Google, but Yelp and Facebook too
2. **AI-powered blurbs** - Unique selling point
3. **Automated outreach** - Passive review generation
4. **Weekly intelligence** - Proactive insights
5. **Quick setup** - "2 minutes to first review"

---

## 📝 Copy Guidelines

### Tone
- Professional but approachable
- Focus on time-saving and automation
- Use metrics and specifics
- Emphasize "set and forget" nature

### Key Phrases
- "On autopilot"
- "Never miss a review"
- "Transform reviews into revenue"
- "Build trust automatically"
- "Your reputation, amplified"

### Value Props
- Save 10+ hours per week
- Get 3x more reviews
- Increase 5-star ratings by 47%
- Boost conversion by 15%

---

## 🚦 Success Criteria

1. **Visual**: Matches Linear's quality and aesthetics
2. **Content**: Clearly explains AuraRev's value
3. **Performance**: Fast load times, smooth animations
4. **Conversion**: Clear CTAs, compelling copy
5. **Trust**: Professional design builds credibility

---

## 📊 Tracking Progress

Use this guide to ensure every element is implemented correctly. Check off items as completed and refer back when needed.

**Last Updated**: November 2024
**Version**: 1.0
**Status**: Ready for Implementation