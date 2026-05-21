import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  children: ReactNode
  className?: string
  url?: string
}

export function BrowserFrame({ children, className, url }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card/40 shadow-2xl',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-card/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" aria-hidden="true" />
        </div>
        <div className="ml-2 flex h-6 flex-1 items-center justify-center rounded-md bg-background/60 px-3 text-[11px] text-muted-foreground">
          {url ?? 'alims.app'}
        </div>
        <div className="w-12" aria-hidden="true" />
      </div>
      <div className="bg-background">{children}</div>
    </div>
  )
}
