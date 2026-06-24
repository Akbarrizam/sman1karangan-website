import { Trophy, Award } from 'lucide-react'
import {
  type Achievement,
  ACHIEVEMENT_LEVEL_LABELS,
  ACHIEVEMENT_CATEGORY_LABELS,
} from '@/types/achievement.types'
import Badge from '@/components/common/Badge'
import { cx } from '@/utils'

interface AchievementCardProps {
  achievement: Achievement
  variant?: 'default' | 'compact'
}

const levelBadgeVariant: Record<string, 'forest' | 'gold' | 'turonggo' | 'neutral'> = {
  sekolah:        'neutral',
  kabupaten:      'forest',
  provinsi:       'gold',
  nasional:       'turonggo',
  internasional:  'turonggo',
}

const levelAccentColor: Record<string, string> = {
  sekolah:        'border-ink/20',
  kabupaten:      'border-forest/30',
  provinsi:       'border-gold/50',
  nasional:       'border-turonggo/40',
  internasional:  'border-turonggo/60',
}

const trophyColor: Record<string, string> = {
  sekolah:        'text-ink/30',
  kabupaten:      'text-forest/60',
  provinsi:       'text-gold',
  nasional:       'text-turonggo',
  internasional:  'text-turonggo',
}

export default function AchievementCard({ achievement, variant = 'default' }: AchievementCardProps) {
  const badgeVariant = levelBadgeVariant[achievement.level] ?? 'neutral'
  const accentBorder = levelAccentColor[achievement.level] ?? 'border-ink/20'
  const iconColor    = trophyColor[achievement.level] ?? 'text-ink/30'

  if (variant === 'compact') {
    return (
      <div className={cx(
        'flex items-start gap-4 p-4 rounded-xl border-l-4 bg-paper',
        accentBorder,
      )}>
        <Award className={cx('size-5 shrink-0 mt-0.5', iconColor)} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink leading-snug line-clamp-2">
            {achievement.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant={badgeVariant} size="sm">
              {ACHIEVEMENT_LEVEL_LABELS[achievement.level]}
            </Badge>
            <span className="font-mono text-xs text-ink/40">{achievement.year}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cx(
      'group flex flex-col rounded-2xl bg-paper border border-ink/8 p-6',
      'hover:shadow-lg hover:shadow-forest/8 hover:-translate-y-0.5 transition-all duration-300',
    )}>
      {/* Ikon & Level */}
      <div className="flex items-start justify-between mb-4">
        <div className={cx(
          'size-12 rounded-xl border-2 flex items-center justify-center',
          accentBorder,
          achievement.level === 'provinsi' ? 'bg-gold/8' :
          achievement.level === 'nasional' || achievement.level === 'internasional' ? 'bg-turonggo/6' :
          'bg-forest/6',
        )}>
          <Trophy className={cx('size-6', iconColor)} />
        </div>
        <Badge variant={badgeVariant}>
          {ACHIEVEMENT_LEVEL_LABELS[achievement.level]}
        </Badge>
      </div>

      {/* Judul */}
      <h3 className="font-display font-semibold text-ink text-base leading-snug mb-2 group-hover:text-forest transition-colors">
        {achievement.title}
      </h3>

      {/* Deskripsi */}
      <p className="text-sm text-ink/60 leading-relaxed mb-4 flex-1">
        {achievement.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center justify-between pt-4 border-t border-ink/6">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            {ACHIEVEMENT_CATEGORY_LABELS[achievement.category]}
          </Badge>
        </div>
        <span className="font-mono text-sm font-bold text-gold">{achievement.year}</span>
      </div>

      {/* Rank jika ada */}
      {achievement.rank && (
        <div className="mt-3 flex items-center gap-2">
          <Award className="size-3.5 text-gold" />
          <span className="font-mono text-xs text-gold font-semibold">{achievement.rank}</span>
          {achievement.organizer && (
            <span className="text-xs text-ink/40">· {achievement.organizer}</span>
          )}
        </div>
      )}
    </div>
  )
}
