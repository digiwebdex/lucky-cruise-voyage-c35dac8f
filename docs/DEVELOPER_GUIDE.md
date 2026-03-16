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
16. [Performance](#performance)
17. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React + TypeScript | 18.3.x + 5.8.x |
| Build Tool | Vite | 5.4.x |
| Styling | Tailwind CSS + shadcn/ui | 3.4.x |
| Routing | React Router DOM | 6.30.x |
| State | React Context + localStorage (CMS Store) | — |
| Forms | React Hook Form + Zod | 7.61.x + 3.25.x |
| Animation | Framer Motion | 12.35.x |
| Charts | Recharts | 2.15.x |
| Data Fetching | TanStack React Query | 5.83.x |
| Icons | Lucide React | 0.462.x |
| Carousel | Embla Carousel React | 8.6.x |
| Date | date-fns + react-day-picker | 3.6.x + 8.10.x |
| Theming | next-themes | 0.3.x |

---

## Project Structure

```
lucky-cruise-voyage/
├── docs/                    # Project documentation (10 .md files)
│   ├── ANALYTICS_HISTORY.md
│   ├── API_REFERENCE.md
│   ├── ARCHITECTURE.md
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT_COMMANDS.md
│   ├── DEPLOYMENT_HISTORY.md
│   ├── DEVELOPER_GUIDE.md    ← You are here
│   ├── FEATURES.md
│   └── SECURITY.md
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg          # Social sharing image
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/               # Static images (~300+ files)
│   │   ├── cruises/          # 280+ cruise photos, seat plans, menus
│   │   ├── hero/             # 6 page hero banner images
│   │   ├── blog/             # 3 blog post cover images
│   │   ├── promos/           # 3 promotional banner images
│   │   ├── logo.png          # Company logo
│   │   ├── toas-logo.png     # TOAS certification logo
│   │   └── toas-certificate.jpg
│   ├── components/
│   │   ├── admin/            # AdminLayout.tsx, SeoFieldsPanel.tsx
│   │   ├── layout/           # Header.tsx, Footer.tsx, PublicLayout.tsx
│   │   ├── ui/               # 48 shadcn/ui components
│   │   ├── BookingModal.tsx
│   │   ├── HeaderBookingModal.tsx
│   │   ├── ImageZoom.tsx
│   │   ├── NavLink.tsx
│   │   ├── PageHeroBanner.tsx
│   │   ├── ReviewSection.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SeatPlanViewer.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx  # EN/BN language switching
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile viewport detection
│   │   └── use-toast.ts        # Toast notification hook
│   ├── locales/
│   │   ├── en.json             # English translations
│   │   └── bn.json             # Bengali translations
│   ├── pages/
│   │   ├── admin/              # 24 admin pages
│   │   │   ├── AvailabilityManager.tsx
│   │   │   ├── BlogManager.tsx
│   │   │   ├── Bookings.tsx
│   │   │   ├── CategoriesManager.tsx
│   │   │   ├── ContactInquiries.tsx
│   │   │   ├── CruiseEditor.tsx
│   │   │   ├── CruiseManager.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FeaturedCruiseManager.tsx
│   │   │   ├── HeroImageManager.tsx
│   │   │   ├── HomepageContentManager.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MediaLibrary.tsx
│   │   │   ├── OffersManager.tsx
│   │   │   ├── PackagesManager.tsx
│   │   │   ├── PagesCMS.tsx
│   │   │   ├── PromoAdsManager.tsx
│   │   │   ├── ReviewsManager.tsx
│   │   │   ├── SEOManager.tsx
│   │   │   ├── SeatPlanManager.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── TeamManager.tsx
│   │   │   ├── TestimonialsManager.tsx
│   │   │   └── Users.tsx
│   │   ├── Index.tsx           # Homepage
│   │   ├── About.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── BlogList.tsx
│   │   ├── Contact.tsx
│   │   ├── CruiseDetail.tsx
│   │   ├── CruiseList.tsx
│   │   ├── Gallery.tsx
│   │   ├── NotFound.tsx
│   │   └── Packages.tsx
│   ├── services/
│   │   ├── bookingStore.ts     # Booking state management
│   │   ├── cmsStore.ts         # Main CMS state (530 lines, 12 entities)
│   │   └── mockData.ts         # 14 cruise definitions + TypeScript types
│   ├── lib/
│   │   └── utils.ts            # cn() utility for className merging
│   ├── test/
│   │   ├── setup.ts            # Vitest environment setup
│   │   └── example.test.ts     # Example test file
│   ├── App.tsx                 # Root routes (34 routes)
│   ├── App.css
│   ├── index.css               # Tailwind base + design tokens
│   ├── main.tsx                # Entry point (ReactDOM.createRoot)
│   └── vite-env.d.ts
├── components.json             # shadcn/ui configuration
├── eslint.config.js
├── index.html                  # HTML entry with meta tags
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

---

## Getting Started

### Prerequisites
- **Node.js 18+** (recommended: use nvm)
- **npm** or **bun** package manager

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
| `npm run build` | Production build → `dist/` |
| `npm run build:dev` | Development build with source maps |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest, single run) |
| `npm run test:watch` | Run tests in watch mode |

---

## Architecture

### Data Flow Pattern
```
mockData.ts (default/seed data, 14 cruises + types)
     ↓ (first load, if localStorage empty)
cmsStore.ts (read/write layer, 12 entity types)
     ↓ (persist via JSON.stringify)
localStorage (browser storage, versioned with DATA_VERSION)
     ↓ (read via get*() functions)
Public Pages (read-only) ←→ Admin Pages (read + write via save*())
```

### Version Migration
The CMS store uses a `DATA_VERSION` constant (`v35`). When bumped, all localStorage keys are cleared and reseeded from defaults. This ensures data schema changes propagate cleanly.

```typescript
const DATA_VERSION = "v35";
// On load: if stored version !== DATA_VERSION, clear all keys and reseed
```

### Key Architectural Patterns
1. **CMS Store Pattern**: All data lives in `cmsStore.ts` with paired `get*()` / `save*()` functions backed by localStorage
2. **No Backend**: Fully static SPA — all data persists in the browser's localStorage
3. **Bilingual First**: All user-facing content has dual fields (`title` + `titleBn`)
4. **Component Composition**: Pages compose from shadcn/ui primitives + custom components
5. **Route-Level Organization**: Each page is a self-contained component in `src/pages/`

---

## Routing

### Public Routes (10)

| Path | Component | Description |
|---|---|---|
| `/` | Index | Homepage with hero, stats, featured, why us, CTA, promos |
| `/cruises` | CruiseList | Filterable cruise listing |
| `/cruises/:id` | CruiseDetail | Single cruise with gallery, tabs, packages, reviews |
| `/packages` | Packages | Tour package listings |
| `/gallery` | Gallery | Photo gallery with lightbox zoom |
| `/blog` | BlogList | Blog listing with category filter |
| `/blog/:slug` | BlogDetail | Single blog post |
| `/about` | About | Company info, team, certificates |
| `/contact` | Contact | Contact form + Google Maps + WhatsApp |
| `*` | NotFound | 404 page |

### Admin Routes (24, under `/admin`)

| Path | Component | Category |
|---|---|---|
| `/admin/login` | Login | Auth |
| `/admin` | Dashboard | Overview |
| `/admin/cruises` | CruiseManager | Content |
| `/admin/cruises/new` | CruiseEditor | Content |
| `/admin/cruises/:id` | CruiseEditor | Content |
| `/admin/packages` | PackagesManager | Content |
| `/admin/categories` | CategoriesManager | Content |
| `/admin/availability` | AvailabilityManager | Content |
| `/admin/bookings` | Bookings | Customer |
| `/admin/contact-inquiries` | ContactInquiries | Customer |
| `/admin/testimonials` | TestimonialsManager | Customer |
| `/admin/reviews` | ReviewsManager | Customer |
| `/admin/offers` | OffersManager | Marketing |
| `/admin/blogs` | BlogManager | Marketing |
| `/admin/promo-ads` | PromoAdsManager | Marketing |
| `/admin/hero-images` | HeroImageManager | Marketing |
| `/admin/featured-cruises` | FeaturedCruiseManager | Marketing |
| `/admin/homepage-content` | HomepageContentManager | CMS |
| `/admin/seat-plans` | SeatPlanManager | CMS |
| `/admin/pages` | PagesCMS | CMS |
| `/admin/seo` | SEOManager | CMS |
| `/admin/media` | MediaLibrary | CMS |
| `/admin/team` | TeamManager | Organization |
| `/admin/users` | Users | Organization |
| `/admin/settings` | Settings | Organization |

---

## Data Layer

### Core Types (from `mockData.ts`)

```typescript
interface Cruise {
  id: string;
  name: string;
  nameBn: string;
  subtitle: string;
  destination: "sundarban" | "tanguar-haor";
  subCategory: "family" | "couple" | "premium" | "budget" | "luxury";
  route: string;
  routeBn: string;
  duration: string;
  durationBn: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  featuredImageIndex?: number;
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

interface CruisePackage {
  name: string;
  nameBn: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  featuresBn: string[];
  isOffer?: boolean;
}

interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}
```

### CMS Store Entities (from `cmsStore.ts`)

| Entity | Interface | localStorage Key | Default Source |
|---|---|---|---|
| Cruises | `Cruise` | `cms_cruises` | `mockData.ts` (14 items) |
| Settings | `SiteSettings` | `cms_settings` | Hardcoded defaults |
| Homepage Content | `HomepageContent` | `cms_homepage_content` | Hardcoded defaults (EN+BN) |
| Pages | `CmsPage[]` | `cms_pages` | 6 default pages |
| SEO | `SeoEntry[]` | `cms_seo` | 6 page entries |
| Testimonials | `Testimonial[]` | `cms_testimonials` | From `mockData.ts` |
| Team Members | `TeamMember[]` | `cms_teamMembers` | From `mockData.ts` |
| Offers | `Offer[]` | `cms_offers` | Auto-generated from cruises |
| Blog Posts | `BlogPost[]` | `cms_blogs` | 3 default posts |
| Reviews | `CustomerReview[]` | `cms_reviews` | Empty (user-generated) |
| Promo Ads | `PromoAd[]` | `cms_promoAds` | 3 defaults |
| Contact Inquiries | `ContactInquiry[]` | `cms_contact_inquiries` | Empty (user-generated) |

### CMS Store API

```typescript
// Read functions
getCruises(): Cruise[]
getSettings(): SiteSettings
getHomepageContent(): HomepageContent
getPages(): CmsPage[]
getSeo(): SeoEntry[]
getTestimonials(): Testimonial[]
getTeamMembers(): TeamMember[]
getOffers(): Offer[]
getBlogs(): BlogPost[]
getReviews(): CustomerReview[]
getPromoAds(): PromoAd[]
getContactInquiries(): ContactInquiry[]

// Write functions
saveCruises(data: Cruise[]): void
saveSettings(data: SiteSettings): void
saveHomepageContent(data: HomepageContent): void
savePages(data: CmsPage[]): void
saveSeo(data: SeoEntry[]): void
saveTestimonials(data: Testimonial[]): void
saveTeamMembers(data: TeamMember[]): void
saveOffers(data: Offer[]): void
saveBlogs(data: BlogPost[]): void
saveReviews(data: CustomerReview[]): void
savePromoAds(data: PromoAd[]): void
saveContactInquiries(data: ContactInquiry[]): void

// Helper functions
getCruiseById(id: string): Cruise | undefined
searchCruises(query: string): Cruise[]
addReview(review: Omit<CustomerReview, "id"|"createdAt"|"status">): CustomerReview
getApprovedReviews(targetType: string, targetId: string): CustomerReview[]
addContactInquiry(inquiry: Omit<ContactInquiry, "id"|"createdAt"|"status">): ContactInquiry

// React Hook
useCmsData<T>(getter, saver): [T, (data: T) => void]
```

---

## CMS & Admin Panel

### Admin Authentication
Currently uses a simple client-side login at `/admin/login` with hardcoded credentials in localStorage.

> ⚠️ **NOT production-secure** — Must migrate to Lovable Cloud for proper server-side authentication with RLS policies.

### Homepage Content Manager (`/admin/homepage-content`)
Every text element on the homepage is editable in EN & BN:

| Section | Editable Fields |
|---|---|
| Hero | Badge, Title, Highlight word, Subtitle |
| Stats | 3 × (Value + Label) |
| Quick Info Strip | 4 × (Value + Label) |
| Featured Section | Section label, Title, Highlight, Subtitle |
| Why Choose Us | Title, Highlight, 4 × (Title + Description) |
| Testimonials | Title, Highlight |
| CTA | Title, Highlight, Subtitle |
| Promo Section | Title, Subtitle |

### Site Settings (`/admin/settings`)
- Site name, phone, WhatsApp number, email, address (EN/BN)
- Social media URLs (Facebook, YouTube, Instagram)
- Footer text (EN/BN)
- Google Maps embed URL
- WhatsApp float button toggle
- Language switcher toggle
- Hero images array
- Featured cruise IDs

---

## Internationalization (i18n)

### How it works
1. `LanguageContext.tsx` provides `language`, `setLanguage`, and `t()` function
2. Translation files: `src/locales/en.json` and `bn.json`
3. Components check: `const { language, t } = useLanguage();`
4. Static UI text: `t("nav.home")` → looks up key in locale file
5. CMS data: `language === "bn" ? cruise.nameBn : cruise.name`

### Adding a new translation
1. Add key to both `en.json` and `bn.json`
2. Use in component:
```tsx
const { t } = useLanguage();
return <p>{t("your.new.key")}</p>;
```

### Adding bilingual CMS field
1. Add both fields to interface: `fieldName: string; fieldNameBn: string;`
2. In component: `const value = language === "bn" ? data.fieldNameBn : data.fieldName;`

---

## Styling & Design System

### CSS Variables (`index.css`)
All colors are HSL-based semantic tokens:
```css
:root {
  --background: <hsl>;
  --foreground: <hsl>;
  --primary: <hsl>;
  --primary-foreground: <hsl>;
  --secondary: <hsl>;
  --secondary-foreground: <hsl>;
  --muted: <hsl>;
  --muted-foreground: <hsl>;
  --accent: <hsl>;
  --accent-foreground: <hsl>;
  --destructive: <hsl>;
  --border: <hsl>;
  --input: <hsl>;
  --ring: <hsl>;
}
```

### Tailwind Config
Extended in `tailwind.config.ts`:
- Custom colors mapped to CSS variables
- Animation keyframes (accordion, fade-in, etc.)
- Typography plugin (`@tailwindcss/typography`)

### Design Rules
- ❌ **Never** use raw colors: `text-white`, `bg-black`, `text-blue-500`
- ✅ **Always** use semantic tokens: `text-foreground`, `bg-background`, `text-primary`
- ✅ Use `cn()` from `src/lib/utils.ts` for conditional classes

---

## Components Guide

### Custom Components

| Component | File | Purpose |
|---|---|---|
| `PageHeroBanner` | `PageHeroBanner.tsx` | Full-width hero with background image, dark overlay, framer-motion animation |
| `BookingModal` | `BookingModal.tsx` | Multi-step booking form dialog with WhatsApp redirect |
| `HeaderBookingModal` | `HeaderBookingModal.tsx` | Quick book from header navbar |
| `ImageZoom` | `ImageZoom.tsx` | Lightbox/zoom image viewer |
| `SeatPlanViewer` | `SeatPlanViewer.tsx` | Zoomable seat plan display |
| `ReviewSection` | `ReviewSection.tsx` | Star ratings + review cards with submission |
| `WhatsAppFloat` | `WhatsAppFloat.tsx` | Fixed-position WhatsApp CTA button |
| `NavLink` | `NavLink.tsx` | Active-state navigation link |
| `ScrollToTop` | `ScrollToTop.tsx` | Auto-scroll to top on route change |
| `AdminLayout` | `admin/AdminLayout.tsx` | Admin sidebar + content area layout |
| `SeoFieldsPanel` | `admin/SeoFieldsPanel.tsx` | Reusable SEO form fields for admin |
| `PublicLayout` | `layout/PublicLayout.tsx` | Header + Footer + Outlet wrapper |

### shadcn/ui Components (48)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip

---

## SEO

### Current Implementation
- `index.html`: Base meta tags (title, description, viewport), OG tags (title, description, image, url), favicon
- `SEOManager` admin page: Per-page meta title & description for 6 pages
- `SeoFieldsPanel`: Reusable form component for blog/page SEO fields
- Semantic HTML: Single H1 per page, proper heading hierarchy
- `public/robots.txt`: Search engine crawling rules
- `public/og-image.jpg`: Social sharing image (1200×630)

### SEO Checklist
- [x] Unique `<title>` per page
- [x] Meta description per page
- [x] OG tags for social sharing
- [x] robots.txt
- [x] Semantic HTML (header, main, footer, nav)
- [x] Single H1 per page
- [x] Alt text on images
- [x] Responsive viewport meta
- [ ] Canonical tags (pending)
- [ ] JSON-LD structured data (pending)
- [ ] Sitemap.xml (pending)

---

## Testing

### Setup
- **Framework**: Vitest 3.x
- **DOM Environment**: jsdom
- **Utilities**: @testing-library/react, @testing-library/jest-dom
- **Config**: `vitest.config.ts`

### Running Tests
```bash
npm run test              # Single run
npm run test:watch        # Watch mode
npx vitest run src/test/example.test.ts  # Specific file
npx vitest run --coverage # With coverage report
```

### Test Files
- `src/test/setup.ts` — Vitest environment setup with jsdom
- `src/test/example.test.ts` — Example/smoke test

---

## Build & Deploy

### Production Build
```bash
npm run build    # Output: dist/
npm run preview  # Local preview of build
```

### Deploy on Lovable
1. Click **Publish** button in Lovable editor (top right)
2. Frontend changes require clicking "Update" in publish dialog
3. Backend changes (if using Lovable Cloud) deploy immediately

### Self-Hosting Options
```bash
# Static file server
npm run build && npx serve dist

# Docker
docker build -t lucky-cruise . && docker run -p 80:80 lucky-cruise

# Netlify / Vercel / Firebase
npx netlify deploy --prod --dir=dist
npx vercel --prod
npx firebase deploy --only hosting
```

---

## Environment Variables

Currently **no environment variables required** (fully static SPA with localStorage).

**When migrating to Lovable Cloud**, these will be auto-provided:
- `VITE_SUPABASE_URL` — Database endpoint
- `VITE_SUPABASE_ANON_KEY` — Public API key

---

## Security

### Current State
| Area | Status | Risk |
|---|---|---|
| Admin Authentication | ⚠️ Client-side only (localStorage) | **HIGH** |
| Data Storage | localStorage (no encryption) | **MEDIUM** |
| HTTPS | ✅ Via Lovable hosting | LOW |
| XSS Protection | ✅ React auto-escapes JSX | LOW |
| CSRF | N/A (no backend API calls) | N/A |

### Production Security Checklist
1. ✅ Enable Lovable Cloud for server-side auth
2. ✅ Implement RLS policies on all tables
3. ✅ Store user roles in separate `user_roles` table
4. ✅ Never store API keys in client code
5. ✅ Add rate limiting on contact form
6. ✅ Implement CAPTCHA on public forms
7. ✅ Regular dependency audits (`npm audit`)

---

## Performance

### Optimization Strategies
- **Route-level code splitting**: Each page loads independently via React Router
- **Image optimization**: Use appropriate formats (JPEG for photos, PNG for transparency)
- **Lazy loading**: Images below the fold use `loading="lazy"`
- **Bundle analysis**: Run `npx vite-bundle-visualizer` to inspect

### Performance Targets
| Metric | Target |
|---|---|
| FCP | < 1.5s |
| LCP | < 2.5s |
| TTI | < 3.0s |
| Bundle | < 2MB |
| Lighthouse | 90+ |

---

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| Blank page after build | Base path misconfigured | Check `base` in `vite.config.ts` |
| Images not loading | Wrong import paths | Verify imports in `mockData.ts` |
| localStorage full | Too much data | Clear browser storage; migrate to Lovable Cloud |
| HMR not working | WebSocket blocked | Check `server.hmr` in vite config |
| Admin changes gone | localStorage cleared | Browser cache cleared; changes are ephemeral |
| Translation missing | Key not in locale | Add to both `en.json` and `bn.json` |
| Data reset after update | DATA_VERSION bumped | Expected behavior; reseed from defaults |
| Build fails | Type errors | Run `npx tsc --noEmit` to find issues |
| Styles not applying | Raw colors used | Switch to semantic tokens (`text-foreground`, etc.) |
