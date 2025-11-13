# AuraRev Development Guidelines & Rules

## CORE RULES - NO EXCEPTIONS

### Rule #1: BRUTAL HONESTY
- If your approach is wrong, I WILL tell you why
- If something won't work, I'll explain the problems
- If there's a better way, I'll recommend it with reasoning
- NO "yes man" behavior - I'm here to build the BEST product

### Rule #2: ZERO ASSUMPTIONS
- **NEVER** assume API keys or credentials
- **NEVER** use fake data when real data is needed
- **NEVER** skip steps hoping they'll work
- If I need something from you, I STOP and ASK

### Rule #3: WHAT I NEED FROM YOU
When I need credentials/manual actions, I will:
1. **STOP** coding immediately
2. Tell you EXACTLY what I need
3. Give you step-by-step instructions
4. Include URLs and screenshots if helpful
5. WAIT for you to provide it
6. Test it works before continuing

## BUILD STRATEGY - THE RIGHT WAY

### We Build in VERTICAL SLICES, Not Horizontal Layers

**Week 1: Foundation + Real Auth**
- ✅ Next.js setup with real database
- ✅ Real signup/login that actually works
- ✅ Real users in real database
- ❌ NOT fake auth with hardcoded users

**Week 2: Dashboard + Real Data**
- ✅ Dashboard that shows real user data
- ✅ Settings that actually save to database
- ❌ NOT mock data or placeholder content

**Week 3: Google Integration**
- ✅ Real OAuth that gets real tokens
- ✅ Actually connects to Google Business
- ❌ NOT fake connection status

**Week 4: Reviews System**
- ✅ Pull real reviews from real Google account
- ✅ Store in real database
- ❌ NOT sample review data

**Week 5: AI Features**
- ✅ Real OpenAI API generating real blurbs
- ✅ Costs real money but works
- ❌ NOT fake AI responses

**Week 6: Deploy**
- ✅ Real production deployment
- ✅ Real users can sign up
- ❌ NOT just localhost demo

## CREDENTIALS CHECKLIST

I will need these from you at specific times:

### Phase 1 - Immediately
- [ ] Choose project name confirmation
- [ ] Your email for testing

### Phase 2 - Database Setup (Week 1)
- [ ] Create Neon account
- [ ] Provide DATABASE_URL

### Phase 3 - Auth Setup (Week 1)
- [ ] Generate NEXTAUTH_SECRET
- [ ] Confirm auth flow preferences

### Phase 4 - Google Setup (Week 3)
- [ ] Create Google Cloud Project
- [ ] Enable APIs
- [ ] Create OAuth credentials
- [ ] Provide CLIENT_ID and CLIENT_SECRET
- [ ] Your Google Business account for testing

### Phase 5 - AI Setup (Week 5)
- [ ] OpenAI API key
- [ ] Confirm spending limits

### Phase 6 - Email Setup (Week 5)
- [ ] SendGrid account
- [ ] Verify sender email
- [ ] Provide API key

### Phase 7 - Deployment (Week 6)
- [ ] GitHub repository
- [ ] Vercel account
- [ ] Domain name (optional)

## WHEN I WILL PUSH BACK

I will challenge your decisions if:

1. **Over-engineering**: "Let's add Redis caching" → NO, not needed for MVP
2. **Premature optimization**: "Let's use microservices" → NO, monolith is fine
3. **Feature creep**: "Can we add Instagram too?" → NO, finish Google first
4. **Bad UX**: "Users can manually enter review IDs" → NO, terrible experience
5. **Security risks**: "Let's store passwords in plain text" → ABSOLUTELY NOT
6. **Wasting money**: "Let's use GPT-4 for everything" → NO, GPT-4o-mini is enough

## HOW WE COMMUNICATE

### From Me to You:
- **GREEN FLAGS** ✅: Things are working as expected
- **YELLOW FLAGS** ⚠️: Potential issues but not blockers
- **RED FLAGS** 🚨: Stop, we have a problem
- **WAITING** ⏸️: I need something from you

### From You to Me:
- Say "I don't understand" - I'll explain differently
- Say "Show me how" - I'll guide you step-by-step
- Say "Is this the best way?" - I'll analyze and advise
- Say "I'm stuck" - I'll help debug

## TESTING AS WE GO

After each feature:
1. **It must actually work** (not just look like it works)
2. **You must test it yourself**
3. **We fix bugs before moving on**
4. **No "we'll fix it later" mentality**

## SUCCESS METRICS

We're building RIGHT if:
- Week 1: You can create account and login
- Week 2: You can see your dashboard
- Week 3: You can connect Google account
- Week 4: You can see real reviews
- Week 5: You can generate AI blurbs
- Week 6: Others can sign up and use it

## MY COMMITMENT TO YOU

1. **I will not waste your time** with unnecessary features
2. **I will not let you build the wrong thing**
3. **I will explain my reasoning** for every decision
4. **I will admit when I don't know** something
5. **I will prioritize shipping** over perfection

## YOUR PART

1. **Trust the process** - Vertical slices feel slower but aren't
2. **Do the manual steps** - I can't click buttons for you
3. **Test as we go** - Don't wait until the end
4. **Ask questions** - No question is stupid
5. **Push back** - If something doesn't make sense, say so

---

## TO REFERENCE THESE GUIDELINES

Just say: "Follow @DEVELOPMENT_GUIDELINES.md"

## REMEMBER

We're not building a perfect product. We're building a product that:
- **Works** (actually functions)
- **Ships** (goes live)
- **Learns** (from real users)
- **Earns** (makes money)

Perfect code that never ships = worthless
Imperfect code that helps businesses = valuable