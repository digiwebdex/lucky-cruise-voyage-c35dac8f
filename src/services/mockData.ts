export interface Cruise {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  route: string;
  duration: string;
  facilities: string[];
  packages: CruisePackage[];
  seatPlan: Deck[];
  featured: boolean;
}

export interface CruisePackage {
  id: string;
  name: string;
  route: string;
  price: number;
  inclusions: string[];
  seatType: 'AC' | 'Non-AC' | 'Both';
}

export interface Deck {
  name: string;
  rows: SeatRow[];
}

export interface SeatRow {
  label: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  type: 'AC' | 'Non-AC';
  available: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  cruiseName: string;
  travelDate: string;
  persons: number;
  packageName: string;
  seatType: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const makeSeatPlan = (): Deck[] => [
  {
    name: "Deck 1 - Standard",
    rows: [
      { label: "A", seats: [{ id: "A1", type: "Non-AC", available: true }, { id: "A2", type: "Non-AC", available: true }, { id: "A3", type: "Non-AC", available: false }, { id: "A4", type: "Non-AC", available: true }] },
      { label: "B", seats: [{ id: "B1", type: "Non-AC", available: true }, { id: "B2", type: "Non-AC", available: true }, { id: "B3", type: "Non-AC", available: true }, { id: "B4", type: "Non-AC", available: false }] },
    ],
  },
  {
    name: "Deck 2 - Premium",
    rows: [
      { label: "C", seats: [{ id: "C1", type: "AC", available: true }, { id: "C2", type: "AC", available: true }, { id: "C3", type: "AC", available: false }, { id: "C4", type: "AC", available: true }] },
      { label: "D", seats: [{ id: "D1", type: "AC", available: true }, { id: "D2", type: "AC", available: false }, { id: "D3", type: "AC", available: true }, { id: "D4", type: "AC", available: true }] },
    ],
  },
];

export const cruises: Cruise[] = [
  {
    id: "sundarban-explorer",
    name: "Sundarban Explorer",
    description: "Experience the breathtaking beauty of the Sundarbans, the world's largest mangrove forest. Spot Royal Bengal Tigers, exotic birds, and explore the mystical waterways on this unforgettable cruise adventure.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800", "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"],
    price: 5500,
    route: "Khulna – Sundarban – Khulna",
    duration: "3 Days / 2 Nights",
    facilities: ["AC Cabins", "Restaurant", "Open Deck", "WiFi", "Life Jackets", "Guide"],
    packages: [
      { id: "se-1", name: "Economy", route: "Khulna – Sundarban – Khulna", price: 5500, inclusions: ["Non-AC Cabin", "3 Meals/Day", "Guide"], seatType: "Non-AC" },
      { id: "se-2", name: "Premium", route: "Khulna – Sundarban – Khulna", price: 8500, inclusions: ["AC Cabin", "3 Meals/Day", "Guide", "Snacks"], seatType: "AC" },
      { id: "se-3", name: "Luxury", route: "Khulna – Sundarban – Khulna", price: 12000, inclusions: ["Deluxe AC Cabin", "All Meals", "Guide", "Photography Session"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
  {
    id: "river-paradise",
    name: "River Paradise",
    description: "Sail through the majestic rivers of Bangladesh and witness the stunning riverside landscapes, villages, and sunsets that will take your breath away.",
    images: ["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800", "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"],
    price: 4000,
    route: "Dhaka – Barishal – Dhaka",
    duration: "2 Days / 1 Night",
    facilities: ["AC Cabins", "Restaurant", "Open Deck", "Life Jackets"],
    packages: [
      { id: "rp-1", name: "Standard", route: "Dhaka – Barishal – Dhaka", price: 4000, inclusions: ["Non-AC Cabin", "2 Meals/Day"], seatType: "Non-AC" },
      { id: "rp-2", name: "Comfort", route: "Dhaka – Barishal – Dhaka", price: 6500, inclusions: ["AC Cabin", "All Meals", "Snacks"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
  {
    id: "coastal-dream",
    name: "Coastal Dream",
    description: "Discover the beauty of the Bay of Bengal coastline. From Cox's Bazar to Saint Martin, this cruise takes you on an unforgettable marine journey.",
    images: ["https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800", "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"],
    price: 9000,
    route: "Cox's Bazar – Saint Martin – Cox's Bazar",
    duration: "4 Days / 3 Nights",
    facilities: ["AC Cabins", "Restaurant", "Swimming Pool", "Open Deck", "WiFi", "Guide"],
    packages: [
      { id: "cd-1", name: "Explorer", route: "Cox's Bazar – Saint Martin – Cox's Bazar", price: 9000, inclusions: ["Non-AC Cabin", "All Meals", "Guide"], seatType: "Non-AC" },
      { id: "cd-2", name: "Premium Explorer", route: "Cox's Bazar – Saint Martin – Cox's Bazar", price: 14000, inclusions: ["AC Cabin", "All Meals", "Guide", "Snorkeling Gear"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
  {
    id: "heritage-cruise",
    name: "Heritage Cruise",
    description: "Travel through the historical waterways of Bangladesh, visiting ancient temples, mosques, and heritage sites along the riverbanks.",
    images: ["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800"],
    price: 3500,
    route: "Dhaka – Sonargaon – Dhaka",
    duration: "1 Day",
    facilities: ["Open Deck", "Restaurant", "Guide"],
    packages: [
      { id: "hc-1", name: "Day Trip", route: "Dhaka – Sonargaon – Dhaka", price: 3500, inclusions: ["Lunch", "Guide", "Entry Fees"], seatType: "Non-AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: false,
  },
  {
    id: "moonlight-cruise",
    name: "Moonlight Cruise",
    description: "A romantic evening cruise under the stars. Enjoy dinner, live music, and the shimmering moonlight reflecting off calm waters.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"],
    price: 2500,
    route: "Dhaka River Cruise",
    duration: "Evening (6 Hours)",
    facilities: ["Open Deck", "Restaurant", "Live Music", "Bar"],
    packages: [
      { id: "mc-1", name: "Couple", route: "Dhaka River Cruise", price: 2500, inclusions: ["Dinner for 2", "Live Music"], seatType: "Non-AC" },
      { id: "mc-2", name: "Family", route: "Dhaka River Cruise", price: 5000, inclusions: ["Dinner for 4", "Live Music", "Kids Menu"], seatType: "Non-AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: false,
  },
  {
    id: "adventure-rapids",
    name: "Adventure Rapids",
    description: "For the thrill-seekers! Navigate through exciting rapids and explore untouched natural beauty of the hill tracts by water.",
    images: ["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800"],
    price: 7000,
    route: "Rangamati – Kaptai – Rangamati",
    duration: "2 Days / 1 Night",
    facilities: ["Life Jackets", "Camping Gear", "Guide", "Meals"],
    packages: [
      { id: "ar-1", name: "Adventure Basic", route: "Rangamati – Kaptai – Rangamati", price: 7000, inclusions: ["Tent", "All Meals", "Guide"], seatType: "Non-AC" },
      { id: "ar-2", name: "Adventure Premium", route: "Rangamati – Kaptai – Rangamati", price: 10000, inclusions: ["Premium Tent", "All Meals", "Guide", "Photography"], seatType: "Non-AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
  {
    id: "delta-discovery",
    name: "Delta Discovery",
    description: "Explore the vast river delta of southern Bangladesh. Witness dolphins, migratory birds, and the incredible biodiversity of the delta ecosystem.",
    images: ["https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"],
    price: 6000,
    route: "Barisal – Kuakata – Barisal",
    duration: "3 Days / 2 Nights",
    facilities: ["AC Cabins", "Restaurant", "Open Deck", "Binoculars", "Guide"],
    packages: [
      { id: "dd-1", name: "Nature Lover", route: "Barisal – Kuakata – Barisal", price: 6000, inclusions: ["Non-AC Cabin", "All Meals", "Bird Watching Tour"], seatType: "Non-AC" },
      { id: "dd-2", name: "Nature Premium", route: "Barisal – Kuakata – Barisal", price: 9500, inclusions: ["AC Cabin", "All Meals", "Private Guide"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: false,
  },
  {
    id: "royal-bengal",
    name: "Royal Bengal Expedition",
    description: "The ultimate Sundarban experience. A 5-day expedition deep into tiger territory with expert naturalists and luxury accommodations.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800", "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800"],
    price: 18000,
    route: "Mongla – Deep Sundarban – Mongla",
    duration: "5 Days / 4 Nights",
    facilities: ["Luxury AC Cabins", "Fine Dining", "Spa", "Open Deck", "WiFi", "Expert Naturalist"],
    packages: [
      { id: "rb-1", name: "Royal Standard", route: "Mongla – Deep Sundarban – Mongla", price: 18000, inclusions: ["AC Cabin", "All Meals", "Naturalist Guide", "Safari"], seatType: "AC" },
      { id: "rb-2", name: "Royal Suite", route: "Mongla – Deep Sundarban – Mongla", price: 28000, inclusions: ["Suite Cabin", "Fine Dining", "Private Naturalist", "Safari", "Spa"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
  {
    id: "island-hopper",
    name: "Island Hopper",
    description: "Hop between the beautiful islands of the southern coast. Crystal clear waters, sandy beaches, and fresh seafood await.",
    images: ["https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"],
    price: 11000,
    route: "Teknaf – St. Martin – Chhera – Teknaf",
    duration: "3 Days / 2 Nights",
    facilities: ["AC Cabins", "Restaurant", "Snorkeling", "Beach BBQ"],
    packages: [
      { id: "ih-1", name: "Island Basic", route: "Teknaf – St. Martin – Chhera – Teknaf", price: 11000, inclusions: ["Shared Cabin", "Meals", "Snorkeling"], seatType: "Non-AC" },
      { id: "ih-2", name: "Island Deluxe", route: "Teknaf – St. Martin – Chhera – Teknaf", price: 16000, inclusions: ["Private AC Cabin", "All Meals", "Water Sports", "Beach BBQ"], seatType: "AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: false,
  },
  {
    id: "sunset-voyage",
    name: "Sunset Voyage",
    description: "A short but magical cruise designed to capture the most stunning sunsets over the Padma River. Perfect for photography enthusiasts.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800"],
    price: 1800,
    route: "Mawa – Padma River – Mawa",
    duration: "Half Day (4 Hours)",
    facilities: ["Open Deck", "Snacks", "Photography Points"],
    packages: [
      { id: "sv-1", name: "Solo Explorer", route: "Mawa – Padma River – Mawa", price: 1800, inclusions: ["Snacks", "Tea/Coffee"], seatType: "Non-AC" },
      { id: "sv-2", name: "Group Package", route: "Mawa – Padma River – Mawa", price: 1500, inclusions: ["Snacks", "Tea/Coffee", "Group Discount"], seatType: "Non-AC" },
    ],
    seatPlan: makeSeatPlan(),
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Rahim Ahmed", text: "Best cruise experience in Bangladesh! The Sundarban tour was absolutely magical. The crew was professional and the food was amazing.", rating: 5, avatar: "RA" },
  { id: "2", name: "Fatima Khatun", text: "We had an unforgettable family trip. The kids loved the river cruise and the sunset views were breathtaking.", rating: 5, avatar: "FK" },
  { id: "3", name: "Kamal Hossain", text: "Very well organized tour. The booking through WhatsApp was super convenient. Will definitely book again!", rating: 4, avatar: "KH" },
  { id: "4", name: "Nasreen Akter", text: "The Coastal Dream cruise exceeded all our expectations. Crystal clear waters and incredible marine life!", rating: 5, avatar: "NA" },
  { id: "5", name: "Jamal Uddin", text: "Professional service from start to finish. The seat plan feature helped us choose the best spots on the deck.", rating: 4, avatar: "JU" },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600",
  "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600",
];

export const teamMembers: TeamMember[] = [
  { name: "Mohammad Ali", role: "Founder & CEO", image: "" },
  { name: "Ayesha Rahman", role: "Operations Manager", image: "" },
  { name: "Tanvir Hasan", role: "Tour Coordinator", image: "" },
  { name: "Sadia Islam", role: "Customer Relations", image: "" },
];

export const mockBookings: Booking[] = [
  { id: "BK001", name: "Abdul Karim", phone: "01712345678", cruiseName: "Sundarban Explorer", travelDate: "2026-03-15", persons: 4, packageName: "Premium", seatType: "AC", createdAt: "2026-03-01" },
  { id: "BK002", name: "Reshma Begum", phone: "01898765432", cruiseName: "River Paradise", travelDate: "2026-03-20", persons: 2, packageName: "Standard", seatType: "Non-AC", createdAt: "2026-03-02" },
  { id: "BK003", name: "Faruk Ahmed", phone: "01611223344", cruiseName: "Coastal Dream", travelDate: "2026-04-01", persons: 6, packageName: "Premium Explorer", seatType: "AC", createdAt: "2026-03-03" },
  { id: "BK004", name: "Mina Akter", phone: "01555667788", cruiseName: "Moonlight Cruise", travelDate: "2026-03-25", persons: 2, packageName: "Couple", seatType: "Non-AC", createdAt: "2026-03-04" },
];

export function getCruiseById(id: string): Cruise | undefined {
  return cruises.find(c => c.id === id);
}

export function searchCruises(query: string, minPrice?: number, maxPrice?: number): Cruise[] {
  const q = query.toLowerCase();
  return cruises.filter(c => {
    const matchesQuery = !query || c.name.toLowerCase().includes(q) || c.route.toLowerCase().includes(q) || c.packages.some(p => p.name.toLowerCase().includes(q));
    const matchesMin = minPrice === undefined || c.price >= minPrice;
    const matchesMax = maxPrice === undefined || c.price <= maxPrice;
    return matchesQuery && matchesMin && matchesMax;
  });
}
