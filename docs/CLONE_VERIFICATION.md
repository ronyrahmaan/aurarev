# Clone Verification Checklist

## How to Verify Each Component

### STEP 1: Open Two Browser Windows
1. **Left Window**: The original website we're cloning
2. **Right Window**: Our localhost:3000 version

### STEP 2: Use These Exact URLs for Comparison

## 🎯 Marketing Pages Verification

### 1. HOMEPAGE HERO - Compare with Linear.app
**Original**: https://linear.app
**Ours**: http://localhost:3000

**Check these specific things:**
- [ ] Two-column layout (60% text left, 40% visual right)
- [ ] Headline size matches (should be ~60px)
- [ ] Subheadline is gray and smaller (~20px)
- [ ] Button has gradient (blue-600 to blue-700)
- [ ] Background has subtle gradient (white to blue-50/30)
- [ ] Mobile: Stacks vertically correctly

**Take screenshot**: Cmd+Shift+4 (Mac) or Win+Shift+S (Windows)
Save as: `verification/homepage-hero.png`

### 2. FEATURES SECTION - Compare with Linear.app
**Original**: https://linear.app (scroll down to features)
**Ours**: http://localhost:3000 (scroll down)

**Check these specific things:**
- [ ] 3 cards in a row on desktop
- [ ] Each card has icon in colored box (blue-100 background)
- [ ] Card hover shows shadow
- [ ] Icons are correct size (24px)
- [ ] Text hierarchy matches
- [ ] Mobile: Single column

### 3. NAVBAR - Compare with Superhuman.com
**Original**: https://superhuman.com
**Ours**: http://localhost:3000

**Check these specific things:**
- [ ] Fixed to top when scrolling
- [ ] Blur effect on background (semi-transparent)
- [ ] Logo on left with star icon
- [ ] Navigation links in center
- [ ] "Get Started" button on right with gradient
- [ ] Mobile: Hamburger menu works

### 4. PRICING PAGE - Compare with Notion
**Original**: https://www.notion.so/pricing
**Ours**: http://localhost:3000/pricing

**Check these specific things:**
- [ ] 2 cards side by side
- [ ] Right card has blue border (4px)
- [ ] "POPULAR" badge positioned correctly
- [ ] Price text is large (~48px)
- [ ] Feature list with green checkmarks
- [ ] Mobile: Cards stack vertically

### 5. FOOTER - Compare with Stripe
**Original**: https://stripe.com (scroll to bottom)
**Ours**: http://localhost:3000 (scroll to bottom)

**Check these specific things:**
- [ ] Dark background (gray-900)
- [ ] 4 columns on desktop
- [ ] Social icons at bottom
- [ ] Copyright text left, socials right
- [ ] Mobile: Single column

## 🎯 Dashboard Verification (After Auth)

### 1. DASHBOARD LAYOUT - Compare with Stripe Dashboard
**Original**: https://dashboard.stripe.com (need account)
**Reference**: https://stripe.com/img/docs/dashboard.png
**Ours**: http://localhost:3000/dashboard

**Check these specific things:**
- [ ] Fixed sidebar (256px wide)
- [ ] Sidebar has logo at top
- [ ] Navigation items with icons
- [ ] Active item has blue background
- [ ] User info at bottom of sidebar
- [ ] Main content area has proper margin

### 2. DASHBOARD HOME - Compare with HubSpot
**Reference**: Google "HubSpot dashboard screenshot"
**Ours**: http://localhost:3000/dashboard

**Check these specific things:**
- [ ] 4 stat cards in grid
- [ ] Each card has icon in colored box
- [ ] Numbers are large and bold
- [ ] "Recent Reviews" section below
- [ ] Empty state if no reviews

### 3. REVIEWS PAGE - Compare with Trustpilot Business
**Reference**: Google "Trustpilot business dashboard reviews"
**Ours**: http://localhost:3000/dashboard/reviews

**Check these specific things:**
- [ ] Filter bar at top
- [ ] Review cards with star ratings
- [ ] AI blurb section (blue background)
- [ ] Copy button for blurbs
- [ ] Empty state with inbox icon

### 4. SETTINGS - Compare with Notion Settings
**Reference**: Google "Notion settings page"
**Ours**: http://localhost:3000/dashboard/settings

**Check these specific things:**
- [ ] Left sidebar with tabs
- [ ] Right content area
- [ ] Active tab highlighted
- [ ] Form inputs styled correctly
- [ ] Google connection card

---

## 🔍 Visual Diff Tools (Optional)

### For Pixel-Perfect Comparison:
1. **Chrome Extension**: "Pixel Perfect Pro"
   - Install from Chrome Web Store
   - Overlay reference image on our site
   - Adjust opacity to see differences

2. **Browser DevTools**:
   - Right-click → Inspect
   - Click "Toggle Device Toolbar"
   - Set to same resolution (1920x1080)
   - Take screenshots of both

3. **Online Tool**: https://www.diffchecker.com/image-diff
   - Upload screenshot of original
   - Upload screenshot of ours
   - See highlighted differences

---

## 📱 Mobile Verification

### Test These Breakpoints:
- **Mobile**: 375px (iPhone)
- **Tablet**: 768px (iPad)
- **Desktop**: 1920px (Full HD)

### How to Test:
1. Open Chrome DevTools (F12)
2. Click device toggle icon
3. Select device or set custom size
4. Verify layout adapts properly

---

## ✅ ACCEPTANCE CRITERIA

Each component passes if:
1. **Layout** matches (spacing, grid, alignment)
2. **Colors** match (backgrounds, text, borders)
3. **Typography** matches (size, weight, line-height)
4. **Interactions** work (hover, click, transitions)
5. **Responsive** behavior matches

## 🚨 WHAT TO DO IF SOMETHING DOESN'T MATCH

1. Take a screenshot of both (original + ours)
2. Circle or highlight the difference
3. Tell me: "The [component] doesn't match. The [specific issue]"
4. I'll fix it immediately

---

## REMEMBER

We're cloning the DESIGN PATTERNS, not the content:
- ✅ Clone: Layout, styling, interactions
- ❌ Don't clone: Logos, exact text, company names

The goal is our app LOOKS as professional as Linear/Stripe/Notion!