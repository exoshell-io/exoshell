# Dependency Upgrade Notes

## Completed Updates ✅

### JavaScript/TypeScript Dependencies Updated

**Safe Minor/Patch Updates:**
- @tanstack packages: Updated to latest versions (5.43.1 → 5.86.0, etc.)
- TypeScript: 5.4.5 → 5.9.2 (fixes ESLint compatibility)
- Bun package manager: 1.0.0 → 1.2.21
- Prettier: 3.3.2 → 3.6.2
- Turbo: 2.0.4 → 2.5.6
- Jotai: 2.8.3 → 2.14.0
- React Icons: 5.2.1 → 5.5.0
- PostCSS: 8.4.38 → 8.5.6
- Autoprefixer: 10.4.19 → 10.4.21
- Various other utility packages

**TypeScript ESLint Compatibility:**
- @typescript-eslint/eslint-plugin: 7.13.0 → 8.43.0
- @typescript-eslint/parser: 7.13.0 → 8.43.0
- Fixed TypeScript 5.9.2 compatibility warnings

**Low-Risk Major Version Updates:**
- @types/node: 20.14.2 → 24.3.1
- drizzle-kit: 0.22.7 → 0.31.4
- drizzle-orm: 0.31.2 → 0.44.5
- eslint-config-turbo: 2.0.4 → 2.5.6
- react-markdown: 9.0.1 → 10.1.0
- @hello-pangea/dnd: 16.6.0 → 18.0.1
- lint-staged: 15.2.7 → 16.1.6
- sort-package-json: 2.10.0 → 3.4.0
- vercel: 34.2.7 → 47.0.7

### Rust (Cargo) Dependencies Updated

**All Rust dependencies updated to latest compatible versions:**
- ~200+ dependencies updated including major ones like:
  - tokio: 1.38.0 → 1.47.1
  - futures: 0.3.30 → 0.3.31
  - chrono: 0.4.38 → 0.4.42
  - clap: 4.5.4 → 4.5.47
  - serde: Updated to latest
  - anyhow: 1.0.86 → 1.0.99
  - thiserror: Updated to latest
  - And many more...

## Remaining Major Updates (Requires More Work) ⚠️

The following major updates are available but would require more extensive testing and potentially code changes to handle breaking changes:

### React Ecosystem (v19)
- react: 18.3.1 → 19.1.1
- react-dom: 18.3.1 → 19.1.1
- @types/react: 18.3.3 → 19.1.12
- @types/react-dom: 18.3.0 → 19.1.9

**Why not updated:** React 19 introduces significant changes and may require code updates.

### Next.js Ecosystem (v15)
- next: 14.2.4 → 15.5.2
- @next/bundle-analyzer: 14.2.4 → 15.5.2
- eslint-config-next: 14.2.4 → 15.5.2

**Why not updated:** Next.js 15 is a major framework update with potential breaking changes.

### Mantine UI Library (v8)
- @mantine/core: 7.10.2 → 8.3.0
- @mantine/form: 7.10.2 → 8.3.0
- @mantine/hooks: 7.10.2 → 8.3.0
- @mantine/modals: 7.10.2 → 8.3.0
- @mantine/notifications: 7.10.2 → 8.3.0
- @mantine/nprogress: 7.10.2 → 8.3.0
- @mantine/spotlight: 7.10.2 → 8.3.0
- @mantine/code-highlight: 7.10.2 → 8.3.0
- mantine-contextmenu: 7.10.2 → 8.2.0

**Why not updated:** Mantine v8 is a major UI library update that may require component and styling changes.

### CSS Framework
- tailwindcss: 3.4.4 → 4.1.13

**Why not updated:** Tailwind CSS v4 is a major rewrite with significant changes.

### Linting
- eslint: 8.57.0 → 9.35.0

**Why not updated:** ESLint v9 caused installation issues and compatibility problems.

## Recommendations for Future Updates

1. **Test in a separate branch:** Create a dedicated branch for each major ecosystem update
2. **Update incrementally:** Handle React 19, Next.js 15, and Mantine 8 separately
3. **Check breaking changes:** Review migration guides for each major update
4. **Update tests:** Ensure all tests pass after major updates
5. **Consider compatibility:** Some updates may require updating other dependent packages

## Current State ✅

The project is now in a stable state with:
- All safe dependency updates applied
- TypeScript compatibility issues resolved
- All linting and formatting working correctly
- Cargo dependencies updated to latest compatible versions
- Ready for development with modern, secure dependency versions