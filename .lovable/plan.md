

## Problem

The hero slider currently uses hardcoded image indices (e.g., `images[0]`, `images[1]`) which may show interior/detail photos instead of the full ship exterior image.

## Solution

Update the `heroSlides` array in `src/pages/Index.tsx` to use each cruise's `featuredImageIndex` property, which was already added to allow admins to select the best representative ship image.

### Change in `src/pages/Index.tsx` (lines 63-69)

Replace the hardcoded indices with `featuredImageIndex`:

```typescript
const heroSlides = [
  { image: cruises[0]?.images[cruises[0]?.featuredImageIndex ?? 0] },
  { image: cruises[1]?.images[cruises[1]?.featuredImageIndex ?? 0] },
  { image: cruises[2]?.images[cruises[2]?.featuredImageIndex ?? 0] },
  { image: cruises[3]?.images[cruises[3]?.featuredImageIndex ?? 0] },
  { image: cruises[4]?.images[cruises[4]?.featuredImageIndex ?? 0] },
];
```

This ensures the hero section always displays the admin-selected featured image (the full ship photo) for each cruise.

