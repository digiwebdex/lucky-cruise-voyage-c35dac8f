

# Add Duplicate of MV Jol Safari for Tanguar Haor

## What
Add a second Tanguar Haor cruise entry by duplicating MV Jol Safari's data with a different ID and name (e.g., "MV Jol Safari 2" / "এমভি জল সাফারি ২"). Same images, facilities, itinerary, and package structure -- just a separate listing.

## Changes

**File: `src/services/mockData.ts`**
- Add a new cruise entry after MV Jol Safari (around line 1016) with:
  - `id: "mv-jol-safari-2"`
  - `destination: "tanguar-haor"`
  - `name: "এমভি জল সাফারি ২"`
  - Same images (jol-safari-1 through 9), same seat plan image, same facilities, itinerary, menu, safety, tips, packages
  - Slightly different subtitle to distinguish it (e.g., "টাঙ্গুয়ার হাওরে দ্বিতীয় লাক্সারি এসি হাউজবোট")

**File: `src/services/cmsStore.ts`**
- Increment `DATA_VERSION` to force localStorage refresh

No other files need changes -- the cruise list, detail page, and admin will pick it up automatically.

