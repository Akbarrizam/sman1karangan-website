import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '@/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-forest text-white hover:bg-forest/90 shadow-sm hover:shadow-md',
  secondary: 'bg-gold text-white hover:bg-gold/90 shadow-sm hover:shadow-md',
  outline:   'border-2 border-forest text-forest hover:bg-forest hover:text-white',
  ghost:     'text-forest hover:bg-forest/10',
  danger:    'bg-turonggo text-white hover:bg-turonggo/90 shadow-sm',
}

const sizeClasses: Record<Size, string> = {
  sm:  'px-4 py-2 text-sm rounded-lg',
  md:  'px-6 py-3 text-sm rounded-xl',
  lg:  'px-8 py-4 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 font-medium font-body',
        'transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  )
}
