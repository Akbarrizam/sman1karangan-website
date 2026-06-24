import { type ReactNode } from 'react'
import { cx } from '@/utils'

interface SectionHeaderProps {
  /** Label kecil di atas judul (mis. "Berita Terkini") */
  eyebrow?: string
  /** Judul utama seksi */
  title: string
  /** Deskripsi pendek di bawah judul */
  description?: string
  /** Konten tambahan di sisi kanan (mis. tombol "Lihat Semua") */
  action?: ReactNode
  /** Rata tengah atau kiri */
  align?: 'left' | 'center'
  className?: string
}

/**
 * Header seksi yang konsisten digunakan di seluruh halaman.
 * Menggunakan pattern: eyebrow label → judul → deskripsi.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cx(
        'mb-10 lg:mb-12',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div
        className={cx(
          'flex flex-col gap-3',
          align === 'center' ? 'items-center' : 'items-start',
          !!action && 'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <div>
          {eyebrow && (
            <p className={cx(
              'font-mono text-xs tracking-widest uppercase mb-2',
              'text-forest/70',
            )}>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold inline-block" />
                {eyebrow}
              </span>
            </p>
          )}

          <h2 className={cx(
            'font-display font-bold text-ink',
            'text-2xl sm:text-3xl lg:text-4xl leading-tight',
          )}>
            {title}
          </h2>

          {description && (
            <p className={cx(
              'mt-3 text-ink/60 leading-relaxed',
              'text-sm sm:text-base max-w-2xl',
            )}>
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 mt-2 sm:mt-0">
            {action}
          </div>
        )}
      </div>

      {/* Garis dekoratif */}
      <div className={cx(
        'flex mt-5 gap-1',
        align === 'center' && 'justify-center',
      )}>
        <div className="h-1 w-12 rounded-full bg-forest" />
        <div className="h-1 w-3 rounded-full bg-gold" />
        <div className="h-1 w-1.5 rounded-full bg-turonggo" />
      </div>
    </div>
  )
}
