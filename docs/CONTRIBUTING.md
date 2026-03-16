# 🤝 Contributing Guide — Lucky Cruise Voyage

---

## Code Standards

### General Rules
- **TypeScript**: All files must be `.ts` or `.tsx` — no `.js` files
- **Styling**: Use Tailwind semantic tokens only — never raw colors (`text-white`, `bg-black`)
- **Components**: Small, focused, single-responsibility
- **Naming**: PascalCase for components, camelCase for functions/variables/hooks
- **Imports**: Use `@/` alias for src-relative imports
- **No `any`**: Avoid `any` type — use proper TypeScript interfaces

### File Organization
- Pages → `src/pages/` (public) or `src/pages/admin/` (admin)
- Components → `src/components/` (custom) or `src/components/ui/` (shadcn)
- Services → `src/services/`
- Hooks → `src/hooks/`
- Types → Co-located with their service files
- Assets → `src/assets/` with subdirectories by type

---

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting (no logic change)
refactor: code restructuring (no behavior change)
test: add/update tests
chore: maintenance, dependency updates
perf: performance improvement
```

### Examples
```
feat: add contact inquiries manager to admin panel
fix: resolve missing admin route for seat plan manager
docs: update API reference with new CMS entities
style: fix button alignment on mobile cruise cards
refactor: extract PageHeroBanner into reusable component
test: add unit tests for cmsStore CRUD operations
chore: update framer-motion to v12.35
```

---

## Pull Request Process

1. Create feature branch from `main`: `git checkout -b feature/your-feature`
2. Make changes following code standards
3. Run checks:
   ```bash
   npm run lint        # No warnings
   npm run test        # All tests pass
   npx tsc --noEmit    # No type errors
   npm run build       # Builds successfully
   ```
4. Push and create PR with clear description
5. Changes auto-sync to Lovable on merge to `main`

---

## Common Tasks

### Adding a New Cruise
1. Add images to `src/assets/cruises/` (naming: `cruisename-1.jpg`, etc.)
2. Import images in `src/services/mockData.ts`
3. Add cruise object to the `cruises` array with all required fields
4. Bump `DATA_VERSION` in `cmsStore.ts` to force reseed
5. Verify on `/cruises` and `/cruises/:id`

### Adding a New Admin Page
1. Create component in `src/pages/admin/NewPage.tsx`
2. Add route in `src/App.tsx` under admin routes
3. Add sidebar link in `src/components/admin/AdminLayout.tsx`
4. Add dashboard stat card if applicable

### Adding a New CMS Entity
1. Define TypeScript interface in `cmsStore.ts`
2. Add localStorage key to `KEYS` constant
3. Create default data
4. Add `get*()` and `save*()` functions
5. Create admin page for CRUD
6. Wire up to public page for display

### Adding a New Public Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` under PublicLayout
3. Add navigation link in `src/components/layout/Header.tsx`
4. Add hero banner mapping in `src/components/PageHeroBanner.tsx`
5. Add SEO entry in `cmsStore.ts` defaults
6. Add translations to `en.json` and `bn.json`

### Adding Translations
1. Add key to `src/locales/en.json`
2. Add corresponding key to `src/locales/bn.json`
3. Use `t("key")` in components via `useLanguage()`

### Adding a shadcn/ui Component
```bash
npx shadcn-ui@latest add <component-name>
```
Component will be added to `src/components/ui/`

---

## Design System Rules

### Colors
```tsx
// ❌ Wrong
<div className="bg-blue-500 text-white">

// ✅ Correct
<div className="bg-primary text-primary-foreground">
```

### Spacing
- Use Tailwind spacing scale: `p-4`, `mt-6`, `gap-8`
- Consistent page padding: `container mx-auto px-4`

### Typography
- Headings use semantic classes
- Body text uses `text-foreground` or `text-muted-foreground`

---

## Data Version Bumping

When changing CMS data structure:
1. Update the interface in `cmsStore.ts`
2. Update default data
3. Increment `DATA_VERSION` (e.g., `"v35"` → `"v36"`)
4. This clears all localStorage and reseeds — **users lose customizations**

---

## Testing Guidelines

- Place tests next to their source files or in `src/test/`
- Use `describe()` and `it()` blocks
- Test CMS store functions for correctness
- Test component rendering with @testing-library/react
- Run before every PR: `npm run test`
