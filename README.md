# Editorial CMS Showcase

This repository contains a frontend-only MVP sample for a multi-site, multilingual editorial CMS. The root route now behaves like the working app home, with dashboard flows for pages, posts, events, media, locales, alerts, team access, site management, and shared settings.

## What it demonstrates

- A dashboard-first product framing for a shared editorial platform serving multiple country sites
- Mobile-first MVP screens for pages, posts, events, media, alerts, locales, and publishing roles
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
