# ✨ Features List — Lucky Cruise Voyage

> Complete feature inventory organized by category.

---

## Public Website (10 Pages)

### Homepage (`/`)
- Hero slider with auto-play background images
- Trust badge with traveler count
- Stats counter section (3 metrics)
- Quick info strip (4 cards)
- Quick booking bar with destination/date/type filters
- Featured cruises carousel (admin-selectable)
- "Why Choose Us" section (4 feature cards)
- Testimonials carousel with star ratings
- Promo ads section with carousel
- CTA section with booking button
- All sections editable via admin CMS (EN + BN)

### Cruise Listing (`/cruises`)
- Grid layout with cruise cards
- Filter by destination (Sundarban / Tanguar Haor)
- Filter by sub-category (Family / Couple / Premium / Budget / Luxury)
- Search functionality
- Price display with original/discounted
- Star ratings and review counts
- Hero banner with tour-themed background

### Cruise Detail (`/cruises/:id`)
- Image gallery with thumbnail navigation
- Tabbed content: Overview / Itinerary / Inclusions & Exclusions
- Package cards with pricing
- Seat plan viewer with zoom/pan
- Menu image viewer
- Review section with star ratings
- Review submission form (moderated)
- Booking modal with WhatsApp redirect
- Related cruises

### Packages (`/packages`)
- Tour package listings
- Package cards with pricing and features
- Hero banner background

### Gallery (`/gallery`)
- Photo grid from all cruise images
- Lightbox/zoom viewer (`ImageZoom`)
- Hero banner background

### Blog (`/blog`)
- Blog listing with cards
- Category filter (Sundarban / Tanguar Haor)
- Cover images
- Hero banner background

### Blog Detail (`/blog/:slug`)
- Full blog post content
- Cover image
- Author and date
- YouTube embed support

### About (`/about`)
- Company story and mission
- Team member profiles
- TOAS certification display
- Hero banner background

### Contact (`/contact`)
- Contact form (name, email, message)
- Google Maps embed
- Company contact info
- Form saves to admin panel + WhatsApp redirect
- Hero banner background

### 404 Not Found
- Custom branded 404 page
- Navigation back to homepage

---

## Global Features

- 🌐 **Bilingual** — English / Bengali toggle in header
- 📱 **Responsive** — Mobile, tablet, desktop breakpoints
- 💬 **WhatsApp Float** — Fixed CTA button on all public pages (toggleable)
- 🎫 **Booking Modals** — Header + page-level booking with WhatsApp redirect
- 🎬 **Animations** — Framer Motion page transitions and fade-ups
- 🔍 **SEO** — Per-page meta tags, OG image, robots.txt, semantic HTML
- ⬆️ **Scroll to Top** — Auto-scroll on route change

---

## Admin Panel (24 Pages)

### Dashboard (`/admin`)
- 11 real-time metric cards
- Quick navigation to all sections

### Content Management
| Page | Features |
|---|---|
| **Cruise Manager** | List, search, edit, delete cruises |
| **Cruise Editor** | Full form: images, packages, itinerary, seat plan, menu, SEO |
| **Packages Manager** | CRUD for tour packages |
| **Categories Manager** | Cruise category classification |
| **Availability Manager** | Cruise scheduling and availability |

### Marketing
| Page | Features |
|---|---|
| **Featured Cruise Manager** | Select which cruises show on homepage |
| **Hero Image Manager** | Manage homepage slider images with ordering |
| **Promo Ads Manager** | Create/edit promotional banners linked to cruises |
| **Offers Manager** | Create offers with expiry dates, linked cruises |
| **Blog Manager** | Full CRUD with SEO fields, cover images, categories |

### Customer Relations
| Page | Features |
|---|---|
| **Bookings** | View all bookings, update status (pending/confirmed/completed) |
| **Contact Inquiries** | Track messages, update status (new/read/replied) |
| **Reviews Manager** | Moderate user reviews (pending → approved/rejected) |
| **Testimonials Manager** | CRUD for homepage testimonials |

### CMS (Content Management System)
| Page | Features |
|---|---|
| **Homepage Content Manager** | Edit every text on homepage (hero, stats, strip, featured, why us, testimonials, CTA, promo) in EN + BN |
| **Pages CMS** | Edit static page content and sections |
| **SEO Manager** | Per-page meta title, description, keywords (6 pages) |
| **Media Library** | Image management |
| **Seat Plan Manager** | View/manage cruise seat plans |

### Organization
| Page | Features |
|---|---|
| **Team Manager** | Add/edit/remove team members |
| **Users** | User listing and management |
| **Settings** | Site name, contact info, social links, footer text, maps URL, toggles |

---

## Technical Features

| Feature | Implementation |
|---|---|
| **Framework** | React 18 + TypeScript + Vite 5 |
| **UI Library** | shadcn/ui (48 components) |
| **Styling** | Tailwind CSS 3 with HSL semantic design tokens |
| **Routing** | React Router v6 (34 routes) |
| **State** | localStorage CMS store (12 entities, versioned) |
| **Forms** | React Hook Form + Zod validation |
| **Animation** | Framer Motion |
| **Charts** | Recharts (admin dashboard) |
| **Data Fetching** | TanStack React Query |
| **Icons** | Lucide React |
| **Carousel** | Embla Carousel |
| **Date Handling** | date-fns + react-day-picker |
| **i18n** | Custom LanguageContext (EN/BN) |
| **Testing** | Vitest + @testing-library/react |

---

## Cruise Fleet (14 Vessels)

| # | Name | Destination | Categories |
|---|---|---|---|
| 1 | MV Flamingo | Sundarban | Family, Couple |
| 2 | MV Forest | Sundarban | Family |
| 3 | MV Jol Safari | Sundarban | Budget, Family |
| 4 | MV Khayapar | Sundarban | Premium, Family |
| 5 | MV Magpie | Sundarban | Premium, Couple |
| 6 | MV Crown | Sundarban | Luxury |
| 7 | MV Sea Pearl | Sundarban | Premium |
| 8 | MV Sea Pearl 3 | Sundarban | Luxury |
| 9 | MV Silver | Sundarban | Budget |
| 10 | MV Utshab | Sundarban | Family |
| 11 | MV Adeeba | Sundarban | Budget |
| 12 | MV Mohammadi 2 | Sundarban | Family |
| 13 | MV Reza B | Sundarban | Budget |
| 14 | MV Ocean Pearl | Sundarban | Premium |

---

## Production Readiness Status

| Area | Status | Notes |
|---|---|---|
| Public pages | ✅ Complete | All 10 pages functional |
| Admin panel | ✅ Complete | All 24 pages functional |
| CMS integration | ✅ Complete | Homepage synced with admin |
| Bilingual | ✅ Complete | EN/BN across all content |
| Responsive | ✅ Complete | Mobile/tablet/desktop |
| SEO | ✅ Complete | Meta tags, OG, robots.txt |
| WhatsApp integration | ✅ Complete | Float, booking, contact |
| Booking flow | ✅ Complete | Modal → WhatsApp → Admin tracking |
| Review system | ✅ Complete | Submit → Moderate → Display |
| Documentation | ✅ Complete | 10 .md files |
| Authentication | ⚠️ Client-side | Needs Lovable Cloud |
| Data persistence | ⚠️ localStorage | Needs database migration |
| Image upload | ⚠️ URL-based | Needs cloud storage |
