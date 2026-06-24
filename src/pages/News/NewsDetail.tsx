import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { ROUTE_PATHS } from '@/routes/routePaths'
import Badge from '@/components/common/Badge'
import NewsCard from '@/components/sections/NewsCard'
import SEO from '@/components/common/SEO'
import ScrollReveal from '@/components/common/ScrollReveal'
import { formatDate } from '@/utils'
import { SITE_CONFIG } from '@/constants/siteConfig'
import newsData from '@/data/news.json'
import { type NewsArticle, NEWS_CATEGORY_LABELS } from '@/types/news.types'

const news = newsData as NewsArticle[]

const categoryVariant: Record<string, 'forest' | 'gold' | 'turonggo' | 'neutral'> = {
  pengumuman: 'turonggo',
  kegiatan:   'forest',
  prestasi:   'gold',
  akademik:   'forest',
  ppdb:       'turonggo',
  umum:       'neutral',
}

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article  = news.find((n) => n.slug === slug)

  if (!article) return <Navigate to={ROUTE_PATHS.NEWS} replace />

  const related = news
    .filter((n) => n.id !== article.id && n.category === article.category)
    .slice(0, 3)

  const badgeVariant = categoryVariant[article.category] ?? 'neutral'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.coverImage ? [article.coverImage] : [],
    'datePublished': article.publishedAt,
    'author': {
      '@type': 'Person',
      'name': article.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.fullName,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_CONFIG.contact.website}/logo.png`,
      },
    },
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags.length > 0 ? article.tags.join(', ') : 'berita smaneska, kabar sman 1 karangan, pengumuman sekolah'}
        schema={articleSchema}
      />
      {/* ─── HEADER ARTIKEL ──────────────────────────────────── */}
      <section className="relative bg-forest pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, #c98a2b 0%, transparent 60%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            to={ROUTE_PATHS.NEWS}
            className="inline-flex items-center gap-1.5 text-white/50 text-sm hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Kembali ke Berita
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant={badgeVariant}>
              {NEWS_CATEGORY_LABELS[article.category]}
            </Badge>
            {article.featured && <Badge variant="gold">Unggulan</Badge>}
          </div>

          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {article.author}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-canvas" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ─── KONTEN ARTIKEL ──────────────────────────────────── */}
      <section className="bg-canvas py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cover image */}
          <ScrollReveal animation="fade-in-left">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-forest/10 via-forest/15 to-forest/20 mb-10 flex items-center justify-center border border-ink/8 overflow-hidden relative">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="size-full object-cover"
                />
              ) : (
                <Tag className="size-16 text-forest/20" />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-right">
            {/* Lead / excerpt */}
            <p className="text-lg text-ink/70 leading-relaxed border-l-4 border-gold pl-5 mb-8 font-display italic">
              {article.excerpt}
            </p>

            {/* Body */}
            <div className="prose prose-sm max-w-none text-ink/75 leading-relaxed space-y-4">
              {article.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-ink/8">
                <span className="text-xs text-ink/40 font-mono uppercase tracking-wider self-center mr-2">
                  Tag:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-forest/8 text-forest border border-forest/15"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Navigasi artikel */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-ink/8">
            <Link
              to={ROUTE_PATHS.NEWS}
              className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-forest transition-colors"
            >
              <ArrowLeft className="size-4" /> Semua Berita
            </Link>
            <Link
              to={ROUTE_PATHS.NEWS}
              className="inline-flex items-center gap-2 text-sm text-forest font-medium hover:text-forest/70 transition-colors"
            >
              Berita Lainnya <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BERITA TERKAIT ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-paper py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-ink text-2xl mb-8">Berita Terkait</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, idx) => (
                <ScrollReveal
                  key={a.id}
                  animation="fade-in-up"
                  delay={idx * 100}
                >
                  <NewsCard article={a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
