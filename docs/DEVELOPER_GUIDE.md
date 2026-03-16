# 🛠️ Developer Guide — Lucky Cruise Voyage

> Complete A-to-Z documentation for developers working on this project.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Architecture](#architecture)
5. [Routing](#routing)
6. [Data Layer](#data-layer)
7. [CMS & Admin Panel](#cms--admin-panel)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Styling & Design System](#styling--design-system)
10. [Components Guide](#components-guide)
11. [SEO](#seo)
12. [Testing](#testing)
13. [Build & Deploy](#build--deploy)
14. [Environment Variables](#environment-variables)
15. [Security](#security)
16. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Routing | React Router DOM v6 |
| State | React Context + localStorage (CMS Store) |
| Forms | React Hook Form + Zod validation |
| Animation | Framer Motion |
| Charts | Recharts |
| Data Fetching | TanStack React Query |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── assets/              # Static images
│   ├── cruises/         # 280+ cruise photos, seat plans, menus
│   ├── hero/            # 6 hero banner images
│   ├── blog/            # Blog post images
│   ├── promos/          # Promotional images
│   ├── logo.png
│   ├── toas-logo.png
│   └── toas-certificate.jpg
├── components/
│   ├── admin/           # AdminLayout, SeoFieldsPanel
│   ├── layout/          # Header, Footer, PublicLayout
│   ├── ui/              # 48 shadcn/ui components
│   ├── BookingModal.tsx
│   ├── HeaderBookingModal.tsx
│   ├── ImageZoom.tsx
│   ├── NavLink.tsx
│   ├── PageHeroBanner.tsx
│   ├── ReviewSection.tsx
│   ├── ScrollToTop.tsx
│   ├── SeatPlanViewer.tsx
│   └── WhatsAppFloat.tsx
├── contexts/
│   └── LanguageContext.tsx   # EN/BN language switching
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── locales/
│   ├── en.json              # English translations
│   └── bn.json              # Bengali translations
├── pages/
│   ├── admin/               # 24 admin pages
│   ├── Index.tsx            # Homepage
│   ├── About.tsx
│   ├── BlogDetail.tsx
│   ├── BlogList.tsx
│   ├── Contact.tsx
│   ├── CruiseDetail.tsx
│   ├── CruiseList.tsx
│   ├── Gallery.tsx
│   ├── NotFound.tsx
│   └── Packages.tsx
├── services/
│   ├── mockData.ts          # 14 cruise definitions + types
│   ├── cmsStore.ts          # CMS state management
│   └── bookingStore.ts      # Booking state management
├── lib/
│   └── utils.ts             # cn() utility
├── App.tsx                  # Root routes
├── App.css
├── index.css                # Tailwind + design tokens
├── main.tsx                 # Entry point
└── vite-env.d.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: use nvm)
- npm or bun package manager

### Installation
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Architecture

### Data Flow
```
mockData.ts (source of truth)
    ↓
cmsStore.ts (localStorage persistence + CRUD)
    ↓
Admin Pages (write) ←→ Public Pages (read)
```

### Key Patterns
- **CMS Store Pattern**: All data lives in `cmsStore.ts` with `get*()` and `save*()` functions backed by localStorage
- **No Backend**: Currently a fully static SPA — all data persists in the browser's localStorage
- **Lazy Loading**: Route-level code splitting via React Router
- **Bilingual**: All user-facing text supports EN/BN via `LanguageContext`

---

## Routing

### Public Routes

| Path | Component | Description |
|---|---|---|
| `/` | Index | Homepage |
| `/cruises` | CruiseList | All cruises with filters |
| `/cruises/:id` | CruiseDetail | Single cruise detail |
| `/packages` | Packages | Tour packages |
| `/gallery` | Gallery | Photo gallery |
| `/blog` | BlogList | Blog posts |
| `/blog/:id` | BlogDetail | Single blog post |
| `/about` | About | About us page |
| `/contact` | Contact | Contact form + map |
| `*` | NotFound | 404 page |

### Admin Routes (under `/admin`)

| Path | Component |
|---|---|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/cruises` | CruiseManager |
| `/admin/cruises/new` | CruiseEditor |
| `/admin/cruises/:id` | CruiseEditor |
| `/admin/packages` | PackagesManager |
| `/admin/bookings` | Bookings |
| `/admin/categories` | CategoriesManager |
| `/admin/availability` | AvailabilityManager |
| `/admin/blog` | BlogManager |
| `/admin/reviews` | ReviewsManager |
| `/admin/testimonials` | TestimonialsManager |
| `/admin/team` | TeamManager |
| `/admin/offers` | OffersManager |
| `/admin/media` | MediaLibrary |
| `/admin/pages` | PagesCMS |
| `/admin/seo` | SEOManager |
| `/admin/hero-images` | HeroImageManager |
| `/admin/promo-ads` | PromoAdsManager |
| `/admin/featured` | FeaturedCruiseManager |
| `/admin/seat-plans` | SeatPlanManager |
| `/admin/homepage-content` | HomepageContentManager |
| `/admin/contact-inquiries` | ContactInquiries |
| `/admin/users` | Users |
| `/admin/settings` | Settings |

---

## Data Layer

### Cruise Model (`mockData.ts`)

```typescript
interface Cruise {
  id: string;
  name: string;
  nameBn: string;
  destination: string;       // "sundarban" | "tanguar-haor" | etc.
  subCategory: string;       // "family" | "couple" | "premium" | etc.
  route: string;
  routeBn: string;
  duration: string;
  durationBn: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  descriptionBn: string;
  highlights: string[];
  highlightsBn: string[];
  inclusions: string[];
  inclusionsBn: string[];
  exclusions: string[];
  exclusionsBn: string[];
  itinerary: ItineraryItem[];
  itineraryBn: ItineraryItem[];
  capacity: number;
  cabins: number;
  amenities: string[];
  seatPlanImage: string;
  menuImage?: string;
  packages: CruisePackage[];
}
```

### CMS Store Functions

| Function | Purpose |
|---|---|
| `getCruises()` / `saveCruises()` | Cruise CRUD |
| `getBookings()` / `addBooking()` | Booking management |
| `getSettings()` / `saveSettings()` | Site settings |
| `getHomepageContent()` / `saveHomepageContent()` | Homepage CMS |
| `getBlogs()` / `saveBlogs()` | Blog CRUD |
| `getReviews()` / `saveReviews()` | Review management |
| `getOffers()` / `saveOffers()` | Offers/deals |
| `getPromoAds()` / `savePromoAds()` | Promotional ads |
| `getSeoSettings()` / `saveSeoSettings()` | Per-page SEO |
| `getContactInquiries()` / `addContactInquiry()` | Contact form submissions |

---

## CMS & Admin Panel

### Admin Authentication
Currently uses a simple client-side login at `/admin/login`. **For production, integrate with Lovable Cloud for proper auth.**

### Homepage Content Manager
Editable sections:
- Hero (badge, title, highlight, subtitle) — EN & BN
- Stats (3 stat cards with values and labels)
- Quick Info Strip (4 info cards)
- Featured Section (title, subtitle)
- Why Us Section (title, subtitle, 4 feature cards)
- CTA Section (title, subtitle, button text)

### Settings Panel
- Site name, phone, WhatsApp, email, address
- Social media URLs (Facebook, YouTube, Instagram)
- Footer text (EN/BN)
- Google Maps embed URL
- WhatsApp float toggle
- Language switcher toggle

---

## Internationalization (i18n)

### How it works
1. `LanguageContext.tsx` provides `language` and `setLanguage`
2. Translation files in `src/locales/en.json` and `bn.json`
3. Components use `useLanguage()` hook to get current language
4. CMS data has dual fields: `title` + `titleBn`, `description` + `descriptionBn`

### Adding a new translation
1. Add key to both `en.json` and `bn.json`
2. Use in component: `const { t } = useLanguage(); <p>{t("key")}</p>`

---

## Styling & Design System

### CSS Variables (index.css)
All colors are HSL-based semantic tokens:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`
- `--border`, `--input`, `--ring`

### Tailwind Config
Extended in `tailwind.config.ts` with:
- Custom colors mapped to CSS variables
- Animation keyframes (accordion, fade-in, etc.)
- Typography plugin (`@tailwindcss/typography`)

### Rules
- ❌ Never use raw colors like `text-white`, `bg-black`
- ✅ Always use semantic tokens: `text-foreground`, `bg-background`, `text-primary`

---

## Components Guide

### Reusable Components

| Component | Purpose |
|---|---|
| `PageHeroBanner` | Full-width hero with background image + overlay |
| `BookingModal` | Booking form dialog |
| `HeaderBookingModal` | Quick book from header |
| `ImageZoom` | Lightbox image viewer |
| `SeatPlanViewer` | Zoomable seat plan display |
| `ReviewSection` | Star ratings + review cards |
| `WhatsAppFloat` | Fixed WhatsApp CTA button |
| `NavLink` | Active-state navigation link |
| `ScrollToTop` | Auto-scroll on route change |

### shadcn/ui Components (48)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip

---

## SEO

### Current Implementation
- `index.html`: Base meta tags, OG tags, favicon
- `SEOManager` admin page: Per-page meta title & description
- `SeoFieldsPanel`: Reusable form component for SEO fields
- Semantic HTML with proper heading hierarchy (single H1 per page)

### Robots.txt
Located at `public/robots.txt`

### OG Image
Located at `public/og-image.jpg`

---

## Testing

### Setup
- Framework: Vitest
- DOM: jsdom
- Utilities: @testing-library/react, @testing-library/jest-dom

### Running Tests
```bash
npm run test          # Single run
npm run test:watch    # Watch mode
```

### Test Files
- `src/test/setup.ts` — Test environment setup
- `src/test/example.test.ts` — Example test

---

## Build & Deploy

### Production Build
```bash
npm run build
```
Output: `dist/` directory

### Deploy on Lovable
1. Click **Publish** button in Lovable editor
2. Frontend changes require clicking "Update"
3. Backend changes (if using Lovable Cloud) deploy immediately

### Self-Hosting
```bash
npm run build
# Serve dist/ with any static file server
npx serve dist
```

---

## Environment Variables

Currently no environment variables required (static SPA with localStorage).

**When migrating to Lovable Cloud**, you'll need:
- Supabase URL & Anon Key (auto-provided by Lovable Cloud)

---

## Security

### Current State
- Admin login is client-side only (localStorage-based)
- **⚠️ NOT production-secure** — needs Lovable Cloud auth

### Production Recommendations
1. Enable Lovable Cloud for proper authentication
2. Move admin auth to server-side with RLS policies
3. Store user roles in separate `user_roles` table
4. Never store API keys in client code
5. Use HTTPS (auto-provided by Lovable hosting)

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Blank page after build | Check `vite.config.ts` base path |
| Images not loading | Verify import paths in `mockData.ts` |
| localStorage full | Clear browser storage; consider Lovable Cloud |
| HMR not working | Check `server.hmr` in vite config |
| Admin changes not persisting | Check localStorage quota |
| Translations missing | Add key to both `en.json` and `bn.json` |
