// Barrel export — import semua tipe dari satu titik:
// import type { NewsArticle, Teacher } from '@/types'

export type { NewsArticle, NewsCategory } from './news.types'
export { NEWS_CATEGORY_LABELS } from './news.types'

export type { Teacher, Staff } from './teacher.types'

export type {
  Achievement,
  AchievementLevel,
  AchievementCategory,
} from './achievement.types'
export { ACHIEVEMENT_LEVEL_LABELS, ACHIEVEMENT_CATEGORY_LABELS } from './achievement.types'

export type { Extracurricular, GalleryItem } from './extracurricular.types'

export type { Testimonial } from './testimonial.types'

