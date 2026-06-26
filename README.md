# TextToolsHub

A modern, privacy-first text analysis platform built with Next.js 16. Process text entirely in your browser — no server uploads, no data collection.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06b6d4)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

TextToolsHub provides a suite of free online text analysis tools designed for writers, students, SEO professionals, and content creators. Every tool runs client-side for instant results and complete privacy.

### Tools

| Tool | Purpose |
|------|---------|
| **Word Counter** | Count words, characters (with/without spaces), sentences, paragraphs, lines, and pages in real time |
| **Character Counter** | Track character count for tweets, meta descriptions, SMS, and platform-specific limits |
| **Sentence Counter** | Analyze sentence count to improve readability and writing structure |
| **Paragraph Counter** | Monitor paragraph count and content organization |
| **Reading Time Calculator** | Estimate reading time (200 WPM) and speaking time (183 WPM) |

### Additional Statistics

Beyond basic counts, each tool provides: spaces, total lines, non-empty lines, estimated pages, keywords density, reading time, and speaking time.

---

## Key Features

- **Client-Side Processing** — All computation happens in the browser. Your text never leaves your device.
- **Real-Time Results** — Statistics update instantly as you type or paste text.
- **Auto-Save** — Text is automatically saved to localStorage to prevent accidental data loss.
- **Internationalization** — Full i18n support with 6 languages: English, French, Spanish, Portuguese, German, and Italian.
- **Dark Mode** — Default dark theme with one-click toggle to light mode. Preference persists via localStorage.
- **User Authentication** — Register, login, and password reset via a PHP/MySQL backend with bcrypt password hashing.
- **SEO Optimized** — Metadata, Open Graph tags, Twitter cards, canonical URLs, sitemap.xml, robots.txt, and JSON-LD structured data (FAQ schema, breadcrumbs).
- **Responsive Design** — Works across desktop, tablet, and mobile devices.
- **Accessibility** — Keyboard navigation, ARIA labels, semantic HTML.
- **Ad-Ready** — Ad placeholders integrated throughout the UI, ready for AdSense approval.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Server-side rendering, static generation, API routes |
| **UI Library** | React 19 | Component architecture, hooks |
| **Language** | TypeScript | Type safety, developer experience |
| **Styling** | Tailwind CSS v4 | Utility-first CSS, dark mode via custom properties |
| **State** | React Context + Hooks | Theme, language, auth, text store |
| **Auth Backend** | PHP 8.2 | RESTful JSON API for user management |
| **Database** | MySQL 8 | User storage, password reset tokens |
| **Auth Protocol** | bcrypt + PHP Sessions | Password hashing (cost 12), session-based auth |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PHP 8+ (for the auth backend)
- MySQL 8+ (for the auth backend)
- Apache or equivalent web server (for PHP)

### Installation

```bash
# Clone the repository
git clone https://github.com/YassineFari/word-counter-app.git
cd word-counter-app

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The Next.js app runs at `http://localhost:3000`.

### Auth Backend Setup

```bash
# 1. Import the database schema
mysql -u root < php-auth/database.sql

# 2. Deploy the PHP backend to your web server
#    (e.g., copy php-auth/ to C:\xampp\htdocs\php-auth\)

# 3. Configure database credentials
#    Edit php-auth/config/database.php

# 4. Configure email settings (for password reset)
#    Edit php-auth/config/mail.php

# 5. Ensure Apache and MySQL are running
```

The PHP API runs at `http://localhost/php-auth/api/`.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
word-counter-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/auth/             # API route handlers (proxies to PHP)
│   │   ├── (tools)/              # Tool pages (word-counter, etc.)
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   ├── forgot-password/      # Password reset request
│   │   ├── reset-password/       # Password reset form
│   │   ├── layout.tsx            # Root layout with providers
│   │   └── globals.css           # Global styles + Tailwind v4
│   ├── components/               # Reusable UI components
│   │   ├── Header.tsx            # Navigation, logo, auth state
│   │   ├── Footer.tsx            # Site footer with links
│   │   ├── MegaMenu.tsx          # Products dropdown (desktop + mobile)
│   │   ├── AuthProvider.tsx      # Auth context (login state, cookies)
│   │   ├── ThemeProvider.tsx     # Dark/light mode context
│   │   ├── LanguageProvider.tsx  # i18n context
│   │   ├── TextEditor.tsx       # Text input area
│   │   ├── StatisticsPanel.tsx  # Stats display grid
│   │   └── ...
│   ├── hooks/
│   │   └── useTextStore.ts      # Text state + localStorage
│   └── lib/
│       ├── utils.ts              # Text analysis functions
│       ├── schema.ts             # JSON-LD schema generators
│       ├── seo.ts                # SEO metadata helpers
│       ├── navigation.tsx        # Mega menu data
│       └── i18n/                 # Translation files (6 languages)
├── php-auth/                      # PHP backend
│   ├── api/                      # JSON endpoints (register, login, etc.)
│   ├── config/                   # Database + mail configuration
│   ├── includes/                 # Helper functions + mailer
│   └── lang/                     # PHP translation files
└── public/                       # Static assets
    └── logo.png                  # Site logo
```

---

## Architecture

### Frontend (Next.js)

The frontend uses the Next.js App Router with a mix of server and client components:

- **Server Components** — Page shells, metadata, layout structure. These are prerendered as static HTML at build time.
- **Client Components** — Interactive elements: text editor, statistics panel, mega menu, auth forms, theme/language toggles.
- **API Route Handlers** — Server-side endpoints that proxy authentication requests to the PHP backend, avoiding CORS issues and allowing httpOnly cookie management.

### Auth Flow

```
Browser                  Next.js (port 3000)           PHP (port 80)
   │                           │                            │
   │  POST /api/auth/login     │                            │
   ├──────────────────────────►│  POST /login.php           │
   │                           ├───────────────────────────►│
   │                           │  { success, user }         │
   │                           │◄───────────────────────────┤
   │  Set-Cookie: user (httpOnly)                           │
   │◄──────────────────────────┤                            │
   │                           │                            │
   │  GET /api/auth/me         │                            │
   ├──────────────────────────►│  Read cookie → return user  │
   │◄──────────────────────────┤                            │
```

### Text Processing

All text analysis runs client-side in the browser. The `utils.ts` module exports pure functions that count words, characters, sentences, paragraphs, lines, spaces, and estimate reading time. No data is sent to any server.

---

## Deployment

### Vercel (Recommended for Next.js)

1. Push the repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — no configuration needed
5. Deploy

### PHP Backend

The PHP auth backend requires a server with PHP 8+ and MySQL. Options:

- **Shared hosting** — Upload the `php-auth/` directory to your web root
- **VPS** — Install Apache/Nginx + PHP + MySQL, deploy the directory
- **XAMPP/WAMP** — For local development

After deployment, update the API URLs in `src/app/api/auth/*/route.ts` to point to your production PHP endpoints.

---

## Contributing

Contributions are welcome. Please open an issue or pull request on GitHub.

---

## License

This project is open source and available under the MIT License.
