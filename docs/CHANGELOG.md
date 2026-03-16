# 📝 Changelog — Lucky Cruise Voyage

All notable changes to this project are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Planned
- Lovable Cloud migration (PostgreSQL, Auth, RLS, Edge Functions)
- Server-side admin authentication
- Image upload via cloud storage
- Email notification system
- Payment integration (Stripe/bKash)

---

## [1.9.0] — 2026-03-16

### Added
- Complete documentation suite (10 .md files in `docs/`)
  - ANALYTICS_HISTORY.md — Project metrics, asset counts, dependency analytics
  - CHANGELOG.md — Full version history
  - DEVELOPER_GUIDE.md — A-to-Z developer documentation
  - DEPLOYMENT_HISTORY.md — All deployment events
  - DEPLOYMENT_COMMANDS.md — Working CLI commands
  - API_REFERENCE.md — CMS Store API documentation
  - ARCHITECTURE.md — System diagrams and data flow
  - CONTRIBUTING.md — Code standards and workflow
  - SECURITY.md — Security audit and recommendations
  - FEATURES.md — Complete feature inventory

---

## [1.8.0] — 2026-03-16

### Added
- Page hero banners with 6 tour-themed background images:
  - Family tour, Couple tour, Friends tour, Cruise landscape, Wildlife tour, Haor landscape
- `PageHeroBanner` reusable component with framer-motion fade-up animations
- Dynamic hero image mapping per page (cruises→cruise, packages→family, etc.)
- Quick booking bar filter shows matching cruises below filters on homepage

### Changed
- CruiseList, Packages, Gallery, BlogList, About, Contact pages now use `PageHeroBanner` instead of static gradient headers
- Hero images stored in `src/assets/hero/` for optimal bundling

---

## [1.7.0] — 2026-03-15

### Added
- **Homepage Content Manager** — Full CMS for all homepage sections (hero, stats, strip, featured, why us, testimonials, CTA, promo) in EN & BN
- **Contact Inquiries Manager** — Track user messages with status flow (New → Read → Replied)
- **Seat Plan Manager** — Admin page for viewing/managing cruise seat plans
- Admin dashboard expanded to 11 live metrics including pending bookings and new inquiries

### Changed
- Homepage (`Index.tsx`) now dynamically renders all content from `getHomepageContent()` CMS store
- Contact form (`Contact.tsx`) saves inquiry to admin panel via `addContactInquiry()` before WhatsApp redirect

### Fixed
- Missing admin routes for SeatPlanManager, HomepageContentManager, ContactInquiries registered in `App.tsx`
- Admin sidebar links updated to include all new manager pages

---

## [1.6.0] — 2026-03-14

### Added
- **Featured Cruise Manager** — Select which cruises appear on homepage featured section
- **Hero Image Manager** — Manage homepage slider images with ordering
- **Promo Ads Manager** — Create/edit promotional banners with linked cruises
- **Reviews Manager** — Moderate user reviews (pending → approved/rejected)
- **Blog Manager** — Full CRUD for blog posts with SEO fields and cover images
- Google-style star rating system with `ReviewSection` component
- Promo section on homepage with carousel

---

## [1.5.0] — 2026-03-12

### Added
- **SEO Manager** — Per-page meta title, description, and keywords
- `SeoFieldsPanel` reusable component for admin forms
- **Testimonials Manager** — CRUD for customer testimonials
- **Team Manager** — Add/edit/remove team members
- **Offers Manager** — Create offers with expiry dates, linked to cruises
- Offers auto-seeded from cruises with `isOffer` packages

---

## [1.4.0] — 2026-03-10

### Added
- **Booking Modal** — Multi-step form with WhatsApp integration
- **Header Booking Modal** — Quick book button in navbar
- **WhatsApp Floating Button** — Fixed CTA on all public pages (toggleable in settings)
- **Availability Manager** — Cruise scheduling admin
- **Categories Manager** — Cruise classification system
- Booking data persistence in `bookingStore.ts`

---

## [1.3.0] — 2026-03-08

### Added
- **Complete Admin Panel** with 24 management pages
- **AdminLayout** with collapsible sidebar navigation
- **Dashboard** with summary statistics cards
- **Cruise Manager** — List, edit, delete cruises
- **Cruise Editor** — Full form with images, packages, itinerary, seat plan
- **Packages Manager** — Tour package CRUD
- **Media Library** — Image management
- **Pages CMS** — Static page content editing
- **Bookings Manager** — View and update booking statuses
- **Users Management** — User listing page
- **Settings** — Site-wide configuration (name, contact, social, maps)
- Admin login page at `/admin/login`

---

## [1.2.0] — 2026-03-05

### Added
- **Gallery Page** — Photo gallery with lightbox zoom (`ImageZoom` component)
- **About Page** — Company info, team section, TOAS certificate
- **Contact Page** — Contact form + Google Maps embed + WhatsApp redirect
- **Bilingual Support** — English/Bengali via `LanguageContext`
- Locale files: `src/locales/en.json`, `src/locales/bn.json`
- Language switcher in header

---

## [1.1.0] — 2026-03-02

### Added
- **Cruise Listing Page** — Filterable by destination and sub-category
- **Cruise Detail Page** — Image gallery, tabbed content (Overview/Itinerary/Inclusions), seat plan viewer
- **Packages Page** — Tour package cards
- **Blog Pages** — BlogList and BlogDetail with category filtering
- **Review Section** — Star ratings component with average calculation
- `SeatPlanViewer` component with zoom/pan

---

## [1.0.0] — 2026-02-28

### Added
- Initial project setup: Vite 5 + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui
- **Homepage** with:
  - Hero slider with auto-play
  - Stats counter section
  - Quick booking bar
  - Featured cruises carousel
  - Why Choose Us section
  - Testimonials carousel
  - Promo ads section
  - CTA section
- **Header** — Responsive navigation with mobile drawer menu
- **Footer** — Company info, social links, quick links, contact info
- **14 Cruise Data Models** with full details:
  - MV Flamingo, MV Forest, MV Jol Safari, MV Khayapar, MV Magpie, MV Crown, MV Sea Pearl, MV Sea Pearl 3, MV Silver, MV Utshab, MV Adeeba, MV Mohammadi 2, MV Reza B, MV Ocean Pearl
- `mockData.ts` — Complete cruise definitions with TypeScript interfaces
- `cmsStore.ts` — localStorage-based CMS with versioned data migration
- `ScrollToTop` component for route changes
- Custom 404 Not Found page
- Basic SEO: meta tags, OG image, robots.txt, favicon
- `public/og-image.jpg` for social sharing
