# TextToolsHub - Free Online Text Analysis Tools

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- React 19

## Commands
```bash
npm run dev     # Start development server
npm run build   # Production build
npm start       # Start production server
npm run lint    # Run ESLint
```

## Project Structure
```
src/
  app/           # App Router pages
    layout.tsx   # Root layout
    page.tsx     # Homepage
    word-counter/
    character-counter/
    sentence-counter/
    paragraph-counter/
    reading-time-calculator/
    robots.ts    # Robots.txt
    sitemap.ts   # Sitemap.xml
  components/    # Reusable components
  hooks/         # Custom React hooks
  lib/           # Utilities, i18n, schema, SEO
  app/globals.css
```

## Tools (5 MVP)
1. Word Counter
2. Character Counter
3. Sentence Counter
4. Paragraph Counter
5. Reading Time Calculator

## Architecture Notes
- Server Components for layout/page shells
- Client Components for interactive tool interfaces
- Text processing runs entirely client-side
- localStorage for auto-save
- Dark mode support via CSS custom properties
- SEO: metadata, OG, Twitter cards, canonical, robots.txt, sitemap.xml, FAQ/breadcrumb schema
- AdSense-ready with <AdBanner /> placeholders returning null

## Deployment (Vercel)
1. Push to GitHub
2. Import repo at https://vercel.com/new
3. Framework: Next.js (auto-detected)
4. Deploy — no env vars needed
