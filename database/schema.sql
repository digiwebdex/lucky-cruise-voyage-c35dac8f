-- ============================================
-- Lucky Cruise Voyage — PostgreSQL Schema
-- Generated: 2026-03-16
-- Database: lucky_cruise_db
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE cruise_destination AS ENUM ('sundarban', 'tanguar-haor');
CREATE TYPE sundarban_sub_category AS ENUM ('premium-luxury', 'ac-attach-bath', 'non-ac-attach-bath', 'non-ac-non-attach-bath');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('new', 'read', 'replied');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE review_target_type AS ENUM ('cruise', 'blog');
CREATE TYPE blog_category AS ENUM ('sundarban', 'tanguar-haor');

-- ============================================
-- TABLES
-- ============================================

-- 1. Cruises
CREATE TABLE cruises (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    route VARCHAR(500),
    duration VARCHAR(100),
    capacity VARCHAR(50),
    cabins VARCHAR(50),
    price INTEGER DEFAULT 0,
    old_price INTEGER,
    price_label VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    destination cruise_destination NOT NULL DEFAULT 'sundarban',
    sub_category sundarban_sub_category,
    images JSONB DEFAULT '[]'::jsonb,
    featured_image_index INTEGER DEFAULT 0,
    facilities JSONB DEFAULT '[]'::jsonb,
    tourist_spots JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    menu JSONB DEFAULT '[]'::jsonb,
    safety_info JSONB DEFAULT '[]'::jsonb,
    travel_tips JSONB DEFAULT '[]'::jsonb,
    things_to_carry JSONB DEFAULT '[]'::jsonb,
    additional_costs JSONB DEFAULT '[]'::jsonb,
    package_includes JSONB DEFAULT '[]'::jsonb,
    seat_plan JSONB DEFAULT '[]'::jsonb,
    seat_plan_image TEXT,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Packages (cruise sub-items)
CREATE TABLE packages (
    id VARCHAR(100) PRIMARY KEY,
    cruise_id VARCHAR(100) NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price INTEGER DEFAULT 0,
    old_price INTEGER,
    adult_price INTEGER DEFAULT 0,
    adult_old_price INTEGER,
    child_price INTEGER DEFAULT 0,
    child_old_price INTEGER,
    duration VARCHAR(100),
    is_offer BOOLEAN DEFAULT FALSE,
    category_id VARCHAR(100),
    thumbnail TEXT,
    trip_dates JSONB DEFAULT '[]'::jsonb,
    offer_day_label VARCHAR(255),
    offer_date_label VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Site Settings (singleton)
CREATE TABLE site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    site_name VARCHAR(255) DEFAULT 'Lucky Tours & Travels',
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    address_bn TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    instagram_url TEXT,
    footer_text TEXT,
    footer_text_bn TEXT,
    google_maps_url TEXT,
    whatsapp_float_enabled BOOLEAN DEFAULT TRUE,
    language_switcher_enabled BOOLEAN DEFAULT TRUE,
    hero_images JSONB DEFAULT '[]'::jsonb,
    featured_cruise_ids JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Homepage Content (singleton)
CREATE TABLE homepage_content (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CMS Pages
CREATE TABLE cms_pages (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    hero_text TEXT,
    body TEXT,
    sections JSONB DEFAULT '[]'::jsonb,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    og_image TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SEO Entries
CREATE TABLE seo_entries (
    page_slug VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    keywords TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Testimonials
CREATE TABLE testimonials (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'testimonial-' || gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    text TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Team Members
CREATE TABLE team_members (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'team-' || gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Offers
CREATE TABLE offers (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'offer-' || gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    poster_image TEXT,
    linked_cruise_id VARCHAR(100) REFERENCES cruises(id) ON DELETE SET NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Blog Posts
CREATE TABLE blog_posts (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'blog-' || gen_random_uuid()::text,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    category blog_category NOT NULL DEFAULT 'sundarban',
    excerpt TEXT,
    body TEXT,
    cover_image TEXT,
    youtube_url TEXT,
    author VARCHAR(255) DEFAULT 'Lucky Tours',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN DEFAULT FALSE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Customer Reviews
CREATE TABLE customer_reviews (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'review-' || extract(epoch from now())::text,
    target_type review_target_type NOT NULL,
    target_id VARCHAR(100) NOT NULL,
    target_name VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    status review_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Promo Ads
CREATE TABLE promo_ads (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'promo-' || gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    date_label VARCHAR(255),
    image TEXT,
    linked_cruise_id VARCHAR(100) REFERENCES cruises(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Contact Inquiries
CREATE TABLE contact_inquiries (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'contact-' || extract(epoch from now())::text,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    message TEXT,
    status inquiry_status DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Package Categories
CREATE TABLE package_categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Ship Availability
CREATE TABLE ship_availability (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'avail-' || gen_random_uuid()::text,
    cruise_id VARCHAR(100) NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
    package_id VARCHAR(100),
    available_dates JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Bookings
CREATE TABLE bookings (
    id VARCHAR(100) PRIMARY KEY DEFAULT 'booking-' || extract(epoch from now())::text,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    cruise_id VARCHAR(100) REFERENCES cruises(id) ON DELETE SET NULL,
    cruise_name VARCHAR(255),
    package_name VARCHAR(255),
    category_id VARCHAR(100),
    travel_date DATE,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    notes TEXT,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Admin Users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_packages_cruise_id ON packages(cruise_id);
CREATE INDEX idx_cruises_destination ON cruises(destination);
CREATE INDEX idx_cruises_featured ON cruises(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_reviews_target ON customer_reviews(target_type, target_id);
CREATE INDEX idx_reviews_status ON customer_reviews(status);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_cruise ON bookings(cruise_id);
CREATE INDEX idx_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_offers_active ON offers(is_active);
CREATE INDEX idx_promo_active ON promo_ads(is_active);
CREATE INDEX idx_availability_cruise ON ship_availability(cruise_id);

-- ============================================
-- TRIGGERS: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_cruises_updated BEFORE UPDATE ON cruises FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_homepage_updated BEFORE UPDATE ON homepage_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_pages_updated BEFORE UPDATE ON cms_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_seo_updated BEFORE UPDATE ON seo_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
