# design-sync notes — sorvibank

## How this repo is synced
- `frontend/` is a Vite **app**, not a library: there is no `dist/` and no `.d.ts`. `node .design-sync/build-pkg.mjs` (= `cfg.buildCmd`, run from the repo root) assembles a library-shaped package in `.ds-pkg/` (gitignored). It copies `frontend/src`, adds the barrel `.design-sync/pkg/ds-index.ts`, the `SorvibankProvider` (`.design-sync/pkg/ds-provider.tsx`) and the Roboto `@import` (`ds-fonts.css`), then emits `.d.ts` with the app's own tsc. **Re-run it before every converter/driver run.**
- Converter invocation: `--node-modules ./frontend/node_modules --entry .ds-pkg/src/ds-index.ts` (the entry is also in `cfg.entry`).
- The app uses default exports, so the barrel names them explicitly. `Error` is exported as **`ErrorMessage`** to avoid shadowing the global `Error`. **New components must be added to `ds-index.ts` by hand.**
- `SorvibankProvider` = QueryClientProvider (retry off) + MemoryRouter + sonner Toaster. It is `cfg.provider` and excluded from cards via `componentSrcMap: null`.
- Groups: `cfg.docsMap` points components at category-only stubs in `.design-sync/groups/`. The converter only applies a doc category when the folder-derived group is `general`, so components living in a named subfolder (input/, loaders/, toast/, 404/, change-password/, logout-page/) are pinned via `componentSrcMap` → `src/ds-index.ts` to blank their folder group. That srcPath only feeds grouping and doc lookup (no JSDoc exists anyway).

## Asset handling (build-pkg.mjs)
- The converter's esbuild inlines .png/.svg as data URLs and has **no .jpg loader**. build-pkg therefore downsizes the copied rasters with macOS `sips` (tiles/iphone → 500px, bg → 1600px) and inlines `bg_main.jpg` and `video_preview` (re-encoded to JPEG) as data URLs in their CSS modules. If those CSS `url(...)` strings change in the source, build-pkg exits with an error naming the file.
- FirstScreen (redesign, Oct 2026) uses `city-map.jpg` plus an `image-set()` of `.webp` variants. esbuild has no `.webp` loader, so build-pkg deletes the `image-set(...)` line in the bundle copy and inlines a 1600px `city-map.jpg`. The source's third `image-set` entry `url(./city-map.jpg)` points next to the CSS file, where no file exists, so it would fail even with a loader.
- `sips` is macOS-only. On Linux, replace it with ImageMagick `convert`.

## Known render warns (triaged, benign)
- `[RENDER_THIN] Modal`: renders through a portal with a fixed overlay, so the measured height is 0. The screenshot shows the LoginForm inside the modal correctly.
- `[RENDER_THIN] WindowsIcon`: a small multicolor glyph with no fill prop. The screenshot is correct.
- `[DOCS_UNMAPPED] <Name>Icon` for every icon: icons have no `docsMap` entry because they take the `icons` group from their folder. Harmless.
- FirstScreen ring pulse: it used to animate the custom properties `--r1/--o1/--r2/--o2` through `@property`. Claude Design flagged them as undefined tokens even after they were registered. Since Oct 2026 the pulse animates `transform` and `opacity` on `.rings::before/::after` (`@keyframes ring`), so no custom properties are involved. Do not reintroduce animated custom properties.
- `tsc` warns TS4023 in `api/hooks/useRegisterUser.tsx` during declaration emit. Harmless.

## Floor cards (unauthored on purpose)
- `ProfileMain` needs a logged-in user from `/api/auth/me` and crashes on `user.name` without one. `ChangePassword`, `Sessions` and `LogoutPage` render fine with no props and have no authored preview. All four can be authored on a later sync if data mocking is added.

## Re-sync risks
- `ds-index.ts` is a hand-maintained export list: renamed or moved component files break the build-pkg tsc and the bundle, and new components are silently absent.
- Preview captures freeze the clock, so `Footer` shows «2024 - 2024». This is cosmetic.
- The data-dependent components (Header, FirstScreen, Sessions) render their logged-out or empty state because no backend is reachable. If the API base or error handling changes, recheck those cards.
- The conventions header names concrete colors and classes (`#ffd544`, `container`, `p-N`/`m-N` from `styles/box.css`, the `--*-size-text` tokens). Re-validate it if `index.css` or `box.css` change.
- The redesign removed the global `a { color: #126df7 }` rule from `index.css`. Links inside components still use their own module colors, but the conventions header's "blue links `#126df7`" no longer holds for plain `<a>` tags. The icon count was updated to 21 after `MenuIcon` was added.
