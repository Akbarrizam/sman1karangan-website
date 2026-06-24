export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  category: NewsCategory
  publishedAt: string // ISO 8601
  updatedAt?: string
  tags: string[]
  featured: boolean
}

export type NewsCategory =
  | 'pengumuman'
  | 'kegiatan'
  | 'prestasi'
  | 'akademik'
  | 'ppdb'
  | 'umum'

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  pengumuman: 'Pengumuman',
  kegiatan: 'Kegiatan',
  prestasi: 'Prestasi',
  akademik: 'Akademik',
  ppdb: 'PPDB',
  umum: 'Umum',
}
