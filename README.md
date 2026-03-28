# Editorial CMS Showcase

This repository contains a frontend-only sample website for a multi-site, multilingual editorial CMS concept. It is intentionally scoped as a public-facing showcase that can be deployed directly to Vercel while backend and CMS implementation are still to come.

## What it demonstrates

- A clean product framing for a shared editorial platform serving multiple country sites
- Mobile-first presentation for pages, editorial blocks, events, and publishing roles
- A Vercel-friendly Next.js setup with server-rendered output
- Positioning for future multilingual content, migration tooling, and API integrations

## Tech stack

- Next.js 15
- React 19
- TypeScript

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deployment

Push the repository to GitHub and import it into Vercel. The included `vercel.json` keeps the project configuration simple for a frontend-only deployment.
