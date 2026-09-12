# Vercel Doctor

Scans your Next.js codebase for patterns that drive up your Vercel bill, focusing on compute duration, function invocations, and bandwidth optimization.

## Usage

\`\`\`bash
npx -y vercel-doctor@latest . --verbose --diff
\`\`\`

## Workflow

Run after making changes to catch cost-heavy patterns early. Focus on fixing issues that reduce function execution time and invocations first.
