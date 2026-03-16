// ============================================
// Lucky Cruise Voyage — Backend API Server
// Node.js + Express + PostgreSQL
// ============================================

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

// ===== Database Connection =====
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'lucky_cruise_db',
  user: process.env.DB_USER || 'lucky_user',
  password: process.env.DB_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ===== Middleware =====
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

// ===== Auth Middleware =====
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ===== Health Check =====
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// ===== AUTH =====
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1 AND is_active = TRUE', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    await pool.query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username, displayName: user.display_name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ===== CRUISES =====
app.get('/api/cruises', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cruises ORDER BY created_at DESC');
    const cruises = result.rows;
    // Attach packages
    for (const c of cruises) {
      const pkgs = await pool.query('SELECT * FROM packages WHERE cruise_id = $1 ORDER BY created_at', [c.id]);
      c.packages = pkgs.rows;
    }
    res.json(cruises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cruises/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cruises WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const cruise = result.rows[0];
    const pkgs = await pool.query('SELECT * FROM packages WHERE cruise_id = $1', [cruise.id]);
    cruise.packages = pkgs.rows;
    res.json(cruise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/cruises', authMiddleware, async (req, res) => {
  const cruises = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM packages');
    await client.query('DELETE FROM cruises');
    for (const c of cruises) {
      await client.query(
        `INSERT INTO cruises (id, name, subtitle, description, route, duration, capacity, cabins, price, old_price, price_label, featured, destination, sub_category, images, featured_image_index, facilities, tourist_spots, itinerary, menu, safety_info, travel_tips, things_to_carry, additional_costs, package_includes, seat_plan, seat_plan_image, seo_title, seo_description, seo_keywords, og_image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31)`,
        [c.id, c.name, c.subtitle, c.description, c.route, c.duration, c.capacity, c.cabins, c.price, c.oldPrice, c.priceLabel, c.featured, c.destination, c.subCategory, JSON.stringify(c.images), c.featuredImageIndex, JSON.stringify(c.facilities), JSON.stringify(c.touristSpots), JSON.stringify(c.itinerary), JSON.stringify(c.menu), JSON.stringify(c.safetyInfo), JSON.stringify(c.travelTips), JSON.stringify(c.thingsToCarry), JSON.stringify(c.additionalCosts), JSON.stringify(c.packageIncludes), JSON.stringify(c.seatPlan), c.seatPlanImage, c.seoTitle, c.seoDescription, c.seoKeywords, c.ogImage]
      );
      for (const p of (c.packages || [])) {
        await client.query(
          `INSERT INTO packages (id, cruise_id, name, price, old_price, adult_price, adult_old_price, child_price, child_old_price, duration, is_offer, category_id, thumbnail, trip_dates, offer_day_label, offer_date_label)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
          [p.id, c.id, p.name, p.price, p.oldPrice, p.adultPrice, p.adultOldPrice, p.childPrice, p.childOldPrice, p.duration, p.isOffer, p.categoryId, p.thumbnail, JSON.stringify(p.tripDates), p.offerDayLabel, p.offerDateLabel]
        );
      }
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== SETTINGS =====
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', authMiddleware, async (req, res) => {
  const s = req.body;
  try {
    await pool.query(
      `INSERT INTO site_settings (id, site_name, phone, whatsapp, email, address, address_bn, facebook_url, youtube_url, instagram_url, footer_text, footer_text_bn, google_maps_url, whatsapp_float_enabled, language_switcher_enabled, hero_images, featured_cruise_ids)
       VALUES (1,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       ON CONFLICT (id) DO UPDATE SET site_name=$1, phone=$2, whatsapp=$3, email=$4, address=$5, address_bn=$6, facebook_url=$7, youtube_url=$8, instagram_url=$9, footer_text=$10, footer_text_bn=$11, google_maps_url=$12, whatsapp_float_enabled=$13, language_switcher_enabled=$14, hero_images=$15, featured_cruise_ids=$16`,
      [s.siteName, s.phone, s.whatsapp, s.email, s.address, s.addressBn, s.facebookUrl, s.youtubeUrl, s.instagramUrl, s.footerText, s.footerTextBn, s.googleMapsUrl, s.whatsappFloatEnabled, s.languageSwitcherEnabled, JSON.stringify(s.heroImages), JSON.stringify(s.featuredCruiseIds)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== HOMEPAGE CONTENT =====
app.get('/api/homepage-content', async (req, res) => {
  try {
    const result = await pool.query('SELECT content FROM homepage_content WHERE id = 1');
    res.json(result.rows[0]?.content || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/homepage-content', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO homepage_content (id, content) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET content = $1`,
      [JSON.stringify(req.body)]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== GENERIC CRUD FACTORY =====
function crudRoutes(tableName, entityName, idPrefix) {
  // GET all
  app.get(`/api/${entityName}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET by id
  app.get(`/api/${entityName}/:id`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT (replace all)
  app.put(`/api/${entityName}`, authMiddleware, async (req, res) => {
    const items = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`DELETE FROM ${tableName}`);
      for (const item of items) {
        const keys = Object.keys(item);
        const values = Object.values(item);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        await client.query(`INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`, values);
      }
      await client.query('COMMIT');
      res.json({ success: true });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  });

  // POST (add one)
  app.post(`/api/${entityName}`, authMiddleware, async (req, res) => {
    const item = req.body;
    if (!item.id) item.id = `${idPrefix}-${Date.now()}`;
    try {
      const keys = Object.keys(item);
      const values = Object.values(item);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      await pool.query(`INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`, values);
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${entityName}/:id`, authMiddleware, async (req, res) => {
    try {
      await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

// Register CRUD routes
crudRoutes('blog_posts', 'blogs', 'blog');
crudRoutes('testimonials', 'testimonials', 'testimonial');
crudRoutes('team_members', 'team', 'team');
crudRoutes('offers', 'offers', 'offer');
crudRoutes('customer_reviews', 'reviews', 'review');
crudRoutes('promo_ads', 'promo-ads', 'promo');
crudRoutes('contact_inquiries', 'inquiries', 'contact');
crudRoutes('package_categories', 'categories', 'cat');
crudRoutes('ship_availability', 'availability', 'avail');
crudRoutes('bookings', 'bookings', 'booking');

// ===== SEO =====
app.get('/api/seo', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seo_entries');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/seo', authMiddleware, async (req, res) => {
  const entries = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const e of entries) {
      await client.query(
        `INSERT INTO seo_entries (page_slug, title, description, keywords) VALUES ($1,$2,$3,$4)
         ON CONFLICT (page_slug) DO UPDATE SET title=$2, description=$3, keywords=$4`,
        [e.pageSlug || e.page_slug, e.title, e.description, e.keywords]
      );
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== CMS PAGES =====
app.get('/api/pages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cms_pages ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pages', authMiddleware, async (req, res) => {
  const pages = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const p of pages) {
      await client.query(
        `INSERT INTO cms_pages (id, slug, title, hero_text, body, sections, seo_title, seo_description, seo_keywords, og_image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (id) DO UPDATE SET slug=$2, title=$3, hero_text=$4, body=$5, sections=$6, seo_title=$7, seo_description=$8, seo_keywords=$9, og_image=$10`,
        [p.id, p.slug, p.title, p.heroText || p.hero_text, p.body, JSON.stringify(p.sections), p.seoTitle || p.seo_title, p.seoDescription || p.seo_description, p.seoKeywords || p.seo_keywords, p.ogImage || p.og_image]
      );
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== FILE UPLOAD =====
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `${process.env.BACKEND_URL || `http://localhost:${PORT}`}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// ===== DASHBOARD STATS =====
app.get('/api/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const [cruises, packages, offers, bookings, pendingBookings, reviews, blogs, team, testimonials, inquiries, promos] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM cruises'),
      pool.query('SELECT COUNT(*) FROM packages'),
      pool.query("SELECT COUNT(*) FROM offers WHERE is_active = TRUE"),
      pool.query('SELECT COUNT(*) FROM bookings'),
      pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'"),
      pool.query('SELECT COUNT(*) FROM customer_reviews'),
      pool.query('SELECT COUNT(*) FROM blog_posts'),
      pool.query('SELECT COUNT(*) FROM team_members'),
      pool.query('SELECT COUNT(*) FROM testimonials'),
      pool.query("SELECT COUNT(*) FROM contact_inquiries WHERE status = 'new'"),
      pool.query('SELECT COUNT(*) FROM promo_ads'),
    ]);
    res.json({
      cruises: parseInt(cruises.rows[0].count),
      packages: parseInt(packages.rows[0].count),
      activeOffers: parseInt(offers.rows[0].count),
      totalBookings: parseInt(bookings.rows[0].count),
      pendingBookings: parseInt(pendingBookings.rows[0].count),
      totalReviews: parseInt(reviews.rows[0].count),
      blogPosts: parseInt(blogs.rows[0].count),
      teamMembers: parseInt(team.rows[0].count),
      testimonials: parseInt(testimonials.rows[0].count),
      newInquiries: parseInt(inquiries.rows[0].count),
      promoAds: parseInt(promos.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Lucky Cruise API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
