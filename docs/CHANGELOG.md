# 📝 Changelog — Lucky Cruise Voyage

All notable changes to this project are documented in this file.

---

## [Unreleased]

### Added
- Complete developer documentation suite (docs/*.md)

---

## [1.8.0] — 2026-03-16

### Added
- Quick booking bar filter shows matching cruises below filters on homepage
- Page hero banners with tour-themed background images (family, couple, friends, cruise, wildlife, haor)
- `PageHeroBanner` reusable component with framer-motion animations

### Changed
- CruiseList, Packages, Gallery, BlogList, About, Contact pages now use `PageHeroBanner`

---

## [1.7.0] — 2026-03-15

### Added
- Homepage Content Manager in admin panel (full CMS for hero, stats, CTA, etc.)
- Contact Inquiries manager in admin panel with status tracking (New/Read/Replied)
- Seat Plan Manager admin page
- Admin dashboard now shows 11 different metrics

### Changed
- Homepage dynamically renders content from CMS store
- Contact form saves inquiries to admin panel before WhatsApp redirect

### Fixed
- Missing admin routes for SeatPlanManager, HomepageContentManager, ContactInquiries

---

## [1.6.0] — 2026-03-14

### Added
- Featured Cruise Manager — select which cruises appear on homepage
- Hero Image Manager — manage homepage slider images
- Promo Ads Manager — create/edit promotional banners
- Reviews Manager with Google-style star ratings
- Blog system (BlogList, BlogDetail, BlogManager)

---

## [1.5.0] — 2026-03-12

### Added
- SEO Manager with per-page meta title/description fields
- `SeoFieldsPanel` reusable component for admin forms
- Testimonials Manager
- Team Manager
- Offers Manager with date-based expiry

---

## [1.4.0] — 2026-03-10

### Added
- Booking modal with WhatsApp integration
- Header booking modal (quick book from navbar)
- WhatsApp floating button on all public pages
- Availability Manager for cruise scheduling
- Categories Manager for cruise classification

---

## [1.3.0] — 2026-03-08

### Added
- Admin panel with sidebar navigation
- Dashboard with summary statistics
- Cruise Manager (CRUD operations)
- Cruise Editor with full form (images, packages, itinerary, seat plan)
- Packages Manager
- Media Library
- Pages CMS
- Bookings manager
- Admin login page
- Users management page
- Settings page (site-wide configuration)

---

## [1.2.0] — 2026-03-05

### Added
- Gallery page with lightbox zoom
- About page with team & certificate sections
- Contact page with form + Google Maps embed
- Bilingual support (English/Bengali) via LanguageContext
- Locale files: `en.json`, `bn.json`

---

## [1.1.0] — 2026-03-02

### Added
- Cruise listing page with filtering
- Cruise detail page with image gallery, tabs (overview/itinerary/inclusions), seat plan viewer
- Packages page
- Blog listing and detail pages
- Review section component with star ratings

---

## [1.0.0] — 2026-02-28

### Added
- Initial project setup (Vite + React + TypeScript + Tailwind + shadcn/ui)
- Homepage with hero slider, stats, featured cruises, quick booking, testimonials, promo section
- Header with responsive navigation and language switcher
- Footer with company info, social links, quick links
- 14 cruise data models with full details (Flamingo, Forest, Jol Safari, Khayapar, Magpie, Crown, Pearl, Pearl 3, Silver, Utshab, Adeeba, Mohammadi 2, Reza B, Ocean Pearl)
- Mock data store with localStorage persistence
- ScrollToTop component
- 404 Not Found page
- Basic SEO meta tags in index.html
