#!/usr/bin/env node
// Assembles a library-shaped package from the Sorvibank app for /design-sync.
// The app has no library build (only a Vite app bundle), so this copies
// frontend/src into .ds-pkg/src, adds the barrel + provider from
// .design-sync/pkg/, and emits .d.ts declarations with the app's own tsc.
// Output (.ds-pkg/) is gitignored and fully regenerated on every run.
//
// Usage (from repo root): node .design-sync/build-pkg.mjs
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const ROOT = resolve('.');
const FRONT = join(ROOT, 'frontend');
const OUT = join(ROOT, '.ds-pkg');

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(FRONT, 'src'), join(OUT, 'src'), { recursive: true });
cpSync(join(ROOT, '.design-sync/pkg/ds-index.ts'), join(OUT, 'src/ds-index.ts'));
cpSync(join(ROOT, '.design-sync/pkg/ds-provider.tsx'), join(OUT, 'src/ds-provider.tsx'));
cpSync(join(ROOT, '.design-sync/pkg/ds-fonts.css'), join(OUT, 'src/ds-fonts.css'));
symlinkSync(join(FRONT, 'node_modules'), join(OUT, 'node_modules'), 'dir');

// The converter's esbuild inlines .png/.svg as data URLs (and has no .jpg loader),
// so raster assets end up inside _ds_bundle.js. Downscale the copies (macOS sips)
// to keep the bundle small, and inline the one CSS .jpg background as a data URL.
const ASSETS = join(OUT, 'src/assets');
const sips = (file, max) => execFileSync('sips', ['-Z', String(max), file], { stdio: 'ignore' });
for (const f of ['tile-01.png', 'tile-02.png', 'tile-03.png', 'tile-04.png', 'tile-05.png', 'iphone.png']) sips(join(ASSETS, f), 500);
sips(join(ASSETS, 'bg_main.jpg'), 1600);
// video_preview is a photo stored as PNG (~2MB) - re-encode as JPEG for the bundle copy.
execFileSync('sips', ['-Z', '1200', '-s', 'format', 'jpeg', '-s', 'formatOptions', '75', join(ASSETS, 'video_preview.png'), '--out', join(ASSETS, 'video_preview.jpg')], { stdio: 'ignore' });
const inlineJpeg = (cssRel, urlExpr, asset) => {
  const css = join(OUT, 'src/components', cssRel);
  const b64 = readFileSync(join(ASSETS, asset)).toString('base64');
  const src = readFileSync(css, 'utf8');
  if (!src.includes(urlExpr)) { console.error(`build-pkg: ${urlExpr} not found in ${cssRel} - update build-pkg.mjs`); process.exit(1); }
  writeFileSync(css, src.replace(urlExpr, `url('data:image/jpeg;base64,${b64}')`));
};
inlineJpeg('FirstScreen/firstScreen.module.css', "url('../../assets/bg_main.jpg')", 'bg_main.jpg');
inlineJpeg('Video/video.module.css', 'url("../../assets/video_preview.png")', 'video_preview.jpg');

writeFileSync(
  join(OUT, 'package.json'),
  JSON.stringify({ name: 'sorvibank-ui', version: '0.0.0', private: true, module: 'src/ds-index.ts', types: 'types/ds-index.d.ts' }, null, 2) + '\n',
);
writeFileSync(
  join(OUT, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      target: 'ES2020', lib: ['ES2020', 'DOM', 'DOM.Iterable'], module: 'ESNext', moduleResolution: 'bundler',
      jsx: 'react-jsx', skipLibCheck: true, strict: true, allowImportingTsExtensions: true,
      declaration: true, emitDeclarationOnly: true, rootDir: 'src', outDir: 'types',
    },
    include: ['src'],
  }, null, 2) + '\n',
);

const tsc = join(FRONT, 'node_modules/.bin/tsc');
try {
  execFileSync(tsc, ['-p', join(OUT, 'tsconfig.json')], { stdio: 'inherit' });
} catch {
  // Type errors don't block declaration emit (no noEmitOnError) - only fail if nothing came out.
  if (!existsSync(join(OUT, 'types/ds-index.d.ts'))) { console.error('build-pkg: tsc emitted no declarations'); process.exit(1); }
  console.error('build-pkg: tsc reported type errors (declarations emitted anyway)');
}
console.error(`build-pkg: ready at ${OUT}`);
