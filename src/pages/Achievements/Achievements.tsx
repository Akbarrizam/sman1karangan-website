import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ArrowRight, Search } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import SectionHeader from '@/components/sections/SectionHeader'
import AchievementCard from '@/components/sections/AchievementCard'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import achievementsData from '@/data/achievements.json'
import {
  type Achievement,
  type AchievementLevel,
  type AchievementCategory,
  ACHIEVEMENT_LEVEL_LABELS,
  ACHIEVEMENT_CATEGORY_LABELS,
} from '@/types/achievement.types'

const achievements = achievementsData as Achievement[]

type FilterLevel    = 'semua' | AchievementLevel
type FilterCategory = 'semua' | AchievementCategory

export default function Achievements() {
  const [activeLevel,    setActiveLevel]    = useState<FilterLevel>('semua')
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('semua')
  const [query, setQuery] = useState('')

  const filtered = achievements.filter((a) => {
    const levelMatch    = activeLevel    === 'semua' || a.level    === activeLevel
    const categoryMatch = activeCategory === 'semua' || a.category === activeCategory
    const queryMatch    = query === '' ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase()) ||
      a.organizer?.toLowerCase().includes(query.toLowerCase()) ||
      a.participants?.some(p => p.toLowerCase().includes(query.toLowerCase()))
    return levelMatch && categoryMatch && queryMatch
  })


  const topPrestasi = achievements.filter(
    (a) => a.level === 'nasional' || a.level === 'provinsi',
  )

  return (
    <>
      <SEO
        title="Prestasi & Penghargaan"
        description="Daftar lengkap prestasi akademik dan non-akademik siswa SMAN 1 Karangan (SMANESKA) Trenggalek di tingkat kabupaten, provinsi, hingga nasional."
        keywords="prestasi smaneska, penghargaan sman 1 karangan, juara debat trenggalek, lomba sains sma"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Prestasi</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Prestasi SMANESKA
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Rekam jejak pencapaian siswa SMANESKA di bidang akademik, seni budaya,
            olahraga, dan kepramukaan dari tingkat kabupaten hingga nasional.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── STATISTIK PRESTASI ──────────────────────────────── */}
      <section className="bg-canvas py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '150+', label: 'Total Prestasi',          color: 'text-forest' },
              { value: topPrestasi.length.toString(), label: 'Nasional & Provinsi', color: 'text-gold' },
              { value: '4',    label: 'Bidang Keunggulan',        color: 'text-forest' },
              { value: '2025', label: 'Tahun Terakhir',           color: 'text-turonggo' },
            ].map(({ value, label, color }, idx) => (
              <ScrollReveal
                key={label}
                animation="fade-in-up"
                delay={idx * 100}
                className="p-5 rounded-2xl bg-paper border border-ink/8 text-center"
              >
                <p className={`font-display font-bold text-3xl mb-1 ${color}`}>{value}</p>
                <p className="font-mono text-xs text-ink/50 uppercase tracking-wider">{label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRESTASI UNGGULAN ───────────────────────────────── */}
      <section className="bg-canvas pb-4 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Tertinggi"
            title="Prestasi Nasional & Provinsi"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {topPrestasi.map((a, idx) => (
              <ScrollReveal
                key={a.id}
                animation="fade-in-up"
                delay={(idx % 3) * 100}
              >
                <AchievementCard achievement={a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEMUA PRESTASI ──────────────────────────────────── */}
      <section className="bg-canvas py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Katalog Lengkap"
            title="Semua Prestasi"
          />

          {/* Toolbar: search + filter */}
          <div className="space-y-4 mb-8">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink/30" />
              <input
                type="search"
                placeholder="Cari prestasi (nama siswa, lomba, dll)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest/40 transition"
              />
            </div>

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pt-1">
              {/* Filter Level */}
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs text-ink/40 font-mono uppercase mr-1 self-center">
                  <Filter className="size-3" /> Level:
                </span>
                {(['semua', 'kabupaten', 'provinsi', 'nasional'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeLevel === lvl
                        ? 'bg-forest text-white shadow-sm'
                        : 'bg-paper border border-ink/15 text-ink/60 hover:border-forest/30 hover:text-forest'
                    }`}
                  >
                    {lvl === 'semua' ? 'Semua' : ACHIEVEMENT_LEVEL_LABELS[lvl]}
                  </button>
                ))}
              </div>

              {/* Filter Kategori */}
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs text-ink/40 font-mono uppercase mr-1 self-center">
                  Bidang:
                </span>
                {(['semua', 'akademik', 'seni-budaya', 'olahraga', 'pramuka'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-gold text-white shadow-sm'
                        : 'bg-paper border border-ink/15 text-ink/60 hover:border-gold/40 hover:text-gold'
                    }`}
                  >
                    {cat === 'semua' ? 'Semua' : ACHIEVEMENT_CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, idx) => (
                <ScrollReveal
                  key={a.id}
                  animation="fade-in-up"
                  delay={(idx % 3) * 100}
                >
                  <AchievementCard achievement={a} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="size-12 text-ink/15 mx-auto mb-3" />
              <p className="text-ink/40 font-medium">Tidak ada prestasi yang sesuai pencarian / filter.</p>
              <button
                onClick={() => { setActiveLevel('semua'); setActiveCategory('semua'); setQuery('') }}
                className="mt-4 text-sm text-forest hover:underline font-semibold"
              >
                Reset pencarian & filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="bg-canvas py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-forest flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs text-gold/70 uppercase tracking-widest mb-1">Bergabunglah</p>
              <h2 className="font-display font-bold text-white text-xl">Jadilah bagian dari generasi berprestasi SMANESKA</h2>
            </div>
            <Link to={ROUTE_PATHS.ADMISSION}>
              <Button variant="secondary">
                Info PPDB <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
