# 📊 Analytics History — Lucky Cruise Voyage

> Last updated: March 16, 2026

---

## Project Overview

| Metric | Value |
|---|---|
| **Project Name** | Lucky Cruise Voyage |
| **Platform** | Lovable (Vite + React + TypeScript) |
| **Published URL** | https://lucky-cruise-voyage.lovable.app |
| **Preview URL** | https://id-preview--b619d4c2-bd5c-4e6e-becf-d0cefca88247.lovable.app |
| **Total Pages** | 10 Public + 24 Admin = 34 Routes |
| **Total Cruises** | 14 vessels |
| **Languages** | English (en), Bengali (bn) |
| **Data Version** | v35 |

---

## Development Analytics

### Build Milestones

| Date | Version | Milestone | Status |
|---|---|---|---|
| 2026-02-28 | v1.0.0 | Initial project scaffold, homepage, 14 cruise models | ✅ Complete |
| 2026-03-02 | v1.1.0 | Cruise listing/detail, packages, blog pages | ✅ Complete |
| 2026-03-05 | v1.2.0 | Gallery, About, Contact, bilingual i18n | ✅ Complete |
| 2026-03-08 | v1.3.0 | Full admin panel (24 pages), sidebar navigation | ✅ Complete |
| 2026-03-10 | v1.4.0 | Booking modal, WhatsApp integration, categories | ✅ Complete |
| 2026-03-12 | v1.5.0 | SEO Manager, testimonials, team, offers | ✅ Complete |
| 2026-03-14 | v1.6.0 | Hero Manager, promo ads, reviews, blog manager | ✅ Complete |
| 2026-03-15 | v1.7.0 | CMS Homepage Content Manager, contact inquiries | ✅ Complete |
| 2026-03-16 | v1.8.0 | Hero banners with tour images, quick booking filter | ✅ Complete |
| 2026-03-16 | v1.9.0 | Full documentation suite (10 .md files) | ✅ Complete |

### Component & File Count

| Category | Count | Details |
|---|---|---|
| Public Pages | 10 | Index, About, CruiseList, CruiseDetail, Packages, Gallery, BlogList, BlogDetail, Contact, NotFound |
| Admin Pages | 24 | Dashboard, CruiseManager, CruiseEditor, PackagesManager, Bookings, CategoriesManager, AvailabilityManager, BlogManager, ReviewsManager, TestimonialsManager, TeamManager, OffersManager, MediaLibrary, PagesCMS, SEOManager, HeroImageManager, PromoAdsManager, FeaturedCruiseManager, SeatPlanManager, HomepageContentManager, ContactInquiries, Users, Settings, Login |
| Custom Components | 12 | PageHeroBanner, BookingModal, HeaderBookingModal, ImageZoom, NavLink, ReviewSection, ScrollToTop, SeatPlanViewer, WhatsAppFloat, AdminLayout, SeoFieldsPanel, PublicLayout |
| shadcn/ui Components | 48 | Full component library |
| Services/Stores | 3 | cmsStore.ts, bookingStore.ts, mockData.ts |
| Hooks | 2 | use-mobile.tsx, use-toast.ts |
| Locale Files | 2 | en.json, bn.json |
| Context Providers | 1 | LanguageContext.tsx |
| Documentation Files | 10 | docs/*.md |

### Asset Analytics

| Asset Type | Count | Location |
|---|---|---|
| Cruise Images | ~280+ | src/assets/cruises/ |
| Hero/Banner Images | 6 | src/assets/hero/ |
| Blog Images | 3 | src/assets/blog/ |
| Promo Images | 3 | src/assets/promos/ |
| Logo Files | 2 | src/assets/logo.png, toas-logo.png |
| Certificate | 1 | src/assets/toas-certificate.jpg |
| Seat Plan Images | 10 | src/assets/cruises/*-seatplan.* |
| Menu Images | 3 | src/assets/cruises/*-menu.* |
| OG Image | 1 | public/og-image.jpg |
| Favicon | 1 | public/favicon.ico |

### Cruise Fleet Inventory

| # | Cruise Name | ID | Images | Has Seat Plan | Has Menu |
|---|---|---|---|---|---|
| 1 | MV Flamingo | mv-flamingo | 24 | ❌ | ❌ |
| 2 | MV Forest | mv-forest | 15 | ✅ | ❌ |
| 3 | MV Jol Safari | mv-jol-safari | 9 | ✅ | ✅ |
| 4 | MV Khayapar | mv-khayapar | 34 | ✅ | ❌ |
| 5 | MV Magpie | mv-magpie | 19 | ✅ | ✅ |
| 6 | MV Crown | mv-crown | 22 | ✅ | ❌ |
| 7 | MV Sea Pearl | mv-pearl | 20 | ✅ | ❌ |
| 8 | MV Sea Pearl 3 | mv-pearl-3 | 29 | ✅ | ✅ |
| 9 | MV Silver | mv-silver | 12 | ✅ | ❌ |
| 10 | MV Utshab | mv-utshab | 26 | ✅ | ❌ |
| 11 | MV Adeeba | mv-adeeba | 13 | ❌ | ❌ |
| 12 | MV Mohammadi 2 | mv-mohammadi2 | 19 | ✅ | ❌ |
| 13 | MV Reza B | mv-rezab | 18 | ✅ | ❌ |
| 14 | MV Ocean Pearl | mv-ocean-pearl | 16 | ✅ | ❌ |

### Dependency Analytics

| Category | Count | Key Packages |
|---|---|---|
| UI Framework | 20+ | Radix UI primitives (accordion, dialog, popover, etc.), shadcn/ui |
| Routing | 1 | react-router-dom v6.30.1 |
| Animation | 1 | framer-motion v12.35.0 |
| Forms | 3 | react-hook-form v7.61.1, zod v3.25.76, @hookform/resolvers v3.10.0 |
| Data Fetching | 1 | @tanstack/react-query v5.83.0 |
| Charts | 1 | recharts v2.15.4 |
| Styling | 4 | tailwindcss v3.4.17, tailwind-merge v2.6.0, tailwindcss-animate v1.0.7, @tailwindcss/typography v0.5.16 |
| Date Utils | 2 | date-fns v3.6.0, react-day-picker v8.10.1 |
| Carousel | 1 | embla-carousel-react v8.6.0 |
| Theming | 1 | next-themes v0.3.0 |

### CMS Data Entities

| Entity | localStorage Key | Default Count | Has CRUD |
|---|---|---|---|
| Cruises | cms_cruises | 14 | ✅ Full CRUD |
| Settings | cms_settings | 1 (singleton) | ✅ Read/Write |
| Homepage Content | cms_homepage_content | 1 (singleton) | ✅ Read/Write |
| Pages | cms_pages | 6 | ✅ Full CRUD |
| SEO Entries | cms_seo | 6 | ✅ Full CRUD |
| Testimonials | cms_testimonials | from mockData | ✅ Full CRUD |
| Team Members | cms_teamMembers | from mockData | ✅ Full CRUD |
| Offers | cms_offers | auto-generated | ✅ Full CRUD |
| Blog Posts | cms_blogs | 3 | ✅ Full CRUD |
| Reviews | cms_reviews | 0 | ✅ Full CRUD |
| Promo Ads | cms_promoAds | 3 | ✅ Full CRUD |
| Contact Inquiries | cms_contact_inquiries | 0 | ✅ Add/Status |

---

## Performance Targets

| Metric | Target | Notes |
|---|---|---|
| First Contentful Paint | < 1.5s | Static SPA, no API calls |
| Largest Contentful Paint | < 2.5s | Hero images are largest elements |
| Time to Interactive | < 3.0s | React hydration |
| Total Bundle Size | < 2MB | Code-split by route via React Router |
| Lighthouse Performance | 90+ | All assets optimized |
| Lighthouse SEO | 95+ | Meta tags, semantic HTML, robots.txt |
| Lighthouse Accessibility | 90+ | ARIA labels, alt text, contrast |

---

## Traffic Sources (Expected)

| Source | Channel | Details |
|---|---|---|
| Organic Search | Google, Bing | Bengali + English keywords for "sundarban cruise" |
| WhatsApp | Direct | Float button on all pages, booking modal redirect |
| Social Media | Facebook, YouTube, Instagram | Company profiles linked in footer |
| Direct | URL | Published URL + custom domain |
| Google My Business | Maps | Business listing with contact |

---

## Admin Dashboard Metrics (Live)

The admin dashboard (`/admin`) tracks 11 real-time metrics:

| # | Metric | Source Function |
|---|---|---|
| 1 | Total Cruises | `getCruises().length` |
| 2 | Total Packages | Sum of all cruise packages |
| 3 | Active Offers | `getOffers().filter(active).length` |
| 4 | Total Bookings | Bookings store count |
| 5 | Pending Bookings | Bookings with pending status |
| 6 | Total Reviews | `getReviews().length` |
| 7 | Blog Posts | `getBlogs().length` |
| 8 | Team Members | `getTeamMembers().length` |
| 9 | Testimonials | `getTestimonials().length` |
| 10 | New Inquiries | `getContactInquiries().filter(new).length` |
| 11 | Promo Ads | `getPromoAds().length` |

---

## Code Quality Metrics

| Metric | Value |
|---|---|
| TypeScript Strict Mode | ✅ Enabled |
| ESLint | ✅ Configured (9.x) |
| Test Framework | Vitest 3.x |
| Build Tool | Vite 5.x |
| React Version | 18.3.x |
| Node.js Requirement | 18+ |
