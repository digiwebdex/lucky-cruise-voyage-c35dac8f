import { useState, useEffect, useCallback } from "react";
import { cruises as defaultCruises, testimonials as defaultTestimonials, teamMembers as defaultTeamMembers, type Cruise } from "./mockData";

// ===== Types =====
export interface SiteSettings {
  siteName: string;
  phone: string;
  whatsapp: string;
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
  heroImages: string[];
}

export interface CmsPage {
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}

export interface SeoFields {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}

// ===== Default Seeds =====
const defaultSettings: SiteSettings = {
  siteName: "Lucky Tours & Travels",
  phone: "01711871072",
  whatsapp: "8801711871072",
  email: "luckytoursandtravels70@gmail.com",
  address: "Dhaka, Bangladesh",
  addressBn: "ঢাকা, বাংলাদেশ",
  facebookUrl: "https://www.facebook.com/Luckytoursandtravels",
  youtubeUrl: "",
  instagramUrl: "",
  footerText: "© Lucky Tours & Travels. All rights reserved.",
  footerTextBn: "© লাকি ট্যুরস অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923710646989!3d23.780573258035943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5c6e9a1ab!2sDhaka!5e0!3m2!1sen!2sbd!4v1711871072",
  whatsappFloatEnabled: true,
  languageSwitcherEnabled: true,
  heroImages: [],
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

const DATA_VERSION = "v24";
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

// ===== Blog =====
const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "সুন্দরবনের রয়েল বেঙ্গল টাইগার: প্রকৃতির এক অনন্য সৃষ্টি",
    slug: "royal-bengal-tiger-sundarban",
    category: "sundarban",
    excerpt: "সুন্দরবনে রয়েল বেঙ্গল টাইগারের জীবনযাত্রা এবং সংরক্ষণ সম্পর্কে জানুন। এই মহিমান্বিত প্রাণীটি কেন বিশ্বের অন্যতম বিপন্ন প্রজাতি।",
    body: "সুন্দরবন হলো রয়েল বেঙ্গল টাইগারের অন্যতম প্রধান আবাসস্থল। এখানে প্রায় ১০০টিরও বেশি বাঘ রয়েছে বলে ধারণা করা হয়। এই বাঘগুলো ম্যানগ্রোভ বনে সাঁতার কাটতে এবং মাছ শিকার করতে পারদর্শী।\n\nসুন্দরবনের বাঘ অন্যান্য বাঘের তুলনায় আলাদা — এরা নোনা পানিতে সাঁতার কাটে, হরিণ ও বন্য শূকর শিকার করে এবং কখনো কখনো মানুষের কাছেও আসে।\n\nআমাদের ক্রুজ ট্যুরে আপনি নিরাপদ দূরত্ব থেকে এই অসাধারণ প্রাণীদের দেখার সুযোগ পাবেন।",
    coverImage: "",
    author: "Lucky Tours",
    publishedAt: "2026-03-01T10:00:00Z",
    isPublished: true,
  },
  {
    id: "blog-2",
    title: "টাঙ্গুয়ার হাওর: বাংলাদেশের দ্বিতীয় রামসার সাইট",
    slug: "tanguar-haor-ramsar-site",
    category: "tanguar-haor",
    excerpt: "টাঙ্গুয়ার হাওরের অপরূপ সৌন্দর্য, জীববৈচিত্র্য এবং ভ্রমণ গাইড। কেন এটি প্রকৃতিপ্রেমীদের কাছে স্বর্গ।",
    body: "টাঙ্গুয়ার হাওর সুনামগঞ্জ জেলায় অবস্থিত বাংলাদেশের অন্যতম বৃহত্তম মিঠাপানির জলাভূমি। ২০০০ সালে এটি রামসার সাইট হিসেবে ঘোষিত হয়।\n\nএই হাওরে ২০৮ প্রজাতির পাখি, ১৫০ প্রজাতির মাছ এবং অসংখ্য জলজ উদ্ভিদ রয়েছে। শীতকালে পরিযায়ী পাখিদের আগমনে হাওর এক অন্য রূপ ধারণ করে।\n\nআমাদের হাউজবোট ট্যুরে আপনি হাওরের নীল পানি, মেঘালয় পাহাড়ের দৃশ্য এবং স্থানীয় জেলেদের জীবনযাত্রা উপভোগ করতে পারবেন।",
    coverImage: "",
    author: "Lucky Tours",
    publishedAt: "2026-03-05T10:00:00Z",
    isPublished: true,
  },
  {
    id: "blog-3",
    title: "সুন্দরবন ভ্রমণে কী কী নিতে হবে — সম্পূর্ণ গাইড",
    slug: "sundarban-travel-packing-guide",
    category: "sundarban",
    excerpt: "প্রথমবার সুন্দরবন যাচ্ছেন? এই সম্পূর্ণ প্যাকিং লিস্ট ও টিপস আপনার ভ্রমণকে আরও আরামদায়ক করবে।",
    body: "সুন্দরবন ভ্রমণে যাওয়ার আগে সঠিক প্রস্তুতি নেওয়া খুবই গুরুত্বপূর্ণ। এখানে কিছু প্রয়োজনীয় জিনিসের তালিকা দেওয়া হলো:\n\n১. হালকা সুতির পোশাক\n২. সানস্ক্রিন ও সানগ্লাস\n৩. মশা তাড়ানোর ক্রিম\n৪. ক্যামেরা ও চার্জার\n৫. ব্যক্তিগত ওষুধ\n৬. পানির বোতল\n৭. টর্চলাইট\n\nআমাদের ক্রুজে খাবার, পানি ও মৌলিক প্রাথমিক চিকিৎসার ব্যবস্থা থাকলেও এই জিনিসগুলো সাথে রাখা উচিত।",
    coverImage: "",
    author: "Lucky Tours",
    publishedAt: "2026-02-28T10:00:00Z",
    isPublished: true,
  },
];

export const getBlogs = (): BlogPost[] => getStore(KEYS.blogs, defaultBlogs);
export const saveBlogs = (data: BlogPost[]) => setStore(KEYS.blogs, data);

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
