# Website SMAN 1 Karangan (SMANESKA)

Website resmi SMA Negeri 1 Karangan, Kabupaten Trenggalek. Dibangun dengan
React + TypeScript + Vite + Tailwind CSS v4.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build Production

```bash
npm run build
npm run preview   # untuk mengecek hasil build secara lokal
```

## Token Desain

Lihat komentar di `src/index.css` (blok `@theme`) untuk daftar warna dan
font resmi yang dipakai di seluruh halaman:

| Token | Hex | Kegunaan |
|---|---|---|
| `forest` | `#1E4D3B` | Warna brand utama (navbar, CTA utama) |
| `gold` | `#C98A2B` | Aksen pencapaian/highlight |
| `turonggo` | `#A33B2E` | Aksen tegas, dipakai sangat terbatas |
| `canvas` | `#F3F5EF` | Latar belakang utama |
| `paper` | `#FFFFFF` | Permukaan kartu/section |
| `ink` | `#16231B` | Warna teks |

Font: **Fraunces** (display/heading), **Plus Jakarta Sans** (body),
**IBM Plex Mono** (label/caption/angka).

## Alias Import

Gunakan `@/` untuk mengacu ke folder `src/`, contoh:

```ts
import Navbar from '@/components/layout/Navbar'
```

## Status

- [x] Setup Vite + TypeScript
- [x] Konfigurasi Tailwind CSS v4 + token desain
- [x] Struktur folder pages/components & routing (Fase 1)
- [x] Data statis JSON (berita, prestasi, guru, ekstrakurikuler)
- [x] TypeScript types (NewsArticle, Teacher, Achievement, Extracurricular)
- [x] Constants (siteConfig, routePaths)
- [x] Utility functions (formatDate, slugify, truncate, cx)
- [x] Custom hooks (useScrollToTop, useScrolled)
- [x] Routing dengan React Router DOM (lazy-loaded)
- [x] MainLayout (Outlet wrapper)
- [x] Halaman placeholder semua route (11 halaman)
- [ ] Komponen inti: Navbar, Footer, HeroSection, Card (Fase 2)
- [ ] Halaman Beranda (Fase 3)
- [ ] Halaman Profil, Akademik, Kesiswaan, dst. (Fase 3)
