import { type ReactNode } from 'react'
import { cx } from '@/utils'

type BadgeVariant = 'forest' | 'gold' | 'turonggo' | 'neutral' | 'outline'
type BadgeSize    = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  forest:   'bg-forest/10 text-forest',
  gold:     'bg-gold/15 text-gold',
  turonggo: 'bg-turonggo/10 text-turonggo',
  neutral:  'bg-ink/8 text-ink/70',
  outline:  'border border-ink/20 text-ink/60',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
}

export default function Badge({
  children,
  variant = 'forest',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full font-mono font-medium tracking-wide uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
