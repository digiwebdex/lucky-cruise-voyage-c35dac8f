// ============================================
// API Service Layer — Lucky Cruise Voyage
// Replaces localStorage with REST API calls
// Toggle via VITE_API_MODE env variable
// ============================================

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ===== Auth Token Management =====
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

async function apiDelete(endpoint: string): Promise<void> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  });
  if (!res.ok) throw new Error(`API ${endpoint}: ${res.status}`);
}

// ===== Auth =====
export async function apiLogin(username: string, password: string) {
  const result = await apiPost<{ token: string; user: { id: string; username: string; displayName: string; role: string } }>('/auth/login', { username, password });
  setAuthToken(result.token);
  return result;
}

export async function apiLogout() {
  setAuthToken(null);
}

export async function apiGetMe() {
  return apiGet<{ user: { id: string; username: string; role: string } }>('/auth/me');
}

// ===== Cruises =====
export const apiGetCruises = () => apiGet('/cruises');
export const apiGetCruiseById = (id: string) => apiGet(`/cruises/${id}`);
export const apiSaveCruises = (data: unknown) => apiPut('/cruises', data);

// ===== Settings =====
export const apiGetSettings = () => apiGet('/settings');
export const apiSaveSettings = (data: unknown) => apiPut('/settings', data);

// ===== Homepage Content =====
export const apiGetHomepageContent = () => apiGet('/homepage-content');
export const apiSaveHomepageContent = (data: unknown) => apiPut('/homepage-content', data);

// ===== Blogs =====
export const apiGetBlogs = () => apiGet('/blogs');
export const apiSaveBlogs = (data: unknown) => apiPut('/blogs', data);

// ===== Reviews =====
export const apiGetReviews = () => apiGet('/reviews');
export const apiSaveReviews = (data: unknown) => apiPut('/reviews', data);
export const apiAddReview = (data: unknown) => apiPost('/reviews', data);

// ===== Testimonials =====
export const apiGetTestimonials = () => apiGet('/testimonials');
export const apiSaveTestimonials = (data: unknown) => apiPut('/testimonials', data);

// ===== Team =====
export const apiGetTeamMembers = () => apiGet('/team');
export const apiSaveTeamMembers = (data: unknown) => apiPut('/team', data);

// ===== Offers =====
export const apiGetOffers = () => apiGet('/offers');
export const apiSaveOffers = (data: unknown) => apiPut('/offers', data);

// ===== Promo Ads =====
export const apiGetPromoAds = () => apiGet('/promo-ads');
export const apiSavePromoAds = (data: unknown) => apiPut('/promo-ads', data);

// ===== Contact Inquiries =====
export const apiGetContactInquiries = () => apiGet('/inquiries');
export const apiSaveContactInquiries = (data: unknown) => apiPut('/inquiries', data);
export const apiAddContactInquiry = (data: unknown) => apiPost('/inquiries', data);

// ===== Bookings =====
export const apiGetBookings = () => apiGet('/bookings');
export const apiSaveBookings = (data: unknown) => apiPut('/bookings', data);
export const apiAddBooking = (data: unknown) => apiPost('/bookings', data);

// ===== SEO =====
export const apiGetSeo = () => apiGet('/seo');
export const apiSaveSeo = (data: unknown) => apiPut('/seo', data);

// ===== Pages =====
export const apiGetPages = () => apiGet('/pages');
export const apiSavePages = (data: unknown) => apiPut('/pages', data);

// ===== Categories =====
export const apiGetCategories = () => apiGet('/categories');
export const apiSaveCategories = (data: unknown) => apiPut('/categories', data);

// ===== Availability =====
export const apiGetAvailability = () => apiGet('/availability');
export const apiSaveAvailability = (data: unknown) => apiPut('/availability', data);

// ===== Dashboard =====
export const apiGetDashboardStats = () => apiGet('/dashboard/stats');

// ===== File Upload =====
export async function apiUploadFile(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json();
}

// ===== Health Check =====
export const apiHealthCheck = () => apiGet<{ status: string; database: string }>('/health');
