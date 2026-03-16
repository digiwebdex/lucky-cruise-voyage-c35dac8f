# 🔧 Deployment Commands — Lucky Cruise Voyage

> All working commands for building, testing, and deploying the project.

---

## Development

```bash
# Start development server (port 8080)
npm run dev

# Start with custom port
npx vite --port 3000

# Start with network access
npx vite --host 0.0.0.0
```

---

## Building

```bash
# Production build
npm run build

# Development build (with source maps)
npm run build:dev

# Preview production build locally
npm run preview

# Analyze bundle size
npx vite-bundle-visualizer
```

---

## Testing

```bash
# Run all tests (single run)
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npx vitest run src/test/example.test.ts

# Run with coverage
npx vitest run --coverage
```

---

## Linting

```bash
# Run ESLint
npm run lint

# Auto-fix ESLint issues
npx eslint . --fix

# Type check without emitting
npx tsc --noEmit
```

---

## Dependency Management

```bash
# Install all dependencies
npm install

# Add a new dependency
npm install <package-name>

# Add a dev dependency
npm install -D <package-name>

# Update all dependencies
npm update

# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit
npm audit fix
```

---

## Lovable Deployment

```bash
# Option 1: Publish via Lovable UI
# Click "Publish" button → "Update" to push frontend changes

# Option 2: Push to GitHub (auto-syncs to Lovable)
git add .
git commit -m "feat: description"
git push origin main
```

---

## Self-Hosting Deployment

```bash
# Build the project
npm run build

# Serve with any static server
npx serve dist

# Or with http-server
npx http-server dist -p 8080

# Docker deployment
# Create Dockerfile:
# FROM nginx:alpine
# COPY dist/ /usr/share/nginx/html/
# EXPOSE 80
docker build -t lucky-cruise .
docker run -p 80:80 lucky-cruise

# Netlify deployment
npx netlify deploy --prod --dir=dist

# Vercel deployment
npx vercel --prod

# Firebase hosting
npx firebase deploy --only hosting
```

---

## Git Workflow

```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Create feature branch
git checkout -b feature/new-feature

# Stage and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
```

---

## Troubleshooting Commands

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules
npm install

# Check Node version
node --version  # Should be 18+

# Check disk usage of build
du -sh dist/
```
