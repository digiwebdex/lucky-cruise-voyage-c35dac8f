import utshab1 from "@/assets/cruises/utshab-1.jpeg";
import utshab2 from "@/assets/cruises/utshab-2.jpeg";
import utshab3 from "@/assets/cruises/utshab-3.jpeg";
import utshab4 from "@/assets/cruises/utshab-4.jpeg";
import utshab5 from "@/assets/cruises/utshab-5.jpeg";
import utshab6 from "@/assets/cruises/utshab-6.jpeg";
import utshab7 from "@/assets/cruises/utshab-7.jpeg";
import utshab8 from "@/assets/cruises/utshab-8.jpeg";
import utshab9 from "@/assets/cruises/utshab-9.jpeg";
import utshab10 from "@/assets/cruises/utshab-10.jpeg";

export interface Cruise {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  images: string[];
  price: number;
  priceLabel: string;
  route: string;
  duration: string;
  capacity: string;
  cabins: string;
  facilities: string[];
  packages: CruisePackage[];
  seatPlan: Deck[];
  featured: boolean;
  itinerary?: ItineraryDay[];
  menu?: MenuDay[];
  safetyInfo?: string[];
  travelTips?: string[];
  thingsToCarry?: string[];
  packageIncludes?: string[];
  touristSpots?: string[];
  additionalCosts?: { label: string; amount: string }[];
}

export interface ItineraryDay {
  day: string;
  title: string;
  activities: string[];
}

export interface MenuDay {
  day: string;
  meals: { name: string; items: string }[];
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
    name: "Deck 1 – Standard Cabins",
    rows: [
      { label: "A", seats: [{ id: "A1", type: "AC", available: true }, { id: "A2", type: "AC", available: true }, { id: "A3", type: "AC", available: false }, { id: "A4", type: "AC", available: true }] },
      { label: "B", seats: [{ id: "B1", type: "AC", available: true }, { id: "B2", type: "AC", available: true }, { id: "B3", type: "AC", available: true }, { id: "B4", type: "AC", available: false }] },
      { label: "C", seats: [{ id: "C1", type: "AC", available: true }, { id: "C2", type: "AC", available: false }, { id: "C3", type: "AC", available: true }, { id: "C4", type: "AC", available: true }] },
    ],
  },
  {
    name: "Deck 2 – Premium Cabins",
    rows: [
      { label: "D", seats: [{ id: "D1", type: "AC", available: true }, { id: "D2", type: "AC", available: true }, { id: "D3", type: "AC", available: false }, { id: "D4", type: "AC", available: true }] },
      { label: "E", seats: [{ id: "E1", type: "AC", available: true }, { id: "E2", type: "AC", available: false }, { id: "E3", type: "AC", available: true }, { id: "E4", type: "AC", available: true }] },
    ],
  },
  {
    name: "Observation Deck",
    rows: [
      { label: "F", seats: [{ id: "F1", type: "AC", available: true }, { id: "F2", type: "AC", available: true }, { id: "F3", type: "AC", available: true }, { id: "F4", type: "AC", available: true }] },
    ],
  },
];

export const cruises: Cruise[] = [
  {
    id: "mv-utshab",
    name: "MV UTSHAB",
    subtitle: "Luxurious AC Cruise Ship – Khulna",
    description: "MV Utshab has been built with enclosed and spacious open air observation decks, keeping in mind your entertainment and adventurous needs. Experience the breathtaking beauty of the Sundarbans — the world's largest mangrove forest — on this luxurious 23-cabin AC cruise ship with a capacity of 50 tourists.",
    images: [
      utshab1, utshab2, utshab3, utshab4, utshab5,
      utshab6, utshab7, utshab8, utshab9, utshab10,
    ],
    price: 22000,
    priceLabel: "Per Person (Bangladeshi)",
    route: "Khulna – Sundarban – Khulna",
    duration: "3 Days / 2 Nights",
    capacity: "50 Tourists",
    cabins: "23 Cabins",
    facilities: [
      "Spacious Rooms with Modern Interior",
      "High Room Height Clearance",
      "Individual AC with Control",
      "Comfortable Beds",
      "Sofa & Mirror",
      "Storage Cabinets",
      "Luggage Space",
      "Open Air Observation Deck",
      "Enclosed Deck",
    ],
    touristSpots: [
      "Harbaria",
      "Andarmanik Eco-Tourism Centre",
      "Katka Jamtola Sea Beach",
      "Katka Office Par",
      "Kochikhali / Hironpoint",
      "Dimerchor / Dublar Char",
      "Koromjol Crocodile Breeding Centre",
    ],
    additionalCosts: [
      { label: "Entrance fee (Foreign National)", amount: "10,500 BDT" },
      { label: "Entrance fee (Bangladeshi National)", amount: "1,050 BDT" },
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Khulna → Andarmanik",
        activities: [
          "7:00 AM – Board at Khulna Jailkhana Ghat, our guide will receive you",
          "Cruise along Rupsha & Pashur River – pass Khulna Shipyard, Rupsha Bridge, Rampal Power Plant, Mongla Port",
          "Lunch on board the ship",
          "Visit Andarmanik Eco-Tourism Centre – guided forest trek with armed guards",
          "Walk through dense mangrove forest – Sundari, Golpata, Gewa trees",
          "Climb the Watch Tower for panoramic views, then return to ship",
          "Evening snacks on board",
          "Ship sails toward Katka Sanctuary at the edge of the Bay of Bengal",
        ],
      },
      {
        day: "Day 2",
        title: "Katka → Kochikhali → Dimerchor",
        activities: [
          "Early morning canal cruising by country boat – enjoy forest silence",
          "Trek through Tiger Tree bushes and deer grazing fields",
          "Walk 2.5 km to Jamtola Sea Beach – where the Sundarbans meets the Bay of Bengal",
          "Visit Katka Office Par – walk through mud, breathing roots & dense Goran forest",
          "Spot deer herds up close along the trail",
          "Ship sails to Kochikhali – walk through the eerie grasslands known as 'Tiger's Dining Room'",
          "Ship sails to Dimerchor – relax at the beautiful sea beach until evening",
          "Return to ship, sail toward Koromjol",
        ],
      },
      {
        day: "Day 3",
        title: "Koromjol → Return",
        activities: [
          "Visit Koromjol – Bangladesh's only saltwater crocodile breeding centre",
          "See crocodiles of all sizes, endangered turtles, and playful monkeys",
          "Feed deer by hand – a unique experience",
          "Return to ship, sail back to Khulna / Mongla",
          "Lunch on board during return journey",
        ],
      },
    ],
    menu: [
      {
        day: "Day 1",
        meals: [
          { name: "Breakfast", items: "Bread, Paratha, Vegetables, Dal, Egg Omelette, Butter, Jelly, Honey, Banana, Dessert (Suji/Payesh), Tea-Coffee" },
          { name: "Snacks", items: "Cake, Biscuit, Tea-Coffee" },
          { name: "Lunch", items: "White Rice, Parshe Fish, Chicken, Bharta, Dal, Salad, Dessert, Tea-Coffee" },
          { name: "Evening Snacks", items: "Thai Soup, French Fries, Tea-Coffee" },
          { name: "Dinner", items: "Egg Fried Rice, Chicken Fry, Chinese Vegetables, Shrimp Malai Curry, Cashew Nut Salad, Soft Drinks" },
        ],
      },
      {
        day: "Day 2",
        meals: [
          { name: "Morning Snacks", items: "Dry Cake/Biscuit, Tea-Coffee" },
          { name: "Breakfast", items: "Khichuri, Egg Malai Curry, Sea Fish Fry, Eggplant Fry, Pickle, Tea-Coffee" },
          { name: "Snacks", items: "Guava, Lemon Juice, Tea-Coffee" },
          { name: "Lunch", items: "White Rice, Koral Fish, Duck Bhuna, Vegetables, Bharta, Dal, Salad, Firni, Tea-Coffee" },
          { name: "Evening Snacks", items: "Noodles, Tea-Coffee" },
          { name: "Dinner", items: "Egg Fried Rice, Paratha, Chicken Bar-B-Q, Fish Bar-B-Q, Chinese Vegetables, Cholar Dal Bhuna, Russian Salad, Soft Drinks" },
        ],
      },
      {
        day: "Day 3",
        meals: [
          { name: "Breakfast", items: "White Rice, Various Bharta, Egg Omelette, Ghee, Dal, Salad, Tea-Coffee" },
          { name: "Snacks", items: "Orange, Biscuit, Tea-Coffee" },
          { name: "Lunch", items: "Plain Polao, Mutton Rezala, Sea Fish, Egg Malai Curry, Muri Ghonto, Salad, Doi" },
        ],
      },
    ],
    safetyInfo: [
      "Two armed forest guards from Bangladesh Forest Department will accompany you at all times",
      "Constant communication with Forest, Coast Guard & Navy via VSF for weather and emergencies",
      "All necessary safety measures will be taken based on weather and other conditions",
    ],
    travelTips: [
      "Avoid bright-colored clothes – wear light, loose, full-sleeve clothing",
      "Do not use any perfume or strong scents",
      "Bring sandals/sneakers with back strap that can get wet – no shoes or high heels",
      "Keep luggage size small for adventure tours",
      "Do not speak loudly in the forest – trek silently unless necessary",
      "Do not waste drinking water (river water is saline)",
      "Walk in an orderly manner – never separate from the group",
      "Do not touch or break tree branches, leaves, or vines",
      "Do not litter – no polythene or packaging waste in the forest",
      "Show respect to local and other tourist groups",
      "Follow guide and security guard instructions at all times",
    ],
    thingsToCarry: [
      "Regular Medicine",
      "Sneaker shoes for walking",
      "Hat/Cap for sun protection",
      "Sunscreen lotion & insect spray",
      "Binoculars, Flashlight, Camera",
      "Towel, Bath Soap/Shampoo, Toothpaste & Toothbrush",
    ],
    packageIncludes: [
      "All meals during the trip",
      "All activities inside the forest as per itinerary",
      "Mineral water (Jar) for drinking during the trip",
      "Forest fees & permission",
      "Armed forest guard from the forest department",
      "Experienced guide during the trip",
    ],
    packages: [
      {
        id: "utshab-1",
        name: "Sundarban Explorer",
        route: "Khulna – Sundarban – Khulna",
        price: 22000,
        inclusions: ["All Meals (3 Days)", "AC Cabin", "Forest Guide", "Armed Guard", "Forest Fees", "Mineral Water"],
        seatType: "AC",
      },
    ],
    seatPlan: makeSeatPlan(),
    featured: true,
  },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Rahim Ahmed", text: "Best cruise experience in Bangladesh! The Sundarban tour was absolutely magical. The crew was professional and the food was amazing.", rating: 5, avatar: "RA" },
  { id: "2", name: "Fatima Khatun", text: "We had an unforgettable family trip. The kids loved the river cruise and the sunset views were breathtaking.", rating: 5, avatar: "FK" },
  { id: "3", name: "Kamal Hossain", text: "Very well organized tour. The booking through WhatsApp was super convenient. Will definitely book again!", rating: 4, avatar: "KH" },
  { id: "4", name: "Nasreen Akter", text: "The MV Utshab cruise exceeded all our expectations. Luxurious cabins and incredible food!", rating: 5, avatar: "NA" },
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
  { id: "BK001", name: "Abdul Karim", phone: "01712345678", cruiseName: "MV UTSHAB", travelDate: "2026-03-15", persons: 4, packageName: "Sundarban Explorer", seatType: "AC", createdAt: "2026-03-01" },
  { id: "BK002", name: "Reshma Begum", phone: "01898765432", cruiseName: "MV UTSHAB", travelDate: "2026-03-20", persons: 2, packageName: "Sundarban Explorer", seatType: "AC", createdAt: "2026-03-02" },
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
