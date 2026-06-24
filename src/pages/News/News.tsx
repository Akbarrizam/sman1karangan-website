import { useState } from 'react'
import { Search } from 'lucide-react'
import SectionHeader from '@/components/sections/SectionHeader'
import NewsCard from '@/components/sections/NewsCard'
import Badge from '@/components/common/Badge'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import newsData from '@/data/news.json'
import { type NewsArticle, type NewsCategory, NEWS_CATEGORY_LABELS } from '@/types/news.types'

const news = newsData as NewsArticle[]

type FilterCat = 'semua' | NewsCategory

const CATEGORIES: { value: FilterCat; label: string }[] = [
  { value: 'semua',       label: 'Semua' },
  { value: 'kegiatan',    label: NEWS_CATEGORY_LABELS['kegiatan'] },
  { value: 'prestasi',    label: NEWS_CATEGORY_LABELS['prestasi'] },
  { value: 'akademik',    label: NEWS_CATEGORY_LABELS['akademik'] },
  { value: 'pengumuman',  label: NEWS_CATEGORY_LABELS['pengumuman'] },
  { value: 'ppdb',        label: NEWS_CATEGORY_LABELS['ppdb'] },
]

export default function News() {
  const [activeCategory, setActiveCategory] = useState<FilterCat>('semua')
  const [query, setQuery] = useState('')

  const filtered = news.filter((n) => {
    const catMatch   = activeCategory === 'semua' || n.category === activeCategory
    const queryMatch = query === '' ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(query.toLowerCase())
    return catMatch && queryMatch
  })



  const featuredNews = news.filter((n) => n.featured)

  return (
    <>
      <SEO
        title="Berita & Kegiatan"
        description="Kumpulan kabar, pengumuman resmi, agenda sekolah, dan liputan berita kegiatan murid serta prestasi terbaru SMAN 1 Karangan (SMANESKA)."
        keywords="berita smaneska, kabar sman 1 karangan, pengumuman sekolah, kegiatan tari smaneska"
      />
      {/* ─── PAGE HEADER ─────────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c98a2b 0%, transparent 55%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" className="mb-4">Informasi</Badge>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4 leading-tight">
            Berita & Kegiatan
          </h1>
          <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
            Ikuti perkembangan terbaru kegiatan, prestasi, dan pengumuman resmi dari SMANESKA.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── BERITA UNGGULAN ─────────────────────────────────── */}
      {featuredNews.length > 0 && (
        <section className="bg-canvas py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Sorotan" title="Berita Unggulan" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.slice(0, 3).map((article, idx) => (
                <ScrollReveal
                  key={article.id}
                  animation="fade-in-up"
                  delay={idx * 100}
                >
                  <NewsCard article={article} variant="featured" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SEMUA BERITA ─────────────────────────────────────── */}
      <section className="bg-canvas py-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Arsip" title="Semua Berita" />

          {/* Toolbar: search + filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink/30" />
              <input
                type="search"
                placeholder="Cari berita…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest/40 transition"
              />
            </div>
            {/* Filter kategori */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === value
                      ? 'bg-forest text-white shadow-sm'
                      : 'bg-paper border border-ink/15 text-ink/60 hover:border-forest/30 hover:text-forest'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, idx) => (
                <ScrollReveal
                  key={article.id}
                  animation="fade-in-up"
                  delay={(idx % 3) * 100}
                >
                  <NewsCard article={article} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="size-12 text-ink/15 mx-auto mb-3" />
              <p className="text-ink/40">Tidak ada berita yang sesuai pencarian.</p>
              <button
                onClick={() => { setActiveCategory('semua'); setQuery('') }}
                className="mt-4 text-sm text-forest hover:underline"
              >
                Reset pencarian
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
