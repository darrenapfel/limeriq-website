# limerIQ Website

Official website for limerIQ - The IQ Behind Your AI

## Overview

limerIQ is an open source AI workflow orchestration platform that solves the critical failures of autonomous AI coding: context loss and hallucination.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Analytics:** Plausible (privacy-focused)
- **Backend:** Supabase (for beta signups - optional)

## Project Structure

```
.
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── not-found.tsx    # 404 page
├── components/          # React components
│   ├── Hero.tsx         # Hero section
│   ├── StatsBar.tsx     # Live GitHub stats
│   ├── Terminal.tsx     # Animated terminal demo
│   ├── WorkflowExample.tsx  # YAML workflow example
│   └── ...              # Other components
├── docs/                # Planning documents
└── IMAGE_MANIFEST.md    # Required images list
```

## Features

- ✅ Dark theme optimized for developers
- ✅ Animated terminal demonstration
- ✅ Live GitHub stats integration
- ✅ Workflow YAML examples with syntax highlighting
- ✅ Responsive design for all devices
- ✅ 404 page with limerick
- ✅ Privacy-focused analytics
- ✅ Fast performance (Lighthouse 95+)

## Environment Variables

Create a `.env.local` file for optional integrations:

```env
# GitHub API (for real-time stats)
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=limeriq
GITHUB_REPO_NAME=limeriq

# Supabase (for beta signups)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Redis (for caching)
REDIS_URL=your_redis_url
```

## Deployment

The site is optimized for deployment on Vercel:

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Images Needed

See [IMAGE_MANIFEST.md](./IMAGE_MANIFEST.md) for a complete list of placeholder images that need to be created.

## Development Notes

- Website follows Phase 1 PRD specifications
- Anti-hype positioning - no marketing buzzwords
- GitHub README energy - authentic developer voice
- Mobile-first responsive design
- Performance optimized with minimal bundle size

## License

Apache 2.0