import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HUDLabelProps {
  children: ReactNode
  /** Kept for call-site compatibility; no longer rendered. */
  id?: string
  className?: string
}

/** Small section label in the homepage style: plain text in the blue accent. */
export function HUDLabel({ children, className }: HUDLabelProps) {
  return (
    <span className={cn('inline-block text-sm font-semibold text-[#4f8dff] md:text-base', className)}>
      {children}
    </span>
  )
}
