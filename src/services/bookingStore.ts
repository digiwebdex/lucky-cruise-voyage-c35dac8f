import { useState, useCallback } from "react";
import { syncToApi } from "./apiSync";

// ===== Types =====
export interface PackageCategory {
  id: string;
  name: string;
  nameBn?: string;
  description?: string;
}

export interface ShipAvailability {
  id: string;
  cruiseId: string;
  packageId?: string; // optional, if empty applies to all packages of the cruise
  availableDates: string[]; // ISO date strings e.g. "2026-04-15"
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  cruiseId: string;
  cruiseName: string;
  packageName: string;
  categoryId?: string;
  travelDate: string;
  adults: number;
  children: number;
  notes?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
}

// ===== localStorage keys =====
const KEYS = {
  categories: "cms_package_categories",
  availability: "cms_ship_availability",
  bookings: "cms_bookings",
} as const;

// ===== Default seeds =====
const defaultCategories: PackageCategory[] = [
  { id: "cat-sundarban", name: "Sundarban Tour", nameBn: "সুন্দরবন ট্যুর" },
  { id: "cat-day", name: "Day Cruise", nameBn: "ডে ক্রুজ" },
  { id: "cat-corporate", name: "Corporate Tour", nameBn: "কর্পোরেট ট্যুর" },
  { id: "cat-honeymoon", name: "Honeymoon Package", nameBn: "হানিমুন প্যাকেজ" },
];

// ===== Storage helpers =====
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
export const getCategories = (): PackageCategory[] => getStore(KEYS.categories, defaultCategories);
export const saveCategories = (data: PackageCategory[]) => { setStore(KEYS.categories, data); syncToApi('/api/categories', data); };

export const getAvailability = (): ShipAvailability[] => getStore(KEYS.availability, []);
export const saveAvailability = (data: ShipAvailability[]) => { setStore(KEYS.availability, data); syncToApi('/api/availability', data); };

export const getAvailabilityForCruise = (cruiseId: string): string[] => {
  const all = getAvailability();
  const entries = all.filter(a => a.cruiseId === cruiseId);
  const dates = new Set<string>();
  entries.forEach(e => e.availableDates.forEach(d => dates.add(d)));
  return Array.from(dates).sort();
};

export const getBookings = (): Booking[] => getStore(KEYS.bookings, []);
export const saveBookings = (data: Booking[]) => { setStore(KEYS.bookings, data); syncToApi('/api/bookings', data); };

export const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "status">): Booking => {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  bookings.unshift(newBooking);
  saveBookings(bookings);
  return newBooking;
};

// ===== React Hook =====
export function useBookingStore<T>(getter: () => T, saver: (data: T) => void): [T, (data: T) => void] {
  const [data, setData] = useState<T>(getter);
  const save = useCallback((newData: T) => {
    saver(newData);
    setData(newData);
  }, [saver]);
  return [data, save];
}
