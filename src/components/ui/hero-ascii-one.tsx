import { useEffect } from 'react'
import './hero-ascii-one.css'

/**
 * HeroAsciiOne — closing CTA on the home page.
 *
 * Adapted from a UnicornStudio-powered hero component. We:
 *  - Removed Next.js bits ('use client', <style jsx>)
 *  - Reframed the copy around contact (the "use the contacts" instruction)
 *  - Replaced the two generic buttons with three contact links
 *  - Rebranded the header to YER.SNN and pointed the coordinates at Astana
 */

const contacts = [
  {
    label: 'EMAIL',
    value: 'ersuxa228@gmail.com',
    href: 'mailto:ersuxa228@gmail.com',
  },
  {
    label: 'TELEGRAM',
    value: '@bzbzzzk',
    href: 'https://t.me/bzbzzzk',
  },
  {
    label: 'GITHUB',
    value: 'github.com/yersnn',
    href: 'https://github.com/yersnn',
  },
]

export default function HeroAsciiOne() {
  useEffect(() => {
    // Inject the UnicornStudio loader (idempotent — checks for window.UnicornStudio)
    const embedScript = document.createElement('script')
    embedScript.type = 'text/javascript'
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    document.head.appendChild(embedScript)

    // Crop UnicornStudio's stock branding strip from the canvas + nuke any
    // brand DOM nodes the lib injects.
    const style = document.createElement('style')
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]',
      ]
      selectors.forEach((selector) => {
        const containers = document.querySelectorAll(selector)
        containers.forEach((container) => {
          const allElements = container.querySelectorAll('*')
          allElements.forEach((el) => {
            const text = (el.textContent || '').toLowerCase()
            const title = (el.getAttribute('title') || '').toLowerCase()
            const href = (el.getAttribute('href') || '').toLowerCase()
            if (
              text.includes('made with') ||
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              const node = el as HTMLElement
              node.style.display = 'none'
              node.style.visibility = 'hidden'
              node.style.opacity = '0'
              node.style.pointerEvents = 'none'
              node.style.position = 'absolute'
              node.style.left = '-9999px'
              node.style.top = '-9999px'
              try {
                node.remove()
              } catch {
                // Ignore — branding scrub is best-effort.
              }
            }
          })
        })
      })
    }

    hideBranding()
    const interval = setInterval(hideBranding, 50)
    const timeouts = [500, 1000, 2000, 5000, 10000].map((ms) =>
      setTimeout(hideBranding, ms),
    )

    return () => {
      clearInterval(interval)
      timeouts.forEach((t) => clearTimeout(t))
      try {
        document.head.removeChild(embedScript)
      } catch {
        // Already removed
      }
      try {
        document.head.removeChild(style)
      } catch {
        // Already removed
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation (desktop only — heavy WebGL) */}
      <div className="absolute inset-0 hidden h-full w-full lg:block">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Mobile stars background */}
      <div className="stars-bg absolute inset-0 h-full w-full lg:hidden" />

      {/* Top Header */}
      <div className="absolute left-0 right-0 top-0 z-20 border-b border-white/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="-skew-x-12 transform font-mono text-xl font-bold italic tracking-widest text-white lg:text-2xl">
              YER.SNN
            </div>
            <div className="h-3 w-px bg-white/40 lg:h-4"></div>
            <span className="font-mono text-[8px] text-white/60 lg:text-[10px]">
              ASTANA · 2026
            </span>
          </div>

          <div className="hidden items-center gap-3 font-mono text-[10px] text-white/60 lg:flex">
            <span>LAT: 51.1605°</span>
            <div className="h-1 w-1 rounded-full bg-white/40"></div>
            <span>LONG: 71.4704°</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-white/30 lg:h-12 lg:w-12"></div>
      <div className="absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-white/30 lg:h-12 lg:w-12"></div>
      <div
        className="absolute left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-white/30 lg:h-12 lg:w-12"
        style={{ bottom: '5vh' }}
      ></div>
      <div
        className="absolute right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-white/30 lg:h-12 lg:w-12"
        style={{ bottom: '5vh' }}
      ></div>

      {/* CTA Content */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0"
        style={{ marginTop: '5vh' }}
      >
        <div className="w-full px-6 lg:w-1/2 lg:pl-16 lg:pr-[10%]">
          <div className="relative max-w-lg lg:ml-auto">
            {/* Top decorative line */}
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white"></div>
              <span className="font-mono text-[10px] tracking-wider text-white">
                ∞
              </span>
              <div className="h-px flex-1 bg-white"></div>
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="dither-pattern absolute -right-3 top-0 bottom-0 hidden w-1 opacity-40 lg:block"></div>
              <h1
                className="mb-3 whitespace-nowrap font-mono text-2xl font-bold leading-tight tracking-wider text-white lg:-ml-[5%] lg:mb-4 lg:text-5xl"
                style={{ letterSpacing: '0.1em' }}
              >
                OPEN UPLINK
              </h1>
            </div>

            {/* Decorative dots pattern — desktop only */}
            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 w-0.5 rounded-full bg-white"
                ></div>
              ))}
            </div>

            {/* Description */}
            <div className="relative">
              <p className="mb-5 font-mono text-xs leading-relaxed text-gray-300 opacity-80 lg:mb-6 lg:text-base">
                Open to collaborations, freelance, and full-time. Three
                channels — pick one and let's build something that matters.
              </p>

              {/* Technical corner accent — desktop only */}
              <div
                className="absolute -left-4 top-1/2 hidden h-3 w-3 border border-white opacity-30 lg:block"
                style={{ transform: 'translateY(-50%)' }}
              >
                <div
                  className="absolute left-1/2 top-1/2 h-1 w-1 bg-white"
                  style={{ transform: 'translate(-50%, -50%)' }}
                ></div>
              </div>
            </div>

            {/* Contacts — used as the CTA text */}
            <div className="flex flex-col gap-3">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="cursor-target group relative flex items-center justify-between gap-4 border border-white bg-transparent px-5 py-2.5 font-mono text-xs text-white transition-all duration-200 hover:bg-white hover:text-black lg:px-6 lg:py-3 lg:text-sm"
                >
                  <span className="absolute -left-1 -top-1 hidden h-2 w-2 border-l border-t border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block"></span>
                  <span className="absolute -bottom-1 -right-1 hidden h-2 w-2 border-b border-r border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block"></span>
                  <span className="font-bold tracking-widest">
                    ▸ {c.label}
                  </span>
                  <span className="tracking-wider opacity-80">{c.value}</span>
                </a>
              ))}
            </div>

            {/* Bottom technical notation — desktop only */}
            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white"></div>
              <span className="font-mono text-[9px] text-white">
                UPLINK.PROTOCOL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm"
        style={{ bottom: '5vh' }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8 lg:py-3">
          <div className="flex items-center gap-3 font-mono text-[8px] text-white/50 lg:gap-6 lg:text-[9px]">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden gap-1 lg:flex">
              {[6, 12, 4, 10, 8, 14, 5, 11].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/30"
                  style={{ height: `${h}px` }}
                ></div>
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[8px] text-white/50 lg:gap-4 lg:text-[9px]">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/60"></div>
              <div
                className="h-1 w-1 animate-pulse rounded-full bg-white/40"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="h-1 w-1 animate-pulse rounded-full bg-white/20"
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    </section>
  )
}
