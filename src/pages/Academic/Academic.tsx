import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Users, Filter, Sparkles, Award, X } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import { SITE_CONFIG } from '@/constants/siteConfig'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import teachersData from '@/data/teachers.json'
import { type Teacher } from '@/types/teacher.types'

const teachers = teachersData as Teacher[]

const FEATURED_DETAILS = {
  double_track: [
    {
      title: 'Tata Boga (Culinary Art)',
      desc: 'Membekali siswa dengan keterampilan pembuatan aneka kue, pastry, roti, serta masakan nusantara untuk kesiapan wirausaha mandiri.',
      photo: '/images/dt_tata_boga.jpg',
      works: [
        'Karya Siswa: Smaneska Cupcakes, Pastry Premium, Roti Manis',
        'Keterampilan: Menghias Kue Tart, Manajemen Dapur, Higienis Sanitasi',
        'Sertifikasi: Sertifikat Kompetensi Industri Kuliner'
      ]
    },
    {
      title: 'Teknologi Informasi & Desain',
      desc: 'Pelatihan praktis desain grafis, editing video, dan dasar web desain untuk industri kreatif digital.',
      photo: '/images/dt_it_desain.jpg',
      works: [
        'Karya Siswa: Desain Poster Keren, Video Dokumenter Smaneska, Website Portfolio',
        'Keterampilan: Photoshop/Illustrator, CapCut/Premiere, HTML & CSS Dasar',
        'Sertifikasi: Sertifikat IT-Support & Creative Design'
      ]
    },
    {
      title: 'Tata Rias (Cosmetology)',
      desc: 'Keterampilan tata rias wajah pengantin, rias panggung, serta perawatan kecantikan rambut dan kulit.',
      photo: '/images/dt_tata_rias.jpg',
      works: [
        'Karya Siswa: Tata Rias Karnaval/Seni, Rias Pengantin Jawa Modern',
        'Keterampilan: Hair Styling, Makeup Karakter, Sanggul Tradisional',
        'Sertifikasi: Sertifikat Kompetensi Rias Pengantin / MUA'
      ]
    }
  ],
  seni_budaya: [
    {
      title: 'Seni Tari Turonggo Yakso',
      desc: 'Pelestarian tari jaranan khas Trenggalek yang menjadi ikon budaya utama SMANESKA di berbagai pagelaran daerah.',
      photo: '/images/sb_tari.jpg',
      works: [
        'Karya/Aktivitas: Pentas Tari HUT SMANESKA, Parade Seni Budaya Trenggalek',
        'Keterampilan: Olah Gerak Tari Turonggo Yakso, Ekspresi Karakter Tari',
        'Pencapaian: Langganan Penyaji Terbaik Festival Jaranan Kabupaten'
      ]
    },
    {
      title: 'Karawitan & Gamelan Jawa',
      desc: 'Eksplorasi musik gamelan tradisional Jawa dan aransemen campursari kreasi modern oleh siswa.',
      photo: '/images/sb_karawitan.jpg',
      works: [
        'Karya/Aktivitas: Rekaman Gending Campursari Sekolah, Pentas Karawitan',
        'Keterampilan: Teknik Menabuh Saron, Bonang, Kendang, Sinden/Vokal',
        'Fasilitas: Sanggar Seni Gamelan Perunggu Lengkap'
      ]
    },
    {
      title: 'Seni Kriya & Kerajinan Tangan',
      desc: 'Pengembangan seni rupa terapan melalui pembuatan kerajinan tangan, lukisan batik, serta ornamen kriya kayu.',
      photo: '/images/sb_kriya.jpg',
      works: [
        'Karya Siswa: Batik Tulis Smaneska, Keramik Hias, Ukiran Kayu Sederhana',
        'Keterampilan: Pewarnaan Batik, Memahat Kayu, Desain Kriya Tekstil',
        'Aktivitas: Pameran Seni Rupa Semesteran (Gelar Karya)'
      ]
    }
  ]
}


const PROGRAMS = [
  {
    title: 'Program Reguler',
    badge: 'Semua Siswa',
    badgeVariant: 'forest' as const,
    desc: 'Kurikulum Merdeka dengan pilihan mata pelajaran sesuai minat dan bakat siswa.',
    features: ['Mata Pelajaran Pilihan', 'Projek Penguatan Profil Pelajar Pancasila (P5)', 'Asesmen berbasis kompetensi', 'Pembinaan karakter'],
  },
  {
    title: 'Program Seni & Budaya',
    badge: 'Ciri Khas',
    badgeVariant: 'gold' as const,
    desc: 'Pengembangan bakat seni dan pelestarian budaya lokal Trenggalek yang terintegrasi dalam pembelajaran.',
    features: ['Seni Tari, Gamelan, Campursari', 'Turonggo Yakso & Pewayangan', 'Drama & Olah Vokal', 'Pentas seni reguler'],
  },
  {
    title: 'Program Double Track',
    badge: 'Vokasional',
    badgeVariant: 'turonggo' as const,
    desc: 'Keterampilan vokasional setara SMK untuk siswa yang ingin langsung terjun ke dunia kerja.',
    features: ['Tata Boga', 'Teknologi Informasi', 'Sertifikat kompetensi industri', 'Magang/PKL (opsional)'],
  },
]

const CALENDAR_EVENTS = [
  { month: 'Jul', event: 'Awal tahun pelajaran & MOS (Masa Orientasi Siswa)' },
  { month: 'Ags', event: 'Peringatan HUT RI – pentas seni & lomba' },
  { month: 'Sep–Okt', event: 'Ujian Tengah Semester (UTS) Ganjil' },
  { month: 'Nov–Des', event: 'Ujian Akhir Semester (UAS) Ganjil & Penerimaan Rapor' },
  { month: 'Jan', event: 'Awal Semester Genap' },
  { month: 'Feb–Mar', event: 'Ujian Tengah Semester (UTS) Genap' },
  { month: 'Apr–Mei', event: 'Ujian Sekolah Kelas XII & Ujian Akhir Semester Genap' },
  { month: 'Jun', event: 'Penerimaan Rapor & akhir tahun pelajaran' },
]

export default function Academic() {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState<'double_track' | 'seni_budaya'>('double_track')
  const [selectedProgram, setSelectedProgram] = useState<{
    title: string
    desc: string
    photo: string
    works: string[]
  } | null>(null)

  useEffect(() => {
    if (selectedProgram) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProgram])

  useEffect(() => {

    let targetId = ''
    if (pathname === ROUTE_PATHS.ACADEMIC || pathname === ROUTE_PATHS.ACADEMIC_CURRICULUM) {
      targetId = 'kurikulum'
    } else if (pathname === ROUTE_PATHS.ACADEMIC_CALENDAR) {
      targetId = 'kalender'
    } else if (pathname === ROUTE_PATHS.ACADEMIC_TEACHERS) {
      targetId = 'daftar-guru'
    }

    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  const leadership = teachers.filter(t => t.position && (t.position.includes('Waka') || t.position === 'Kepala Sekolah'))
  const regularTeachers = teachers.filter(t => !t.position?.includes('Waka') && t.position !== 'Kepala Sekolah')

  return (
    <>
      <SEO
        title="Kurikulum & Akademik"
        description="Informasi program akademik SMA Negeri 1 Karangan (SMANESKA). Menyediakan program reguler, program berwawasan seni budaya, program vokasional Double Track, kalender akademik, dan direktori guru."
        keywords="kurikulum smaneska, program double track trenggalek, kalender akademik sman 1 karangan, daftar guru smaneska"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Akademik</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Kurikulum & Program
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Informasi lengkap mengenai kurikulum, program unggulan, kalender akademik,
            dan tenaga pendidik SMANESKA.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── KURIKULUM ───────────────────────────────────────── */}
      <section id="kurikulum" className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kurikulum"
            title="Program Pendidikan"
            description="SMANESKA menerapkan Kurikulum Merdeka dengan ciri khas Bahasa & Budaya, memberikan keleluasaan siswa untuk mengeksplorasi minat dan potensinya."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, index) => (
              <ScrollReveal
                key={prog.title}
                animation="fade-in-up"
                delay={index * 150}
                className="flex flex-col rounded-2xl bg-paper border border-ink/8 overflow-hidden hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant={prog.badgeVariant}>{prog.badge}</Badge>
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg mb-2">{prog.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{prog.desc}</p>
                </div>
                <div className="px-6 pb-6 mt-auto">
                  <div className="pt-4 border-t border-ink/6 space-y-2">
                    {prog.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <span className="size-1.5 rounded-full bg-gold shrink-0" />
                        <span className="text-sm text-ink/70">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERI DETAIL PROGRAM UNGGULAN ─────────────────── */}
      <section id="galeri-program" className="bg-paper py-16 lg:py-20 border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Gelar Karya & Kompetensi"
            title="Galeri Program Unggulan"
            align="center"
            description="Detail bidang keterampilan vokasional siswa pada Program Double Track serta pelestarian warisan budaya di kelas Seni & Budaya SMANESKA."
          />

          {/* Tab Switcher */}
          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex rounded-xl bg-canvas p-1.5 border border-ink/6">
              <button
                onClick={() => setActiveTab('double_track')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'double_track'
                    ? 'bg-forest text-white shadow-sm'
                    : 'text-ink/65 hover:text-ink hover:bg-ink/4'
                }`}
              >
                <Sparkles className="size-4" />
                Double Track (Vokasional)
              </button>
              <button
                onClick={() => setActiveTab('seni_budaya')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'seni_budaya'
                    ? 'bg-forest text-white shadow-sm'
                    : 'text-ink/65 hover:text-ink hover:bg-ink/4'
                }`}
              >
                <Award className="size-4" />
                Seni & Budaya (Kearifan Lokal)
              </button>
            </div>
          </div>

          {/* Grid Detail Kartu */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_DETAILS[activeTab].map((item, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-in-up"
                delay={idx * 150}
                onClick={() => setSelectedProgram(item)}
                className="group flex flex-col rounded-2xl bg-canvas border border-ink/8 overflow-hidden hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-1 hover:border-forest/15 transition-all duration-300 cursor-pointer"
              >
                {/* Photo Cover Container */}
                <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-ink/6 bg-forest/5">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={activeTab === 'double_track' ? 'turonggo' : 'gold'} size="sm">
                      {activeTab === 'double_track' ? 'Vokasional' : 'Seni Budaya'}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-forest text-lg mb-2.5 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink/70 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Works / Skills bullet list */}
                  <div className="pt-4 border-t border-ink/6 space-y-3">
                    {item.works.map((w, wIdx) => (
                      <div key={wIdx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 size-1.5 rounded-full bg-gold shrink-0" />
                        <span className="text-xs text-ink/75 leading-relaxed font-medium">{w}</span>
                      </div>
                    ))}
                    <div className="pt-2 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest group-hover:text-gold transition-colors">
                        Lihat Portofolio & Sertifikasi
                        <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KALENDER AKADEMIK ───────────────────────────────── */}
      <section id="kalender" className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kalender Akademik"
            title="Jadwal Kegiatan Tahun Pelajaran 2025/2026"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CALENDAR_EVENTS.map(({ month, event }, index) => (
              <ScrollReveal
                key={month}
                animation="fade-in-up"
                delay={index * 100}
                className="flex gap-4 p-4 rounded-xl bg-canvas border border-ink/8 hover:border-forest/20 transition-colors"
              >
                <div className="shrink-0">
                  <div className="size-10 rounded-lg bg-forest flex items-center justify-center">
                    <Calendar className="size-4 text-white/80" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-gold uppercase tracking-wider mb-1">{month}</p>
                  <p className="text-xs text-ink/70 leading-snug">{event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-forest/5 border border-forest/15">
            <Clock className="size-4 text-forest shrink-0" />
            <p className="text-sm text-ink/60">
              Kalender akademik dapat berubah menyesuaikan kebijakan Dinas Pendidikan Provinsi Jawa Timur.
              Perubahan akan diumumkan melalui website dan papan pengumuman sekolah.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DAFTAR GURU ─────────────────────────────────────── */}
      <section id="daftar-guru" className="bg-paper py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Tenaga Pendidik"
            title="Daftar Guru & Staf"
            description={`SMANESKA didukung oleh ${SITE_CONFIG.stats.teachers} tenaga pendidik berpengalaman dan berkompeten di bidangnya.`}
          />

          {/* Pimpinan */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Filter className="size-4 text-forest" />
              <span className="font-semibold text-sm text-ink">Pimpinan Sekolah</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {leadership.map((t, index) => (
                <ScrollReveal
                  key={t.id}
                  animation="fade-in-up"
                  delay={index * 100}
                  className="group flex flex-col rounded-2xl bg-paper border border-ink/8 overflow-hidden hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Portrait Photo Container */}
                  <div className="aspect-[4/5] bg-forest/8 flex items-center justify-center overflow-hidden relative border-b border-ink/6">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Users className="size-20 text-forest/40" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col items-center text-center">
                    <p className="font-display font-bold text-ink text-base sm:text-lg leading-snug mb-1.5 group-hover:text-forest transition-colors">{t.name}</p>
                    {t.position && (
                      <Badge variant="gold" size="sm" className="mb-2">{t.position}</Badge>
                    )}
                    <p className="text-xs text-ink/50 mt-1.5 font-mono uppercase tracking-wider">{t.subject !== '-' ? t.subject : t.education}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Guru */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Filter className="size-4 text-forest" />
              <span className="font-semibold text-sm text-ink">Dewan Guru</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regularTeachers.map((t, index) => (
                <ScrollReveal
                  key={t.id}
                  animation="fade-in-up"
                  delay={(index % 4) * 100}
                  className="group flex flex-col rounded-2xl bg-paper border border-ink/8 overflow-hidden hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Portrait Photo Container */}
                  <div className="aspect-[4/5] bg-forest/8 flex items-center justify-center overflow-hidden relative border-b border-ink/6">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Users className="size-16 text-forest/40" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-display font-semibold text-ink text-sm sm:text-base leading-snug mb-1 group-hover:text-forest transition-colors line-clamp-2">{t.name}</p>
                      <p className="text-xs text-forest/70 font-medium">{t.subject}</p>
                    </div>
                    <p className="text-xs text-ink/40 mt-2 font-mono uppercase tracking-wider">{t.education}</p>
                  </div>
                </ScrollReveal>
              ))}
              {/* Placeholder sisanya */}
              <ScrollReveal
                animation="fade-in-up"
                delay={(regularTeachers.length % 4) * 100}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-ink/20 text-center min-h-[250px] bg-paper"
              >
                <div>
                  <p className="font-mono text-3xl font-bold text-ink/20">
                    +{SITE_CONFIG.stats.teachers - teachers.length}
                  </p>
                  <p className="text-xs text-ink/40 mt-1 font-mono uppercase tracking-wider">guru lainnya</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="bg-canvas py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-forest flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-1">Punya pertanyaan?</p>
              <h2 className="font-display font-bold text-white text-xl">Hubungi bagian Kurikulum</h2>
            </div>
            <Link to={ROUTE_PATHS.CONTACT}>
              <Button variant="secondary">
                Kontak Kami <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Detail Program */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedProgram(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-paper rounded-3xl overflow-hidden shadow-2xl border border-ink/8 transform transition-all duration-300 scale-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white md:bg-paper md:text-ink/65 md:hover:bg-ink/5 md:border md:border-ink/10 transition-all cursor-pointer shadow-md"
              aria-label="Tutup"
            >
              <X className="size-5" />
            </button>

            {/* Left: Image Panel */}
            <div className="w-full md:w-5/12 relative aspect-[4/3] md:aspect-auto bg-forest/5 flex-shrink-0">
              <img
                src={selectedProgram.photo}
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden">
                <Badge variant={activeTab === 'double_track' ? 'turonggo' : 'gold'}>
                  {activeTab === 'double_track' ? 'Vokasional' : 'Kearifan Lokal'}
                </Badge>
              </div>
            </div>

            {/* Right: Info Panel */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="hidden md:block mb-3">
                  <Badge variant={activeTab === 'double_track' ? 'turonggo' : 'gold'}>
                    {activeTab === 'double_track' ? 'Double Track' : 'Seni & Budaya'}
                  </Badge>
                </div>

                <h3 className="font-display font-bold text-ink text-xl sm:text-2xl mb-3 leading-snug">
                  {selectedProgram.title}
                </h3>
                
                <p className="text-sm text-ink/70 leading-relaxed mb-6">
                  {selectedProgram.desc}
                </p>

                {/* Details Section */}
                <div className="space-y-4 pt-4 border-t border-ink/8">
                  {selectedProgram.works.map((w, idx) => {
                    const parts = w.split(': ')
                    const hasLabel = parts.length > 1
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 size-7 rounded-lg bg-forest/8 flex items-center justify-center shrink-0">
                          {idx === 0 ? (
                            <Sparkles className="size-4 text-forest" />
                          ) : idx === 1 ? (
                            <Users className="size-4 text-forest" />
                          ) : (
                            <Award className="size-4 text-forest" />
                          )}
                        </div>
                        <div>
                          {hasLabel ? (
                            <p className="text-xs text-ink/40 font-mono uppercase tracking-wider mb-0.5">{parts[0]}</p>
                          ) : null}
                          <p className="text-sm text-ink/80 leading-relaxed font-medium">
                            {hasLabel ? parts[1] : w}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-ink/6 flex justify-end">
                <Button 
                  onClick={() => setSelectedProgram(null)}
                  variant="primary"
                  size="sm"
                  className="cursor-pointer"
                >
                  Tutup Detail
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
