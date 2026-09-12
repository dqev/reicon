---
name: vercel-doctor
description: Find ways to cut your Vercel bill. Run after making changes to catch cost-heavy patterns early in Next.js projects.
version: 1.0.0
---

# Vercel Doctor

Scans your Next.js codebase for patterns that drive up your Vercel bill, focusing on compute duration, function invocations, and bandwidth optimization.

## Usage

\`\`\`bash
npx -y vercel-doctor@latest . --verbose --diff
\`\`\`

## Cost Optimization Scans

### 1. Function Duration
- **Dead Code Detection** — Removes unused files and exports to speed up cold starts.
- **Parallel Execution** — Identifies sequential await statements that can be run in parallel with Promise.all() to reduce function execution time.
- **Server Post-Processing** — Recommends using after() for non-blocking tasks to end the response earlier.

### 2. Caching & Invocations
- **Client-Side Fetch Detection** — Flags useEffect + fetch patterns in pages/layouts that should be server-side (eliminates API round-trips).
- **Vercel Platform Checks** — Scans for force-dynamic, missing cache policies, no-store fetches, and GET handlers with side effects that prevent ISR.

### 3. Bandwidth & Image Optimization
- **Image Optimization** — Detects global image optimization disabled, next/image with SVG without unoptimized, missing sizes, and overly broad remote patterns.
- **Static Assets** — Finds large static files that consume CDN bandwidth.

## Workflow

Run after making changes to catch cost-heavy patterns early. Focus on fixing issues that reduce function execution time and invocations first.
