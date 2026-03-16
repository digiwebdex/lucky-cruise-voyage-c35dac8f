import { useState, useEffect, useCallback } from "react";
import { cruises as defaultCruises, testimonials as defaultTestimonials, teamMembers as defaultTeamMembers, type Cruise } from "./mockData";
import { syncToApi, syncPostToApi, isApiMode } from "./apiSync";

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
  heroImages: (string | { image: string; title?: string })[];
  featuredCruiseIds: string[];
}

export interface HomepageContent {
  // Hero
  heroBadge: string;
  heroBadgeBn: string;
  heroTitle: string;
  heroTitleBn: string;
  heroHighlight: string;
  heroHighlightBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  // Stats
  stat1Value: string;
  stat1Label: string;
  stat1LabelBn: string;
  stat2Value: string;
  stat2Label: string;
  stat2LabelBn: string;
  stat3Value: string;
  stat3Label: string;
  stat3LabelBn: string;
  // Quick Info Strip
  strip1Value: string;
  strip1Label: string;
  strip1LabelBn: string;
  strip2Value: string;
  strip2Label: string;
  strip2LabelBn: string;
  strip3Value: string;
  strip3Label: string;
  strip3LabelBn: string;
  strip4Value: string;
  strip4Label: string;
  strip4LabelBn: string;
  // Featured Section
  featuredSectionLabel: string;
  featuredSectionLabelBn: string;
  featuredTitle: string;
  featuredTitleBn: string;
  featuredHighlight: string;
  featuredHighlightBn: string;
  featuredSubtitle: string;
  featuredSubtitleBn: string;
  // Why Choose Us
  whyUsTitle: string;
  whyUsTitleBn: string;
  whyUsHighlight: string;
  whyUsHighlightBn: string;
  whyUs1Title: string;
  whyUs1TitleBn: string;
  whyUs1Desc: string;
  whyUs1DescBn: string;
  whyUs2Title: string;
  whyUs2TitleBn: string;
  whyUs2Desc: string;
  whyUs2DescBn: string;
  whyUs3Title: string;
  whyUs3TitleBn: string;
  whyUs3Desc: string;
  whyUs3DescBn: string;
  whyUs4Title: string;
  whyUs4TitleBn: string;
  whyUs4Desc: string;
  whyUs4DescBn: string;
  // Testimonials Section
  testimonialsTitle: string;
  testimonialsTitleBn: string;
  testimonialsHighlight: string;
  testimonialsHighlightBn: string;
  // CTA
  ctaTitle: string;
  ctaTitleBn: string;
  ctaHighlight: string;
  ctaHighlightBn: string;
  ctaSubtitle: string;
  ctaSubtitleBn: string;
  // Promo Section
  promoTitle: string;
  promoTitleBn: string;
  promoSubtitle: string;
  promoSubtitleBn: string;
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
  youtubeUrl?: string;
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

export interface CustomerReview {
  id: string;
  targetType: "cruise" | "blog";
  targetId: string;
  targetName: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface PromoAd {
  id: string;
  title: string;
  subtitle?: string;
  dateLabel?: string;
  image: string;
  linkedCruiseId: string;
  isActive: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
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
  youtubeUrl: "https://www.youtube.com/@luckytoursandtravels70",
  instagramUrl: "",
  footerText: "© Lucky Tours & Travels. All rights reserved.",
  footerTextBn: "© লাকি ট্যুরস অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.123456!2d89.5403!3d22.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9015a2ed1e07%3A0xc1af89a67e2e1c4a!2sLucky%20Tours%20And%20Travels!5e0!3m2!1sen!2sbd!4v1710000000000",
  whatsappFloatEnabled: true,
  languageSwitcherEnabled: true,
  heroImages: [],
  featuredCruiseIds: [],
};

const defaultHomepageContent: HomepageContent = {
  heroBadge: "Trusted by 1,50,000+ travelers",
  heroBadgeBn: "১,৫০,০০০+ ভ্রমণকারীর বিশ্বস্ত",
  heroTitle: "Explore the Beauty of",
  heroTitleBn: "সুন্দরবনের সৌন্দর্য",
  heroHighlight: "Sundarbans",
  heroHighlightBn: "উপভোগ করুন",
  heroSubtitle: "Premium cruise tours with world-class amenities",
  heroSubtitleBn: "বিশ্বমানের সুযোগ-সুবিধা সহ প্রিমিয়াম ক্রুজ ট্যুর",
  stat1Value: "70+",
  stat1Label: "Cruise Ships",
  stat1LabelBn: "ক্রুজ শিপ",
  stat2Value: "1,50,000+",
  stat2Label: "Happy Travellers",
  stat2LabelBn: "সন্তুষ্ট ভ্রমণকারী",
  stat3Value: "15+",
  stat3Label: "Years Experience",
  stat3LabelBn: "বছরের অভিজ্ঞতা",
  strip1Value: "6+ Ships",
  strip1Label: "Premium Fleet",
  strip1LabelBn: "প্রিমিয়াম ফ্লিট",
  strip2Value: "100% Safe",
  strip2Label: "Maximum Safety",
  strip2LabelBn: "সর্বোচ্চ নিরাপত্তা",
  strip3Value: "All-Inclusive",
  strip3Label: "Everything Included",
  strip3LabelBn: "সবকিছু অন্তর্ভুক্ত",
  strip4Value: "24/7",
  strip4Label: "Customer Support",
  strip4LabelBn: "গ্রাহক সেবা",
  featuredSectionLabel: "Our Fleet",
  featuredSectionLabelBn: "আমাদের ফ্লিট",
  featuredTitle: "Featured",
  featuredTitleBn: "ফিচার্ড",
  featuredHighlight: "Cruises",
  featuredHighlightBn: "ক্রুজসমূহ",
  featuredSubtitle: "Choose from our premium collection",
  featuredSubtitleBn: "আমাদের প্রিমিয়াম কালেকশন থেকে বাছাই করুন",
  whyUsTitle: "Why Choose",
  whyUsTitleBn: "কেন বেছে নেবেন",
  whyUsHighlight: "Us?",
  whyUsHighlightBn: "আমাদের?",
  whyUs1Title: "Premium Fleet",
  whyUs1TitleBn: "প্রিমিয়াম ফ্লিট",
  whyUs1Desc: "Modern ships with luxury amenities",
  whyUs1DescBn: "আধুনিক জাহাজ সহ বিলাসবহুল সুযোগ-সুবিধা",
  whyUs2Title: "Maximum Safety",
  whyUs2TitleBn: "সর্বোচ্চ নিরাপত্তা",
  whyUs2Desc: "Armed guards and modern safety equipment",
  whyUs2DescBn: "সশস্ত্র প্রহরী ও আধুনিক নিরাপত্তা সরঞ্জাম",
  whyUs3Title: "All-Inclusive",
  whyUs3TitleBn: "সব অন্তর্ভুক্ত",
  whyUs3Desc: "Meals, guides, and activities included",
  whyUs3DescBn: "খাবার, গাইড ও কার্যকলাপ অন্তর্ভুক্ত",
  whyUs4Title: "24/7 Support",
  whyUs4TitleBn: "২৪/৭ সেবা",
  whyUs4Desc: "Round the clock customer support",
  whyUs4DescBn: "সর্বক্ষণ গ্রাহক সেবা",
  testimonialsTitle: "What Our Guests",
  testimonialsTitleBn: "আমাদের অতিথিরা কি",
  testimonialsHighlight: "Say",
  testimonialsHighlightBn: "বলেন",
  ctaTitle: "Ready for Your",
  ctaTitleBn: "আপনার",
  ctaHighlight: "Adventure?",
  ctaHighlightBn: "অ্যাডভেঞ্চারের জন্য তৈরি?",
  ctaSubtitle: "Book your dream Sundarban cruise today",
  ctaSubtitleBn: "আজই আপনার স্বপ্নের সুন্দরবন ক্রুজ বুক করুন",
  promoTitle: "আমাদের প্যাকেজ সমূহ",
  promoTitleBn: "আমাদের প্যাকেজ সমূহ",
  promoSubtitle: "আপকামিং ট্যুর প্যাকেজ ও অফার সমূহ",
  promoSubtitleBn: "আপকামিং ট্যুর প্যাকেজ ও অফার সমূহ",
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
  reviews: "cms_reviews",
  promoAds: "cms_promoAds",
  homepageContent: "cms_homepage_content",
  contactInquiries: "cms_contact_inquiries",
} as const;

const DATA_VERSION = "v35";
const VERSION_KEY = "cms_data_version";

function initVersionCheck() {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  if (storedVersion !== DATA_VERSION) {
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
export const saveCruises = (data: Cruise[]) => { setStore(KEYS.cruises, data); syncToApi('/api/cruises', data); };

export const getSettings = (): SiteSettings => getStore(KEYS.settings, defaultSettings);
export const saveSettings = (data: SiteSettings) => { setStore(KEYS.settings, data); syncToApi('/api/settings', data); };

export const getPages = (): CmsPage[] => getStore(KEYS.pages, defaultPages);
export const savePages = (data: CmsPage[]) => { setStore(KEYS.pages, data); syncToApi('/api/pages', data); };

export const getSeo = (): SeoEntry[] => getStore(KEYS.seo, defaultSeo);
export const saveSeo = (data: SeoEntry[]) => { setStore(KEYS.seo, data); syncToApi('/api/seo', data); };

export const getHomepageContent = (): HomepageContent => getStore(KEYS.homepageContent, defaultHomepageContent);
export const saveHomepageContent = (data: HomepageContent) => { setStore(KEYS.homepageContent, data); syncToApi('/api/homepage-content', data); };

export const getTestimonials = (): Testimonial[] => {
  const defaults = defaultTestimonials.map((t, i) => ({ ...t, id: `testimonial-${i}` }));
  return getStore(KEYS.testimonials, defaults);
};
export const saveTestimonials = (data: Testimonial[]) => { setStore(KEYS.testimonials, data); syncToApi('/api/testimonials', data); };

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
import blogTiger from "@/assets/blog/blog-tiger-sundarban.jpg";
import blogHaor from "@/assets/blog/blog-tanguar-haor.jpg";
import blogPacking from "@/assets/blog/blog-packing-guide.jpg";

const defaultBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "সুন্দরবনের রয়েল বেঙ্গল টাইগার: প্রকৃতির এক অনন্য সৃষ্টি",
    slug: "royal-bengal-tiger-sundarban",
    category: "sundarban",
    excerpt: "সুন্দরবনে রয়েল বেঙ্গল টাইগারের জীবনযাত্রা এবং সংরক্ষণ সম্পর্কে জানুন। এই মহিমান্বিত প্রাণীটি কেন বিশ্বের অন্যতম বিপন্ন প্রজাতি।",
    body: "সুন্দরবন হলো রয়েল বেঙ্গল টাইগারের অন্যতম প্রধান আবাসস্থল। এখানে প্রায় ১০০টিরও বেশি বাঘ রয়েছে বলে ধারণা করা হয়। এই বাঘগুলো ম্যানগ্রোভ বনে সাঁতার কাটতে এবং মাছ শিকার করতে পারদর্শী।\n\nসুন্দরবনের বাঘ অন্যান্য বাঘের তুলনায় আলাদা — এরা নোনা পানিতে সাঁতার কাটে, হরিণ ও বন্য শূকর শিকার করে এবং কখনো কখনো মানুষের কাছেও আসে।\n\nআমাদের ক্রুজ ট্যুরে আপনি নিরাপদ দূরত্ব থেকে এই অসাধারণ প্রাণীদের দেখার সুযোগ পাবেন।",
    coverImage: blogTiger,
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
    body: "টাঙ্গুয়ার হাওর সুনামগঞ্জ জেলায় অবস্থিত বাংলাদেশের অন্যতম বৃহত্তম মিঠাপানির জলাভূমি। ২০০০ সালে এটি রামসার সাইট হিসেবে ঘোষিত হয়।\n\nএই হাওরে ২০৮ প্রজাতির পাখি, ১৫০ প্রজাতির মাছ এবং অসংখ্য জলজ উদ্ভিদ রয়েছে। শীতকালে পরিযায়ী পাখিদের আগমনে হাওর এক অন্য রূপ ধারণা করে।\n\nআমাদের হাউজবোট ট্যুরে আপনি হাওরের নীল পানি, মেঘালয় পাহাড়ের দৃশ্য এবং স্থানীয় জেলেদের জীবনযাত্রা উপভোগ করতে পারবেন।",
    coverImage: blogHaor,
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
    coverImage: blogPacking,
    author: "Lucky Tours",
    publishedAt: "2026-02-28T10:00:00Z",
    isPublished: true,
  },
];

export const getBlogs = (): BlogPost[] => getStore(KEYS.blogs, defaultBlogs);
export const saveBlogs = (data: BlogPost[]) => setStore(KEYS.blogs, data);

// ===== Reviews =====
export const getReviews = (): CustomerReview[] => getStore(KEYS.reviews, []);
export const saveReviews = (data: CustomerReview[]) => setStore(KEYS.reviews, data);

export function addReview(review: Omit<CustomerReview, "id" | "createdAt" | "status">): CustomerReview {
  const reviews = getReviews();
  const newReview: CustomerReview = {
    ...review,
    id: `review-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  saveReviews([newReview, ...reviews]);
  return newReview;
}

export function getApprovedReviews(targetType: string, targetId: string): CustomerReview[] {
  return getReviews().filter(r => r.targetType === targetType && r.targetId === targetId && r.status === "approved");
}

// ===== Promo Ads =====
import promo1 from "@/assets/promos/promo-1.jpg";
import promo2 from "@/assets/promos/promo-2.jpg";
import promo3 from "@/assets/promos/promo-3.jpg";

const defaultPromoAds: PromoAd[] = [
  { id: "promo-1", title: "M.V. Sea Pearl 3", subtitle: "সুন্দরবন ক্রুজ ট্যুর", image: promo1, linkedCruiseId: "mv-pearl-3", isActive: true },
  { id: "promo-2", title: "M.V. Sea Pearl 3", subtitle: "সুন্দরবন ক্রুজ ট্যুর", image: promo2, linkedCruiseId: "mv-pearl-3", isActive: true },
  { id: "promo-3", title: "MV Sea Pearl 4", subtitle: "সুন্দরবন ক্রুজ ট্যুর", image: promo3, linkedCruiseId: "mv-pearl", isActive: true },
];

export const getPromoAds = (): PromoAd[] => getStore(KEYS.promoAds, defaultPromoAds);
export const savePromoAds = (data: PromoAd[]) => setStore(KEYS.promoAds, data);

// ===== Contact Inquiries =====
export const getContactInquiries = (): ContactInquiry[] => getStore(KEYS.contactInquiries, []);
export const saveContactInquiries = (data: ContactInquiry[]) => setStore(KEYS.contactInquiries, data);

export function addContactInquiry(inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">): ContactInquiry {
  const inquiries = getContactInquiries();
  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: `contact-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  inquiries.unshift(newInquiry);
  saveContactInquiries(inquiries);
  return newInquiry;
}

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
