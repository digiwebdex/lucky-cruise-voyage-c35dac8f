// ============================================
// API Sync Layer — Lucky Cruise Voyage
// Dual-mode: VPS API (production) ↔ localStorage (preview)
// ============================================

const API_BASE = import.meta.env.VITE_API_URL || '';

export const isApiMode = (): boolean => !!API_BASE;

// ===== Auth Token =====
let authToken: string | null = localStorage.getItem('auth_token');

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
}

export function getAuthToken(): string | null {
  return authToken;
}

// ===== Fetch Helpers =====
async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  });
  if (!res.ok) throw new Error(`API ${endpoint}: ${res.status}`);
  return res.json();
}

async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API ${endpoint}: ${res.status}`);
  return res.json();
}

async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API ${endpoint}: ${res.status}`);
  return res.json();
}

// ===== Snake ↔ Camel Case Converters =====
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function convertKeys(obj: unknown, converter: (s: string) => string): unknown {
  if (Array.isArray(obj)) return obj.map(item => convertKeys(item, converter));
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => {
        // Don't recurse into JSONB fields that are already parsed
        const newKey = converter(key);
        const shouldRecurse = typeof value === 'object' && value !== null && !Array.isArray(value);
        return [newKey, shouldRecurse ? convertKeys(value, converter) : value];
      })
    );
  }
  return obj;
}

export function toCamel<T>(data: unknown): T {
  return convertKeys(data, snakeToCamel) as T;
}

export function toSnake<T>(data: unknown): T {
  return convertKeys(data, camelToSnake) as T;
}

// ===== localStorage keys (must match cmsStore + bookingStore) =====
const LS_KEYS = {
  cruises: 'cms_cruises',
  settings: 'cms_settings',
  pages: 'cms_pages',
  seo: 'cms_seo',
  testimonials: 'cms_testimonials',
  teamMembers: 'cms_teamMembers',
  offers: 'cms_offers',
  blogs: 'cms_blogs',
  reviews: 'cms_reviews',
  promoAds: 'cms_promoAds',
  homepageContent: 'cms_homepage_content',
  contactInquiries: 'cms_contact_inquiries',
  categories: 'cms_package_categories',
  availability: 'cms_ship_availability',
  bookings: 'cms_bookings',
};

// ===== Transform DB rows for settings (singleton) =====
function transformSettings(raw: Record<string, unknown>) {
  if (!raw || !raw.site_name) return null;
  return {
    siteName: raw.site_name,
    phone: raw.phone,
    whatsapp: raw.whatsapp,
    email: raw.email,
    address: raw.address,
    addressBn: raw.address_bn,
    facebookUrl: raw.facebook_url,
    youtubeUrl: raw.youtube_url,
    instagramUrl: raw.instagram_url,
    footerText: raw.footer_text,
    footerTextBn: raw.footer_text_bn,
    googleMapsUrl: raw.google_maps_url,
    whatsappFloatEnabled: raw.whatsapp_float_enabled,
    languageSwitcherEnabled: raw.language_switcher_enabled,
    heroImages: raw.hero_images || [],
    featuredCruiseIds: raw.featured_cruise_ids || [],
  };
}

// ===== Transform DB cruise rows =====
function transformCruise(raw: Record<string, unknown>) {
  return {
    id: raw.id,
    name: raw.name,
    subtitle: raw.subtitle || '',
    description: raw.description || '',
    route: raw.route || '',
    duration: raw.duration || '',
    capacity: raw.capacity || '',
    cabins: raw.cabins || '',
    price: raw.price || 0,
    oldPrice: raw.old_price,
    priceLabel: raw.price_label || '',
    featured: raw.featured || false,
    destination: raw.destination || 'sundarban',
    subCategory: raw.sub_category,
    images: raw.images || [],
    featuredImageIndex: raw.featured_image_index || 0,
    facilities: raw.facilities || [],
    touristSpots: raw.tourist_spots || [],
    itinerary: raw.itinerary || [],
    menu: raw.menu || [],
    safetyInfo: raw.safety_info || [],
    travelTips: raw.travel_tips || [],
    thingsToCarry: raw.things_to_carry || [],
    additionalCosts: raw.additional_costs || [],
    packageIncludes: raw.package_includes || [],
    seatPlan: raw.seat_plan || [],
    seatPlanImage: raw.seat_plan_image,
    seoTitle: raw.seo_title,
    seoDescription: raw.seo_description,
    seoKeywords: raw.seo_keywords,
    ogImage: raw.og_image,
    packages: ((raw.packages as Record<string, unknown>[]) || []).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price || 0,
      oldPrice: p.old_price,
      adultPrice: p.adult_price || 0,
      adultOldPrice: p.adult_old_price,
      childPrice: p.child_price || 0,
      childOldPrice: p.child_old_price,
      duration: p.duration || '',
      isOffer: p.is_offer || false,
      categoryId: p.category_id,
      thumbnail: p.thumbnail,
      tripDates: p.trip_dates || [],
      offerDayLabel: p.offer_day_label,
      offerDateLabel: p.offer_date_label,
    })),
  };
}

// ===== Transform DB blog rows =====
function transformBlog(raw: Record<string, unknown>) {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    category: raw.category,
    excerpt: raw.excerpt || '',
    body: raw.body || '',
    coverImage: raw.cover_image || '',
    youtubeUrl: raw.youtube_url,
    author: raw.author || 'Lucky Tours',
    publishedAt: raw.published_at || raw.created_at,
    isPublished: raw.is_published ?? false,
    seoTitle: raw.seo_title,
    seoDescription: raw.seo_description,
    seoKeywords: raw.seo_keywords,
    ogImage: raw.og_image,
  };
}

// ===== Transform generic items with common patterns =====
function transformTestimonial(raw: Record<string, unknown>) {
  return { id: raw.id, name: raw.name, text: raw.text, rating: raw.rating || 5 };
}

function transformTeamMember(raw: Record<string, unknown>) {
  return { id: raw.id, name: raw.name, role: raw.role };
}

function transformOffer(raw: Record<string, unknown>) {
  return {
    id: raw.id, title: raw.title, posterImage: raw.poster_image || '',
    linkedCruiseId: raw.linked_cruise_id || '', description: raw.description,
    isActive: raw.is_active ?? true, expiryDate: raw.expiry_date,
  };
}

function transformReview(raw: Record<string, unknown>) {
  return {
    id: raw.id, targetType: raw.target_type, targetId: raw.target_id,
    targetName: raw.target_name, name: raw.name, email: raw.email,
    rating: raw.rating || 5, comment: raw.comment,
    createdAt: raw.created_at, status: raw.status || 'pending',
  };
}

function transformPromoAd(raw: Record<string, unknown>) {
  return {
    id: raw.id, title: raw.title, subtitle: raw.subtitle,
    dateLabel: raw.date_label, image: raw.image || '',
    linkedCruiseId: raw.linked_cruise_id || '', isActive: raw.is_active ?? true,
  };
}

function transformInquiry(raw: Record<string, unknown>) {
  return {
    id: raw.id, name: raw.name, email: raw.email,
    message: raw.message, createdAt: raw.created_at, status: raw.status || 'new',
  };
}

function transformSeo(raw: Record<string, unknown>) {
  return {
    pageSlug: raw.page_slug, title: raw.title,
    description: raw.description, keywords: raw.keywords,
  };
}

function transformPage(raw: Record<string, unknown>) {
  return {
    id: raw.id, slug: raw.slug, title: raw.title,
    heroText: raw.hero_text || '', body: raw.body || '',
    sections: raw.sections || [],
    seoTitle: raw.seo_title, seoDescription: raw.seo_description,
    seoKeywords: raw.seo_keywords, ogImage: raw.og_image,
  };
}

function transformCategory(raw: Record<string, unknown>) {
  return { id: raw.id, name: raw.name, nameBn: raw.name_bn, description: raw.description };
}

function transformAvailability(raw: Record<string, unknown>) {
  return {
    id: raw.id, cruiseId: raw.cruise_id,
    packageId: raw.package_id, availableDates: raw.available_dates || [],
  };
}

function transformBooking(raw: Record<string, unknown>) {
  return {
    id: raw.id, name: raw.name, phone: raw.phone,
    cruiseId: raw.cruise_id, cruiseName: raw.cruise_name,
    packageName: raw.package_name, categoryId: raw.category_id,
    travelDate: raw.travel_date, adults: raw.adults || 1,
    children: raw.children || 0, notes: raw.notes,
    createdAt: raw.created_at, status: raw.status || 'pending',
  };
}

// ===== Init: Fetch from API → populate localStorage =====
let _initialized = false;
let _initPromise: Promise<void> | null = null;

export function initFromApi(): Promise<void> {
  if (!isApiMode()) {
    _initialized = true;
    return Promise.resolve();
  }
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    try {
      console.log('[API Sync] Fetching data from VPS API...');
      const [cruises, settings, blogs, testimonials, team, offers, reviews, promoAds, inquiries, seo, pages, homepageContent, categories, availability, bookings] = await Promise.all([
        apiGet<Record<string, unknown>[]>('/api/cruises').catch(() => []),
        apiGet<Record<string, unknown>>('/api/settings').catch(() => ({})),
        apiGet<Record<string, unknown>[]>('/api/blogs').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/testimonials').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/team').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/offers').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/reviews').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/promo-ads').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/inquiries').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/seo').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/pages').catch(() => []),
        apiGet<Record<string, unknown>>('/api/homepage-content').catch(() => ({})),
        apiGet<Record<string, unknown>[]>('/api/categories').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/availability').catch(() => []),
        apiGet<Record<string, unknown>[]>('/api/bookings').catch(() => []),
      ]);

      // Transform and store
      if (cruises.length) localStorage.setItem(LS_KEYS.cruises, JSON.stringify(cruises.map(transformCruise)));
      if (settings && Object.keys(settings).length > 1) {
        const s = transformSettings(settings);
        if (s) localStorage.setItem(LS_KEYS.settings, JSON.stringify(s));
      }
      if (blogs.length) localStorage.setItem(LS_KEYS.blogs, JSON.stringify(blogs.map(transformBlog)));
      if (testimonials.length) localStorage.setItem(LS_KEYS.testimonials, JSON.stringify(testimonials.map(transformTestimonial)));
      if (team.length) localStorage.setItem(LS_KEYS.teamMembers, JSON.stringify(team.map(transformTeamMember)));
      if (offers.length) localStorage.setItem(LS_KEYS.offers, JSON.stringify(offers.map(transformOffer)));
      if (reviews.length) localStorage.setItem(LS_KEYS.reviews, JSON.stringify(reviews.map(transformReview)));
      if (promoAds.length) localStorage.setItem(LS_KEYS.promoAds, JSON.stringify(promoAds.map(transformPromoAd)));
      if (inquiries.length) localStorage.setItem(LS_KEYS.contactInquiries, JSON.stringify(inquiries.map(transformInquiry)));
      if (seo.length) localStorage.setItem(LS_KEYS.seo, JSON.stringify(seo.map(transformSeo)));
      if (pages.length) localStorage.setItem(LS_KEYS.pages, JSON.stringify(pages.map(transformPage)));
      if (homepageContent && Object.keys(homepageContent).length) localStorage.setItem(LS_KEYS.homepageContent, JSON.stringify(homepageContent));
      if (categories.length) localStorage.setItem(LS_KEYS.categories, JSON.stringify(categories.map(transformCategory)));
      if (availability.length) localStorage.setItem(LS_KEYS.availability, JSON.stringify(availability.map(transformAvailability)));
      if (bookings.length) localStorage.setItem(LS_KEYS.bookings, JSON.stringify(bookings.map(transformBooking)));

      console.log('[API Sync] All data loaded from VPS API ✅');
    } catch (err) {
      console.warn('[API Sync] Failed to load from API, using localStorage fallback:', err);
    }
    _initialized = true;
  })();

  return _initPromise;
}

export function isInitialized(): boolean {
  return _initialized;
}

// ===== Save-to-API wrappers (fire and forget) =====
export function syncToApi(endpoint: string, data: unknown): void {
  if (!isApiMode() || !authToken) return;
  apiPut(endpoint, data).catch(err => {
    console.warn(`[API Sync] Failed to sync ${endpoint}:`, err);
  });
}

export function syncPostToApi<T>(endpoint: string, data: unknown): Promise<T> | undefined {
  if (!isApiMode()) return undefined;
  return apiPost<T>(endpoint, data);
}

// ===== Auth API =====
export async function apiLogin(username: string, password: string) {
  if (!isApiMode()) {
    // Fallback: hardcoded admin for preview
    if (username === 'admin' && password === 'admin') {
      const token = 'preview-token';
      setAuthToken(token);
      return { token, user: { id: 'preview', username: 'admin', displayName: 'Admin', role: 'admin' } };
    }
    throw new Error('Invalid credentials');
  }
  const result = await apiPost<{ token: string; user: { id: string; username: string; displayName: string; role: string } }>('/api/auth/login', { username, password });
  setAuthToken(result.token);
  return result;
}

export async function apiLogout() {
  setAuthToken(null);
}

// ===== File Upload =====
export async function apiUploadFile(file: File): Promise<{ url: string; filename: string }> {
  if (!isApiMode()) {
    // Preview mode: convert to data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: reader.result as string, filename: file.name });
      reader.readAsDataURL(file);
    });
  }
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json();
}

// ===== Dashboard Stats =====
export async function apiGetDashboardStats() {
  if (!isApiMode()) return null;
  return apiGet<Record<string, number>>('/api/dashboard/stats');
}
