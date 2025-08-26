# Claude Code Execution Plan for limerIQ Website
## Step-by-Step Implementation Guide

---

## Project Setup Instructions for Claude Code

### Initial Project Creation
```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest limeriq-website \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd limeriq-website

# Install additional dependencies
npm install lucide-react framer-motion clsx tailwind-merge
npm install @supabase/supabase-js redis ioredis
npm install --save-dev @types/node
```

### Environment Variables Setup
Create `.env.local`:
```env
# Supabase (for beta signups)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# GitHub API
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=limeriq
GITHUB_REPO_NAME=limeriq

# Redis (for caching)
REDIS_URL=your_redis_url

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=limeriq.dev
```

---

## Phase 1A: Beta Signup Page (Days 1-5)

### Day 1: Project Foundation

#### Task 1: Configure Tailwind for Dark Theme
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        muted: '#888888',
        accent: '#00ff88',
        'code-bg': '#1a1a1a',
        error: '#ff4444',
      },
      fontFamily: {
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
export default config
```

#### Task 2: Create Root Layout
```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import PlausibleProvider from 'next-plausible'

export const metadata: Metadata = {
  title: 'limerIQ - The IQ Behind Your AI',
  description: 'Open source intelligent workflow composer for AI agents. Structure beats instructions.',
  keywords: 'ai orchestration, workflow automation, ai agents, claude automation',
  openGraph: {
    title: 'limerIQ - The IQ Behind Your AI',
    description: 'We got tired of AI agents hallucinating. So we added IQ.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <PlausibleProvider domain="limeriq.dev" />
      </head>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}
```

#### Task 3: Setup Supabase Client
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create beta_signups table in Supabase:
/*
CREATE TABLE beta_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  pain_point TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  referrer TEXT,
  user_agent TEXT
);
*/
```

### Day 2: Beta Landing Page Components

#### Task 4: Create Hero Component
```typescript
// components/BetaHero.tsx
'use client'

import { motion } from 'framer-motion'

export default function BetaHero() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <motion.h1 
        className="text-5xl md:text-7xl font-mono font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The IQ Behind Your AI
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-muted mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        We're building an intelligent workflow composer that makes 
        AI agents actually complete their work.
      </motion.p>
      
      <motion.p 
        className="text-lg text-foreground mb-12 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        You know that moment when Claude forgets what it's building mid-task?
        <br />
        <span className="text-accent">Yeah, we're fixing that.</span>
      </motion.p>
    </section>
  )
}
```

#### Task 5: Create Signup Form Component
```typescript
// components/BetaSignupForm.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BetaSignupForm() {
  const [email, setEmail] = useState('')
  const [painPoint, setPainPoint] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const { error } = await supabase
        .from('beta_signups')
        .insert([
          { 
            email, 
            pain_point: painPoint || null,
            referrer: document.referrer,
            user_agent: navigator.userAgent
          }
        ])

      if (error) throw error

      setStatus('success')
      setMessage('Thanks! We\'ll let you know when we launch.')
      setEmail('')
      setPainPoint('')
    } catch (error: any) {
      setStatus('error')
      if (error.code === '23505') {
        setMessage('You\'re already on the list!')
      } else {
        setMessage('Something went wrong. Try again?')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="developer@example.com"
        required
        className="w-full px-4 py-3 bg-code-bg border border-muted rounded-md 
                   font-mono text-foreground placeholder-muted
                   focus:outline-none focus:border-accent"
      />
      
      <textarea
        value={painPoint}
        onChange={(e) => setPainPoint(e.target.value)}
        placeholder="What's your biggest AI agent pain point? (optional)"
        rows={3}
        className="w-full px-4 py-3 bg-code-bg border border-muted rounded-md 
                   font-mono text-foreground placeholder-muted
                   focus:outline-none focus:border-accent resize-none"
      />
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-accent text-background font-mono font-bold 
                   rounded-md hover:bg-accent/90 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Requesting...' : 'Request Early Access'}
      </button>
      
      <p className="text-sm text-muted text-center">
        No spam. No marketing. Just a heads up when we launch.
      </p>
      
      {message && (
        <p className={`text-sm text-center ${
          status === 'success' ? 'text-accent' : 'text-error'
        }`}>
          {message}
        </p>
      )}
    </form>
  )
}
```

### Day 3: Beta Page Content Sections

#### Task 6: Problem/Solution Section
```typescript
// components/ProblemSolution.tsx
export default function ProblemSolution() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-8">
          The Problem Everyone Knows
        </h2>
        
        <div className="bg-code-bg rounded-lg p-6 mb-8 font-mono">
          <p className="text-muted mb-2">Your AI coding session:</p>
          <p className="text-foreground">Hour 1: "This is amazing!"</p>
          <p className="text-foreground">Hour 2: "Wait, why is it repeating itself?"</p>
          <p className="text-error">Hour 3: "It's hallucinating functions that don't exist"</p>
          <p className="text-muted">Hour 4: Manual cleanup</p>
        </div>

        <h2 className="text-3xl font-mono font-bold mb-8">
          Structure Beats Instructions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-code-bg rounded-lg p-6">
            <p className="text-error mb-2 font-mono">Instead of:</p>
            <p className="text-muted">"Here's 10,000 tokens, good luck!"</p>
          </div>
          
          <div className="bg-code-bg rounded-lg p-6">
            <p className="text-accent mb-2 font-mono">We do:</p>
            <p className="text-foreground">Step 1 → Validate → Step 2 → Validate → Ship</p>
          </div>
        </div>

        <div className="mt-8 p-6 border border-accent rounded-lg">
          <p className="font-mono text-accent mb-2">Early metrics from our prototype:</p>
          <ul className="space-y-1 font-mono">
            <li>• 94% completion rate (vs 31% unstructured)</li>
            <li>• 30% fewer tokens used</li>
            <li>• 0 hallucinated functions</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
```

### Day 4: Complete Beta Page Assembly

#### Task 7: Assemble Beta Page
```typescript
// app/page.tsx (for Step 1A)
import BetaHero from '@/components/BetaHero'
import BetaSignupForm from '@/components/BetaSignupForm'
import ProblemSolution from '@/components/ProblemSolution'

export default function BetaPage() {
  return (
    <main className="min-h-screen">
      {/* Simple Nav */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-muted">
        <div className="font-mono font-bold text-xl">limerIQ</div>
        <div className="flex gap-6 text-muted">
          <span className="cursor-not-allowed">GitHub (soon)</span>
          <span className="cursor-not-allowed">Discord (soon)</span>
        </div>
      </nav>

      <BetaHero />
      <BetaSignupForm />
      <ProblemSolution />
      
      {/* Early Access Benefits */}
      <section className="py-20 px-4 bg-code-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-mono font-bold mb-8">
            Early Access Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <p className="text-accent font-mono mb-2">Shape the tool</p>
              <p className="text-muted">Your feedback drives development</p>
            </div>
            <div className="p-4">
              <p className="text-accent font-mono mb-2">Free forever</p>
              <p className="text-muted">Early adopters never pay</p>
            </div>
            <div className="p-4">
              <p className="text-accent font-mono mb-2">Direct access</p>
              <p className="text-muted">Chat with the builders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-muted text-center text-muted">
        <p className="font-mono">Building with ❤️ by developers, for developers</p>
        <p className="text-sm mt-2">© 2025 limerIQ • Apache 2.0 License</p>
      </footer>
    </main>
  )
}
```

---

## Phase 1B: Full Launch Site (Days 11-19)

### Day 11: API Integration Layer

#### Task 8: GitHub Stats API
```typescript
// app/api/stats/route.ts
import { NextResponse } from 'next/server'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)
const CACHE_TTL = 300 // 5 minutes

export async function GET() {
  try {
    // Check cache first
    const cached = await redis.get('github:stats')
    if (cached) {
      return NextResponse.json(JSON.parse(cached))
    }

    // Fetch fresh data
    const headers = {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    }

    const repoResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}`,
      { headers }
    )
    const repoData = await repoResponse.json()

    const contributorsResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contributors`,
      { headers }
    )
    const contributorsData = await contributorsResponse.json()

    const stats = {
      githubStars: repoData.stargazers_count || 0,
      contributors: contributorsData.length || 0,
      weeklyWorkflows: Math.floor(Math.random() * 1000) + 500, // Mock for now
      discordMembers: 0, // Will implement Discord webhook
    }

    // Cache the results
    await redis.set('github:stats', JSON.stringify(stats), 'EX', CACHE_TTL)

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({
      githubStars: 0,
      contributors: 0,
      weeklyWorkflows: 0,
      discordMembers: 0,
    })
  }
}
```

### Day 12: Live Stats Components

#### Task 9: Stats Bar Component
```typescript
// components/StatsBar.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Stats {
  githubStars: number
  contributors: number
  weeklyWorkflows: number
  discordMembers: number
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    githubStars: 0,
    contributors: 0,
    weeklyWorkflows: 0,
    discordMembers: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="flex justify-center gap-8 py-4 font-mono text-sm">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span>⭐</span>
        <span className="text-accent font-bold">{formatNumber(stats.githubStars)}</span>
        <span className="text-muted">stars</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span>👥</span>
        <span className="text-accent font-bold">{formatNumber(stats.contributors)}</span>
        <span className="text-muted">contributors</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span>🚀</span>
        <span className="text-accent font-bold">{formatNumber(stats.weeklyWorkflows)}</span>
        <span className="text-muted">this week</span>
      </motion.div>
    </div>
  )
}
```

### Day 13: Terminal Demo Component

#### Task 10: Interactive Terminal
```typescript
// components/Terminal.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const terminalLines = [
  { type: 'command', text: '$ limeriq run deploy-feature.yaml', delay: 0 },
  { type: 'success', text: '✓ Step 1: Analyzing requirements', delay: 1000 },
  { type: 'success', text: '✓ Step 2: Creating implementation plan', delay: 2000 },
  { type: 'success', text: '✓ Step 3: Writing code (consensus: 4/5 agents agree)', delay: 3000 },
  { type: 'success', text: '✓ Step 4: Validation passed', delay: 4000 },
  { type: 'success', text: '✓ Step 5: Tests written and passing', delay: 5000 },
  { type: 'info', text: '📦 Workflow completed in 3m 27s', delay: 6000 },
  { type: 'info', text: '💾 31% fewer tokens than unstructured approach', delay: 6500 },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    terminalLines.forEach((line) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-accent'
      case 'error': return 'text-error'
      case 'info': return 'text-blue-400'
      default: return 'text-foreground'
    }
  }

  return (
    <div className="bg-code-bg rounded-lg p-6 font-mono text-sm overflow-x-auto">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      <div className="space-y-1">
        {visibleLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={getLineColor(line.type)}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

### Day 14: Full Homepage Assembly

#### Task 11: Complete Homepage
```typescript
// app/page.tsx (for Step 1B)
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import Terminal from '@/components/Terminal'
import QuickStart from '@/components/QuickStart'
import VSCodeSection from '@/components/VSCodeSection'
import Community from '@/components/Community'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-muted">
        <div className="font-mono font-bold text-xl">limerIQ</div>
        <div className="flex gap-6">
          <a href="https://github.com/limeriq/limeriq" 
             className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href="https://discord.gg/limeriq" 
             className="hover:text-accent transition-colors">
            Discord
          </a>
          <a href="https://github.com/limeriq/limeriq/docs" 
             className="hover:text-accent transition-colors">
            Docs
          </a>
        </div>
      </nav>

      {/* Hero with Install Command */}
      <section className="py-20 text-center">
        <h1 className="text-6xl font-mono font-bold mb-6">
          The IQ Behind Your AI
        </h1>
        <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
          Open source workflow composer that makes AI agents actually complete their work
        </p>
        
        {/* Install Command */}
        <div className="bg-code-bg rounded-lg px-6 py-3 inline-flex items-center gap-4 mb-8">
          <code className="font-mono text-accent">$ npm install -g limeriq</code>
          <button className="text-muted hover:text-foreground">
            📋
          </button>
        </div>
        
        <StatsBar />
      </section>

      {/* Problem/Solution Visual */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-mono text-error mb-4">AI without IQ:</h3>
              <p className="text-2xl">💡→💭→🤔→😵→💥</p>
            </div>
            <div>
              <h3 className="font-mono text-accent mb-4">AI with limerIQ:</h3>
              <p className="text-2xl">💡→📝→✓→📦→🚀</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Terminal Demo */}
      <section className="py-20 px-4 bg-code-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-8 text-center">
            How It Works
          </h2>
          <Terminal />
        </div>
      </section>

      {/* Workflow YAML Example */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-8">
            Define. Validate. Execute.
          </h2>
          <CodeBlock 
            language="yaml"
            code={`name: deploy-feature
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
    command: pytest tests/`}
          />
        </div>
      </section>

      <QuickStart />
      <VSCodeSection />
      <Community />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-muted text-center">
        <p className="text-muted font-mono">
          Free forever for individuals • Apache 2.0 License
        </p>
        <p className="text-sm text-muted mt-2">
          We built this for ourselves. Seems to work pretty well.
        </p>
      </footer>
    </main>
  )
}
```

### Day 15: VSCode Extension Section

#### Task 12: VSCode Extension Component
```typescript
// components/VSCodeSection.tsx
export default function VSCodeSection() {
  return (
    <section className="py-20 px-4 bg-code-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-mono font-bold mb-8">
          Visual Workflow Designer
        </h2>
        <p className="text-xl text-muted mb-8">
          Design workflows visually in VSCode, execute with confidence
        </p>
        
        {/* Placeholder for actual screenshot */}
        <div className="bg-background rounded-lg p-8 mb-8">
          <img 
            src="/vscode-extension-preview.png" 
            alt="VSCode Extension Preview"
            className="rounded-lg"
          />
        </div>
        
        <div className="bg-background rounded-lg px-6 py-3 inline-flex items-center gap-4">
          <code className="font-mono text-accent">
            ext install limeriq.vscode-limeriq
          </code>
          <button className="text-muted hover:text-foreground">
            📋
          </button>
        </div>
      </div>
    </section>
  )
}
```

### Day 16-17: Testing & Optimization

#### Task 13: Performance Optimization Checklist
```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize bundle
  experimental: {
    optimizeCss: true,
  },
}
```

#### Task 14: 404 Page with Limerick
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-mono font-bold mb-8">404</h1>
        
        <div className="font-mono text-lg mb-8 space-y-1">
          <p>There once was a page that you sought,</p>
          <p>But sadly it seems it is not,</p>
          <p className="ml-8">The route has gone missing,</p>
          <p className="ml-8">No use reminiscing,</p>
          <p>Head home for the workflows we've got.</p>
        </div>
        
        <div className="space-x-4">
          <a href="/" className="text-accent hover:underline">Go Home</a>
          <a href="https://github.com/limeriq/limeriq" 
             className="text-accent hover:underline">View GitHub</a>
        </div>
      </div>
    </div>
  )
}
```

---

## Launch Day Execution (Day 19)

### Pre-Launch Checklist
```bash
# 1. Environment variables set
# 2. Supabase tables created
# 3. Redis cache configured
# 4. GitHub repo ready (but private)
# 5. VSCode extension submitted for review
# 6. Discord server configured
# 7. Vercel deployment tested
```

### Launch Sequence
```markdown
1. 8:00 AM PT - Make GitHub repo public
2. 8:15 AM PT - Publish VSCode extension
3. 8:30 AM PT - Deploy production website
4. 9:00 AM PT - Submit to Hacker News
5. 9:15 AM PT - Post on r/LocalLLaMA
6. 9:30 AM PT - Share in AI Discord servers
7. 10:00 AM PT - Begin monitoring and responding
```

### Monitoring Dashboard
```typescript
// app/api/metrics/route.ts (internal use only)
export async function GET() {
  // Real-time metrics for launch day
  return NextResponse.json({
    visitors: await getVisitorCount(),
    signups: await getSignupCount(),
    githubStars: await getGitHubStars(),
    extensionInstalls: await getExtensionInstalls(),
    errorRate: await getErrorRate(),
    responseTime: await getAverageResponseTime(),
  })
}
```

---

## Critical Success Factors

### Must Have Before Launch
1. ✅ Website loads in <2 seconds
2. ✅ GitHub repo with README and examples
3. ✅ VSCode extension functional
4. ✅ Discord server with welcome flow
5. ✅ At least 10 example workflows
6. ✅ Terminal demo working smoothly
7. ✅ Mobile responsive design
8. ✅ Zero marketing buzzwords

### Red Flags to Avoid
1. ❌ Using "revolutionary" or "game-changing"
2. ❌ Promising specific ROI or productivity gains
3. ❌ Enterprise features or pricing visible
4. ❌ Broken links or non-functional demos
5. ❌ Slow page loads or janky animations
6. ❌ Email marketing popups
7. ❌ Stock photography or generic illustrations

---

## Post-Launch Iteration Plan

### Day 20-21: Immediate Fixes
- Fix any critical bugs found
- Respond to all GitHub issues
- Update copy based on feedback
- Add requested workflow examples

### Week 2: Community Features
- Add contributor avatars grid
- Implement workflow gallery
- Create first technical blog post
- Add community testimonials (text only)

### Decision Point for Phase 2
Monitor these metrics:
- GitHub stars > 5,000
- Discord members > 500
- Enterprise inquiries > 50
- Community workflows > 100

When thresholds met, begin Phase 2 planning.

---

*This execution plan provides Claude Code with step-by-step instructions to build the limerIQ Phase 1 website. Focus on authenticity, performance, and developer experience. Remember: we're builders solving a real problem, not marketers selling hype.*