import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ─── Bracket corner markers (4 L-shapes at corners) ──────────────────── */

interface BracketCornersProps {
  className?: string
  color?: string
  thickness?: number
  size?: number
  offset?: number
}

export function BracketCorners({
  className,
  color = '#CBEE4C',
  thickness = 2,
  size = 14,
  offset = -6,
}: BracketCornersProps) {
  const common: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: color,
    borderWidth: 0,
  }
  return (
    <>
      <span
        aria-hidden="true"
        className={cn('pointer-events-none', className)}
        style={{
          ...common,
          top: offset,
          left: offset,
          borderLeftWidth: thickness,
          borderTopWidth: thickness,
        }}
      />
      <span
        aria-hidden="true"
        className={cn('pointer-events-none', className)}
        style={{
          ...common,
          top: offset,
          right: offset,
          borderRightWidth: thickness,
          borderTopWidth: thickness,
        }}
      />
      <span
        aria-hidden="true"
        className={cn('pointer-events-none', className)}
        style={{
          ...common,
          bottom: offset,
          left: offset,
          borderLeftWidth: thickness,
          borderBottomWidth: thickness,
        }}
      />
      <span
        aria-hidden="true"
        className={cn('pointer-events-none', className)}
        style={{
          ...common,
          bottom: offset,
          right: offset,
          borderRightWidth: thickness,
          borderBottomWidth: thickness,
        }}
      />
    </>
  )
}

/* ─── Status pill — small mono badge ──────────────────────────────────── */

interface StatusBadgeProps {
  children: ReactNode
  tone?: 'lime' | 'cyan' | 'danger' | 'muted'
  variant?: 'solid' | 'outline' | 'hazard'
  className?: string
}

export function StatusBadge({
  children,
  tone = 'lime',
  variant = 'outline',
  className,
}: StatusBadgeProps) {
  const colorClass = {
    lime: { text: 'text-[#CBEE4C]', border: 'border-[#CBEE4C]/60', bg: 'bg-[#CBEE4C]/10' },
    cyan: { text: 'text-[#5EEAD4]', border: 'border-[#5EEAD4]/60', bg: 'bg-[#5EEAD4]/10' },
    danger: { text: 'text-[#FF453A]', border: 'border-[#FF453A]/60', bg: 'bg-[#FF453A]/10' },
    muted: { text: 'text-muted-foreground', border: 'border-border', bg: 'bg-card' },
  }[tone]

  if (variant === 'hazard') {
    return (
      <span
        className={cn(
          'font-hud relative inline-flex h-5 items-center overflow-hidden px-2 text-[10px] uppercase tracking-[0.25em] text-background',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="hud-stripes-faint absolute inset-0"
        />
        <span className={cn('relative font-semibold', colorClass.text)}>
          [ {children} ]
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn(
        'font-hud inline-flex items-center border px-2 py-0.5 text-[10px] uppercase tracking-[0.25em]',
        colorClass.text,
        colorClass.border,
        variant === 'solid' && colorClass.bg,
        className,
      )}
    >
      [ {children} ]
    </span>
  )
}

/* ─── Chevron CTA — angular brackets-and-arrows link/button ───────────── */

interface ChevronCtaProps {
  children: ReactNode
  className?: string
  tone?: 'lime' | 'cyan'
  size?: 'sm' | 'md'
}

export function ChevronCta({
  children,
  className,
  tone = 'lime',
  size = 'sm',
}: ChevronCtaProps) {
  const toneClass = {
    lime: 'text-[#CBEE4C]',
    cyan: 'text-[#5EEAD4]',
  }[tone]
  const sz = {
    sm: 'text-xs',
    md: 'text-sm',
  }[size]
  return (
    <span
      className={cn(
        'font-hud inline-flex items-center gap-1.5 uppercase tracking-[0.25em] transition-transform',
        toneClass,
        sz,
        className,
      )}
    >
      <span aria-hidden="true" className="opacity-60">
        [
      </span>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        ▸▸
      </span>
      <span aria-hidden="true" className="opacity-60">
        ]
      </span>
    </span>
  )
}

/* ─── CyberPanel — wrapper with bracket corners + optional HUD header ─── */

interface CyberPanelProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  /** Top-left header label */
  label?: string
  /** Top-right code / version */
  code?: string
  /** Bracket color */
  bracketColor?: string
  /** Whether to clip the corners (angular shape) */
  clipped?: boolean
  /** Show the diagonal hazard stripe strip on top */
  hazardStrip?: boolean
}

export function CyberPanel({
  children,
  className,
  innerClassName,
  label,
  code,
  bracketColor = '#CBEE4C',
  clipped = false,
  hazardStrip = false,
}: CyberPanelProps) {
  return (
    <div className={cn('relative', className)}>
      <BracketCorners color={bracketColor} />
      {hazardStrip && (
        <div
          className="hud-stripes-faint absolute left-0 right-0 top-0 h-1"
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'relative border border-border bg-card/50',
          clipped && 'clip-cyber',
          innerClassName,
        )}
      >
        {(label || code) && (
          <div className="font-hud flex items-center justify-between border-b border-border bg-card/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em]">
            <span className="text-[#CBEE4C]">{label && `▸ ${label}`}</span>
            <span className="text-muted-foreground">{code}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
