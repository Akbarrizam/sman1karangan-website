import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { type NewsArticle, NEWS_CATEGORY_LABELS } from '@/types/news.types'
import { formatDate, truncate } from '@/utils'
import Badge from '@/components/common/Badge'

interface NewsCardProps {
  article: NewsArticle
  variant?: 'default' | 'horizontal' | 'featured'
}

const categoryVariant: Record<string, 'forest' | 'gold' | 'turonggo' | 'neutral'> = {
  pengumuman: 'turonggo',
  kegiatan:   'forest',
  prestasi:   'gold',
  akademik:   'forest',
  ppdb:       'turonggo',
  umum:       'neutral',
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  const href = `/berita/${article.slug}`
  const badgeVariant = categoryVariant[article.category] ?? 'neutral'
  const categoryLabel = NEWS_CATEGORY_LABELS[article.category] ?? article.category

  if (variant === 'featured') {
    return (
      <article className="group relative rounded-2xl overflow-hidden bg-forest aspect-[16/9] sm:aspect-auto sm:h-96">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>
            {/* Placeholder background */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest/80 to-ink" />

            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 80%, #c98a2b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)',
              }}
            />
          </>
        )}

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-forest/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={badgeVariant}>{categoryLabel}</Badge>
            {article.featured && (
              <Badge variant="gold">Unggulan</Badge>
            )}
          </div>
          <h2 className="font-display font-bold text-white text-xl sm:text-2xl leading-snug mb-3 group-hover:text-gold transition-colors">
            <Link to={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h2>
          <p className="text-white/70 text-sm line-clamp-2 mb-4 hidden sm:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-white/50 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span>{article.author}</span>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-5 p-4 rounded-xl hover:bg-forest/4 transition-colors">
        {/* Tanggal box */}
        <div className="shrink-0 w-14 text-center">
          <p className="font-mono text-2xl font-bold text-forest leading-none">
            {new Date(article.publishedAt).getDate().toString().padStart(2, '0')}
          </p>
          <p className="font-mono text-xs text-ink/40 uppercase tracking-wider mt-0.5">
            {new Date(article.publishedAt).toLocaleDateString('id-ID', { month: 'short' })}
          </p>
        </div>

        <div className="flex-1 min-w-0 border-l border-ink/10 pl-5">
          <Badge variant={badgeVariant} size="sm" className="mb-2">
            {categoryLabel}
          </Badge>
          <h3 className="font-display font-semibold text-ink text-sm leading-snug line-clamp-2 group-hover:text-forest transition-colors">
            <Link to={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h3>
        </div>
      </article>
    )
  }

  // Default card
  return (
    <article className="group relative flex flex-col rounded-2xl bg-paper border border-ink/8 overflow-hidden hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300">
      {/* Cover Image / Image placeholder */}
      <div className="aspect-video bg-gradient-to-br from-forest/10 to-forest/20 relative overflow-hidden">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Tag className="size-10 text-forest/20" />
          </div>
        )}
        {/* Category ribbon */}
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant}>{categoryLabel}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3 text-ink/40 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h3 className="font-display font-semibold text-ink text-base leading-snug mb-2 group-hover:text-forest transition-colors line-clamp-2">
          <Link to={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>

        <p className="text-sm text-ink/60 leading-relaxed line-clamp-3 flex-1">
          {truncate(article.excerpt, 140)}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink/6">
          <span className="text-xs text-ink/40 font-mono">{article.author}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-forest opacity-0 group-hover:opacity-100 transition-opacity">
            Baca
            <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </article>
  )
}
