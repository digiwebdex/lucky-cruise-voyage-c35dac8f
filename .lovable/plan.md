

# Homepage Redesign -- Travel Portal Style (Smart & Simple)

## Current State
The homepage is ~687 lines with heavy decorative elements (floating icons, particles, parallax, shimmer effects, radial gradients). The client wants a **smart, simple, not heavy** design in a Travel Portal style.

## Design Direction
Clean travel portal like Booking.com / MakeMyTrip: white backgrounds, flat cards, minimal animation, a compact hero with a quick booking/search bar, and clear visual hierarchy.

## Sections (in order)

### 1. Hero Section (Compact)
- **Shorter height** (~60vh instead of 95vh) with a single high-quality background image (no slider -- simpler)
- Remove: floating Anchor/Waves/Compass icons, particles, parallax, slide counter
- Add: **Quick Booking Bar** overlaying the bottom of the hero -- a horizontal bar with dropdowns for Cruise Ship, Travel Date, Guests (Adults + Children), and a "Search" / "Book Now" CTA button
- Keep: headline text, badge, two CTA buttons (Explore Cruises + WhatsApp)
- Stats bar stays but simplified -- inline within the hero bottom area, no glassmorphism

### 2. Quick Info Bar
- Remove the current floating card grid
- Replace with a simple **horizontal strip** with 4 icons + text (Premium Fleet, Safety, All-Inclusive, 24/7 Support) -- flat background, no shadows or hover transforms

### 3. Featured Cruises Grid
- Keep the 3-column card grid
- **Simplify cards**: remove hover overlay animations, remove shimmer, remove translate-y-3 hover. Just clean cards with image, name, route, price, and a "View Details" button
- Keep offer badge and featured badge but remove pulse animation

### 4. Running Offers
- Keep current structure but remove radial gradient background effects
- Simpler cards with flat design

### 5. Why Choose Us / Experience
- **Remove** the image mosaic grid (4 images with floating badge)
- Replace with a simple **3-4 column icon + text grid** on a light background. No dark section.

### 6. Cruise Comparison Table
- Keep as-is but simplify: remove gradient-navy header, use a simple border header. Remove alternating row colors -- just clean white rows with subtle borders

### 7. Testimonials
- Keep 3-card grid, simplify: remove floating quote mark decoration, remove blur orbs

### 8. CTA Section
- Simplify: remove floating Ship/Anchor icons, radial gradients. Clean dark section with text + two buttons

## Technical Changes

**Files modified:**
- `src/pages/Index.tsx` -- Complete rewrite of the page, reducing from ~687 lines to ~450 lines
  - Remove `useCounter` hook, parallax hooks (`useScroll`, `useTransform`), slide state management
  - Remove most `framer-motion` animations (keep only simple `fadeUp` on scroll)
  - Add Quick Booking Bar component inline (cruise selector, date picker, guest counter)
  - Booking bar will use `getCruises()` for dropdown and link to WhatsApp with pre-filled message or open BookingModal

**No new files needed** -- all changes in Index.tsx, reusing existing components (Button, Card, BookingModal).

## Key Simplifications
- No hero slider (single background image)
- No particles, no parallax, no shimmer
- Minimal framer-motion (just fade-in on scroll)
- Flat cards with subtle border and shadow
- White/light backgrounds throughout (remove dark `bg-secondary` sections)
- Quick booking bar as the main interactive element

