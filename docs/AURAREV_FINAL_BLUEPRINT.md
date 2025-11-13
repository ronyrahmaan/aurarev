# AuraRev - MVP Build Blueprint for Claude Code

## ⚠️ IMPORTANT: READ THIS FIRST

**This blueprint is designed for someone relying heavily on Claude Code to write code.**

**What Claude Code WILL do:**
- ✅ Write frontend/backend code
- ✅ Create components and pages
- ✅ Set up database schemas
- ✅ Generate API endpoints

**What YOU MUST do manually:**
- ❌ Get OAuth credentials from Google Developer Console
- ❌ Deploy to production (Vercel, Railway, Neon)
- ❌ Configure domain DNS
- ❌ Set up Stripe account
- ❌ Test with real Google Business accounts
- ❌ Debug production issues

**Estimated YOUR time required:** 30-40 hours over 6-8 weeks

---

## 🎯 Project Overview

**Product Name:** AuraRev  
**Type:** SaaS Web Application (Review Management Platform)  
**Target Users:** Small to medium businesses (restaurants, salons, retail stores, etc.)

## 📍 BUILD STRATEGY: MVP First Approach

We're building in **2 PHASES** to avoid overwhelm:

### **PHASE 1 - MVP (Weeks 1-6):** 
Focus on core value, get to market fast
1. ✅ Google Reviews ONLY (skip Facebook/Instagram initially)
2. ✅ Basic dashboard to view reviews
3. ✅ AI-powered review blurbs
4. ✅ Manual review requests (no automation yet)
5. ✅ Simple weekly email summary
6. ✅ Basic authentication

### **PHASE 2 - Full Product (Weeks 7-12):**
Add after MVP works and has paying customers
1. Facebook Reviews integration
2. Instagram integration
3. Automated follow-up emails
4. Advanced analytics
5. Automated cron jobs
6. Review response system

**This blueprint covers PHASE 1 (MVP) only.**

---

## 🗄️ Database Choice: Neon.tech

**Why Neon (not Supabase):**
- ✅ Pure PostgreSQL (standard, portable)
- ✅ Simpler setup (just connection string)
- ✅ Database branching (test with prod data)
- ✅ Serverless (scales to zero, saves money)
- ✅ Easier for Claude Code to work with
- ✅ No vendor lock-in

**Setup:** 5 minutes (we'll do this in Phase 1)

---

## 📁 MVP Project Structure (Simplified)

```
aurarev-mvp/
├── app/                      # Next.js 14 (App Router)
│   ├── (marketing)/         # Public pages
│   │   ├── page.tsx         # Homepage
│   │   └── pricing/         # Pricing page
│   ├── (auth)/              # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected dashboard
│   │   ├── dashboard/       # Overview page
│   │   ├── reviews/         # Reviews list
│   │   └── settings/        # Settings (connect Google)
│   └── api/                 # API routes (Next.js)
│       ├── auth/[...nextauth]/   # NextAuth
│       ├── google/
│       │   ├── connect/     # OAuth callback
│       │   └── reviews/     # Pull reviews
│       ├── reviews/         # CRUD operations
│       └── openai/          # AI blurb generation
├── components/
│   ├── ui/                  # shadcn components
│   ├── marketing/           # Marketing components
│   └── dashboard/           # Dashboard components
├── lib/
│   ├── db.ts               # Neon database client
│   ├── google-api.ts       # Google API helper
│   └── openai.ts           # OpenAI helper
└── prisma/
    └── schema.prisma       # Prisma schema for Neon
```

**Key Simplifications for MVP:**
- ✅ Next.js API routes (no separate backend server)
- ✅ Google Reviews ONLY (no Facebook/Instagram yet)
- ✅ Prisma ORM (easier than raw SQL)
- ✅ Manual review pulling (no cron jobs yet)
- ✅ Simplified email (SendGrid, weekly only)

---

## 🚀 PHASE 1 - MVP: Foundation Setup (Week 1)

### Step 1.1: Initialize Next.js Project

**Command for terminal:**
```bash
npx create-next-app@latest aurarev-mvp --typescript --tailwind --app --use-npm
cd aurarev-mvp
```

**Select these options when prompted:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: No
- ✅ App Router: Yes
- ✅ Import alias: No (or default @/*)

---

### Step 1.2: Install Core Dependencies

```bash
# UI Components
npm install @radix-ui/react-icons lucide-react
npm install class-variance-authority clsx tailwind-merge

# Authentication
npm install next-auth@beta
npm install bcryptjs
npm install -D @types/bcryptjs

# Database (Neon + Prisma)
npm install @prisma/client
npm install -D prisma

# API Clients
npm install axios

# AI
npm install openai

# Email
npm install @sendgrid/mail

# Date utilities
npm install date-fns

# Forms
npm install react-hook-form @hookform/resolvers zod
```

---

### Step 1.3: Setup shadcn/ui

```bash
npx shadcn-ui@latest init
```

**Configuration (when prompted):**
- Style: Default
- Base color: Slate
- CSS variables: Yes

**Install needed components:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add switch
```

---

### Step 1.4: Setup Neon Database

**🚨 YOU MUST DO THIS MANUALLY (Claude Code cannot):**

1. Go to https://neon.tech
2. Sign up with GitHub/Google
3. Click "Create Project"
4. Name it: `aurarev-mvp`
5. Region: Choose closest to you (US East, EU West, etc.)
6. Click "Create Project"

**Copy the connection string shown** - looks like:
```
postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Save this - you'll need it for `.env.local`**

---

### Step 1.5: Setup Prisma with Neon

**Initialize Prisma:**
```bash
npx prisma init
```

**File: `.env.local`** (create this file in root)
```bash
# Database (Neon)
DATABASE_URL="postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-random-string-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (YOU'LL ADD THESE LATER IN STEP 2.4)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# OpenAI (YOU'LL ADD THIS LATER)
OPENAI_API_KEY="your-openai-key"

# SendGrid (YOU'LL ADD THIS LATER)
SENDGRID_API_KEY="your-sendgrid-key"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Copy output and paste into `.env.local`

---

### Step 1.6: Create Prisma Schema

**File: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Users
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  businessName  String?
  fullName      String?
  plan          String    @default("free") // free, starter, pro
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  accounts      ConnectedAccount[]
  reviews       Review[]
}

// Connected Google Account
model ConnectedAccount {
  id              String    @id @default(cuid())
  userId          String
  platform        String    // "google" for MVP
  accessToken     String    @db.Text
  refreshToken    String?   @db.Text
  expiresAt       DateTime?
  businessId      String?   // Google location ID
  businessName    String?
  isActive        Boolean   @default(true)
  connectedAt     DateTime  @default(now())
  
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, platform])
}

// Reviews
model Review {
  id                String    @id @default(cuid())
  userId            String
  platform          String    // "google" for MVP
  platformReviewId  String    // Google's review ID
  reviewerName      String?
  reviewerAvatar    String?
  rating            Int       // 1-5
  reviewText        String?   @db.Text
  reviewDate        DateTime
  aiBlurb           String?   @db.Text
  sentiment         String?   // "positive", "neutral", "negative"
  pulledAt          DateTime  @default(now())
  
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([platform, platformReviewId])
  @@index([userId])
}
```

**Push schema to Neon:**
```bash
npx prisma db push
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

---

### Step 1.7: Create Database Client

**File: `lib/db.ts`**

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

### Step 1.8: Configure Tailwind

**File: `tailwind.config.ts`** (update the theme section)

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
  },
}
```

---

## ✅ Checkpoint 1

**Test that everything works:**

```bash
npm run dev
```

Open http://localhost:3000 - you should see default Next.js page.

**If it works:** ✅ Proceed to Phase 2  
**If errors:** Read error messages, check you followed all steps

---

## 🎨 PHASE 2 - MVP: Marketing Pages (Week 1)

**Goal:** Create simple landing page + pricing page to explain product

### ⚠️ CLONING STRATEGY

**Claude Code needs EXACT visual references. For each component, we specify:**
1. Which website to reference (with specific page URL)
2. Which exact section/component to clone
3. Precise measurements and styling details
4. Element-by-element breakdown

---

### Step 2.1: Create Homepage Hero Section

**File: `app/page.tsx`**

**CLONE FROM:** Linear.app homepage hero section (https://linear.app)

**Ask Claude Code:**
```
Create the homepage hero section for AuraRev by cloning Linear.app's hero section.

EXACT SPECIFICATIONS TO CLONE:

1. LAYOUT (from Linear.app):
   - Two-column grid: 60% left (text), 40% right (visual)
   - Vertical centering
   - Max width container: 1280px
   - Padding: py-20 (80px top/bottom)

2. LEFT SIDE - TEXT CONTENT:
   Clone Linear's text hierarchy:
   - Main headline: 
     * Font size: text-6xl (60px)
     * Font weight: font-bold
     * Line height: tight (1.1)
     * Color: text-gray-900
     * Text: "Automate Your Google Review Management"
   
   - Subheadline (below headline, 16px gap):
     * Font size: text-xl (20px)
     * Color: text-gray-600
     * Line height: relaxed (1.75)
     * Max width: 600px
     * Text: "AuraRev automatically pulls your Google reviews, generates AI-powered marketing blurbs, and delivers weekly insights—all on autopilot."
   
   - Button group (below subheadline, 24px gap):
     * Flex row with 16px gap between buttons
     * Primary button (shadcn Button):
       - Size: lg
       - Variant: default
       - Background: gradient from blue-600 to blue-700
       - Text: "Start Free Trial"
       - Padding: px-8 py-4
     * Secondary button:
       - Size: lg
       - Variant: outline
       - Text: "View Demo"

3. RIGHT SIDE - VISUAL:
   - Use placeholder for now (we'll add illustration later)
   - Background: gradient from blue-50 to purple-50
   - Rounded corners: rounded-2xl
   - Aspect ratio: 4:3
   - Shadow: shadow-2xl

4. BACKGROUND (clone Linear's gradient):
   - Top: bg-gradient-to-b from-white to-blue-50/30
   - Subtle grid pattern (optional)

5. RESPONSIVE (Mobile):
   - Stack vertically on mobile (flex-col)
   - Text section: 100% width, order-1
   - Visual section: 100% width, order-2, mt-12
   - Headline: text-4xl on mobile
   - Subheadline: text-lg on mobile

Use Tailwind CSS and shadcn/ui Button component.
Make it look EXACTLY like Linear.app's hero section.
```

---

### Step 2.2: Create Features Section

**File: `app/page.tsx` (same file, below hero)**

**CLONE FROM:** Linear.app features section (scroll down on https://linear.app)

**Ask Claude Code:**
```
Add a features section below the hero, cloning Linear.app's features grid.

EXACT SPECIFICATIONS TO CLONE:

1. CONTAINER (from Linear.app):
   - Max width: 1280px
   - Padding: py-24 (96px top/bottom)
   - Background: white

2. SECTION HEADER (centered):
   - Heading: "Everything you need to manage reviews"
   - Font size: text-3xl
   - Font weight: font-bold
   - Color: text-gray-900
   - Margin bottom: mb-16

3. GRID LAYOUT (clone Linear's feature grid):
   - Grid: grid-cols-3 (3 columns on desktop)
   - Gap: gap-8 (32px between cards)
   - Mobile: grid-cols-1 (stack on mobile)
   - Tablet: grid-cols-2

4. FEATURE CARDS (3 cards total):
   Clone Linear's card style for each:
   
   Card structure:
   - Background: bg-white
   - Border: border border-gray-200
   - Rounded: rounded-xl
   - Padding: p-8
   - Hover effect: hover:shadow-lg, transition duration-300
   
   Card content (top to bottom):
   
   a) Icon container:
      - Size: w-12 h-12
      - Background: bg-blue-100
      - Rounded: rounded-lg
      - Flex center: flex items-center justify-center
      - Icon size: 24px
      - Icon color: text-blue-600
   
   b) Title (below icon, 16px gap):
      - Font size: text-xl
      - Font weight: font-semibold
      - Color: text-gray-900
   
   c) Description (below title, 8px gap):
      - Font size: text-base
      - Color: text-gray-600
      - Line height: relaxed

5. THREE FEATURE CARDS CONTENT:

   CARD 1:
   - Icon: RefreshCw from lucide-react
   - Title: "Automated Review Pulling"
   - Description: "Connect once and never worry again. AuraRev automatically syncs your Google reviews every day."

   CARD 2:
   - Icon: Sparkles from lucide-react
   - Title: "AI-Powered Blurbs"
   - Description: "Get marketing-ready testimonials instantly. Our AI transforms reviews into persuasive copy."

   CARD 3:
   - Icon: Mail from lucide-react
   - Title: "Weekly Insights"
   - Description: "Receive comprehensive summaries every Monday. Track ratings, sentiment, and trends effortlessly."

Use Tailwind CSS, shadcn/ui Card component, and lucide-react icons.
Make it look EXACTLY like Linear.app's features section.
```

---

### Step 2.3: Create Pricing Page

**File: `app/pricing/page.tsx`**

**CLONE FROM:** Notion.so pricing page (https://www.notion.so/pricing)

**Ask Claude Code:**
```
Create the pricing page for AuraRev by cloning Notion's pricing page layout.

EXACT SPECIFICATIONS TO CLONE:

1. PAGE CONTAINER (from Notion):
   - Max width: 1280px
   - Center aligned
   - Padding: py-24 px-6
   - Background: bg-gray-50

2. PAGE HEADER (centered, clone Notion's header):
   - Heading: "Simple, transparent pricing"
   - Font size: text-5xl
   - Font weight: font-bold
   - Color: text-gray-900
   - Margin bottom: mb-4
   
   - Subheading:
   - Text: "Start free, upgrade when you grow"
   - Font size: text-xl
   - Color: text-gray-600
   - Margin bottom: mb-16

3. PRICING CARDS GRID:
   - Grid: grid-cols-2 (2 cards side-by-side)
   - Gap: gap-8
   - Mobile: grid-cols-1 (stack on mobile)

4. PRICING CARD STRUCTURE (clone Notion's card style):
   
   Common card styling:
   - Background: bg-white
   - Border: border-2 border-gray-200
   - Rounded: rounded-2xl
   - Padding: p-8
   - Shadow: shadow-sm
   - Hover: hover:shadow-xl transition
   
   Card layout (top to bottom):
   
   a) Plan name:
      - Font size: text-2xl
      - Font weight: font-bold
      - Color: text-gray-900
      - Margin bottom: mb-2
   
   b) Price:
      - Font size: text-5xl
      - Font weight: font-extrabold
      - Color: text-gray-900
      - Display: flex items-baseline
      - Format: "$0" + "/month" (smaller)
      - Margin bottom: mb-6
   
   c) Description:
      - Font size: text-base
      - Color: text-gray-600
      - Margin bottom: mb-8
   
   d) Features list:
      - Each feature: flex items-start
      - Gap between items: space-y-4
      - Checkmark icon: Check from lucide-react
      - Icon color: text-green-500
      - Icon size: w-5 h-5
      - Text: text-gray-700
   
   e) CTA button:
      - Width: full (w-full)
      - Size: lg
      - Margin top: mt-8

5. TWO PRICING TIERS:

   TIER 1 - FREE (left card):
   - Plan name: "Free"
   - Price: "$0/month"
   - Description: "Perfect for trying out AuraRev"
   - Features:
     ✓ Up to 50 reviews per month
     ✓ Google Reviews integration
     ✓ AI-generated blurbs
     ✓ Weekly email summary
     ✓ Email support
   - Button: "Get Started" (variant: outline)

   TIER 2 - PRO (right card):
   - SPECIAL STYLING:
     * Border: border-blue-500 (highlighted)
     * Border width: border-4
     * Relative positioning for badge
   
   - Badge (absolute, top-right):
     * Position: absolute -top-4 right-8
     * Background: bg-blue-500
     * Text: "POPULAR"
     * Color: text-white
     * Font size: text-xs
     * Font weight: font-bold
     * Padding: px-4 py-1
     * Rounded: rounded-full
   
   - Plan name: "Professional"
   - Price: "$29/month"
   - Description: "For growing businesses"
   - Features:
     ✓ Up to 500 reviews per month
     ✓ Google Reviews integration
     ✓ AI-generated blurbs
     ✓ Daily email summaries
     ✓ Advanced analytics dashboard
     ✓ Priority email support
   - Button: "Start Free Trial" (variant: default, gradient bg)

Use Tailwind CSS, shadcn/ui Card and Button components, lucide-react icons.
Make it look EXACTLY like Notion's pricing page.
```

---

### Step 2.4: Create Navigation Bar

**File: `components/marketing/Navbar.tsx`**

**CLONE FROM:** Superhuman.com navbar (https://superhuman.com)

**Ask Claude Code:**
```
Create a navigation bar by cloning Superhuman's navbar design.

EXACT SPECIFICATIONS TO CLONE:

1. NAVBAR CONTAINER (from Superhuman):
   - Position: fixed top-0 w-full
   - Z-index: z-50
   - Background: bg-white/80 (semi-transparent)
   - Backdrop blur: backdrop-blur-md
   - Border bottom: border-b border-gray-200
   
2. INNER CONTAINER:
   - Max width: 1280px
   - Margin: mx-auto
   - Padding: px-6
   - Height: h-16
   - Flex: flex items-center justify-between

3. LEFT SIDE - LOGO:
   - Flex: flex items-center gap-2
   - Logo icon: Star from lucide-react
   - Icon: w-6 h-6, text-blue-600
   - Text: "AuraRev"
   - Font size: text-2xl
   - Font weight: font-bold
   - Color: text-gray-900

4. CENTER - NAV LINKS (desktop only):
   - Flex: flex items-center gap-8
   - Hidden on mobile: hidden md:flex
   
   Each link:
   - Font size: text-sm
   - Font weight: font-medium
   - Color: text-gray-600
   - Hover: hover:text-gray-900
   - Transition: transition-colors
   
   Links: "Features", "Pricing"

5. RIGHT SIDE - BUTTONS:
   - Flex: flex items-center gap-4
   
   Desktop buttons:
   - Login link:
     * Text: "Login"
     * Font size: text-sm
     * Color: text-gray-600
     * Hover: hover:text-gray-900
   
   - Get Started button (shadcn Button):
     * Variant: default
     * Size: sm
     * Text: "Get Started"
     * Background: gradient from blue-600 to blue-700

6. MOBILE MENU:
   - Hamburger icon button (Menu from lucide-react)
   - Show on mobile: block md:hidden
   - When clicked, open sheet (use shadcn Sheet component)
   
   Mobile sheet content:
   - Background: bg-white
   - Padding: p-6
   - Stack nav links vertically
   - Full-width buttons at bottom

7. SCROLL BEHAVIOR:
   - Add shadow when scrolled: transition shadow-sm
   - Use useState to track scroll position
   - Add shadow-md when scrollY > 0

Use Tailwind CSS, shadcn/ui Button and Sheet components, lucide-react icons.
Make it look EXACTLY like Superhuman's navbar.
```

---

### Step 2.5: Create Footer

**File: `components/marketing/Footer.tsx`**

**CLONE FROM:** Stripe.com footer (https://stripe.com)

**Ask Claude Code:**
```
Create a footer by cloning Stripe's footer design.

EXACT SPECIFICATIONS TO CLONE:

1. FOOTER CONTAINER (from Stripe):
   - Background: bg-gray-900
   - Padding: py-12
   - Color: text-gray-400

2. INNER CONTAINER:
   - Max width: 1280px
   - Margin: mx-auto
   - Padding: px-6

3. FOOTER GRID:
   - Grid: grid-cols-4 (4 columns on desktop)
   - Gap: gap-8
   - Mobile: grid-cols-1 (stack on mobile)
   - Tablet: grid-cols-2

4. COLUMN STRUCTURE:
   
   Column header:
   - Font size: text-sm
   - Font weight: font-semibold
   - Color: text-white
   - Margin bottom: mb-4
   - Uppercase: uppercase
   - Letter spacing: tracking-wider
   
   Column links:
   - Stack: space-y-3
   - Font size: text-sm
   - Color: text-gray-400
   - Hover: hover:text-white
   - Transition: transition-colors

5. FOUR COLUMNS CONTENT:

   COLUMN 1 - Product:
   - Header: "Product"
   - Links: Features, Pricing, Integrations

   COLUMN 2 - Company:
   - Header: "Company"
   - Links: About, Blog, Contact

   COLUMN 3 - Resources:
   - Header: "Resources"
   - Links: Help Center, Documentation

   COLUMN 4 - Legal:
   - Header: "Legal"
   - Links: Privacy Policy, Terms of Service

6. BOTTOM SECTION (below columns, 48px gap):
   - Border top: border-t border-gray-800
   - Padding top: pt-8
   - Flex: flex justify-between items-center
   - Mobile: flex-col gap-4
   
   Left side:
   - Copyright: "© 2024 AuraRev. All rights reserved."
   - Font size: text-sm
   - Color: text-gray-500
   
   Right side - Social icons:
   - Flex: flex gap-4
   - Icons: Twitter, Linkedin, Facebook (from lucide-react)
   - Size: w-5 h-5
   - Color: text-gray-400
   - Hover: hover:text-white
   - Transition: transition-colors

Use Tailwind CSS and lucide-react icons.
Make it look EXACTLY like Stripe's footer.
```

---

### Step 2.6: Update Main Layout to Include Navbar & Footer

**File: `app/layout.tsx`**

**Ask Claude Code:**
```
Update the root layout to include Navbar and Footer on all pages.

Structure:
1. Import Navbar from @/components/marketing/Navbar
2. Import Footer from @/components/marketing/Footer
3. Wrap children with:
   - <Navbar /> at top
   - Main content with padding-top (pt-16 to account for fixed navbar)
   - <Footer /> at bottom

Code structure:
<html>
  <body>
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
    <Footer />
  </body>
</html>
```

---

## ✅ Checkpoint 2

**Test marketing pages:**

```bash
npm run dev
```

**Visit and verify EXACT cloning:**
- http://localhost:3000 → Compare hero with Linear.app
- http://localhost:3000 → Compare features with Linear.app
- http://localhost:3000/pricing → Compare with Notion pricing
- Check navbar matches Superhuman
- Check footer matches Stripe

**Checklist:**
- ✅ Hero section looks like Linear.app (layout, colors, sizing)
- ✅ Features cards match Linear.app style
- ✅ Pricing cards match Notion.so style
- ✅ Navbar matches Superhuman (sticky, blur effect)
- ✅ Footer matches Stripe (dark, 4 columns)
- ✅ Everything is responsive on mobile
- ✅ No console errors

**If something doesn't look right:**
1. Compare side-by-side with reference website
2. Check Tailwind classes match specifications
3. Ask Claude Code to adjust specific elements

---
> - Sticky on scroll
> - Mobile: Hamburger menu
> - Copy Superhuman.com navbar style"

**Then update `app/layout.tsx` to include Navbar on all pages**

---

### Step 2.4: Create Footer

**File: `components/marketing/Footer.tsx`**

**Ask Claude Code:**
> "Create a simple footer with:
> - 3 columns: Product (Features, Pricing), Company (About, Contact), Legal (Privacy, Terms)
> - Social icons (Twitter, LinkedIn)
> - Copyright text
> - Dark background like Stripe's footer"

**Add to `app/layout.tsx`**

---

## ✅ Checkpoint 2

**Test marketing pages:**

```bash
npm run dev
```

Visit:
- http://localhost:3000 (homepage)
- http://localhost:3000/pricing

**Check:**
- ✅ Pages load without errors
- ✅ Responsive on mobile (resize browser)
- ✅ Buttons and links work
- ✅ Design looks clean

---

## 🔐 PHASE 3 - MVP: Authentication (Week 2)

**Goal:** Basic email/password authentication (no OAuth yet)

---

### Step 3.1: Setup NextAuth.js

**File: `app/api/auth/[...nextauth]/route.ts`**

**Ask Claude Code:**
> "Set up NextAuth.js with:
> 1. Credentials provider (email + password)
> 2. Use Prisma adapter for database
> 3. Compare passwords with bcryptjs
> 4. JWT session strategy
> 5. Custom sign-in page at /login
> 6. Redirect to /dashboard after login"

**Claude Code will generate the NextAuth configuration.**

---

### Step 3.2: Create Login Page

**File: `app/login/page.tsx`**

**Ask Claude Code:**
> "Create a login page with:
> - Centered card design (max-width 400px)
> - Email input field
> - Password input field
> - 'Sign In' button
> - Link to signup page at bottom: 'Don't have an account? Sign up'
> - Use react-hook-form + zod for validation
> - Show error toast if login fails
> - Copy Stripe's clean login page style"

---

### Step 3.3: Create Signup Page

**File: `app/signup/page.tsx`**

**Ask Claude Code:**
> "Create a signup page with:
> - Centered card design
> - Business name field
> - Full name field
> - Email field
> - Password field (min 8 chars)
> - Confirm password field
> - 'Create Account' button
> - Use react-hook-form + zod
> - Hash password with bcryptjs before saving
> - Create user in database via API
> - Redirect to /dashboard after signup
> - Link to login at bottom"

---

### Step 3.4: Create Signup API

**File: `app/api/auth/signup/route.ts`**

**Ask Claude Code:**
> "Create a signup API endpoint that:
> 1. Accepts POST with { businessName, fullName, email, password }
> 2. Validates email is unique (check database)
> 3. Hashes password with bcryptjs (10 rounds)
> 4. Creates user in Prisma database
> 5. Returns 201 on success, 400 if email exists
> 6. Returns 500 on database errors"

---

### Step 3.5: Protect Dashboard Routes

**File: `app/dashboard/layout.tsx`**

**Ask Claude Code:**
> "Create a dashboard layout that:
> 1. Checks if user is authenticated with NextAuth
> 2. If not authenticated, redirect to /login
> 3. Shows a simple sidebar (we'll build proper one later)
> 4. Has logout button in header"

---

### Step 3.6: Test Authentication

**Manual testing (YOU do this):**

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000/signup
3. Create an account with your email
4. Check Neon database (go to neon.tech dashboard, view `User` table)
5. Verify user was created
6. Go to http://localhost:3000/login
7. Log in with your credentials
8. Should redirect to /dashboard
9. Try accessing /dashboard without login - should redirect to /login

**If all works:** ✅ Authentication is working!

---

## ✅ Checkpoint 3

**Verify:**
- ✅ Can create account at /signup
- ✅ User appears in Neon database
- ✅ Can login at /login
- ✅ Redirects to /dashboard when logged in
- ✅ /dashboard is protected (redirects to /login if not logged in)
- ✅ Can logout

---

## 📊 PHASE 4 - MVP: Dashboard Structure (Week 2-3)

**Goal:** Create basic dashboard layout with navigation

---

### Step 4.1: Create Dashboard Layout

**File: `app/dashboard/layout.tsx`**

**CLONE FROM:** Stripe Dashboard (https://dashboard.stripe.com - you'll need an account to see it, or reference screenshots)

**Ask Claude Code:**
```
Create a dashboard layout by cloning Stripe's dashboard structure.

EXACT SPECIFICATIONS TO CLONE:

1. OVERALL LAYOUT (from Stripe):
   - Two-column layout: Sidebar (fixed left) + Main content area
   - Full height: min-h-screen
   - Background: bg-gray-50

2. SIDEBAR (LEFT SIDE - FIXED):
   
   Container:
   - Position: fixed
   - Left: left-0
   - Top: top-0
   - Width: w-64 (256px)
   - Height: h-screen
   - Background: bg-white
   - Border right: border-r border-gray-200
   - Z-index: z-40
   - Flex column: flex flex-col
   
   Logo section (top):
   - Padding: p-6
   - Border bottom: border-b border-gray-200
   - Logo: "AuraRev" with Star icon
   - Font size: text-xl
   - Font weight: font-bold
   - Color: text-gray-900
   
   Navigation menu (middle, flex-1):
   - Padding: py-4
   - Overflow: overflow-y-auto
   
   Each nav item:
   - Width: full (w-full)
   - Padding: px-6 py-3
   - Flex: flex items-center gap-3
   - Font size: text-sm
   - Font weight: font-medium
   - Color: text-gray-700
   - Hover: hover:bg-gray-100
   - Active state: bg-blue-50, text-blue-600, border-l-4 border-blue-600
   - Transition: transition-colors
   
   Navigation items (with lucide-react icons):
   1. 📊 LayoutDashboard icon + "Dashboard" → /dashboard
   2. ⭐ Star icon + "Reviews" → /dashboard/reviews
   3. ⚙️ Settings icon + "Settings" → /dashboard/settings
   
   User section (bottom):
   - Padding: p-6
   - Border top: border-t border-gray-200
   - Flex: flex items-center gap-3
   
   User avatar:
   - Use shadcn Avatar component
   - Size: w-10 h-10
   - Background: bg-blue-600
   - Text color: text-white
   - Show user initials
   
   User info:
   - Flex column: flex flex-col
   - Name: text-sm font-medium text-gray-900
   - Email: text-xs text-gray-500
   
   Logout button:
   - Icon: LogOut from lucide-react
   - Size: w-5 h-5
   - Color: text-gray-400
   - Hover: hover:text-gray-600
   - Cursor: cursor-pointer

3. MAIN CONTENT AREA (RIGHT SIDE):
   
   Container:
   - Margin left: ml-64 (offset for sidebar)
   - Min height: min-h-screen
   - Background: bg-gray-50
   
   Top header bar:
   - Background: bg-white
   - Height: h-16
   - Border bottom: border-b border-gray-200
   - Padding: px-8
   - Flex: flex items-center justify-between
   - Sticky: sticky top-0
   - Z-index: z-30
   
   Header left (page title):
   - Font size: text-2xl
   - Font weight: font-semibold
   - Color: text-gray-900
   - Get from current route
   
   Header right (user avatar):
   - Use shadcn Avatar component
   - Size: w-8 h-8
   - Clickable dropdown (optional for MVP)
   
   Content area:
   - Padding: p-8
   - Main children render here

4. MOBILE RESPONSIVE:
   - On mobile (md:hidden):
     * Hide sidebar
     * Show hamburger menu button (top-left, fixed)
     * When clicked, show sidebar as overlay (shadcn Sheet component)
   - Hamburger button:
     * Position: fixed top-4 left-4
     * Z-index: z-50
     * Icon: Menu from lucide-react
     * Background: bg-white
     * Padding: p-2
     * Rounded: rounded-lg
     * Shadow: shadow-md

Use Tailwind CSS, shadcn/ui Avatar and Sheet components, lucide-react icons.
Make it look EXACTLY like Stripe's dashboard layout.
```

---

### Step 4.2: Create Dashboard Homepage

**File: `app/dashboard/page.tsx`**

**CLONE FROM:** HubSpot Dashboard (https://app.hubspot.com/dashboard - need account, or reference similar SaaS dashboards)

**Ask Claude Code:**
```
Create dashboard homepage by cloning HubSpot's dashboard overview style.

EXACT SPECIFICATIONS TO CLONE:

1. PAGE CONTAINER:
   - Max width: max-w-7xl
   - Margin: mx-auto
   - Padding: py-6

2. PAGE HEADER:
   - Flex: flex justify-between items-center
   - Margin bottom: mb-8
   
   Left side:
   - Heading: "Dashboard"
   - Font size: text-3xl
   - Font weight: font-bold
   - Color: text-gray-900
   
   Right side:
   - Button: "Pull Reviews" (shadcn Button)
   - Variant: default
   - Icon: RefreshCw from lucide-react

3. STATS CARDS GRID (4 cards):
   
   Grid layout:
   - Grid: grid-cols-4
   - Gap: gap-6
   - Mobile: grid-cols-1
   - Tablet: grid-cols-2
   - Margin bottom: mb-8
   
   Card structure (shadcn Card):
   - Background: bg-white
   - Padding: p-6
   - Rounded: rounded-lg
   - Shadow: shadow-sm
   - Border: border border-gray-200
   
   Card content (flex flex-col):
   
   a) Card header (flex justify-between items-start):
      - Left: Title text
        * Font size: text-sm
        * Font weight: font-medium
        * Color: text-gray-600
      - Right: Icon
        * Size: w-8 h-8
        * Color: text-blue-600
        * Background: bg-blue-50
        * Padding: p-2
        * Rounded: rounded-lg
   
   b) Card value (mt-4):
      - Font size: text-3xl
      - Font weight: font-bold
      - Color: text-gray-900
   
   c) Card trend (mt-2, flex items-center gap-2):
      - Icon: TrendingUp or TrendingDown
      - Size: w-4 h-4
      - Color: text-green-600 (up) or text-red-600 (down)
      - Text: font-medium text-sm
      - Color: text-green-600 (up) or text-red-600 (down)

4. FOUR STAT CARDS:

   CARD 1 - Total Reviews:
   - Icon: Star (lucide-react)
   - Title: "Total Reviews"
   - Value: "0" (placeholder)
   - Trend: "+0% from last month"
   
   CARD 2 - Average Rating:
   - Icon: TrendingUp (lucide-react)
   - Title: "Average Rating"
   - Value: "0.0/5.0"
   - Trend: "+0.0 from last month"
   
   CARD 3 - This Week:
   - Icon: Calendar (lucide-react)
   - Title: "This Week"
   - Value: "0"
   - Trend: "0 new reviews"
   
   CARD 4 - Sentiment:
   - Icon: Smile (lucide-react)
   - Title: "Sentiment"
   - Value: "0%"
   - Trend: "0% positive"

5. RECENT REVIEWS SECTION:
   
   Section header:
   - Flex: flex justify-between items-center
   - Margin bottom: mb-6
   
   Left:
   - Heading: "Recent Reviews"
   - Font size: text-xl
   - Font weight: font-semibold
   
   Right:
   - Link: "View All" → /dashboard/reviews
   - Font size: text-sm
   - Color: text-blue-600
   - Hover: hover:underline
   
   Table (shadcn Table):
   - Background: bg-white
   - Rounded: rounded-lg
   - Shadow: shadow-sm
   - Border: border border-gray-200
   
   Table columns:
   1. Rating (stars visual)
   2. Review Text (truncated to 100 chars)
   3. Date (relative: "2 days ago")
   4. Platform (badge: "Google")
   
   Empty state (if no reviews):
   - Padding: py-12
   - Text center: text-center
   - Icon: Inbox (lucide-react), size w-12 h-12, color text-gray-400
   - Text: "No reviews yet"
   - Subtext: "Connect your Google Business account to get started"
   - Button: "Go to Settings"

Use placeholder data for now (all zeros).
Use Tailwind CSS, shadcn/ui Card, Button, and Table components.
Make it look EXACTLY like HubSpot's dashboard overview.
```

---

### Step 4.3: Create Reviews List Page

**File: `app/dashboard/reviews/page.tsx`**

**CLONE FROM:** Trustpilot Business Dashboard (https://business.trustpilot.com/reviews)

**Ask Claude Code:**
```
Create reviews list page by cloning Trustpilot's review display style.

EXACT SPECIFICATIONS TO CLONE:

1. PAGE CONTAINER:
   - Max width: max-w-7xl
   - Margin: mx-auto
   - Padding: py-6

2. PAGE HEADER:
   - Heading: "Reviews"
   - Font size: text-3xl
   - Font weight: font-bold
   - Margin bottom: mb-8

3. FILTER BAR (sticky):
   
   Container:
   - Background: bg-white
   - Padding: p-4
   - Rounded: rounded-lg
   - Shadow: shadow-sm
   - Border: border border-gray-200
   - Margin bottom: mb-6
   - Flex: flex gap-4 items-center
   - Wrap: flex-wrap
   
   Filters (shadcn Select components):
   
   a) Platform filter:
      - Label: "Platform"
      - Width: w-48
      - Options: All, Google
   
   b) Rating filter:
      - Label: "Rating"
      - Width: w-48
      - Options: All, 5★, 4★, 3★, 2★, 1★
   
   c) Date range:
      - Label: "Date Range"
      - Width: w-48
      - Options: Last 7 days, Last 30 days, Last 3 months

4. REVIEW CARDS:
   
   Container:
   - Stack: space-y-4
   
   Each review card (shadcn Card):
   - Background: bg-white
   - Padding: p-6
   - Rounded: rounded-lg
   - Shadow: shadow-sm
   - Border: border border-gray-200
   
   Card layout (flex flex-col gap-4):
   
   a) Card header (flex justify-between items-start):
      - Left side (flex items-center gap-4):
        * Platform badge:
          - Badge component
          - Variant: secondary
          - Icon: Google logo placeholder
          - Text: "Google"
        * Star rating:
          - Flex gap-1
          - 5 stars (Star icon from lucide-react)
          - Filled: text-yellow-400 fill-yellow-400
          - Empty: text-gray-300
      
      - Right side:
        * Date: "2 days ago"
        * Font size: text-sm
        * Color: text-gray-500
   
   b) Reviewer info (flex items-center gap-3):
      - Avatar (shadcn Avatar):
        * Size: w-10 h-10
        * Background: bg-gray-200
      - Name: 
        * Font weight: font-medium
        * Color: text-gray-900
   
   c) Review text:
      - Font size: text-base
      - Color: text-gray-700
      - Line height: leading-relaxed
      - Full text (not truncated for MVP)
   
   d) AI Blurb section (if exists):
      - Container:
        * Background: bg-blue-50
        * Border left: border-l-4 border-blue-500
        * Padding: p-4
        * Rounded: rounded-r-lg
        * Margin top: mt-4
      
      - Header:
        * Text: "AI-Generated Marketing Blurb"
        * Font size: text-sm
        * Font weight: font-semibold
        * Color: text-blue-900
        * Margin bottom: mb-2
        * Flex: flex items-center gap-2
        * Icon: Sparkles (lucide-react), text-blue-600
      
      - Blurb text:
        * Font size: text-base
        * Color: text-blue-900
        * Italic: italic
      
      - Copy button:
        * shadcn Button
        * Variant: ghost
        * Size: sm
        * Icon: Copy (lucide-react)
        * Text: "Copy"
        * Position: absolute top-2 right-2

5. EMPTY STATE (if no reviews):
   - Container:
     * Background: bg-white
     * Padding: py-24
     * Rounded: rounded-lg
     * Text center: text-center
   
   - Icon: Inbox (lucide-react)
     * Size: w-16 h-16
     * Color: text-gray-400
     * Margin: mx-auto mb-4
   
   - Heading: "No reviews yet"
     * Font size: text-2xl
     * Font weight: font-semibold
     * Color: text-gray-900
     * Margin bottom: mb-2
   
   - Description:
     * Text: "Connect your Google Business account in Settings to start pulling reviews."
     * Color: text-gray-600
     * Margin bottom: mb-6
   
   - Button: "Go to Settings" (link to /dashboard/settings)
     * shadcn Button
     * Variant: default

Use Tailwind CSS, shadcn/ui Card, Badge, Button, Avatar, Select components.
Make it look EXACTLY like Trustpilot's review display.
```

---

### Step 4.4: Create Settings Page

**File: `app/dashboard/settings/page.tsx`**

**CLONE FROM:** Notion Settings (https://www.notion.so/settings)

**Ask Claude Code:**
```
Create settings page by cloning Notion's settings layout.

EXACT SPECIFICATIONS TO CLONE:

1. PAGE CONTAINER:
   - Max width: max-w-7xl
   - Margin: mx-auto
   - Padding: py-6

2. PAGE LAYOUT (Two-column):
   - Flex: flex gap-8
   - Mobile: flex-col
   
   LEFT SIDEBAR (tabs navigation):
   - Width: w-64
   - Shrink: flex-shrink-0
   
   RIGHT CONTENT:
   - Flex: flex-1

3. LEFT SIDEBAR - TAB NAVIGATION:
   
   Container:
   - Background: bg-white
   - Rounded: rounded-lg
   - Padding: p-2
   - Shadow: shadow-sm
   - Border: border border-gray-200
   
   Each tab button:
   - Width: full (w-full)
   - Padding: px-4 py-3
   - Text align: left (text-left)
   - Rounded: rounded-md
   - Font size: text-sm
   - Font weight: font-medium
   - Transition: transition-colors
   
   Inactive tab:
   - Color: text-gray-700
   - Hover: hover:bg-gray-100
   
   Active tab:
   - Background: bg-blue-50
   - Color: text-blue-600
   - Font weight: font-semibold
   
   Tabs:
   1. "Account"
   2. "Connected Accounts"

4. RIGHT CONTENT - ACCOUNT TAB:
   
   Container:
   - Background: bg-white
   - Rounded: rounded-lg
   - Padding: p-8
   - Shadow: shadow-sm
   - Border: border border-gray-200
   
   Tab title:
   - Heading: "Account Settings"
   - Font size: text-2xl
   - Font weight: font-bold
   - Margin bottom: mb-8
   
   Form fields (shadcn Form):
   - Stack: space-y-6
   
   Business Name field:
   - Label: "Business Name"
   - Input (shadcn Input):
     * Width: full (w-full)
     * Max width: max-w-md
   
   Email field:
   - Label: "Email"
   - Input (shadcn Input):
     * Width: full (w-full)
     * Max width: max-w-md
     * Disabled: true
     * Background: bg-gray-50
   
   Save button:
   - shadcn Button
   - Variant: default
   - Text: "Save Changes"
   - Margin top: mt-6

5. RIGHT CONTENT - CONNECTED ACCOUNTS TAB:
   
   Container:
   - Same styling as Account tab
   
   Tab title:
   - Heading: "Connected Accounts"
   - Font size: text-2xl
   - Font weight: font-bold
   - Margin bottom: mb-8
   
   Google Business Card:
   - Background: bg-white
   - Border: border-2 border-gray-200
   - Rounded: rounded-xl
   - Padding: p-6
   - Max width: max-w-2xl
   
   Card content (flex items-center justify-between):
   
   Left side (flex items-center gap-4):
   - Google logo placeholder:
     * Size: w-12 h-12
     * Background: bg-white
     * Border: border border-gray-200
     * Rounded: rounded-lg
     * Padding: p-2
   
   - Text content (flex flex-col):
     * Title: "Google Business Profile"
       - Font size: text-lg
       - Font weight: font-semibold
       - Color: text-gray-900
     * Description: "Connect to pull Google reviews"
       - Font size: text-sm
       - Color: text-gray-600
   
   Right side:
   - If NOT connected:
     * Button: "Connect Google Business"
     * shadcn Button
     * Variant: default
   
   - If connected:
     * Badge: "Connected"
       - shadcn Badge
       - Variant: secondary
       - Color: bg-green-100 text-green-800
       - Icon: Check (lucide-react)
     * Business name below
     * Disconnect button

Use Tailwind CSS, shadcn/ui components (Form, Input, Button, Badge, Tabs).
Make it look EXACTLY like Notion's settings page.
```

---

### Step 4.5: Create API to Update Profile

**File: `app/api/user/profile/route.ts`**

**Ask Claude Code:**
> "Create API endpoint to update user profile:
> - Method: PATCH
> - Body: { businessName }
> - Get authenticated user from NextAuth session
> - Update user in Prisma database
> - Return updated user object
> - Return 401 if not authenticated"

---

## ✅ Checkpoint 4

**Test dashboard:**

```bash
npm run dev
```

**Login and verify:**
- ✅ Dashboard layout shows sidebar + main area
- ✅ Can navigate between Dashboard, Reviews, Settings
- ✅ Stats cards show (with 0s for now)
- ✅ Reviews page shows empty state
- ✅ Settings page loads
- ✅ Can update business name in Account tab
- ✅ Google connection shows "not connected" status

---

## 🔌 PHASE 5 - MVP: Google OAuth Integration (Week 3-4)

**🚨 CRITICAL: YOU MUST DO THIS MANUALLY (Claude Code cannot)**

This is the hardest part. You'll need to configure Google Cloud Console yourself.

---

### Step 5.1: Create Google Cloud Project

**Manual steps (follow carefully):**

1. Go to https://console.cloud.google.com/
2. Click "Create Project"
3. Name it: "AuraRev MVP"
4. Click "Create"
5. Wait for project to be created

---

### Step 5.2: Enable Google My Business API

**In Google Cloud Console:**

1. Go to "APIs & Services" > "Library"
2. Search for "Google My Business API"
3. Click on it
4. Click "Enable"
5. Wait 1-2 minutes for API to be enabled

---

### Step 5.3: Create OAuth Consent Screen

**In Google Cloud Console:**

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in:
   - App name: "AuraRev"
   - User support email: your email
   - Developer contact: your email
5. Click "Save and Continue"
6. Skip "Scopes" for now (click "Save and Continue")
7. Add test users: Add YOUR email as test user
8. Click "Save and Continue"

---

### Step 5.4: Create OAuth Credentials

**In Google Cloud Console:**

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: "Web application"
4. Name: "AuraRev Web"
5. Authorized redirect URIs: Add these two:
   - `http://localhost:3000/api/google/callback`
   - `https://yourdomain.com/api/google/callback` (change later)
6. Click "Create"
7. **COPY the Client ID and Client Secret** (save them!)

---

### Step 5.5: Add to Environment Variables

**File: `.env.local`** (add these lines)

```bash
GOOGLE_CLIENT_ID="your-client-id-from-step-5.4"
GOOGLE_CLIENT_SECRET="your-client-secret-from-step-5.4"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/google/callback"
```

---

### Step 5.6: Create Google OAuth Helper

**File: `lib/google-oauth.ts`**

**Ask Claude Code:**
> "Create a Google OAuth helper with these functions:
> 
> 1. `getAuthUrl()` - generates Google OAuth authorization URL with these scopes:
>    - 'https://www.googleapis.com/auth/business.manage'
>    Include state parameter for CSRF protection
> 
> 2. `exchangeCodeForTokens(code)` - exchanges authorization code for access & refresh tokens
>    POST to https://oauth2.googleapis.com/token
> 
> 3. `refreshAccessToken(refreshToken)` - gets new access token when expired
> 
> Use axios for HTTP requests
> Return tokens in format: { accessToken, refreshToken, expiresAt }"

---

### Step 5.7: Create Connect Google Button in Settings

**Update: `app/dashboard/settings/page.tsx`**

**Ask Claude Code:**
> "In the Connected Accounts tab, make the 'Connect Google Business' button:
> 1. When clicked, fetch auth URL from /api/google/auth
> 2. Redirect user to that Google OAuth URL
> 3. Show loading state while redirecting"

---

### Step 5.8: Create OAuth Initiation API

**File: `app/api/google/auth/route.ts`**

**Ask Claude Code:**
> "Create API endpoint that:
> 1. Method: GET
> 2. Checks user is authenticated (NextAuth session)
> 3. Calls getAuthUrl() from google-oauth helper
> 4. Returns JSON: { url: authUrl }
> 5. Returns 401 if not authenticated"

---

### Step 5.9: Create OAuth Callback Handler

**File: `app/api/google/callback/route.ts`**

**Ask Claude Code:**
> "Create OAuth callback endpoint that:
> 1. Method: GET
> 2. Receives code and state from query params
> 3. Validates state parameter (CSRF check)
> 4. Exchanges code for tokens using exchangeCodeForTokens()
> 5. Saves tokens to ConnectedAccount in database (Prisma)
> 6. Platform = 'google'
> 7. Redirects to /dashboard/settings with success message
> 8. If error, redirects to /dashboard/settings with error message"

---

### Step 5.10: Test OAuth Flow

**Manual testing (YOU do this):**

1. Make sure dev server is running: `npm run dev`
2. Login to your account
3. Go to Dashboard > Settings > Connected Accounts
4. Click "Connect Google Business"
5. Should redirect to Google login
6. Login with your Google account (use test user you added)
7. Google will show permission screen - click "Allow"
8. Should redirect back to your settings page
9. Check Neon database - verify ConnectedAccount row was created
10. Settings should now show "Connected" badge

**If OAuth works:** ✅ Google integration complete!  
**If errors:** Check browser console, server logs, verify Client ID/Secret

---

## ✅ Checkpoint 5

**Verify:**
- ✅ Can click "Connect Google" button
- ✅ Redirects to Google OAuth
- ✅ Can authorize the app
- ✅ Redirects back to settings
- ✅ Shows "Connected" status
- ✅ Access token saved in database

**Common errors:**
- "redirect_uri_mismatch" → Check URIs in Google Console match exactly
- "invalid_client" → Check Client ID/Secret are correct
- "access_denied" → Check scopes are correct

---

## 📥 PHASE 6 - MVP: Pull Google Reviews (Week 4)

**Goal:** Fetch reviews from Google My Business and store in database

---

### Step 6.1: Get Google Business Account ID

**🚨 YOU MUST DO THIS MANUALLY:**

After connecting Google OAuth, you need the "location ID" for the business.

**Option 1: Use Google My Business API Explorer**
1. Go to: https://developers.google.com/my-business/reference/rest/v4/accounts.locations/list
2. Click "Try this method"
3. Fill in accountId (you'll need to get this first)
4. Execute - will return list of locations
5. Copy the `name` field (looks like: accounts/123/locations/456)

**Option 2: Ask Claude Code to create a helper page**

**File: `app/dashboard/debug/google-locations/page.tsx`**

**Ask Claude Code:**
> "Create a debug page that:
> 1. Fetches user's ConnectedAccount from database
> 2. Uses their access token to call Google My Business API
> 3. Endpoint: GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
> 4. Then for each account, fetch locations
> 5. Display all locations with their IDs
> 6. User can click 'Select' to save location ID to ConnectedAccount"

---

### Step 6.2: Save Location ID to Database

**Update ConnectedAccount in database:**

Once you have the location ID, update the database row:

```sql
UPDATE ConnectedAccount 
SET businessId = 'accounts/123/locations/456',
    businessName = 'Pizza Shop Downtown'
WHERE userId = 'your-user-id' AND platform = 'google';
```

Or use Prisma:
```typescript
await prisma.connectedAccount.update({
  where: { id: accountId },
  data: {
    businessId: 'accounts/123/locations/456',
    businessName: 'Pizza Shop Downtown'
  }
})
```

---

### Step 6.3: Create Google Reviews API Helper

**File: `lib/google-reviews.ts`**

**Ask Claude Code:**
> "Create helper functions for Google Reviews:
> 
> 1. `fetchReviews(accessToken, locationId)` 
>    - GET https://mybusiness.googleapis.com/v4/{locationId}/reviews
>    - Returns array of reviews
>    - Each review has: reviewId, reviewer { displayName, profilePhotoUrl }, starRating, comment, createTime
> 
> 2. `transformReviewData(googleReview)`
>    - Converts Google's format to our database format
>    - Returns: { platformReviewId, reviewerName, reviewerAvatar, rating, reviewText, reviewDate }
> 
> Handle errors and token expiration"

---

### Step 6.4: Create Pull Reviews API

**File: `app/api/google/pull-reviews/route.ts`**

**Ask Claude Code:**
> "Create API endpoint to pull Google reviews:
> 
> 1. Method: POST
> 2. Get authenticated user from NextAuth
> 3. Get user's Google ConnectedAccount from database
> 4. If not connected, return 400 error
> 5. Call fetchReviews() with access token and location ID
> 6. For each review:
>    - Check if already exists (platformReviewId)
>    - If new, save to Review table in database
> 7. Return: { success: true, newReviews: count, totalReviews: count }
> 8. Handle errors (expired token, API errors)"

---

### Step 6.5: Add "Pull Reviews" Button to Dashboard

**Update: `app/dashboard/page.tsx`**

**Ask Claude Code:**
> "Add a 'Pull Reviews' button to dashboard homepage:
> 1. Button calls POST /api/google/pull-reviews
> 2. Shows loading state while pulling
> 3. When complete, shows toast: 'Pulled X new reviews'
> 4. Refreshes stats cards
> 5. If error, shows error toast"

---

### Step 6.6: Display Reviews in Reviews Page

**Update: `app/dashboard/reviews/page.tsx`**

**Ask Claude Code:**
> "Update reviews page to:
> 1. Fetch reviews from database via API
> 2. API endpoint: GET /api/reviews (create this)
> 3. Display reviews in cards
> 4. Show: stars, reviewer name, date, review text
> 5. If no reviews, show: 'No reviews yet. Click Pull Reviews on dashboard.'
> 6. Add pagination (10 reviews per page)"

---

### Step 6.7: Create Get Reviews API

**File: `app/api/reviews/route.ts`**

**Ask Claude Code:**
> "Create API to get reviews:
> 1. Method: GET
> 2. Query params: page (default 1), limit (default 10), platform, rating
> 3. Get authenticated user
> 4. Fetch user's reviews from database (Prisma)
> 5. Apply filters (platform, rating)
> 6. Paginate results
> 7. Return: { reviews: [...], total: count, page, pages }"

---

### Step 6.8: Test Review Pulling

**Manual testing (YOU do this):**

1. Make sure you have Google Business account with some reviews
2. Make sure location ID is saved in database
3. Login to dashboard
4. Click "Pull Reviews" button
5. Wait 5-10 seconds
6. Should show toast: "Pulled X new reviews"
7. Go to Reviews page
8. Should see reviews listed
9. Check Neon database - verify Review rows exist

**If it works:** ✅ Review pulling complete!

---

## ✅ Checkpoint 6

**Verify:**
- ✅ Can pull reviews from Google
- ✅ Reviews saved to database
- ✅ Reviews display in reviews list
- ✅ Review cards show all details correctly
- ✅ Pagination works

**Common errors:**
- "Insufficient permissions" → Check Google OAuth scopes
- "Location not found" → Check businessId is correct
- "Unauthorized" → Token expired, need refresh token logic

---

## 🤖 PHASE 7 - MVP: AI-Generated Blurbs (Week 5)

**Goal:** Use OpenAI to generate marketing blurbs from reviews

---

### Step 7.1: Get OpenAI API Key

**🚨 YOU MUST DO THIS MANUALLY:**

1. Go to https://platform.openai.com/
2. Create account or login
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with sk-...)
6. Add to `.env.local`:

```bash
OPENAI_API_KEY="sk-your-key-here"
```

**Billing:** You'll need to add a payment method. API costs ~$0.002 per blurb.

---

### Step 7.2: Create OpenAI Helper

**File: `lib/openai.ts`**

**Ask Claude Code:**
> "Create OpenAI helper with function `generateBlurb(reviewText, rating)`:
> 
> 1. Uses OpenAI SDK (already installed)
> 2. Model: gpt-4o-mini (cheaper, good enough for MVP)
> 3. Prompt: 'You are a marketing copywriter. Turn this customer review into a short, persuasive testimonial blurb (1-2 sentences max). Make it sound natural and genuine. Review: {reviewText} Rating: {rating}/5'
> 4. Temperature: 0.7
> 5. Max tokens: 100
> 6. Returns the generated blurb text
> 7. Handle errors (API errors, rate limits)"

---

### Step 7.3: Update Pull Reviews to Generate Blurbs

**Update: `app/api/google/pull-reviews/route.ts`**

**Ask Claude Code:**
> "Modify the pull reviews endpoint:
> 
> When saving each new review to database:
> 1. Call generateBlurb(reviewText, rating)
> 2. Save the generated blurb to review.aiBlurb field
> 3. Also analyze sentiment:
>    - rating >= 4: 'positive'
>    - rating == 3: 'neutral'
>    - rating <= 2: 'negative'
> 4. Save sentiment to review.sentiment field
> 5. Handle errors gracefully (if OpenAI fails, save review without blurb)"

---

### Step 7.4: Add "Generate Blurb" Button for Existing Reviews

**Update: `app/dashboard/reviews/page.tsx`**

**Ask Claude Code:**
> "For each review card that doesn't have a blurb:
> 1. Show 'Generate Blurb' button instead of blurb
> 2. When clicked:
>    - Call POST /api/reviews/{reviewId}/generate-blurb
>    - Show loading state
>    - Replace button with generated blurb
>    - Show copy button"

---

### Step 7.5: Create Generate Blurb API

**File: `app/api/reviews/[reviewId]/generate-blurb/route.ts`**

**Ask Claude Code:**
> "Create API endpoint:
> 1. Method: POST
> 2. Get reviewId from URL params
> 3. Get authenticated user
> 4. Fetch review from database
> 5. Verify review belongs to user
> 6. Call generateBlurb(reviewText, rating)
> 7. Update review in database with new blurb
> 8. Return: { blurb: generatedText }
> 9. Return 404 if review not found
> 10. Return 403 if review belongs to different user"

---

### Step 7.6: Add Copy Button for Blurbs

**Update: `app/dashboard/reviews/page.tsx`**

**Ask Claude Code:**
> "For each AI-generated blurb:
> 1. Show a 'Copy' button next to the blurb
> 2. When clicked:
>    - Copy blurb text to clipboard
>    - Show toast: 'Blurb copied!'
>    - Change button text to 'Copied!' for 2 seconds
> 3. Use navigator.clipboard.writeText()"

---

### Step 7.7: Test AI Blurb Generation

**Manual testing (YOU do this):**

1. Make sure OpenAI API key is in `.env.local`
2. Pull some reviews (should auto-generate blurbs)
3. Go to Reviews page
4. Verify blurbs are shown in highlighted boxes
5. Try copying a blurb
6. For old reviews without blurbs, click "Generate Blurb"
7. Verify new blurb appears

**Example blurb transformation:**
- Input: "The pizza was really good and the staff was nice"
- Output: "Delicious pizza paired with exceptional service – a dining experience worth returning for! ⭐⭐⭐⭐⭐"

---

## ✅ Checkpoint 7

**Verify:**
- ✅ New reviews automatically get AI blurbs
- ✅ Can manually generate blurbs for old reviews
- ✅ Blurbs sound natural and persuasive
- ✅ Can copy blurbs to clipboard
- ✅ OpenAI costs are reasonable (check dashboard)

---

## 📧 PHASE 8 - MVP: Weekly Email Summary (Week 5-6)

**Goal:** Send weekly email with review stats and AI summary

---

### Step 8.1: Get SendGrid API Key

**🚨 YOU MUST DO THIS MANUALLY:**

1. Go to https://sendgrid.com/
2. Create free account (100 emails/day free)
3. Go to Settings > API Keys
4. Create new API key
5. Copy the key
6. Add to `.env.local`:

```bash
SENDGRID_API_KEY="SG.your-key-here"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
```

**Verify sender email:**
1. Go to Settings > Sender Authentication
2. Verify your email address
3. SendGrid will send verification email
4. Click link to verify

---

### Step 8.2: Create Email Helper

**File: `lib/email.ts`**

**Ask Claude Code:**
> "Create email helper using SendGrid:
> 
> 1. Function: `sendWeeklySummaryEmail(userEmail, data)`
>    - data includes: { businessName, totalReviews, avgRating, newReviews, topReviews[], aiInsights }
> 2. Creates HTML email template with:
>    - Subject: 'Your Weekly Review Summary - {businessName}'
>    - Header with AuraRev logo
>    - Stats section (cards showing totals)
>    - Top 3 reviews
>    - AI insights section
>    - CTA button to dashboard
> 3. Use SendGrid's send() function
> 4. Return success/error
> 5. Handle SendGrid errors"

---

### Step 8.3: Create Weekly Summary Generator

**File: `lib/weekly-summary.ts`**

**Ask Claude Code:**
> "Create function `generateWeeklySummary(userId)`:
> 
> 1. Get user and ConnectedAccount from database
> 2. Calculate date range (last 7 days)
> 3. Query reviews from database for that period
> 4. Calculate stats:
>    - Total reviews
>    - Average rating
>    - New reviews this week vs last week
>    - Sentiment breakdown (positive/neutral/negative %)
> 5. Get top 3 highest-rated reviews with blurbs
> 6. Send all reviews to OpenAI for weekly summary:
>    Prompt: 'Analyze these reviews from the past week and provide: 1) Overall sentiment 2) Common themes 3) Key strengths 4) Areas to improve. Reviews: {reviews}'
> 7. Return summary object with all data
> 8. Handle errors"

---

### Step 8.4: Create Manual Send Summary API

**File: `app/api/email/send-summary/route.ts`**

**Ask Claude Code:**
> "Create API endpoint for manual email testing:
> 1. Method: POST
> 2. Get authenticated user
> 3. Call generateWeeklySummary(userId)
> 4. Call sendWeeklySummaryEmail(user.email, summary)
> 5. Return: { success: true, message: 'Email sent' }
> 6. Return errors if email fails
> 7. Log email sent to console"

---

### Step 8.5: Add "Send Test Email" Button

**Update: `app/dashboard/settings/page.tsx`**

**Ask Claude Code:**
> "In Account tab, add section:
> 'Weekly Email Summary'
> - Text: 'Receive weekly summary every Monday at 9 AM'
> - Toggle switch: Enable/disable (save to user.emailNotifications in DB)
> - Button: 'Send Test Email Now'
> - When clicked:
>   - Call POST /api/email/send-summary
>   - Show loading state
>   - Show toast: 'Test email sent! Check your inbox.'
>   - Handle errors"

---

### Step 8.6: Update Prisma Schema for Email Preferences

**Update: `prisma/schema.prisma`**

Add to User model:
```prisma
model User {
  // ... existing fields
  emailNotifications Boolean @default(true)
}
```

Push changes:
```bash
npx prisma db push
npx prisma generate
```

---

### Step 8.7: Test Email System

**Manual testing (YOU do this):**

1. Make sure SendGrid API key is configured
2. Make sure sender email is verified
3. Pull some reviews first (need data)
4. Go to Settings > Account
5. Click "Send Test Email Now"
6. Check your inbox (might be in spam first time)
7. Verify email:
   - Shows stats correctly
   - Shows top reviews
   - Shows AI insights
   - Includes link to dashboard
   - Looks good on mobile

**If email works:** ✅ Email system complete!

---

### Step 8.8: Add Email to New User Welcome

**File: `app/api/auth/signup/route.ts`**

**Ask Claude Code:**
> "After user signup succeeds:
> 1. Send welcome email using SendGrid
> 2. Subject: 'Welcome to AuraRev!'
> 3. Content:
>    - Thank you for signing up
>    - Next steps: Connect Google Business account
>    - Link to dashboard
>    - Support email"

---

## ⏰ Phase 8.9: Setup Automated Weekly Emails (Optional for MVP)

**For MVP, weekly emails can be sent manually. For production, you'll need:**

**Option 1: Use Vercel Cron Jobs** (if deployed on Vercel)
**Option 2: Use external service like EasyCron**
**Option 3: Deploy backend with node-cron**

**Ask Claude Code later when ready for production automation.**

---

## ✅ Checkpoint 8

**Verify:**
- ✅ Can send test email from settings
- ✅ Email arrives in inbox
- ✅ Email shows correct stats
- ✅ AI insights are included
- ✅ Links work
- ✅ Looks good on mobile
- ✅ Welcome email sent on signup

---

## 🚀 PHASE 9 - MVP: Deployment (Week 6)

**Goal:** Deploy to production so others can use it

---

### Step 9.1: Deploy Database (Neon is already deployed!)

**Good news:** Neon database is already in the cloud! Nothing to do here.

Just update `.env` for production later.

---

### Step 9.2: Deploy Frontend to Vercel

**🚨 YOU MUST DO THIS MANUALLY:**

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AuraRev MVP"
   git branch -M main
   git remote add origin https://github.com/yourusername/aurarev-mvp.git
   git push -u origin main
   ```

2. Go to https://vercel.com/
3. Sign up / Login with GitHub
4. Click "Add New Project"
5. Import your GitHub repo
6. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)
7. Add Environment Variables (click "Add"):
   ```
   DATABASE_URL=your-neon-connection-string
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://your-app.vercel.app
   GOOGLE_CLIENT_ID=your-google-id
   GOOGLE_CLIENT_SECRET=your-google-secret
   GOOGLE_REDIRECT_URI=https://your-app.vercel.app/api/google/callback
   OPENAI_API_KEY=your-openai-key
   SENDGRID_API_KEY=your-sendgrid-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```
8. Click "Deploy"
9. Wait 2-3 minutes for deployment
10. You'll get a URL like: https://aurarev-mvp.vercel.app

---

### Step 9.3: Update Google OAuth Redirect URI

**In Google Cloud Console:**

1. Go to APIs & Services > Credentials
2. Click your OAuth client
3. Add new Authorized redirect URI:
   - `https://your-app.vercel.app/api/google/callback`
4. Save

---

### Step 9.4: Buy Domain (Optional but Recommended)

**If you want custom domain:**

1. Buy domain from Namecheap/GoDaddy: `aurarev.com`
2. In Vercel project settings > Domains
3. Add your domain
4. Follow Vercel's DNS instructions
5. Wait 10-60 minutes for DNS propagation
6. Update all environment variables with new domain
7. Update Google OAuth redirect URI

---

### Step 9.5: Test Production Deployment

**Manual testing:**

1. Visit your Vercel URL
2. Test signup flow
3. Test login
4. Connect Google Business account
5. Pull reviews
6. Generate AI blurbs
7. Send test email
8. Check everything works as on localhost

**If all works:** ✅ You're live!

---

## 🎉 MVP COMPLETE! What You've Built:

✅ **Marketing website** with pricing  
✅ **User authentication** (signup/login)  
✅ **Google OAuth integration** (connect business account)  
✅ **Review pulling** from Google My Business  
✅ **AI-generated blurbs** for marketing  
✅ **Dashboard** to view and manage reviews  
✅ **Weekly email summaries** with AI insights  
✅ **Production deployment** on Vercel + Neon  

---

## 📋 Post-Launch Checklist

### Week 7: Polish & Testing

- [ ] Test with real business owners (friends, family)
- [ ] Fix bugs they find
- [ ] Improve error messages
- [ ] Add loading states everywhere
- [ ] Make mobile responsive (test on phone)
- [ ] Add privacy policy page
- [ ] Add terms of service page

### Week 8: Add Basic Analytics

- [ ] Google Analytics setup
- [ ] Track key events (signup, connect Google, pull reviews)
- [ ] Monitor errors with Sentry

### Week 9-10: Add Stripe Payments

**When ready to charge customers:**

1. Create Stripe account
2. Add Stripe SDK
3. Create checkout sessions
4. Handle webhooks
5. Lock features behind paywall

**Ask Claude Code to help with Stripe integration when ready.**

---

## 🚧 What's NOT in MVP (Save for Phase 2)

These features wait until you have paying customers:

❌ Facebook integration  
❌ Instagram integration  
❌ Automated cron jobs (review pulling)  
❌ Automated follow-up emails  
❌ Advanced analytics  
❌ Review response system  
❌ Team members / multi-user  
❌ White-label option  
❌ Mobile app  

**Build these ONLY AFTER validating the MVP with real users.**

---

## 💡 How to Get First Customers

1. **Find local businesses:**
   - Restaurants, salons, dentists, retail shops
   - Look for businesses with 10-50 Google reviews
   - Avoid big chains

2. **Cold outreach:**
   - Email template: "I built a tool that automatically pulls your Google reviews and summarizes them with AI. Can I show you a demo?"
   - Offer first month free

3. **Show value immediately:**
   - Pull their reviews in the demo
   - Show AI blurbs they can use
   - Show weekly summary email

4. **Pricing for MVP:**
   - Free tier: 50 reviews/month
   - Pro tier: $29/month for 500 reviews
   - Keep it simple

---

## 🆘 Common Production Issues & Fixes

### "redirect_uri_mismatch" Error
**Fix:** Google Console redirect URI must EXACTLY match deployed URL (including https://)

### Reviews not pulling
**Fix:** Check Google location ID is correct, check token hasn't expired

### Emails not sending
**Fix:** Verify sender email in SendGrid, check API key, check spam folder

### Database connection errors
**Fix:** Check DATABASE_URL in Vercel env vars, check Neon database is running

### OpenAI errors
**Fix:** Check API key, check billing is enabled, check rate limits

---

## 📚 Resources for You

**Documentation:**
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Google My Business API: https://developers.google.com/my-business
- OpenAI API: https://platform.openai.com/docs
- SendGrid: https://docs.sendgrid.com
- Vercel: https://vercel.com/docs

**Communities for help:**
- Next.js Discord
- r/nextjs on Reddit
- Stack Overflow
- IndieHackers forum

---

## ✅ Final Reality Check

**Time Investment:**
- Week 1: Setup + Marketing pages (10 hrs)
- Week 2: Auth + Dashboard layout (12 hrs)
- Week 3: Google OAuth (15 hrs - hardest part)
- Week 4: Review pulling (10 hrs)
- Week 5: AI blurbs (8 hrs)
- Week 6: Email + Deploy (8 hrs)

**Total: ~63 hours over 6 weeks**

**Your actual time will vary:**
- +20% if you're new to web development
- +30% for debugging and fixing issues
- -10% if you're experienced

**Realistic timeline: 6-8 weeks working part-time (10-15 hrs/week)**

---

## 🎯 Success Criteria

**You'll know MVP is successful if:**
- ✅ 5+ businesses use it for at least 2 weeks
- ✅ They find the AI blurbs useful
- ✅ They read the weekly emails
- ✅ At least 2 willing to pay $29/month
- ✅ No major bugs reported

**If you hit these metrics:** Build Phase 2 features!

**If you don't:** Talk to users, understand why, iterate on MVP.

---

## 🚀 You're Ready!

**Next step:** Start with Phase 1. Open your terminal and run:

```bash
npx create-next-app@latest aurarev-mvp --typescript --tailwind --app --use-npm
```

**Then tell Claude Code:**

> "I'm building AuraRev MVP. I have the blueprint. Let's start with Phase 1, Step 1.2 - install all the dependencies listed."

**Good luck! You got this. 💪**

Remember:
- Start small (MVP first)
- Ship fast, iterate based on feedback
- Don't build features nobody asked for
- Talk to real users constantly

**The hardest part is starting. You're already ahead by having this blueprint.**

---

## 📞 Need Help?

If you get stuck:
1. Read error messages carefully
2. Google the exact error
3. Check official documentation
4. Ask Claude Code to debug
5. Ask in Discord/Reddit communities

**Don't give up!** Every developer faces these issues. The difference is: successful ones push through.

---

**END OF MVP BLUEPRINT**

*This blueprint was designed for someone relying on Claude Code to write most of the code, while handling manual configurations themselves. Adjust timeline based on your skill level and available time.*

*Good luck building AuraRev! 🚀*
