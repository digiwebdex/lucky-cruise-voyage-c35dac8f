

## "Now Running Offers" Section on Homepage

### What We're Building

A new section on the homepage (below the Featured Cruises section) called **"Now Running Offers"** that displays promotional offer posters/banners. Each offer is linked to an existing cruise, so clicking it takes users to that cruise's detail page where they can see rooms, seat plans, etc.

### Data Model

Add a new `Offer` type and store offers in `cmsStore.ts`:

```typescript
interface Offer {
  id: string;
  title: string;        // e.g. "M.V. Jol Safari Special"
  posterImage: string;   // poster/banner image URL
  linkedCruiseId: string; // links to an existing cruise
  description?: string;  // short promo text
  isActive: boolean;
}
```

Default offers will be seeded from cruises that already have `isOffer` packages.

### Changes

**1. Add Offer data layer (`src/services/cmsStore.ts`)**
- Add `Offer` interface, default seed data, `getOffers`/`saveOffers` functions
- Bump `DATA_VERSION` to bust cache

**2. Add "Now Running Offers" section to Homepage (`src/pages/Index.tsx`)**
- New section after Featured Cruises showing offer poster cards in a grid
- Each card displays the poster image, offer title, linked cruise name, and a "View Details" button
- Clicking the card navigates to `/cruises/{linkedCruiseId}`
- Animated with existing Framer Motion variants
- Show a fire/flame badge for visual emphasis

**3. Add Offers Manager admin page (`src/pages/admin/OffersManager.tsx`)**
- CRUD interface to create/edit/delete offers
- Poster image upload (paste URL or file upload to base64)
- Dropdown to select and link an existing cruise from the cruise list
- Toggle to activate/deactivate offers
- Preview of the poster with linked cruise name

**4. Wire up admin route and sidebar**
- Add `/admin/offers` route in `App.tsx`
- Add "Offers" link in `AdminLayout.tsx` sidebar

**5. Add translations (`src/locales/en.json`, `src/locales/bn.json`)**
- Section title: "Now Running Offers" / "চলমান অফারসমূহ"
- Button labels and descriptions

