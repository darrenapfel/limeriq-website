# limerIQ Phase 1 Website PRD & Implementation Plan
## Product Requirements Document for Claude Code Execution

---

## Executive Summary

**Product:** limerIQ Phase 1 Launch Website  
**Positioning:** "The IQ Behind Your AI"  
**Launch Strategy:** Two-step Phase 1 rollout  
**Step 1A:** Beta signup landing page (Week 1-2)  
**Step 1B:** Full launch with VSCode extension & GitHub repo (Week 3-4)  
**Target Audience:** Developer enthusiasts, open source advocates, AI tool early adopters  
**Core Principle:** Humble, authentic, anti-hype approach with GitHub README energy  

---

## 1. Product Overview & Objectives

### Primary Objectives
1. Build developer trust through authentic, humble positioning
2. Generate beta signups from quality early adopters (Step 1A)
3. Convert beta interest to active GitHub stars and usage (Step 1B)
4. Establish community foundation for organic growth
5. Avoid enterprise/marketing language that triggers developer skepticism

### Success Criteria
- **Step 1A:** 500+ quality beta signups in first week
- **Step 1B:** 1,000 GitHub stars within 2 weeks of repo launch
- 100+ VSCode extension installs in first week
- 50+ Discord community members actively engaged
- Zero "marketing BS" complaints on HN/Reddit

### Anti-Objectives (What We're NOT Doing)
- NOT positioning as "revolutionary" or "game-changing"
- NOT collecting emails for marketing automation
- NOT showing enterprise features or pricing
- NOT using stock photos or polished illustrations
- NOT tracking with invasive analytics

---

## 2. Technical Architecture

### Tech Stack
```yaml
Frontend:
  Framework: Next.js 14 (App Router)
  Styling: Tailwind CSS
  Fonts: System mono (code), System sans (text)
  Icons: Lucide React (minimal use)
  Animation: Framer Motion (only for counters)

Backend:
  API: Next.js API routes
  Database: PostgreSQL (Supabase for beta signups)
  Cache: Redis (for GitHub API data)
  
Infrastructure:
  Hosting: Vercel
  Analytics: Plausible (privacy-focused)
  Monitoring: Sentry (errors only)
  CDN: Vercel Edge Network

Integrations:
  GitHub API: Stars, contributors, repo activity
  Discord Webhook: Member count
  NPM API: Download stats (Step 1B)
```

### Performance Requirements
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Lighthouse Score: 95+ all categories
- Core Web Vitals: All green
- Bundle size: < 150KB gzipped

---

## 3. Step 1A: Beta Signup Landing Page (Week 1-2)

### Page Structure

```
┌─────────────────────────────────────┐
│ Navigation (minimal)                │
│ limerIQ | GitHub* | Discord*       │
├─────────────────────────────────────┤
│                                     │
│ HERO SECTION                        │
│ "The IQ Behind Your AI"             │
│ Subheading + Problem statement      │
│ [Beta Access Form]                  │
│                                     │
├─────────────────────────────────────┤
│ WHAT WE'RE BUILDING                 │
│ The problem (with code example)     │
│ Our approach (structure > prompts)  │
│                                     │
├─────────────────────────────────────┤
│ EARLY ACCESS BENEFITS               │
│ • Shape the tool                    │
│ • Free forever for early adopters   │
│ • Direct access to builders         │
│                                     │
├─────────────────────────────────────┤
│ WHO'S BUILDING THIS                 │
│ (Authentic builder credibility)     │
│                                     │
├─────────────────────────────────────┤
│ Footer (minimal)                    │
└─────────────────────────────────────┘

* GitHub/Discord show "Coming Soon" state
```

### Content Specifications

#### Hero Section
```html
<h1>The IQ Behind Your AI</h1>
<p class="subtitle">
  We're building an intelligent workflow composer that makes 
  AI agents actually complete their work.
</p>
<p class="problem">
  You know that moment when Claude forgets what it's building mid-task?
  <br>
  Yeah, we're fixing that.
</p>
```

#### Beta Signup Form
```html
<!-- Minimal fields - reduce friction -->
<form>
  <input type="email" placeholder="developer@example.com" required>
  <textarea placeholder="What's your biggest AI agent pain point? (optional)"></textarea>
  <button>Request Early Access</button>
  <small>No spam. No marketing. Just a heads up when we launch.</small>
</form>
```

#### What We're Building Section
```markdown
## The Problem Everyone Knows

Your AI coding session:
- Hour 1: "This is amazing!"
- Hour 2: "Wait, why is it repeating itself?"
- Hour 3: "It's hallucinating functions that don't exist"
- Hour 4: Manual cleanup

## Structure Beats Instructions

Instead of: "Here's 10,000 tokens, good luck!"
We do: Step 1 → Validate → Step 2 → Validate → Ship

Early metrics from our prototype:
- 94% completion rate (vs 31% unstructured)
- 30% fewer tokens used
- 0 hallucinated functions
```

### Step 1A Success Metrics
- Conversion rate: >15% visitor to signup
- Quality score: >60% provide pain point feedback
- Bounce rate: <50%
- Time on page: >90 seconds

---

## 4. Step 1B: Full Launch Website (Week 3-4)

### Updated Page Structure

```
┌─────────────────────────────────────┐
│ Nav: limerIQ | GitHub | Discord |Docs│
├─────────────────────────────────────┤
│ HERO WITH LIVE STATS                │
│ "The IQ Behind Your AI"             │
│ npm install -g limeriq              │
│ ⭐ 127 | 👥 12 | 🚀 847 this week    │
├─────────────────────────────────────┤
│ PROBLEM/SOLUTION                    │
│ Before/After visualization          │
├─────────────────────────────────────┤
│ HOW IT WORKS                        │
│ Live terminal + workflow YAML       │
├─────────────────────────────────────┤
│ PROOF IT WORKS                      │
│ Real metrics + activity feed        │
├─────────────────────────────────────┤
│ QUICK START                         │
│ 3 commands to first workflow        │
├─────────────────────────────────────┤
│ VSCODE EXTENSION                    │
│ Visual workflow designer preview    │
├─────────────────────────────────────┤
│ COMMUNITY                           │
│ Discord preview + GitHub activity   │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### New Components for Step 1B

#### Live Stats Bar
```javascript
// Real-time data from APIs
const StatsBar = () => {
  return (
    <div className="stats-bar">
      <Stat icon="⭐" value={githubStars} label="stars" />
      <Stat icon="👥" value={contributors} label="contributors" />
      <Stat icon="🚀" value={weeklyWorkflows} label="this week" />
    </div>
  )
}
```

#### Terminal Demo
```javascript
// Actual execution output
const TerminalDemo = () => {
  return (
    <pre className="terminal">
      <span className="prompt">$</span> limeriq run deploy-feature.yaml
      <span className="success">✓</span> Step 1: Analyzing requirements
      <span className="success">✓</span> Step 2: Creating implementation plan
      <span className="success">✓</span> Step 3: Writing code (consensus: 4/5 agents agree)
      <span className="success">✓</span> Step 4: Validation passed
      <span className="success">✓</span> Step 5: Tests written and passing
      <span className="info">📦</span> Workflow completed in 3m 27s
      <span className="info">💾</span> 31% fewer tokens than unstructured approach
    </pre>
  )
}
```

#### VSCode Extension Section
```markdown
## Visual Workflow Designer

Design workflows visually in VSCode, execute with confidence.

[Screenshot of actual VSCode extension]

Install: ext install limeriq.vscode-limeriq
```

### API Endpoints Required

```typescript
// /api/stats
GET /api/stats
Response: {
  githubStars: number,
  contributors: number,
  weeklyWorkflows: number,
  discordMembers: number
}

// /api/activity
GET /api/activity
Response: {
  recentWorkflows: Array<{
    type: string,
    timestamp: string,
    success: boolean
  }>
}

// /api/beta-signup (Step 1A only)
POST /api/beta-signup
Body: {
  email: string,
  painPoint?: string
}
```

---

## 5. Content Strategy

### Copy Variations to A/B Test

#### Hero Headlines
```
A: "The IQ Behind Your AI"
B: "Your AI is brilliant. But does it have IQ?"
C: "We got tired of AI agents hallucinating. So we added IQ."
```

#### Problem Statements
```
A: "Your last AI coding session: 3 hours debugging hallucinations"
B: "Hour 3 of debugging AI-generated code that doesn't exist"
C: "You know that moment when Claude forgets what it's building?"
```

### SEO Metadata (Hidden)
```html
<!-- Include "orchestration" for SEO but never in visible content -->
<meta name="description" content="Open source AI orchestration platform 
  and workflow automation tool. Intelligent workflow composer for AI agents.">
<meta name="keywords" content="ai orchestration, workflow automation, 
  ai agents, claude automation, llm orchestration">
```

### Content That's BANNED in Phase 1
- ❌ "Revolutionary"
- ❌ "Enterprise-grade"  
- ❌ "Industry-leading"
- ❌ "Transform your workflow"
- ❌ "10x productivity"
- ❌ "Cutting-edge AI"
- ❌ "Next-generation"
- ❌ "Best-in-class"

### Content That's ENCOURAGED
- ✅ "Seems to work pretty well"
- ✅ "We built this for ourselves"
- ✅ "Rough around the edges"
- ✅ "Help us make it better"
- ✅ "Early but functional"
- ✅ "Community-tested"
- ✅ "Free forever for individuals"

---

## 6. Design Specifications

### Color Palette
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --text-primary: #ffffff;
  --text-secondary: #888888;
  --accent: #00ff88; /* Terminal green */
  --error: #ff4444;
  --warning: #ffaa00;
  --code-bg: #1a1a1a;
}
```

### Typography
```css
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Usage */
.code { font-family: var(--font-mono); }
.text { font-family: var(--font-sans); }
```

### Component Examples

#### Code Block Component
```jsx
const CodeBlock = ({ code, language }) => (
  <div className="code-block">
    <div className="code-header">
      <span className="language">{language}</span>
      <button className="copy-btn">Copy</button>
    </div>
    <pre className="code-content">
      <code>{code}</code>
    </pre>
  </div>
)
```

#### Workflow YAML Example
```yaml
name: deploy-feature
steps:
  - name: analyze_requirements
    type: llm
    prompt: "Analyze the feature requirements"
    validation:
      consensus: 4/5
      
  - name: implement
    type: code
    language: python
    validate_syntax: true
    
  - name: test
    type: deterministic
    command: pytest tests/
```

---

## 7. Implementation Timeline

### Week 1: Foundation (Step 1A Beta Page)
**Day 1-2: Setup & Architecture**
- Initialize Next.js project with TypeScript
- Setup Tailwind with custom dark theme
- Configure Vercel deployment pipeline
- Setup Supabase for beta signups
- Implement Plausible analytics

**Day 3-4: Beta Landing Page**
- Build hero section with animations
- Implement signup form with validation
- Create "What We're Building" section
- Add responsive design
- Setup API endpoint for signups

**Day 5: Testing & Polish**
- Cross-browser testing
- Performance optimization
- Copy refinement
- Soft launch to friendlies

### Week 2: Beta Campaign
**Day 6-7: Beta Promotion**
- Soft announce on selective Discord servers
- Share with friendly developers
- Gather feedback, iterate copy
- Monitor signup quality

**Day 8-10: Iterate & Prepare**
- Refine based on feedback
- Begin Step 1B development
- Prepare GitHub repo for public
- Finalize VSCode extension

### Week 3: Full Launch Development (Step 1B)
**Day 11-12: Enhanced Homepage**
- Add live stats integration
- Build terminal demo component
- Create workflow examples
- Implement activity feed

**Day 13-14: Integrations**
- GitHub API integration
- NPM stats integration
- Discord member count
- Cache layer implementation

**Day 15: VSCode Extension**
- Finalize extension
- Create demo video/GIF
- Publish to marketplace
- Update website section

### Week 4: Launch Week
**Day 16-17: Final Testing**
- Load testing
- Security review
- Final copy edits
- Staging environment validation

**Day 18: Launch Preparation**
- GitHub repo public
- VSCode extension live
- Discord server ready
- Draft HN/Reddit posts

**Day 19: Launch Day**
- Submit to Hacker News
- Post on relevant subreddits
- Activate Discord community
- Monitor and respond

**Day 20-21: Post-Launch**
- Respond to feedback
- Fix urgent issues
- Gather metrics
- Plan iterations

---

## 8. Testing Checklist

### Functional Testing
- [ ] Signup form validation and submission
- [ ] API endpoints returning correct data
- [ ] GitHub stats updating live
- [ ] Copy button works on all code blocks
- [ ] All external links functional
- [ ] 404 page works (with limerick)

### Performance Testing
- [ ] Lighthouse scores >95
- [ ] Page load <2 seconds
- [ ] No layout shift
- [ ] Images optimized
- [ ] JavaScript bundle <150KB

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Mobile Chrome

### Content Review
- [ ] No marketing buzzwords
- [ ] Tone consistently humble
- [ ] Technical accuracy verified
- [ ] No typos or grammar errors
- [ ] SEO metadata correct (hidden orchestration keywords)

---

## 9. Launch Day Runbook

### Pre-Launch (Night Before)
1. Final deployment to production
2. Cache warming for API endpoints
3. Discord moderators briefed
4. HN/Reddit posts drafted
5. Team availability confirmed

### Launch Hour 0
1. Submit to Hacker News (aim for 9am PT)
2. Post on r/LocalLLaMA
3. Share in relevant Discord servers
4. Tweet from personal accounts (not brand)
5. Enable real-time monitoring

### Launch Hour 1-4
1. Respond to every HN comment
2. Monitor Discord for questions
3. Track GitHub star velocity
4. Fix any critical issues immediately
5. Share interesting feedback with team

### Launch Hour 4-8
1. Post on additional subreddits if momentum good
2. Share early metrics internally
3. Begin collecting testimonials
4. Plan evening shift coverage
5. Draft follow-up content

### Post-Launch Day 2
1. Thank you post to community
2. Share what we learned
3. Announce first community contribution
4. Plan Week 2 improvements
5. Begin Phase 2 planning if metrics good

---

## 10. Monitoring & Analytics

### Key Metrics to Track

**Step 1A Metrics:**
- Unique visitors
- Signup conversion rate
- Pain point submission rate
- Geographic distribution
- Referral sources

**Step 1B Metrics:**
- GitHub star velocity (hourly for first 48h)
- VSCode extension installs
- npm installs (after launch)
- Discord joins
- Time on site
- Bounce rate
- API endpoint performance

### Alert Thresholds
- Page load time >3 seconds
- API response time >500ms
- Error rate >1%
- Bounce rate >60%
- GitHub API rate limit approaching

---

## 11. Post-Launch Iteration Plan

### Week 5-6: Community Feedback Integration
- Add requested workflow examples
- Improve documentation links
- Add contributor showcase
- Implement suggested copy changes

### Week 7-8: Feature Expansion
- Workflow gallery (if >20 community workflows)
- Blog section for technical deep-dives
- Comparison page (structure vs orchestration)
- Community testimonials (text only)

### Decision Points for Phase 2
Trigger Phase 2 (enterprise) when:
- 5,000+ GitHub stars
- 100+ active contributors
- 50+ enterprise inquiries
- Community requesting enterprise features
- 100+ marketplace-ready workflows

---

## 12. Risk Mitigation

### Technical Risks
**Risk:** GitHub API rate limiting
**Mitigation:** Implement Redis caching, 5-minute TTL

**Risk:** Signup spam/abuse
**Mitigation:** Rate limiting, email verification

**Risk:** Site goes down during HN traffic
**Mitigation:** Vercel auto-scaling, static generation where possible

### Content Risks
**Risk:** Perceived as "just another orchestration tool"
**Mitigation:** Clear differentiation in hero, never use the word

**Risk:** Too technical for non-developers
**Mitigation:** That's fine - Phase 1 is developers only

**Risk:** Limerick theme seems unserious
**Mitigation:** Keep playfulness subtle, let quality speak

---

## Appendix A: File Structure

```
limeriq-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # Homepage
│   ├── beta/             
│   │   └── page.tsx      # Step 1A beta page
│   ├── api/
│   │   ├── stats/route.ts
│   │   ├── activity/route.ts
│   │   └── beta-signup/route.ts
│   └── not-found.tsx     # 404 with limerick
├── components/
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── Terminal.tsx
│   ├── CodeBlock.tsx
│   ├── SignupForm.tsx
│   └── WorkflowExample.tsx
├── lib/
│   ├── github.ts
│   ├── cache.ts
│   └── analytics.ts
├── styles/
│   └── globals.css
└── public/
    └── og-image.png
```

## Appendix B: Example Limerick for 404 Page

```
There once was a page that you sought,
But sadly it seems it is not,
  The route has gone missing,
  No use reminiscing,
Head home for the workflows we've got.

[Go Home] [View GitHub]
```

## Appendix C: Sample HN Launch Post

```
Show HN: limerIQ - The IQ Behind Your AI

We got tired of Claude losing context mid-task, so we built an intelligent 
workflow composer. It structures AI work into validated steps that actually 
complete.

Not another agent.md "orchestrator" - this actually controls execution flow.

- Break work into discrete, validated steps
- Each step gets fresh, curated context
- Consensus validation between multiple agents  
- Deterministic code steps for critical operations

Early metrics: 94% completion rate (vs 31% unstructured), 30% fewer tokens used.

Open source, bring your own Claude API key, rough around the edges but it works.

GitHub: [link] | Discord: [link] | VSCode: [link]
```

---

*This PRD represents the complete Phase 1 website requirements for limerIQ. The two-step approach (beta signup → full launch) allows us to build momentum while maintaining our humble, authentic positioning. Every element reinforces that we're builders solving a real problem, not marketers selling hype.*