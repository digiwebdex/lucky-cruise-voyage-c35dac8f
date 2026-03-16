# 📡 API Reference — Lucky Cruise Voyage

> Internal CMS Store API documentation. All functions are in `src/services/cmsStore.ts`.

---

## Cruises

| Function | Signature | Description |
|---|---|---|
| `getCruises()` | `() => Cruise[]` | Get all cruises |
| `saveCruises(cruises)` | `(Cruise[]) => void` | Save all cruises |

## Bookings

| Function | Signature | Description |
|---|---|---|
| `getBookings()` | `() => Booking[]` | Get all bookings |
| `addBooking(booking)` | `(Booking) => void` | Add a new booking |
| `updateBookingStatus(id, status)` | `(string, string) => void` | Update booking status |

## Settings

| Function | Signature | Description |
|---|---|---|
| `getSettings()` | `() => SiteSettings` | Get site settings |
| `saveSettings(settings)` | `(SiteSettings) => void` | Save site settings |

## Homepage Content

| Function | Signature | Description |
|---|---|---|
| `getHomepageContent()` | `() => HomepageContent` | Get homepage CMS content |
| `saveHomepageContent(content)` | `(HomepageContent) => void` | Save homepage content |

## Blog

| Function | Signature | Description |
|---|---|---|
| `getBlogs()` | `() => Blog[]` | Get all blog posts |
| `saveBlogs(blogs)` | `(Blog[]) => void` | Save blog posts |

## Reviews

| Function | Signature | Description |
|---|---|---|
| `getReviews()` | `() => Review[]` | Get all reviews |
| `saveReviews(reviews)` | `(Review[]) => void` | Save reviews |

## Testimonials

| Function | Signature | Description |
|---|---|---|
| `getTestimonials()` | `() => Testimonial[]` | Get testimonials |
| `saveTestimonials(testimonials)` | `(Testimonial[]) => void` | Save testimonials |

## Team

| Function | Signature | Description |
|---|---|---|
| `getTeamMembers()` | `() => TeamMember[]` | Get team members |
| `saveTeamMembers(members)` | `(TeamMember[]) => void` | Save team members |

## Offers

| Function | Signature | Description |
|---|---|---|
| `getOffers()` | `() => Offer[]` | Get all offers |
| `saveOffers(offers)` | `(Offer[]) => void` | Save offers |

## Promo Ads

| Function | Signature | Description |
|---|---|---|
| `getPromoAds()` | `() => PromoAd[]` | Get promo ads |
| `savePromoAds(ads)` | `(PromoAd[]) => void` | Save promo ads |

## SEO

| Function | Signature | Description |
|---|---|---|
| `getSeoSettings()` | `() => SeoSettings` | Get per-page SEO settings |
| `saveSeoSettings(seo)` | `(SeoSettings) => void` | Save SEO settings |

## Packages

| Function | Signature | Description |
|---|---|---|
| `getPackages()` | `() => Package[]` | Get tour packages |
| `savePackages(packages)` | `(Package[]) => void` | Save packages |

## Categories

| Function | Signature | Description |
|---|---|---|
| `getCategories()` | `() => Category[]` | Get cruise categories |
| `saveCategories(cats)` | `(Category[]) => void` | Save categories |

## Contact Inquiries

| Function | Signature | Description |
|---|---|---|
| `getContactInquiries()` | `() => ContactInquiry[]` | Get all inquiries |
| `addContactInquiry(inquiry)` | `(ContactInquiry) => void` | Add new inquiry |
| `updateInquiryStatus(id, status)` | `(string, string) => void` | Update inquiry status |

## Hooks

| Hook | Description |
|---|---|
| `useCmsStore()` | Returns all CMS state and methods |
| `useLanguage()` | Returns `{ language, setLanguage, t }` |
| `useIsMobile()` | Returns boolean for mobile viewport |
| `useToast()` | Toast notification hook |
