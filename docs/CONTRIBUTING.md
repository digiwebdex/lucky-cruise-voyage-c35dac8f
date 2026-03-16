# 🤝 Contributing Guide — Lucky Cruise Voyage

---

## Code Standards

- **TypeScript**: All files must be `.ts` or `.tsx`
- **Styling**: Use Tailwind semantic tokens only — never raw colors
- **Components**: Small, focused, single-responsibility
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Use `@/` alias for src-relative imports

## Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation
style: formatting (no logic change)
refactor: code restructuring
test: add/update tests
chore: maintenance
```

## Pull Request Process

1. Create feature branch from `main`
2. Make changes, run `npm run lint` and `npm run test`
3. Push and create PR with description
4. Changes auto-sync to Lovable on merge

## Adding a New Cruise

1. Add images to `src/assets/cruises/`
2. Import images in `src/services/mockData.ts`
3. Add cruise object to the `cruises` array
4. Verify on `/cruises` and `/cruises/:id` pages

## Adding a New Admin Page

1. Create component in `src/pages/admin/`
2. Add route in `src/App.tsx`
3. Add sidebar link in `src/components/admin/AdminLayout.tsx`
4. Add dashboard stat if applicable

## Adding Translations

1. Add key to `src/locales/en.json`
2. Add corresponding key to `src/locales/bn.json`
3. Use `t("key")` in components via `useLanguage()`
