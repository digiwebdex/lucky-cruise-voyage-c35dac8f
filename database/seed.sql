-- ============================================
-- Lucky Cruise Voyage — Seed Data
-- Inserts default settings, pages, SEO, categories
-- Cruise data should be imported separately via the app
-- ============================================

-- Site Settings
INSERT INTO site_settings (id, site_name, phone, whatsapp, email, address, address_bn, facebook_url, youtube_url, instagram_url, footer_text, footer_text_bn, google_maps_url, whatsapp_float_enabled, language_switcher_enabled)
VALUES (
    1,
    'Lucky Tours & Travels',
    '01711871072',
    '8801711871072',
    'luckytoursandtravels70@gmail.com',
    'Dhaka, Bangladesh',
    'ঢাকা, বাংলাদেশ',
    'https://www.facebook.com/Luckytoursandtravels',
    'https://www.youtube.com/@luckytoursandtravels70',
    '',
    '© Lucky Tours & Travels. All rights reserved.',
    '© লাকি ট্যুরস অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.123456!2d89.5403!3d22.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9015a2ed1e07%3A0xc1af89a67e2e1c4a!2sLucky%20Tours%20And%20Travels!5e0!3m2!1sen!2sbd!4v1710000000000',
    TRUE,
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- CMS Pages
INSERT INTO cms_pages (id, slug, title, hero_text, body) VALUES
    ('home', 'home', 'Home', 'Explore the Sundarbans', ''),
    ('about', 'about', 'About Us', 'Our Story', ''),
    ('contact', 'contact', 'Contact', 'Get in Touch', ''),
    ('gallery', 'gallery', 'Gallery', 'Photo Gallery', ''),
    ('cruises', 'cruises', 'Our Cruises', 'Browse Cruises', ''),
    ('packages', 'packages', 'Packages', 'Tour Packages', '')
ON CONFLICT (id) DO NOTHING;

-- SEO Entries
INSERT INTO seo_entries (page_slug, title, description, keywords) VALUES
    ('home', 'Lucky Tours & Travels — Sundarban Cruise', 'Premium Sundarban cruise tours from Khulna', 'sundarban, cruise, tour, bangladesh'),
    ('about', 'About Us — Lucky Tours', '15+ years of Sundarban touring experience', 'about, lucky tours, sundarban'),
    ('cruises', 'Our Cruises — Lucky Tours', 'Browse our fleet of luxury cruise ships', 'cruise, ships, sundarban tour'),
    ('contact', 'Contact — Lucky Tours', 'Get in touch for bookings and inquiries', 'contact, booking, sundarban tour'),
    ('gallery', 'Gallery — Lucky Tours', 'Photos from our Sundarban cruises', 'gallery, photos, sundarban'),
    ('packages', 'Packages — Lucky Tours', 'Tour packages for every budget', 'packages, tour, sundarban')
ON CONFLICT (page_slug) DO NOTHING;

-- Package Categories
INSERT INTO package_categories (id, name, name_bn) VALUES
    ('cat-sundarban', 'Sundarban Tour', 'সুন্দরবন ট্যুর'),
    ('cat-day', 'Day Cruise', 'ডে ক্রুজ'),
    ('cat-corporate', 'Corporate Tour', 'কর্পোরেট ট্যুর'),
    ('cat-honeymoon', 'Honeymoon Package', 'হানিমুন প্যাকেজ')
ON CONFLICT (id) DO NOTHING;

-- Default Admin User (password: admin123 — CHANGE IN PRODUCTION!)
INSERT INTO admin_users (username, password_hash, display_name, role)
VALUES ('admin', crypt('admin123', gen_salt('bf')), 'Administrator', 'admin')
ON CONFLICT (username) DO NOTHING;
