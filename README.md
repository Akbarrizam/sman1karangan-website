# 🏫 Website Resmi SMAN 1 Karangan (SMANESKA)

Website portal informasi dan layanan publik resmi untuk **SMA Negeri 1 Karangan, Kabupaten Trenggalek (SMANESKA)**. Didesain dengan antarmuka modern, interaktif, berkinerja tinggi, dan responsif.

Projek ini dibangun menggunakan **React 19**, **TypeScript**, **Vite**, dan **Tailwind CSS v4**.

---

## 🚀 Fitur Unggulan

### 1. Desain Interaktif & Premium
*   **Animasi Halus & Dinamis**: Menggunakan pustaka kustom (`ScrollReveal` dan transisi CSS) untuk memberikan *micro-animations* yang premium saat halaman di-scroll atau elemen diarahkan kursor (*hover*).
*   **Favicon Kustom Resmi**: Menggunakan ikon tab browser SVG kustom yang menyerupai logo resmi segi lima SMANESKA lengkap dengan fallback PNG berkualitas tinggi.

### 2. Pusat Unduhan (Download Center)
*   Seksi khusus di halaman **PPDB** untuk mengunduh dokumen-dokumen penting sekolah secara langsung:
    *   📄 Brosur PPDB SMANESKA 2026 (PDF)
    *   📅 Kalender Akademik Resmi Sekolah (PDF)
    *   📘 Buku Saku Tata Tertib Siswa (PDF)

### 3. Pencarian & Filter Pintar (Berita & Prestasi)
*   **Pencarian Real-Time**: Kolom pencarian dinamis pada halaman **Berita** dan **Prestasi** untuk memfilter artikel secara instan berdasarkan judul atau konten.
*   **Filter Kategori**: Filter tab interaktif untuk menyaring konten berdasarkan kategori (misalnya: *Pengumuman, Berita Sekolah, Prestasi Akademik, Seni Budaya, Olahraga*).

### 4. Timeline Alur Pendaftaran & Detail PPDB
*   **Visualisasi Jalur PPDB**: Diagram alur pendaftaran langkah-demi-langkah (*step-by-step*) yang interaktif.
*   **Manajemen Kuota & Persyaratan**: Informasi detail mengenai kuota (Zonasi 50%, Prestasi 30%, Afirmasi 15%, Pindah Tugas 5%), persyaratan umum, serta persyaratan khusus untuk memudahkan calon siswa baru.

### 5. Peta Sekolah Interaktif (Virtual Tour Denah)
*   **Denah Berbasis SVG**: Peta interaktif di halaman **Fasilitas** yang memvisualisasikan tata letak kompleks sekolah.
*   **Sistem Zona**: Area sekolah dibagi menjadi 3 zona utama (Zona A, Zona B, Zona C) yang dapat diklik untuk menyoroti daftar ruangan (ruang kelas, laboratorium, lapangan olahraga, hingga Sanggar Seni Tari Turonggo Yakso).

### 6. Formulir Kontak Interaktif dengan Validasi
*   Formulir pengiriman pesan di halaman **Kontak** yang dilengkapi dengan validasi input klien secara real-time (validasi nama, format email, subjek, dan panjang pesan) sebelum dikirimkan.

### 7. Optimasi SEO & Aksesibilitas
*   Komponen `<SEO />` terintegrasi yang secara dinamis memperbarui meta title, meta description, dan keywords di setiap rute halaman untuk ramah mesin pencari (SEO-friendly).

---

## 🎨 Sistem Desain & Token Warna

Sistem desain diatur melalui variabel CSS baru di `src/index.css` menggunakan fitur `@theme` Tailwind CSS v4.

### Palet Warna Utama
| Token | Kode Warna | Deskripsi / Penggunaan |
| :--- | :--- | :--- |
| `forest` | `#1E4D3B` | Warna utama sekolah (mewakili *Adiwiyata / Green School*) |
| `gold` | `#C98A2B` | Warna aksen prestasi, penghargaan, dan sorotan penting |
| `turonggo` | `#A33B2E` | Warna merah tegas terinspirasi dari kesenian tari khas **Turonggo Yakso** |
| `canvas` | `#F3F5EF` | Latar belakang dasar halaman (*soft light mode*) |
| `paper` | `#FFFFFF` | Latar belakang kartu (*card*), modal, dan kontainer |
| `ink` | `#16231B` | Warna teks utama (*high contrast* untuk keterbacaan) |

### Tipografi
*   **Heading/Title**: *Fraunces* (Google Fonts) – memberikan kesan klasik, akademis, dan elegan.
*   **Body**: *Plus Jakarta Sans* (Google Fonts) – memberikan kesan bersih, modern, dan mudah dibaca di layar digital.
*   **Label/Mono**: *IBM Plex Mono* (Google Fonts) – digunakan untuk data angka, statistik, tanggal, dan badge kategori.

---

## 📁 Struktur Direktori Projek

```text
sman1-karangan-website/
├── public/                  # Aset publik statis (gambar, dokumen PDF, logo)
├── src/
│   ├── assets/              # Aset media (ikon, gambar internal)
│   ├── components/
│   │   ├── common/          # Komponen dasar (Button, Badge, SEO, ScrollReveal)
│   │   ├── layout/          # Struktur dasar layout (Navbar, Footer)
│   │   └── sections/        # Potongan komponen besar (NewsCard, AchievementCard)
│   ├── constants/           # Konfigurasi situs (siteConfig, routePaths)
│   ├── data/                # Sumber data statis lokal (JSON format)
│   │   ├── news.json
│   │   ├── achievements.json
│   │   ├── extracurriculars.json
│   │   └── teachers.json
│   ├── hooks/               # React Custom Hooks (useScrollToTop, useScrolled)
│   ├── layouts/             # Layout pembungkus utama (MainLayout)
│   ├── pages/               # Halaman web (11 rute halaman utama)
│   ├── routes/              # Konfigurasi routing React Router
│   ├── types/               # Definisi tipe TypeScript
│   ├── utils/               # Fungsi utilitas (format tanggal, pemotong teks, dsb.)
│   ├── App.tsx              # Root Komponen Aplikasi
│   ├── index.css            # Desain dasar, Tailwind v4, & setup font
│   └── main.tsx             # Entry point React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Cara Menjalankan Projek

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda (Disarankan Node.js versi 18 atau yang terbaru).

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal untuk memasang modul node yang diperlukan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Lokal)
Mulai server lokal untuk melihat hasil website selama tahap pengembangan:
```bash
npm run dev
```
Buka browser Anda dan akses tautan [http://localhost:5173](http://localhost:5173).

### 4. Build untuk Produksi
Gunakan perintah berikut untuk mengompilasi dan mengoptimasi kode aplikasi untuk rilis produksi:
```bash
npm run build
```
Hasil kompilasi akan tersimpan di dalam direktori `dist/`.

### 5. Preview Build Produksi
Untuk menguji hasil build produksi secara lokal sebelum dideploy ke hosting:
```bash
npm run preview
```

---

## 📊 Status Implementasi

*   [x] Inisialisasi Project dengan React, TypeScript & Vite
*   [x] Setup Tailwind CSS v4 & Sistem Token Warna Kustom
*   [x] Pembuatan Layout Inti responsif (Header/Navbar, Footer)
*   [x] Sistem Routing dengan React Router DOM (Lazy-Loaded Pages)
*   [x] Koleksi Database Statis Sekolah (Data Guru, Berita, Prestasi, Ekskul dalam JSON)
*   [x] Implementasi Rute Halaman Lengkap (11 Pages):
    *   [x] **Beranda**: Hero dinamis, statistik, prestasi & berita terbaru
    *   [x] **Profil**: Sejarah, visi-misi, struktur sekolah, daftar komite, & daftar guru/staff
    *   [x] **Akademik**: Kurikulum, program Double Track (Tata Boga, Rias, IT/Desain)
    *   [x] **Kesiswaan**: Info OSIS, daftar ekstrakurikuler lengkap, & tata tertib
    *   [x] **Fasilitas**: Daftar sarana prasarana & **Denah Sekolah Interaktif (SVG Map)**
    *   [x] **PPDB**: Informasi jalur, persyaratan, timeline alur pendaftaran, & **Pusat Unduhan Brosur/Dokumen**
    *   [x] **Prestasi**: Halaman daftar prestasi siswa dengan filter tahun dan pencarian
    *   [x] **Berita**: Portal berita sekolah terupdate dengan kolom pencarian dan filter kategori
    *   [x] **Galeri**: Dokumentasi kegiatan siswa dalam layout grid responsif
    *   [x] **Kontak**: Detail informasi, tautan media sosial resmi, peta lokasi Google Maps, & **Formulir Validasi Pesan**
    *   [x] **404 Not Found**: Halaman error kustom jika rute tidak ditemukan
*   [x] Integrasi dynamic SEO tags di setiap halaman rute
*   [x] Penambahan animasi scroll (`ScrollReveal`) & transisi interaktif di seluruh halaman
*   [x] Kustomisasi Logo Browser (Favicon resmi sekolah)
