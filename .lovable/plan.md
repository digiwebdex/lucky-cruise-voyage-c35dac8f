

## Fully Dynamic CMS Admin Dashboard

### Current State

The admin panel currently has static/mock implementations:
- **Dashboard**: Hardcoded stats (cruises count, pages=7, users=3)
- **Cruise Manager**: Loads from `mockData.ts`, edits only name/route/price/duration/description — missing facilities, itinerary, menu, packages, images, etc.
- **Packages Manager**: Flat list derived from cruises, basic add/delete
- **Media Library**: Read-only grid from cruise images, delete only
- **Seat Plan Manager**: Read-only viewer, no editing
- **Pages CMS**: Hardcoded 4 pages, edit title/content only
- **SEO Manager**: Hardcoded 4 page entries
- **Settings**: Hardcoded site settings, save does nothing
- **Users**: Static table, no CRUD
- **Login**: Mock auth (any email/password works)

All data lives in `mockData.ts` (1165 lines) with hardcoded image imports. No persistence — all changes are lost on refresh.

### Architecture Decision

Per project memory, the backend strategy targets a **self-hosted VPS** (no Supabase/Firebase). Since we cannot run a backend in Lovable, the plan is to build a **localStorage-based CMS data layer** that persists admin edits across refreshes, with a clean service abstraction that can later be swapped for API calls.

### Plan

#### 1. Create a CMS Data Store (`src/services/cmsStore.ts`)

A centralized service layer using localStorage for persistence:
- `getCruises() / saveCruises()` — full CRUD for cruises with all fields
- `getSettings() / saveSettings()` — site-wide settings (name, phone, WhatsApp, email, address, social links)
- `getPages() / savePages()` — CMS page content
- `getSEO() / saveSEO()` — per-page SEO metadata
- `getTestimonials() / saveTestimonials()` — testimonials CRUD
- `getTeamMembers() / saveTeamMembers()` — team members CRUD

On first load, seeds localStorage from the existing `mockData.ts` defaults. All public pages read from this store instead of directly from `mockData.ts`.

#### 2. Enhanced Dashboard (`src/pages/admin/Dashboard.tsx`)

- Live stats from CMS store: total cruises, total packages, total pages, total images, total testimonials
- Quick-action cards linking to each admin section
- Recent activity summary

#### 3. Full Cruise Manager (`src/pages/admin/CruiseManager.tsx`)

Expand the edit dialog into a multi-tab form:
- **Basic Info**: name, subtitle, description, route, duration, capacity, cabins, price, priceLabel, featured toggle
- **Images**: reorder, add URL, remove
- **Facilities**: add/remove list items
- **Itinerary**: add/edit/remove days with activities
- **Menu**: add/edit meal days
- **Packages**: inline CRUD (name, price, duration)
- **Safety/Tips**: edit list items for safetyInfo, travelTips, thingsToCarry, additionalCosts, packageIncludes
- **Tourist Spots**: add/remove list

All changes persist via CMS store.

#### 4. Enhanced Packages Manager

- Link to parent cruise via dropdown select
- Edit existing packages inline
- Persist via CMS store

#### 5. Media Library with Upload

- Show all images from all cruises
- Upload images (base64 or URL input for now, file upload ready for VPS migration)
- Associate images with specific cruises
- Delete with confirmation

#### 6. Seat Plan Manager with Editing

- View existing seat plans per cruise
- Edit cabin types, bed types, availability, capacity
- Add/remove decks and rows

#### 7. Pages CMS Enhancement

- Rich content editing with multiple fields per page (hero text, body, sections)
- Add custom pages
- Preview capability

#### 8. Testimonials Manager (new admin page)

- CRUD for testimonials (name, text, rating)
- Add to sidebar navigation

#### 9. Team Members Manager (new admin page)

- CRUD for team members (name, role)
- Accessible from About page or a new admin section

#### 10. Settings Enhancement

- Add social media links, logo URL, footer text, Google Maps embed URL
- Toggle features (WhatsApp float, language switcher)
- All persisted

#### 11. Wire Public Pages to CMS Store

Update all public pages (`Index.tsx`, `About.tsx`, `Contact.tsx`, `Gallery.tsx`, `CruiseList.tsx`, `CruiseDetail.tsx`, `Packages.tsx`) to read from `cmsStore` instead of directly from `mockData.ts`.

### Technical Details

**Data persistence layer pattern:**
```text
cmsStore.ts
├── localStorage read/write with JSON serialization
├── Seed from mockData defaults if no localStorage key exists
├── React hook: useCmsData(key) with state + setter
└── Clean interface for future API migration
```

**New sidebar entries:**
```text
Dashboard
Cruises        (enhanced)
Packages       (enhanced)
Testimonials   (new)
Team Members   (new)
Media Library  (enhanced)
Seat Plans     (enhanced)
Pages CMS      (enhanced)
SEO Manager    (existing)
Users          (existing)
Settings       (enhanced)
```

**Implementation order (by priority):**
1. CMS data store + React hooks
2. Wire public pages to store
3. Enhanced Cruise Manager (biggest value)
4. Enhanced Dashboard with live stats
5. Testimonials & Team Members managers
6. Settings & Pages CMS enhancements
7. Media Library & Seat Plan editing
8. Packages Manager enhancement

This is a large feature set. I recommend implementing it in 2-3 phases to keep changes manageable. Shall I start with the CMS store + enhanced Cruise Manager + Dashboard first?

