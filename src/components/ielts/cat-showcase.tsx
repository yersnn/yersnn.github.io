import { useEffect, useState } from 'react'

const cats = [
  {
    id: 'gray',
    name: 'Gray Cat',
    img: '/cats/gray.png',
    dot: 'bg-zinc-400',
  },
  {
    id: 'orange',
    name: 'Orange Cat',
    img: '/cats/orange.png',
    dot: 'bg-orange-400',
  },
  {
    id: 'white',
    name: 'White Cat',
    img: '/cats/white.png',
    dot: 'bg-white',
  },
] as const

type Cat = (typeof cats)[number]

export function CatShowcase() {
  const [zoomCat, setZoomCat] = useState<Cat | null>(null)

  useEffect(() => {
    if (!zoomCat) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomCat(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoomCat])

  return (
    <div className="mx-auto max-w-[1600px] px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cats.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setZoomCat(cat)}
            className="cursor-target group flex flex-col items-center gap-4 text-left"
          >
            <div className="w-full rounded-2xl border border-border bg-card/40 p-4 shadow-xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
              <img
                src={cat.img}
                alt={`${cat.name} customization`}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-block h-3 w-3 rounded-full ${cat.dot}`}
                aria-hidden="true"
              />
              <span className="text-base font-medium">{cat.name}</span>
              <span className="text-xs text-muted-foreground">
                click to enlarge
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
        Three cat styles. Sixteen accessories — bows, glasses, wings, antlers,
        santa hats. Mix and match to make your study buddy yours.
      </p>

      {zoomCat && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomCat(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setZoomCat(null)}
            aria-label="Close"
            className="cursor-target absolute right-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
          >
            Close · Esc
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl"
          >
            <img
              src={zoomCat.img}
              alt={`${zoomCat.name} customization`}
              className="block h-auto w-full rounded-xl"
            />
            <div className="mt-4 flex items-center justify-center gap-3 text-white">
              <span
                className={`inline-block h-3 w-3 rounded-full ${zoomCat.dot}`}
                aria-hidden="true"
              />
              <span className="text-base font-medium">{zoomCat.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
