# 🏗️ Architecture — Lucky Cruise Voyage

---

## System Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Browser                           │
│                                                      │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────┐ │
│  │  Public Pages  │  │  Admin Panel  │  │ shadcn/  │ │
│  │  (10 routes)   │  │  (24 routes)  │  │ ui (48)  │ │
│  └───────┬───────┘  └───────┬───────┘  └────┬─────┘ │
│          │                  │               │        │
│  ┌───────┴──────────────────┴───────────────┴──────┐ │
│  │              React Router v6 (34 routes)        │ │
│  └──────────────────────┬──────────────────────────┘ │
│                         │                            │
│  ┌──────────────────────┴──────────────────────────┐ │
│  │              CMS Store (cmsStore.ts)             │ │
│  │         12 entities, versioned (v35)             │ │
│  │  mockData.ts (seed) → localStorage (persist)    │ │
│  └──────────────────────┬──────────────────────────┘ │
│                         │                            │
│  ┌──────────────────────┴──────────────────────────┐ │
│  │          localStorage (JSON serialized)          │ │
│  │     13 keys: cms_cruises, cms_settings, etc.    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Context Providers                   │ │
│  │  LanguageContext (EN/BN) │ QueryClient │ Theme  │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
main.tsx
└── App.tsx
    ├── QueryClientProvider
    │   └── LanguageProvider
    │       └── TooltipProvider
    │           ├── Toaster (shadcn)
    │           ├── Sonner (toast)
    │           └── BrowserRouter
    │               ├── ScrollToTop
    │               │
    │               ├── PublicLayout (layout wrapper)
    │               │   ├── Header
    │               │   │   ├── NavLinks (desktop)
    │               │   │   ├── Sheet (mobile drawer)
    │               │   │   ├── LanguageSwitcher
    │               │   │   └── HeaderBookingModal
    │               │   ├── <Outlet /> ← Page content
    │               │   │   ├── Index (homepage)
    │               │   │   ├── CruiseList → CruiseDetail
    │               │   │   ├── Packages
    │               │   │   ├── Gallery
    │               │   │   ├── BlogList → BlogDetail
    │               │   │   ├── About
    │               │   │   └── Contact
    │               │   ├── Footer
    │               │   └── WhatsAppFloat
    │               │
    │               ├── AdminLogin (standalone)
    │               │
    │               └── AdminLayout (sidebar wrapper)
    │                   ├── Sidebar Navigation
    │                   └── <Outlet /> ← Admin page content
    │                       ├── Dashboard
    │                       ├── CruiseManager / CruiseEditor
    │                       ├── PackagesManager
    │                       ├── CategoriesManager
    │                       ├── AvailabilityManager
    │                       ├── Bookings
    │                       ├── ContactInquiries
    │                       ├── TestimonialsManager
    │                       ├── ReviewsManager
    │                       ├── OffersManager
    │                       ├── BlogManager
    │                       ├── PromoAdsManager
    │                       ├── HeroImageManager
    │                       ├── FeaturedCruiseManager
    │                       ├── HomepageContentManager
    │                       ├── SeatPlanManager
    │                       ├── TeamManager
    │                       ├── MediaLibrary
    │                       ├── PagesCMS
    │                       ├── SEOManager
    │                       ├── Users
    │                       └── Settings
    │
    └── NotFound (404 catch-all)
```

---

## Data Flow

```
                    SEED DATA
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   mockData.ts    defaultSettings  defaultBlogs
   (14 cruises)   (SiteSettings)   (3 posts)
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   cmsStore.ts   │
              │                 │
              │  getStore(key,  │  ← First load: check localStorage
              │    defaults)    │     If empty → use defaults
              │                 │     If exists → parse JSON
              │  setStore(key,  │  ← On save: JSON.stringify → localStorage
              │    data)        │
              └────────┬────────┘
                       │
            ┌──────────┼──────────┐
            ▼                     ▼
    ┌───────────────┐    ┌───────────────┐
    │  Public Pages │    │  Admin Pages  │
    │  (READ only)  │    │  (READ+WRITE) │
    │               │    │               │
    │  getCruises() │    │  getCruises() │
    │  getBlogs()   │    │  saveCruises()│
    │  getSettings()│    │  saveBlogs()  │
    └───────────────┘    └───────────────┘
```

---

## Data Version Migration

```
App Load
    │
    ▼
initVersionCheck()
    │
    ├── localStorage[VERSION_KEY] === DATA_VERSION?
    │       │
    │       ├── YES → Continue (data compatible)
    │       │
    │       └── NO → Clear ALL cms_* keys → Reseed from defaults
    │
    ▼
Application Ready
```

---

## Booking Flow

```
User visits Cruise Detail
    │
    ▼
Click "Book Now"
    │
    ▼
BookingModal opens
    │
    ▼
Fill form (name, phone, date, package)
    │
    ▼
Submit → addBooking() to localStorage
    │
    ▼
Redirect to WhatsApp with pre-filled message
    │
    ▼
Admin sees booking in /admin/bookings
    │
    ▼
Admin updates status (pending → confirmed → completed)
```

---

## Contact Flow

```
User visits /contact
    │
    ▼
Fill form (name, email, message)
    │
    ▼
Submit → addContactInquiry() to localStorage
    │
    ▼
WhatsApp redirect with message
    │
    ▼
Admin sees inquiry in /admin/contact-inquiries
    │
    ▼
Admin updates status (new → read → replied)
```

---

## Review Flow

```
User visits Cruise Detail → Reviews tab
    │
    ▼
Submit review (name, email, rating, comment)
    │
    ▼
addReview() → status: "pending"
    │
    ▼
Admin sees in /admin/reviews
    │
    ▼
Admin approves/rejects
    │
    ▼
Approved reviews visible via getApprovedReviews()
```

---

## Future Architecture (with Lovable Cloud)

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│    Frontend     │  HTTPS  │   Edge Functions  │  SQL    │  PostgreSQL │
│    (React)      │────────▶│   (Auth, API)     │────────▶│  (Supabase) │
│    Vite SPA     │◀────────│   RLS Policies    │◀────────│  12 tables  │
└─────────────────┘         └──────────────────┘         └─────────────┘
                                     │
                              ┌──────┴──────┐
                              │   Storage   │
                              │  (Images,   │
                              │   Files)    │
                              └─────────────┘

Tables:
├── cruises
├── cruise_packages
├── bookings
├── blog_posts
├── reviews
├── testimonials
├── team_members
├── offers
├── promo_ads
├── contact_inquiries
├── site_settings
├── homepage_content
├── cms_pages
├── seo_entries
└── user_roles (admin/moderator/user)
```

---

## Technology Decision Matrix

| Decision | Chosen | Why | Alternative |
|---|---|---|---|
| Build Tool | Vite | Fast HMR, ESM-first, excellent DX | CRA, Webpack |
| UI Library | shadcn/ui | Copy-paste, fully customizable, Radix-based | MUI, Chakra |
| State Management | localStorage + Context | Simple, no backend needed yet | Redux, Zustand |
| Routing | React Router v6 | Industry standard, nested routes | TanStack Router |
| Styling | Tailwind CSS | Utility-first, semantic tokens | CSS Modules, styled-components |
| Animation | Framer Motion | Declarative, powerful, React-native | CSS animations, GSAP |
| Forms | React Hook Form + Zod | Performance, validation, TypeScript | Formik, yup |
| i18n | Custom Context | Simple key-value, 2 languages only | i18next, react-intl |
