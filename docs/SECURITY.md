# 🔒 Security Guide — Lucky Cruise Voyage

---

## Current Security Status

| Area | Status | Risk Level | Details |
|---|---|---|---|
| Admin Authentication | ⚠️ Client-side only | 🔴 **HIGH** | localStorage-based, easily bypassed |
| Data Storage | ⚠️ localStorage | 🟡 MEDIUM | No encryption, user-modifiable |
| Input Validation | ⚠️ Client-side only | 🟡 MEDIUM | Zod validation, no server-side |
| HTTPS | ✅ Enabled | 🟢 LOW | Auto-provided by Lovable hosting |
| XSS Protection | ✅ React auto-escapes | 🟢 LOW | JSX auto-escapes by default |
| CSRF | N/A | — | No backend API calls |
| SQL Injection | N/A | — | No database (localStorage only) |
| File Upload | N/A | — | No file upload (URL references only) |

---

## Known Vulnerabilities

### 1. Admin Login is Client-Side (CRITICAL)
**Risk**: Anyone can access the admin panel by manipulating localStorage or navigating directly to `/admin`.

**Current behavior**: Login checks hardcoded credentials in the browser.

**Fix**: Migrate to Lovable Cloud with Supabase Auth + RLS policies.

### 2. No Server-Side Validation (HIGH)
**Risk**: All data is client-modifiable via browser devtools → localStorage.

**Fix**: Move data to PostgreSQL with Row-Level Security (RLS) policies.

### 3. localStorage Data Loss (MEDIUM)
**Risk**: Data is lost when users clear browser cache/storage or switch browsers.

**Fix**: Migrate to server-side database (Lovable Cloud / PostgreSQL).

### 4. No Rate Limiting (MEDIUM)
**Risk**: Contact form and review submission have no rate limiting.

**Fix**: Add server-side rate limiting via Edge Functions.

### 5. No CAPTCHA (LOW)
**Risk**: Bots can submit contact forms and reviews.

**Fix**: Add reCAPTCHA or hCaptcha to public forms.

---

## Production Security Checklist

### Phase 1: Authentication & Authorization (Critical)
- [ ] Enable Lovable Cloud for server-side infrastructure
- [ ] Implement Supabase Auth (email + password, or social login)
- [ ] Create `user_roles` table (separate from profiles):
  ```sql
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  CREATE TABLE public.user_roles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      role app_role NOT NULL,
      UNIQUE (user_id, role)
  );
  ```
- [ ] Create `has_role()` security definer function
- [ ] Remove hardcoded credentials from client code
- [ ] Protect all `/admin` routes with auth check
- [ ] Never check admin status via localStorage or client-side storage

### Phase 2: Data Security
- [ ] Migrate all 12 CMS entities to PostgreSQL tables
- [ ] Enable RLS on all tables
- [ ] Add RLS policies:
  - Public: `SELECT` for published content
  - Admin: Full CRUD (verified via `has_role()`)
- [ ] Implement server-side input validation
- [ ] Sanitize user-generated content (reviews, inquiries)

### Phase 3: Infrastructure
- [ ] Set up CSP (Content Security Policy) headers
- [ ] Enable 2FA for admin users
- [ ] Add rate limiting on:
  - Contact form submissions
  - Review submissions
  - Login attempts
- [ ] Implement CAPTCHA on public forms
- [ ] Regular dependency audits (`npm audit`)
- [ ] Move image storage to Supabase Storage buckets
- [ ] Store API keys in Lovable Cloud secrets (never in code)

### Phase 4: Monitoring
- [ ] Set up error tracking (Sentry or similar)
- [ ] Add audit logging for admin actions
- [ ] Monitor failed login attempts
- [ ] Regular security scans

---

## Dependency Security

Run regular audits:
```bash
npm audit                  # Check for vulnerabilities
npm audit fix              # Auto-fix compatible updates
npm audit fix --force      # Force fix (may break)
npm outdated               # Check for outdated packages
```

---

## Recommendations Priority

| Priority | Action | Impact |
|---|---|---|
| 🔴 P0 | Migrate auth to Lovable Cloud | Eliminates client-side auth bypass |
| 🔴 P0 | Move data to PostgreSQL + RLS | Prevents data manipulation |
| 🟡 P1 | Add rate limiting | Prevents spam/abuse |
| 🟡 P1 | Add CAPTCHA to forms | Prevents bot submissions |
| 🟡 P1 | CSP headers | Prevents XSS injection |
| 🟢 P2 | 2FA for admins | Extra auth security |
| 🟢 P2 | Audit logging | Track admin actions |
| 🟢 P2 | Error monitoring | Catch issues early |
