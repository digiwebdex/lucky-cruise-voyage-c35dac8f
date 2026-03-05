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
import utshab11 from "@/assets/cruises/utshab-11.jpeg";
import utshab12 from "@/assets/cruises/utshab-12.jpeg";
import utshab13 from "@/assets/cruises/utshab-13.jpeg";
import utshab14 from "@/assets/cruises/utshab-14.jpeg";
import utshab15 from "@/assets/cruises/utshab-15.jpeg";
import utshab16 from "@/assets/cruises/utshab-16.jpeg";
import utshab17 from "@/assets/cruises/utshab-17.jpeg";
import utshab18 from "@/assets/cruises/utshab-18.jpeg";
import utshab19 from "@/assets/cruises/utshab-19.jpeg";
import utshab20 from "@/assets/cruises/utshab-20.jpeg";
import utshab21 from "@/assets/cruises/utshab-21.jpeg";
import utshab22 from "@/assets/cruises/utshab-22.jpeg";
import utshab23 from "@/assets/cruises/utshab-23.jpeg";
import utshab24 from "@/assets/cruises/utshab-24.jpeg";
import utshab25 from "@/assets/cruises/utshab-25.jpeg";
import utshab26 from "@/assets/cruises/utshab-26.jpeg";
import silver1 from "@/assets/cruises/silver-1.jpeg";
import silver2 from "@/assets/cruises/silver-2.jpeg";
import silver3 from "@/assets/cruises/silver-3.jpeg";
import silver4 from "@/assets/cruises/silver-4.jpeg";
import silver5 from "@/assets/cruises/silver-5.jpeg";
import silver6 from "@/assets/cruises/silver-6.jpeg";
import silver7 from "@/assets/cruises/silver-7.jpeg";
import silver8 from "@/assets/cruises/silver-8.jpeg";
import silver9 from "@/assets/cruises/silver-9.jpeg";
import silver10 from "@/assets/cruises/silver-10.jpeg";
import silver11 from "@/assets/cruises/silver-11.jpeg";
import silver12 from "@/assets/cruises/silver-12.jpeg";
import pearl1 from "@/assets/cruises/pearl-1.jpeg";
import pearl2 from "@/assets/cruises/pearl-2.jpeg";
import pearl3 from "@/assets/cruises/pearl-3.jpeg";
import pearl4 from "@/assets/cruises/pearl-4.jpeg";
import pearl5 from "@/assets/cruises/pearl-5.jpeg";
import pearl6 from "@/assets/cruises/pearl-6.jpeg";
import pearl7 from "@/assets/cruises/pearl-7.jpeg";
import pearl8 from "@/assets/cruises/pearl-8.jpeg";
import pearl9 from "@/assets/cruises/pearl-9.jpeg";
import pearl10 from "@/assets/cruises/pearl-10.jpeg";
import utshabSeatplan from "@/assets/cruises/utshab-seatplan.jpeg";
import silverSeatplan from "@/assets/cruises/silver-seatplan.jpeg";

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
  seatPlanImage?: string;
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
  capacity: number;
  rows: CabinRow[];
}

export interface CabinRow {
  label: string;
  cabins: Cabin[];
}

export interface Cabin {
  id: string;
  type: 'VIP Couple' | 'VIP Family' | 'Twin' | 'Single' | 'Bunk';
  persons: number;
  available: boolean;
  bedType: string;
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
    name: "Deck 1 – VIP Cabins",
    capacity: 28,
    rows: [
      { label: "Port Side", cabins: [
        { id: "101", type: "VIP Family", persons: 3, available: true, bedType: "Family Bed" },
        { id: "102", type: "VIP Family", persons: 3, available: true, bedType: "Family Bed" },
        { id: "103", type: "VIP Family", persons: 3, available: false, bedType: "Family Bed" },
        { id: "104", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "105", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "106", type: "VIP Family", persons: 3, available: true, bedType: "Family Bed" },
        { id: "107", type: "VIP Family", persons: 3, available: true, bedType: "Family Bed" },
        { id: "108", type: "VIP Family", persons: 3, available: true, bedType: "Family Bed" },
        { id: "109", type: "VIP Couple", persons: 2, available: false, bedType: "Couple Bed" },
        { id: "110", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "111", type: "Bunk", persons: 2, available: true, bedType: "2 Bed Bunk" },
      ]},
    ],
  },
  {
    name: "Deck 2 – Premium Cabins",
    capacity: 22,
    rows: [
      { label: "Port Side", cabins: [
        { id: "201", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "202", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "203", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "204", type: "Single", persons: 1, available: true, bedType: "Single Bed" },
        { id: "205", type: "Twin", persons: 2, available: false, bedType: "Twin Bed" },
        { id: "206", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "207", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "208", type: "VIP Couple", persons: 2, available: false, bedType: "Couple Bed" },
        { id: "209", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "210", type: "Single", persons: 1, available: true, bedType: "Single Bed" },
        { id: "211", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "212", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
      ]},
    ],
  },
];

const makeSilverSeatPlan = (): Deck[] => [
  {
    name: "Level 1 – Triple & Family Cabins",
    capacity: 22,
    rows: [
      { label: "Port Side", cabins: [
        { id: "S101", type: "VIP Family", persons: 4, available: true, bedType: "Family Quad Room" },
        { id: "S103", type: "VIP Family", persons: 3, available: true, bedType: "Triple Bed" },
        { id: "S105", type: "VIP Family", persons: 3, available: true, bedType: "Triple Bed" },
        { id: "S107", type: "VIP Family", persons: 3, available: true, bedType: "Triple Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "S102", type: "VIP Family", persons: 3, available: true, bedType: "Triple Bed" },
        { id: "S104", type: "VIP Family", persons: 3, available: false, bedType: "Triple Bed" },
        { id: "S106", type: "VIP Couple", persons: 2, available: true, bedType: "Owners Room" },
      ]},
    ],
  },
  {
    name: "Level 2 – Couple & Twin Cabins",
    capacity: 20,
    rows: [
      { label: "Port Side", cabins: [
        { id: "S202", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "S204", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "S206", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "S208", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "S210", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "S201", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "S203", type: "VIP Couple", persons: 2, available: false, bedType: "Couple Bed" },
        { id: "S205", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "S207", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "S209", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
      ]},
    ],
  },
  {
    name: "Level 3 – Deck & Food Court",
    capacity: 4,
    rows: [
      { label: "Deck Cabins", cabins: [
        { id: "SS1", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "SS2", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
      ]},
    ],
  },
];

const makePearlSeatPlan = (): Deck[] => [
  {
    name: "Under Deck – Executive Lounge",
    capacity: 20,
    rows: [
      { label: "Meeting & Lounge", cabins: [
        { id: "UG1", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG2", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG3", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG4", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG5", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG6", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG7", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG8", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG9", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
        { id: "UG10", type: "VIP Couple", persons: 2, available: true, bedType: "Lounge Seating" },
      ]},
    ],
  },
  {
    name: "Deck 1 – Deluxe & Family Cabins",
    capacity: 24,
    rows: [
      { label: "Port Side", cabins: [
        { id: "P101", type: "VIP Family", persons: 3, available: true, bedType: "Family Room" },
        { id: "P102", type: "VIP Family", persons: 3, available: true, bedType: "Family Room" },
        { id: "P103", type: "VIP Couple", persons: 2, available: true, bedType: "Deluxe Couple" },
        { id: "P104", type: "VIP Couple", persons: 2, available: true, bedType: "Super Deluxe Couple" },
        { id: "P105", type: "VIP Couple", persons: 2, available: true, bedType: "Deluxe Couple" },
        { id: "P106", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "P107", type: "VIP Family", persons: 3, available: true, bedType: "Family Room" },
        { id: "P108", type: "VIP Couple", persons: 2, available: false, bedType: "Deluxe Couple" },
        { id: "P109", type: "VIP Couple", persons: 2, available: true, bedType: "Super Deluxe Couple" },
        { id: "P110", type: "VIP Couple", persons: 2, available: true, bedType: "Deluxe Couple" },
        { id: "P111", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "P112", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
      ]},
    ],
  },
  {
    name: "Deck 2 – Standard Cabins",
    capacity: 16,
    rows: [
      { label: "Port Side", cabins: [
        { id: "P201", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "P202", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "P203", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "P204", type: "Single", persons: 1, available: true, bedType: "Single Bed" },
      ]},
      { label: "Starboard", cabins: [
        { id: "P205", type: "VIP Couple", persons: 2, available: true, bedType: "Couple Bed" },
        { id: "P206", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "P207", type: "Twin", persons: 2, available: true, bedType: "Twin Bed" },
        { id: "P208", type: "Single", persons: 1, available: true, bedType: "Single Bed" },
      ]},
    ],
  },
  {
    name: "Sky Deck – Premier Cabin",
    capacity: 2,
    rows: [
      { label: "Panoramic View", cabins: [
        { id: "SK1", type: "VIP Couple", persons: 2, available: true, bedType: "Premier Suite 360°" },
      ]},
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
      utshab11, utshab12, utshab13, utshab14, utshab15,
      utshab16, utshab17, utshab18, utshab19, utshab20,
      utshab21, utshab22, utshab23, utshab24, utshab25, utshab26,
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
    seatPlanImage: utshabSeatplan,
    featured: true,
  },
  {
    id: "mv-silver-cruise",
    name: "MV SILVER CRUISE",
    subtitle: "AC Cruise Ship – Khulna",
    description: "MV Silver Cruise has been built with enclosed and spacious open air observation decks, keeping in mind your entertainment and adventurous needs. Experience the breathtaking beauty of the Sundarbans — the world's largest mangrove forest — on this 19-cabin AC cruise ship with a capacity of 46 tourists.",
    images: [
      silver1, silver2, silver3, silver4, silver5,
      silver6, silver7, silver8, silver9, silver10,
      silver11, silver12,
    ],
    price: 22000,
    priceLabel: "Per Person (Bangladeshi)",
    route: "Khulna – Sundarban – Khulna",
    duration: "3 Days / 2 Nights",
    capacity: "46 Tourists",
    cabins: "19 Cabins",
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
        id: "silver-1",
        name: "Sundarban Explorer",
        route: "Khulna – Sundarban – Khulna",
        price: 22000,
        inclusions: ["All Meals (3 Days)", "AC Cabin", "Forest Guide", "Armed Guard", "Forest Fees", "Mineral Water"],
        seatType: "AC",
      },
    ],
    seatPlan: makeSilverSeatPlan(),
    seatPlanImage: silverSeatplan,
    featured: true,
  },
  {
    id: "mv-sea-pearl",
    name: "MV Sea Pearl",
    subtitle: "4-Deck Luxury Cruiser – Khulna",
    description: "MV Sea Pearl is a magnificent 4-deck luxury cruiser featuring an executive meeting lounge, fully air-conditioned deluxe & super deluxe cabins, and a stunning open-air panoramic sky deck. With capacity for 50 tourists across 22 cabins, experience unparalleled comfort while exploring the magnificent Sundarbans.",
    images: [
      pearl1, pearl2, pearl3, pearl4, pearl5,
      pearl6, pearl7, pearl8, pearl9, pearl10,
    ],
    price: 22000,
    priceLabel: "Per Person (Bangladeshi)",
    route: "Khulna – Sundarban – Khulna",
    duration: "3 Days / 2 Nights",
    capacity: "50 Tourists",
    cabins: "22 Cabins",
    facilities: [
      "Fully Air-Conditioned",
      "Deluxe & Super Deluxe Cabins",
      "With / Without Attached Bathroom",
      "Restaurant with Buffet Station",
      "Conference Room",
      "Movie Theatre",
      "Executive Meeting Lounge (20 persons)",
      "360° Panoramic Sky Deck",
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
      "Avoid bright colored clothing – wear light, loose full-sleeve clothing instead",
      "Do not use any perfume or fragrance",
      "Wear waterproof sandals/sneakers with back straps – no shoes or high heels",
      "Pack light luggage for the adventure tour",
      "Maintain silence in the forest and avoid unnecessary talking during tracking",
      "Conserve water – river water is salty, and drinking water is limited",
      "Walk in an organized manner and never stray from the group",
      "Do not touch tree branches, leaves, or vines",
      "Do not litter – protect the environment from plastic and packaging waste",
      "Respect local communities and fellow travelers",
      "Follow your guide and security personnel's instructions at all times",
    ],
    thingsToCarry: [
      "Regular Medicines & First Aid Kit",
      "Sneaker Shoes for Walking",
      "Hat / Cap for Sun Protection",
      "Sun Protection Lotion & Insect Spray",
      "Binoculars & Flash Light",
      "Camera",
      "Towel, Bath Soap & Shampoo",
      "Toothpaste & Tooth Brush",
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
        id: "pearl-1",
        name: "Sundarban Explorer",
        route: "Khulna – Sundarban – Khulna",
        price: 22000,
        inclusions: ["All Meals (3 Days)", "AC Cabin", "Forest Guide", "Armed Guard", "Forest Fees", "Mineral Water"],
        seatType: "AC",
      },
    ],
    seatPlan: makePearlSeatPlan(),
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
  utshabSeatplan,
  silverSeatplan,
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
