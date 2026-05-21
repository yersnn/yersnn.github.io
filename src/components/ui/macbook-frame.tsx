import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MacbookFrameProps {
  children: ReactNode
  className?: string
}

export function MacbookFrame({ children, className }: MacbookFrameProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-5xl', className)}>
      <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-3 shadow-2xl ring-1 ring-white/5">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-zinc-600" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-black">
          {children}
        </div>
      </div>

      <div className="relative mx-auto -mt-[2px] h-3 w-[104%] -ml-[2%]">
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900"
          style={{ clipPath: 'polygon(2% 0, 98% 0, 100% 100%, 0 100%)' }}
        />
        <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-xl bg-zinc-900/80" />
      </div>
    </div>
  )
}
