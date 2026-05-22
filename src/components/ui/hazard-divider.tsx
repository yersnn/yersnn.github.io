import { cn } from '@/lib/utils'

interface HazardDividerProps {
  label?: string
  className?: string
}

/**
 * Diagonal hazard-stripe divider with an optional [LABEL] in the middle.
 * Looks like the "WARNING / DANGER / ACCEPT" pills from the Cyberpunk UI kit.
 */
export function HazardDivider({ label, className }: HazardDividerProps) {
  return (
    <div
      role="separator"
      className={cn('relative flex h-3 items-center', className)}
    >
      <span className="hud-stripes-faint absolute inset-y-0 left-0 right-0" />
      {label && (
        <span className="relative mx-auto bg-background px-3 font-hud text-[10px] uppercase tracking-[0.3em] text-[#CBEE4C]">
          [ {label} ]
        </span>
      )}
    </div>
  )
}
