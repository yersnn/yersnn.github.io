import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HUDLabelProps {
  children: ReactNode
  id?: string
  className?: string
  tone?: 'lime' | 'cyan' | 'muted'
}

/**
 * Cyberpunk HUD-style eyebrow label.
 * Renders as: `▸ [001] EYEBROW TEXT`  in JetBrains Mono with optional ID prefix
 * and a small leading chevron decal. Color tone picks the accent.
 */
export function HUDLabel({
  children,
  id,
  className,
  tone = 'lime',
}: HUDLabelProps) {
  const toneClass = {
    lime: 'text-[#CBEE4C]',
    cyan: 'text-[#5EEAD4]',
    muted: 'text-muted-foreground',
  }[tone]

  return (
    <span
      className={cn(
        'font-hud inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em]',
        toneClass,
        className,
      )}
    >
      <span aria-hidden="true" className="text-[10px] opacity-70">
        ▸
      </span>
      {id && (
        <span className="text-foreground/40" aria-hidden="true">
          [{id}]
        </span>
      )}
      {children}
    </span>
  )
}
