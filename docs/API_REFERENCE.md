# 📡 API Reference — Lucky Cruise Voyage

> Complete CMS Store API documentation. All functions are in `src/services/cmsStore.ts`.

---

## Overview

The CMS Store provides a localStorage-backed persistence layer with paired `get*()` / `save*()` functions for 12 entity types. Data is versioned (`DATA_VERSION = "v35"`) and auto-reseeded on version mismatch.

```typescript
// Core pattern
function getStore<T>(key: string, defaults: T): T    // Read with fallback
function setStore<T>(key: string, data: T): void      // Write (JSON.stringify)
```

---

## Cruises

```typescript
getCruises(): Cruise[]
saveCruises(data: Cruise[]): void
getCruiseById(id: string): Cruise | undefined
searchCruises(query: string): Cruise[]
```

| Function | Description |
|---|---|
| `getCruises()` | Returns all 14 cruises (from localStorage or defaults) |
| `saveCruises(data)` | Overwrites entire cruise array |
| `getCruiseById(id)` | Find single cruise by ID |
| `searchCruises(query)` | Filter by name, route, description, subtitle (case-insensitive) |

---

## Site Settings

```typescript
getSettings(): SiteSettings
saveSettings(data: SiteSettings): void
```

```typescript
interface SiteSettings {
  siteName: string;          // "Lucky Tours & Travels"
  phone: string;             // "01711871072"
  whatsapp: string;          // "8801711871072"
  email: string;
  address: string;
  addressBn: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  footerText: string;
  footerTextBn: string;
  googleMapsUrl: string;
  whatsappFloatEnabled: boolean;
  languageSwitcherEnabled: boolean;
  heroImages: (string | { image: string; title?: string })[];
  featuredCruiseIds: string[];
}
```

---

## Homepage Content

```typescript
getHomepageContent(): HomepageContent
saveHomepageContent(data: HomepageContent): void
```

All fields come in EN + BN pairs. Sections:
- **Hero**: `heroBadge`, `heroTitle`, `heroHighlight`, `heroSubtitle`
- **Stats**: `stat[1-3]Value`, `stat[1-3]Label`
- **Quick Info Strip**: `strip[1-4]Value`, `strip[1-4]Label`
- **Featured Section**: `featuredSectionLabel`, `featuredTitle`, `featuredHighlight`, `featuredSubtitle`
- **Why Choose Us**: `whyUsTitle`, `whyUsHighlight`, `whyUs[1-4]Title`, `whyUs[1-4]Desc`
- **Testimonials**: `testimonialsTitle`, `testimonialsHighlight`
- **CTA**: `ctaTitle`, `ctaHighlight`, `ctaSubtitle`
- **Promo Section**: `promoTitle`, `promoSubtitle`

---

## Pages CMS

```typescript
getPages(): CmsPage[]
savePages(data: CmsPage[]): void
```

```typescript
interface CmsPage {
  id: string;
  slug: string;
  title: string;
  heroText: string;
  body: string;
  sections: { heading: string; content: string }[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}
```

Default pages: `home`, `about`, `contact`, `gallery`, `cruises`, `packages`

---

## SEO

```typescript
getSeo(): SeoEntry[]
saveSeo(data: SeoEntry[]): void
```

```typescript
interface SeoEntry {
  pageSlug: string;    // "home", "about", "cruises", etc.
  title: string;       // Meta title
  description: string; // Meta description
  keywords: string;    // Comma-separated keywords
}
```

---

## Blog Posts

```typescript
getBlogs(): BlogPost[]
saveBlogs(data: BlogPost[]): void
```

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "sundarban" | "tanguar-haor";
  excerpt: string;
  body: string;
  coverImage: string;
  youtubeUrl?: string;
  author: string;
  publishedAt: string;     // ISO 8601
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}
```

---

## Reviews

```typescript
getReviews(): CustomerReview[]
saveReviews(data: CustomerReview[]): void
addReview(review: Omit<CustomerReview, "id" | "createdAt" | "status">): CustomerReview
getApprovedReviews(targetType: string, targetId: string): CustomerReview[]
```

```typescript
interface CustomerReview {
  id: string;
  targetType: "cruise" | "blog";
  targetId: string;
  targetName: string;
  name: string;
  email: string;
  rating: number;          // 1-5
  comment: string;
  createdAt: string;       // ISO 8601
  status: "pending" | "approved" | "rejected";
}
```

| Function | Behavior |
|---|---|
| `addReview()` | Auto-generates ID, sets `createdAt` to now, sets `status` to "pending" |
| `getApprovedReviews()` | Filters by targetType + targetId + status="approved" |

---

## Testimonials

```typescript
getTestimonials(): Testimonial[]
saveTestimonials(data: Testimonial[]): void
```

```typescript
interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;  // 1-5
}
```

---

## Team Members

```typescript
getTeamMembers(): TeamMember[]
saveTeamMembers(data: TeamMember[]): void
```

```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
}
```

---

## Offers

```typescript
getOffers(): Offer[]
saveOffers(data: Offer[]): void
```

```typescript
interface Offer {
  id: string;
  title: string;
  posterImage: string;
  linkedCruiseId: string;
  description?: string;
  isActive: boolean;
  expiryDate?: string;   // ISO date string
}
```

Default offers are auto-generated from cruises that have `isOffer` packages.

---

## Promo Ads

```typescript
getPromoAds(): PromoAd[]
savePromoAds(data: PromoAd[]): void
```

```typescript
interface PromoAd {
  id: string;
  title: string;
  subtitle?: string;
  dateLabel?: string;
  image: string;
  linkedCruiseId: string;
  isActive: boolean;
}
```

---

## Contact Inquiries

```typescript
getContactInquiries(): ContactInquiry[]
saveContactInquiries(data: ContactInquiry[]): void
addContactInquiry(inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">): ContactInquiry
```

```typescript
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;  // ISO 8601
  status: "new" | "read" | "replied";
}
```

| Function | Behavior |
|---|---|
| `addContactInquiry()` | Auto-generates ID (`contact-{timestamp}`), sets `createdAt`, sets `status` to "new", prepends to array |

---

## Bookings (bookingStore.ts)

```typescript
getBookings(): Booking[]
addBooking(booking: Booking): void
updateBookingStatus(id: string, status: string): void
```

---

## React Hooks

### `useCmsData<T>(getter, saver)`
Generic hook for reading and writing CMS data with React state sync.

```typescript
function useCmsData<T>(
  getter: () => T,
  saver: (data: T) => void
): [T, (data: T) => void]
```

**Usage:**
```tsx
const [cruises, saveCruises] = useCmsData(getCruises, saveCruises);
```

### `useLanguage()`
From `LanguageContext.tsx`:
```typescript
const { language, setLanguage, t } = useLanguage();
// language: "en" | "bn"
// t("key"): string — lookup from locale file
```

### `useIsMobile()`
```typescript
const isMobile = useIsMobile(); // true if viewport < 768px
```

### `useToast()`
```typescript
const { toast } = useToast();
toast({ title: "Success", description: "Saved!" });
```

---

## localStorage Keys

| Key | Entity | Type |
|---|---|---|
| `cms_cruises` | Cruises | `Cruise[]` |
| `cms_settings` | Site Settings | `SiteSettings` |
| `cms_homepage_content` | Homepage Content | `HomepageContent` |
| `cms_pages` | CMS Pages | `CmsPage[]` |
| `cms_seo` | SEO Entries | `SeoEntry[]` |
| `cms_testimonials` | Testimonials | `Testimonial[]` |
| `cms_teamMembers` | Team Members | `TeamMember[]` |
| `cms_offers` | Offers | `Offer[]` |
| `cms_blogs` | Blog Posts | `BlogPost[]` |
| `cms_reviews` | Reviews | `CustomerReview[]` |
| `cms_promoAds` | Promo Ads | `PromoAd[]` |
| `cms_contact_inquiries` | Contact Inquiries | `ContactInquiry[]` |
| `cms_data_version` | Version Flag | `string` ("v35") |
