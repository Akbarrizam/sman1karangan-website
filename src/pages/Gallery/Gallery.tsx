import { useState } from 'react'
import { X, Calendar, Maximize2, Sparkles } from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'

type GalleryCategory = 'semua' | 'seni-budaya' | 'olahraga' | 'pramuka' | 'akademik' | 'lingkungan'

interface GalleryItem {
  id: string
  title: string
  category: 'seni-budaya' | 'olahraga' | 'pramuka' | 'akademik' | 'lingkungan'
  year: string
  description: string
  image: string
}

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: 'semua', label: 'Semua Dokumentasi' },
  { value: 'seni-budaya', label: 'Seni & Budaya' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'pramuka', label: 'Pramuka & Sosial' },
  { value: 'akademik', label: 'Akademik & Wisuda' },
  { value: 'lingkungan', label: 'Lingkungan' },
]

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'turonggo-yakso-2025',
    title: 'Festival Tari Turonggo Yakso SMANESKA',
    category: 'seni-budaya',
    year: '2025',
    description: 'Pementasan tari khas Trenggalek "Turonggo Yakso" oleh tim ekstrakurikuler tari SMANESKA. Penampilan ini memadukan nilai budaya lokal dengan kreativitas dinamis siswa.',
    image: '/images/sb_tari.jpg',
  },
  {
    id: 'voli-bupati-cup-2025',
    title: 'Juara II Bola Voli Bupati Cup',
    category: 'olahraga',
    year: '2025',
    description: 'Dokumentasi perjuangan tim bola voli putra SMANESKA yang berhasil menyabet piala Juara II dalam turnamen bergengsi antar-pelajar se-Kabupaten Trenggalek.',
    image: '/images/gallery_voli.png',
  },
  {
    id: 'kemah-bakti-2025',
    title: 'Kemah Bakti Pramuka Penegak',
    category: 'pramuka',
    year: '2025',
    description: 'Kegiatan tahunan Pramuka Ambalan SMANESKA yang mencakup perkemahan mandiri, penjelajahan, serta bakti sosial pembagian sembako kepada masyarakat desa sekitar.',
    image: '/images/gallery_kemah.png',
  },
  {
    id: 'osn-kabupaten-2025',
    title: 'Seleksi Olimpiade Sains Nasional (OSN)',
    category: 'akademik',
    year: '2025',
    description: 'Delegasi siswa-siswi terbaik SMANESKA saat berjuang dalam kompetisi OSN tingkat Kabupaten di bidang Matematika, Fisika, Kimia, dan Astronomi.',
    image: '/images/news_olimpiade_math.png',
  },
  {
    id: 'tanam-pohon-2025',
    title: 'Gerakan Penanaman 1.000 Pohon',
    category: 'lingkungan',
    year: '2025',
    description: 'Program rutin Green Education School di mana siswa, guru, dan staf bersama-sama melakukan penanaman bibit pohon pelindung di area sekitar sekolah dan wilayah bantaran sungai.',
    image: '/images/gallery_tanam_pohon.png',
  },
  {
    id: 'gamelan-campursari-2024',
    title: 'Pentas Karawitan & Campursari',
    category: 'seni-budaya',
    year: '2024',
    description: 'Unjuk bakat tim seni musik tradisional SMANESKA dalam melestarikan karawitan Jawa dan campursari pada perayaan hari besar nasional.',
    image: '/images/sb_karawitan.jpg',
  },
  {
    id: 'hut-smaneska-33',
    title: 'HUT SMAN 1 Karangan ke-33',
    category: 'seni-budaya',
    year: '2024',
    description: 'Kemeriahan jalan sehat, pentas seni akbar, serta pameran hasil karya vokasional siswa program Double Track dalam memperingati hari jadi SMANESKA yang ke-33.',
    image: '/images/sb_kriya.jpg',
  },
  {
    id: 'wisuda-2025',
    title: 'Prosesi Wisuda & Pelepasan Kelas XII',
    category: 'akademik',
    year: '2025',
    description: 'Momen khidmat dan haru pelepasan siswa-siswi kelas XII angkatan 2024/2025 di Aula SMANESKA, dihadiri oleh komite sekolah dan orang tua murid.',
    image: '/images/gallery_wisuda.png',
  },
  {
    id: 'debat-bahasa-inggris-2025',
    title: 'Semifinal Lomba Debat Bahasa Inggris',
    category: 'akademik',
    year: '2025',
    description: 'Tim debat bahasa Inggris (English Debate Club) SMANESKA yang berhasil melaju hingga babak semifinal tingkat Provinsi Jawa Timur.',
    image: '/images/gallery_debat.png',
  },
]

const categoryBadge: Record<string, 'gold' | 'forest' | 'turonggo' | 'neutral'> = {
  'seni-budaya': 'gold',
  'olahraga': 'forest',
  'pramuka': 'turonggo',
  'akademik': 'neutral',
  'lingkungan': 'forest',
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('semua')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filteredItems =
    activeCategory === 'semua'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <>
      <SEO
        title="Galeri Kegiatan"
        description="Lihat kumpulan dokumentasi foto kegiatan belajar, pentas tari tradisional Turonggo Yakso, kegiatan olahraga, kepramukaan, dan pelestarian lingkungan di SMANESKA."
        keywords="galeri smaneska, foto kegiatan sman 1 karangan, dokumentasi sekolah, tari turonggo yakso trenggalek, pramuka smaneska"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Galeri Dokumentasi</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Galeri Kegiatan
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Sorotan dokumentasi kegiatan akademik, seni, budaya, olahraga, serta aksi pelestarian 
            lingkungan hidup oleh seluruh civitas akademika SMANESKA.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── GALERI KONTEN ─────────────────────────────────────── */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kilas Aktivitas"
            title="Dokumentasi Sekolah"
            description="Klik pada salah satu kartu dokumentasi untuk melihat detail kegiatan secara lengkap."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === value
                    ? 'bg-forest text-white shadow-md shadow-forest/15'
                    : 'bg-paper border border-ink/10 text-ink/60 hover:border-forest/30 hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid Galeri */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation="fade-in-up"
                delay={(index % 3) * 100}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl border border-ink/8 bg-paper overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:border-forest/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gallery Cover Image with Hover Zoom */}
                <div className="w-full h-56 bg-forest/5 relative overflow-hidden flex items-center justify-center border-b border-ink/6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  {/* Icon hover overlay */}
                  <div className="absolute inset-0 bg-forest/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-paper flex items-center justify-center text-forest shadow-md">
                      <Maximize2 className="size-5" />
                    </div>
                  </div>

                  {/* Tag Tahun */}
                  <div className="absolute top-4 right-4 bg-paper/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-mono font-bold text-ink shadow-sm z-10">
                    {item.year}
                  </div>
                </div>

                {/* Deskripsi Kartu */}
                <div className="p-6">
                  <div className="mb-3">
                    <Badge variant={categoryBadge[item.category] ?? 'neutral'} size="sm">
                      {CATEGORIES.find((c) => c.value === item.category)?.label}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-ink text-base line-clamp-1 group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink/50 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOM LIGHTBOX MODAL ─────────────────────────────── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-paper rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-white/10 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Tutup"
            >
              <X className="size-5" />
            </button>

            {/* Visual Header (Real Image) */}
            <div className="w-full h-64 sm:h-80 bg-forest/5 relative flex items-center justify-center border-b border-ink/6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-radial from-transparent to-black/30" />
              
              <div className="absolute bottom-4 left-6 bg-paper/90 backdrop-blur-sm px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-ink shadow-md flex items-center gap-1.5">
                <Calendar className="size-3.5 text-gold" />
                Dokumentasi Kegiatan {selectedItem.year}
              </div>
            </div>

            {/* Detail Konten */}
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                <Badge variant={categoryBadge[selectedItem.category] ?? 'neutral'} size="sm">
                  {CATEGORIES.find((c) => c.value === selectedItem.category)?.label}
                </Badge>
              </div>

              <h3 className="font-display font-bold text-ink text-xl sm:text-2xl mb-4 leading-snug">
                {selectedItem.title}
              </h3>
              
              <p className="text-sm sm:text-base text-ink/70 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── INFO TAMBAHAN BANNER ──────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-20 border-t border-ink/6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4 inline-flex items-center gap-1">
            <Sparkles className="size-3.5" />
            Sosial Media SMANESKA
          </Badge>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
            Ikuti Aktivitas Harian Kami secara Real-Time
          </h2>
          <p className="text-ink/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Kami aktif mempublikasikan dokumentasi foto, video pendek, pengumuman sekolah, serta keseruan 
            kehidupan siswa langsung melalui akun Facebook resmi, Instagram OSIS, dan Twitter/X.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://facebook.com/sman1karangan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-forest/8 text-forest hover:bg-forest hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200"
            >
              Facebook SMANESKA (3.300+ Pengikut)
            </a>
            <a
              href="https://instagram.com/osis_smaneska"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-forest/8 text-forest hover:bg-forest hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200"
            >
              Instagram @osis_smaneska
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
