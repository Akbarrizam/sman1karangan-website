import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Users, Clock, ChevronRight, ArrowRight, Music4, Dumbbell, BookOpen, Compass } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import SectionHeader from '@/components/sections/SectionHeader'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import extracurricularsData from '@/data/extracurriculars.json'
import { type Extracurricular } from '@/types/extracurricular.types'

const extracurriculars = extracurricularsData as Extracurricular[]

type FilterCategory = 'semua' | Extracurricular['category']

const CATEGORY_FILTERS: { value: FilterCategory; label: string; icon: typeof Music4 }[] = [
  { value: 'semua',       label: 'Semua',       icon: ChevronRight },
  { value: 'seni-budaya', label: 'Seni & Budaya', icon: Music4 },
  { value: 'olahraga',    label: 'Olahraga',    icon: Dumbbell },
  { value: 'akademik',    label: 'Akademik',    icon: BookOpen },
  { value: 'organisasi',  label: 'Organisasi',  icon: Compass },
]

const categoryBadge: Record<string, 'forest' | 'gold' | 'turonggo' | 'neutral'> = {
  'seni-budaya': 'gold',
  'olahraga':    'forest',
  'akademik':    'forest',
  'organisasi':  'turonggo',
  'keagamaan':   'neutral',
}

const OSIS_PROGRAMS = [
  'Latihan Dasar Kepemimpinan Siswa (LDKS)',
  'Pensi (Pentas Seni) Tahunan',
  'Pameran Karya Siswa',
  'Bakti Sosial & Gerakan Lingkungan Hidup',
  'Peringatan Hari Nasional & Keagamaan',
  'Masa Pengenalan Lingkungan Sekolah (MPLS)',
]

export default function Student() {
  const { pathname } = useLocation()

  useEffect(() => {
    let targetId = ''
    if (pathname === ROUTE_PATHS.STUDENT || pathname === ROUTE_PATHS.STUDENT_EXTRACURRICULAR) {
      targetId = 'ekstrakurikuler'
    } else if (pathname === ROUTE_PATHS.STUDENT_OSIS) {
      targetId = 'osis'
    } else if (pathname === ROUTE_PATHS.STUDENT_RULES) {
      targetId = 'tata-tertib'
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

  const [activeFilter, setActiveFilter] = useState<FilterCategory>('semua')

  const filtered =
    activeFilter === 'semua'
      ? extracurriculars
      : extracurriculars.filter((e) => e.category === activeFilter)

  return (
    <>
      <SEO
        title="Kesiswaan & Ekstrakurikuler"
        description="Jelajahi kehidupan kesiswaan di SMAN 1 Karangan (SMANESKA). Informasi organisasi OSIS, daftar 18 ekstrakurikuler (tari, olahraga, musik), dan tata tertib siswa."
        keywords="kesiswaan smaneska, ekskul smaneska, osis sman 1 karangan, tata tertib siswa sma, kegiatan non akademik"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Kesiswaan</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Kehidupan Siswa SMANESKA
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Dari seni budaya hingga olahraga, dari kepramukaan hingga sains — SMANESKA
            menyediakan wadah bagi setiap potensi siswa.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── EKSTRAKURIKULER ─────────────────────────────────── */}
      <section id="ekstrakurikuler" className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kegiatan Siswa"
            title="Ekstrakurikuler"
            description={`${extracurriculars.length} pilihan kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa di luar jam pelajaran.`}
          />

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORY_FILTERS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === value
                    ? 'bg-forest text-white shadow-sm'
                    : 'bg-paper border border-ink/15 text-ink/60 hover:border-forest/30 hover:text-forest'
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ekskul, idx) => (
              <ScrollReveal
                key={ekskul.id}
                animation="fade-in-up"
                delay={(idx % 3) * 100}
                className="group flex flex-col rounded-2xl bg-paper border border-ink/8 overflow-hidden hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Header berwarna */}
                <div className={`h-2 ${
                  ekskul.category === 'seni-budaya' ? 'bg-gradient-to-r from-gold/70 to-gold' :
                  ekskul.category === 'olahraga'    ? 'bg-gradient-to-r from-forest/70 to-forest' :
                  ekskul.category === 'akademik'    ? 'bg-gradient-to-r from-forest/50 to-forest/80' :
                  'bg-gradient-to-r from-turonggo/50 to-turonggo/70'
                }`} />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={categoryBadge[ekskul.category] ?? 'neutral'} size="sm">
                      {CATEGORY_FILTERS.find(f => f.value === ekskul.category)?.label ?? ekskul.category}
                    </Badge>
                    {ekskul.memberCount && (
                      <span className="flex items-center gap-1 text-xs text-ink/40 font-mono">
                        <Users className="size-3" />
                        {ekskul.memberCount}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-ink text-base mb-2 group-hover:text-forest transition-colors">
                    {ekskul.name}
                  </h3>
                  <p className="text-sm text-ink/60 leading-relaxed flex-1 mb-4">
                    {ekskul.description}
                  </p>

                  <div className="pt-4 border-t border-ink/6 space-y-2">
                    {ekskul.schedule && (
                      <div className="flex items-start gap-2 text-xs text-ink/50">
                        <Clock className="size-3.5 shrink-0 mt-0.5 text-forest/60" />
                        <span>{ekskul.schedule}</span>
                      </div>
                    )}
                    {ekskul.coach && (
                      <div className="flex items-center gap-2 text-xs text-ink/50">
                        <Users className="size-3.5 shrink-0 text-forest/60" />
                        <span>{ekskul.coach}</span>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OSIS ────────────────────────────────────────────── */}
      <section id="osis" className="bg-paper py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal animation="fade-in-left">
              <SectionHeader
                eyebrow="Organisasi Siswa"
                title="OSIS SMANESKA"
                description="Organisasi Intra Sekolah (OSIS) SMANESKA merupakan wadah kepemimpinan dan pengembangan diri siswa. OSIS aktif di media sosial Instagram dan mengelola berbagai program kegiatan siswa sepanjang tahun."
              />
              <div className="space-y-2.5 mb-8">
                {OSIS_PROGRAMS.map((prog) => (
                  <div key={prog} className="flex items-center gap-3 text-sm text-ink/70">
                    <ChevronRight className="size-4 text-gold shrink-0" />
                    {prog}
                  </div>
                ))}
              </div>
              <a
                href="https://instagram.com/osis_smaneska"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-forest/25 text-forest font-medium text-sm hover:bg-forest hover:text-white transition-all duration-200"
              >
                Follow @osis_smaneska
                <ArrowRight className="size-4" />
              </a>
            </ScrollReveal>

            {/* Stat box */}
            <ScrollReveal animation="fade-in-right" className="grid grid-cols-2 gap-4">
              {[
                { value: '720+', label: 'Siswa Aktif', color: 'bg-forest' },
                { value: '18',   label: 'Ekskul',      color: 'bg-gold' },
                { value: '12',   label: 'Pengurus OSIS',color: 'bg-turonggo' },
                { value: '3',    label: 'Periode OSIS', color: 'bg-forest/70' },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className={`${color} rounded-2xl p-6 flex flex-col items-center justify-center text-center`}
                >
                  <p className="font-display font-bold text-white text-4xl mb-1">{value}</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TATA TERTIB ─────────────────────────────────────── */}
      <section id="tata-tertib" className="bg-canvas py-16 lg:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <SectionHeader
            eyebrow="Regulasi Sekolah"
            title="Tata Tertib Siswa"
            description="Tata tertib sekolah diterapkan untuk menciptakan lingkungan belajar yang kondusif, aman, dan nyaman bagi seluruh warga sekolah."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Kehadiran', rules: ['Hadir paling lambat 07.00 WIB', 'Melapor ke guru piket jika terlambat', 'Izin tidak masuk dilengkapi surat'] },
              { title: 'Penampilan', rules: ['Seragam sesuai ketentuan sekolah', 'Rambut rapi (tidak diwarnai)', 'Tidak menggunakan aksesoris berlebihan'] },
              { title: 'Perilaku', rules: ['Menghormati guru dan sesama siswa', 'Tidak menggunakan HP saat KBM', 'Menjaga kebersihan lingkungan sekolah'] },
              { title: 'Akademik', rules: ['Mengerjakan semua tugas tepat waktu', 'Tidak berlaku curang saat ujian', 'Aktif mengikuti kegiatan sekolah'] },
            ].map(({ title, rules }, idx) => (
              <ScrollReveal
                key={title}
                animation="fade-in-up"
                delay={idx * 100}
                className="p-6 rounded-xl bg-paper border border-ink/8"
              >
                <h3 className="font-display font-semibold text-ink mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5 text-sm text-ink/70">
                      <span className="size-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink/40 text-center font-mono">
            Tata tertib lengkap tersedia di sekretariat sekolah.
          </p>
        </div>
      </section>
    </>
  )
}
