import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
  /** Once true, never flip back to false. Saves repeated work when scrolling. */
  once?: boolean
}

export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { once = false, ...observerInit } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: 0, rootMargin: '200px', ...observerInit },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, observerInit.threshold, observerInit.rootMargin, observerInit.root])

  return { ref, inView }
}
