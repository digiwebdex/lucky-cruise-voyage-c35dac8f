import { useState, useEffect, useCallback } from "react";
import { cruises as defaultCruises, testimonials as defaultTestimonials, teamMembers as defaultTeamMembers, type Cruise } from "./mockData";

// ===== Types =====
export interface SiteSettings {
  siteName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  footerText: string;
  googleMapsUrl: string;
  whatsappFloatEnabled: boolean;
  languageSwitcherEnabled: boolean;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  heroText: string;
  body: string;
  sections: { heading: string; content: string }[];
}

export interface SeoEntry {
  pageSlug: string;
  title: string;
  description: string;
  keywords: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Offer {
  id: string;
  title: string;
  posterImage: string;
  linkedCruiseId: string;
  description?: string;
  isActive: boolean;
  expiryDate?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "sundarban" | "tanguar-haor";
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
}

// ===== Default Seeds =====
const defaultSettings: SiteSettings = {
  siteName: "Lucky Tours & Travels",
  phone: "01711871072",
  whatsapp: "8801711871072",
  email: "luckytoursandtravels70@gmail.com",
  address: "Dhaka, Bangladesh",
  facebookUrl: "",
  youtubeUrl: "",
  instagramUrl: "",
  footerText: "© Lucky Tours & Travels. All rights reserved.",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923710646989!3d23.780573258035943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5c6e9a1ab!2sDhaka!5e0!3m2!1sen!2sbd!4v1711871072",
  whatsappFloatEnabled: true,
  languageSwitcherEnabled: true,
};

const defaultPages: CmsPage[] = [
  { id: "home", slug: "home", title: "Home", heroText: "Explore the Sundarbans", body: "", sections: [] },
  { id: "about", slug: "about", title: "About Us", heroText: "Our Story", body: "", sections: [] },
  { id: "contact", slug: "contact", title: "Contact", heroText: "Get in Touch", body: "", sections: [] },
  { id: "gallery", slug: "gallery", title: "Gallery", heroText: "Photo Gallery", body: "", sections: [] },
  { id: "cruises", slug: "cruises", title: "Our Cruises", heroText: "Browse Cruises", body: "", sections: [] },
  { id: "packages", slug: "packages", title: "Packages", heroText: "Tour Packages", body: "", sections: [] },
];

const defaultSeo: SeoEntry[] = [
  { pageSlug: "home", title: "Lucky Tours & Travels — Sundarban Cruise", description: "Premium Sundarban cruise tours from Khulna", keywords: "sundarban, cruise, tour, bangladesh" },
  { pageSlug: "about", title: "About Us — Lucky Tours", description: "15+ years of Sundarban touring experience", keywords: "about, lucky tours, sundarban" },
  { pageSlug: "cruises", title: "Our Cruises — Lucky Tours", description: "Browse our fleet of luxury cruise ships", keywords: "cruise, ships, sundarban tour" },
  { pageSlug: "contact", title: "Contact — Lucky Tours", description: "Get in touch for bookings and inquiries", keywords: "contact, booking, sundarban tour" },
  { pageSlug: "gallery", title: "Gallery — Lucky Tours", description: "Photos from our Sundarban cruises", keywords: "gallery, photos, sundarban" },
  { pageSlug: "packages", title: "Packages — Lucky Tours", description: "Tour packages for every budget", keywords: "packages, tour, sundarban" },
];

// ===== localStorage helpers =====
const KEYS = {
  cruises: "cms_cruises",
  settings: "cms_settings",
  pages: "cms_pages",
  seo: "cms_seo",
  testimonials: "cms_testimonials",
  teamMembers: "cms_teamMembers",
  offers: "cms_offers",
  blogs: "cms_blogs",
} as const;

const DATA_VERSION = "v13";
const VERSION_KEY = "cms_data_version";

function initVersionCheck() {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  if (storedVersion !== DATA_VERSION) {
    // Clear all CMS caches so fresh defaults are loaded
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
  }
}
initVersionCheck();

function getStore<T>(key: string, defaults: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(key, JSON.stringify(defaults));
  return defaults;
}

function setStore<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===== Public API =====
export const getCruises = (): Cruise[] => getStore(KEYS.cruises, defaultCruises);
export const saveCruises = (data: Cruise[]) => setStore(KEYS.cruises, data);

export const getSettings = (): SiteSettings => getStore(KEYS.settings, defaultSettings);
export const saveSettings = (data: SiteSettings) => setStore(KEYS.settings, data);

export const getPages = (): CmsPage[] => getStore(KEYS.pages, defaultPages);
export const savePages = (data: CmsPage[]) => setStore(KEYS.pages, data);

export const getSeo = (): SeoEntry[] => getStore(KEYS.seo, defaultSeo);
export const saveSeo = (data: SeoEntry[]) => setStore(KEYS.seo, data);

export const getTestimonials = (): Testimonial[] => {
  const defaults = defaultTestimonials.map((t, i) => ({ ...t, id: `testimonial-${i}` }));
  return getStore(KEYS.testimonials, defaults);
};
export const saveTestimonials = (data: Testimonial[]) => setStore(KEYS.testimonials, data);

export const getTeamMembers = (): TeamMember[] => {
  const defaults = defaultTeamMembers.map((m, i) => ({ ...m, id: `team-${i}` }));
  return getStore(KEYS.teamMembers, defaults);
};
export const saveTeamMembers = (data: TeamMember[]) => setStore(KEYS.teamMembers, data);

// Seed default offers from cruises with isOffer packages
function buildDefaultOffers(): Offer[] {
  const allCruises = getStore(KEYS.cruises, defaultCruises);
  return allCruises
    .filter(c => c.packages?.some(p => p.isOffer))
    .map((c, i) => ({
      id: `offer-${i}`,
      title: `${c.name} Special Offer`,
      posterImage: c.images[c.featuredImageIndex ?? 0],
      linkedCruiseId: c.id,
      description: c.subtitle,
      isActive: true,
    }));
}

export const getOffers = (): Offer[] => getStore(KEYS.offers, buildDefaultOffers());
export const saveOffers = (data: Offer[]) => setStore(KEYS.offers, data);

// Helper functions that mirror mockData exports
export function getCruiseById(id: string): Cruise | undefined {
  return getCruises().find(c => c.id === id);
}

export function searchCruises(query: string): Cruise[] {
  const all = getCruises();
  if (!query.trim()) return all;
  const q = query.toLowerCase();
  return all.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.route.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.subtitle.toLowerCase().includes(q)
  );
}

// ===== React Hook =====
export function useCmsData<T>(getter: () => T, saver: (data: T) => void): [T, (data: T) => void] {
  const [data, setData] = useState<T>(getter);

  const save = useCallback((newData: T) => {
    saver(newData);
    setData(newData);
  }, [saver]);

  return [data, save];
}
