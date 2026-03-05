

# Lucky Tours & Travels — Full Frontend + Admin Panel

## Overview
A complete React frontend for a cruise tour booking company, featuring a public website and an admin dashboard. All data will use mock/static data with a clean API service layer, making it easy to connect to any backend (Node.js/Express, Laravel, etc.) later.

## Color Theme
- **Primary**: Orange/gold gradient (matching logo)
- **Accent**: Navy blue (matching logo text)
- **Background**: White with warm off-white sections
- **Text**: Dark navy for headings, gray for body

## Public Website (7 Pages)

### 1. Homepage
- Hero banner with full-width cruise imagery and search bar
- Featured Cruises carousel (card grid)
- Packages section with pricing cards
- "Why Choose Us" section with icons
- Photo gallery grid
- Testimonials slider
- Contact section with map and info

### 2. About Us
- Company story, mission, values
- Team section
- Stats/achievements

### 3. Cruise List
- Filterable grid of 10+ sample cruises
- Search by name, route, price range
- Sort options
- Card view with image, name, price, route

### 4. Cruise Detail Page
- Image gallery/carousel
- Description, facilities, routes
- Package selection cards
- **Seat Plan Viewer** — visual deck layout showing seat grid (A1, A2, etc.)
- **"Book Now" button** → opens booking modal

### 5. Packages Page
- Package cards with pricing, inclusions, routes

### 6. Gallery
- Masonry/grid photo gallery with lightbox
- Watermark overlay text on all images ("Lucky Tours & Travels | 01711871072")

### 7. Contact Page
- Contact form, phone, WhatsApp link, address, embedded map

## Booking System
- Modal form: Name, Phone, Travel Date, Cruise (auto-filled), Persons, Package, Seat Type (AC/Non-AC)
- On submit → redirects to WhatsApp (`wa.me/8801711871072`) with formatted booking message

## Seat Plan Viewer
- Visual grid layout per deck (Deck 1, Deck 2, etc.)
- Seats displayed as interactive tiles (A1, A2, B1, B2...)
- Color-coded legend (AC vs Non-AC)

## Copy Protection (Client-Side)
- Disable right-click context menu
- Disable text selection via CSS
- Disable image dragging

## Image Watermark
- CSS-based watermark overlay on all images ("Lucky Tours & Travels | 01711871072")

## Search System
- Global search bar on cruise list page
- Filter by: cruise name, route, package, price range
- Instant client-side filtering

## Admin Panel (Separate Route: `/admin`)

### Admin Layout
- Sidebar navigation with collapsible menu
- Protected by simple login screen (mock auth)

### Admin Pages
1. **Dashboard** — Stats cards (total cruises, bookings, pages), recent bookings
2. **Cruise Manager** — CRUD table for cruises with form editor
3. **Packages Manager** — CRUD for packages
4. **Bookings** — Table of submitted booking requests
5. **Media Library** — Grid of uploaded images with upload simulation
6. **Seat Plan Manager** — Editor for deck/seat layouts per cruise
7. **Pages CMS** — Editable content blocks for each public page
8. **SEO Manager** — Meta title, description, OG image per page
9. **Users** — User list table
10. **Settings** — Site name, contact info, WhatsApp number, logo

## Responsive Design
- Fully mobile-first responsive layout
- Hamburger menu on mobile
- Touch-friendly cards and forms

## Navigation
- Sticky header with logo, nav links, WhatsApp CTA button
- Footer with links, contact info, social media icons

## Tech Notes
- All data stored in mock JSON/TypeScript files with a service layer (`src/services/`) for easy backend swap
- React Router for all routing
- The logo will be embedded from the uploaded file

