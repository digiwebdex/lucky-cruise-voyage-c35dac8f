# 🔧 Deployment Commands — Lucky Cruise Voyage

> All working CLI commands for development, building, testing, and deploying.

---

## 1. Development

```bash
# Start development server (default port 8080)
npm run dev

# Start with custom port
npx vite --port 3000

# Start with network access (LAN testing)
npx vite --host 0.0.0.0

# Start with HTTPS (self-signed)
npx vite --https
```

---

## 2. Building

```bash
# Production build (optimized, minified)
npm run build
# Output → dist/

# Development build (with source maps, no minification)
npm run build:dev

# Preview production build locally
npm run preview

# Preview on specific port
npx vite preview --port 4173

# Analyze bundle size (interactive treemap)
npx vite-bundle-visualizer

# Check build output size
du -sh dist/
ls -la dist/assets/
```

---

## 3. Testing

```bash
# Run all tests (single run, exit after)
npm run test

# Run tests in watch mode (re-run on file change)
npm run test:watch

# Run specific test file
npx vitest run src/test/example.test.ts

# Run with coverage report
npx vitest run --coverage

# Run with verbose output
npx vitest run --reporter=verbose

# Run tests matching a pattern
npx vitest run -t "should"
```

---

## 4. Linting & Type Checking

```bash
# Run ESLint on all files
npm run lint

# Auto-fix ESLint issues
npx eslint . --fix

# TypeScript type check (no emit, just validate)
npx tsc --noEmit

# Type check with verbose errors
npx tsc --noEmit --pretty
```

---

## 5. Dependency Management

```bash
# Install all dependencies
npm install

# Add a production dependency
npm install <package-name>

# Add a dev dependency
npm install -D <package-name>

# Update all dependencies to latest compatible
npm update

# Check for outdated packages
npm outdated

# Security audit
npm audit

# Auto-fix security vulnerabilities
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force

# List all installed packages
npm ls --depth=0

# Check package size impact
npx bundlephobia <package-name>
```

---

## 6. Lovable Deployment

```bash
# Option 1: Publish via Lovable UI (recommended)
# 1. Click "Publish" button (top right in editor)
# 2. Click "Update" to push frontend changes
# 3. Backend changes deploy automatically

# Option 2: Push to GitHub (auto-syncs to Lovable)
git add .
git commit -m "feat: description of changes"
git push origin main

# Note: Frontend changes still require clicking "Update" in Lovable
```

---

## 7. Self-Hosting Deployment

### Static File Server
```bash
npm run build

# Using serve (simplest)
npx serve dist

# Using http-server
npx http-server dist -p 8080

# Using Python (if available)
cd dist && python3 -m http.server 8080
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t lucky-cruise .
docker run -p 80:80 lucky-cruise

# With docker-compose
docker-compose up -d
```

### Nginx Config (for SPA routing)
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback - all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

### Platform-Specific Deploys
```bash
# Netlify
npx netlify deploy --prod --dir=dist

# Vercel
npx vercel --prod

# Firebase Hosting
npx firebase deploy --only hosting

# Cloudflare Pages
npx wrangler pages deploy dist

# AWS S3 + CloudFront
aws s3 sync dist/ s3://your-bucket --delete
aws cloudfront create-invalidation --distribution-id XXXX --paths "/*"

# GitHub Pages
npm run build
npx gh-pages -d dist
```

---

## 8. Git Workflow

```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Create feature branch
git checkout -b feature/new-feature

# Stage and commit (follow conventional commits)
git add .
git commit -m "feat: add new cruise listing filter"

# Push feature branch
git push origin feature/new-feature

# Merge to main
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main

# Tag a release
git tag -a v1.9.0 -m "Release v1.9.0 - Documentation suite"
git push origin v1.9.0
```

---

## 9. Troubleshooting Commands

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear npm cache
npm cache clean --force

# Full reinstall (nuclear option)
rm -rf node_modules
rm -f package-lock.json
npm install

# Check Node.js version (must be 18+)
node --version

# Check npm version
npm --version

# Debug Vite config
npx vite --debug

# Check for circular dependencies
npx madge --circular src/

# Find large files in build
find dist -type f -size +100k | sort -rn

# Validate TypeScript config
npx tsc --showConfig
```

---

## 10. Quick Reference

| Task | Command |
|---|---|
| Start dev server | `npm run dev` |
| Production build | `npm run build` |
| Run tests | `npm run test` |
| Lint code | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Preview build | `npm run preview` |
| Bundle analysis | `npx vite-bundle-visualizer` |
| Update deps | `npm update` |
| Security audit | `npm audit` |
| Clear cache | `rm -rf node_modules/.vite` |
