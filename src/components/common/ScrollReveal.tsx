import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'zoom-in'
  delay?: number // delay in ms
  duration?: number // duration in ms
  threshold?: number
  onClick?: () => void
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  onClick,
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const animationClass = {
    'fade-in-up': 'reveal-fade-in-up',
    'fade-in-left': 'reveal-fade-in-left',
    'fade-in-right': 'reveal-fade-in-right',
    'zoom-in': 'reveal-zoom-in',
  }[animation]

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isIntersecting ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
