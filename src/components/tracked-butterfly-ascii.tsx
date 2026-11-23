import { useEffect, useRef, type ComponentProps } from 'react'
import { bindFullscreenQuad, createProgram } from '@/lib/webgl'
import { cn } from '@/lib/utils'

type RGB = [number, number, number]
type Theme = { body: RGB; scan: [RGB, RGB, RGB]; render: [RGB, RGB, RGB]; shine: RGB }

const TAU = Math.PI * 2
const COLUMNS = 42
const CELL_ASPECT = 1.5
const FLAP_HZ = 0.3
const RIPPLES = 4
const RIPPLE_SPEED = 220
const RIPPLE_LIFE = 1.6
const RIPPLE_EVERY = 3
const GLOW_RADIUS = 42
// center x, center y, radius x, radius y, rotation, in wing units
const FORE = [0.573, -0.284, 0.64, 0.24, -0.46]
const HIND = [0.45, 0.38, 0.46, 0.3, 0.35]
const BODY = [-0.3, 0.5]

const THEMES: Record<'dark' | 'light', Theme> = {
  dark: {
    body: [70, 100, 255],
    scan: [
      [28, 92, 80],
      [150, 255, 215],
      [70, 235, 230],
    ],
    render: [
      [52, 92, 255],
      [140, 96, 255],
      [236, 120, 226],
    ],
    shine: [255, 240, 255],
  },
  light: {
    body: [45, 65, 200],
    scan: [
      [120, 190, 172],
      [0, 130, 105],
      [0, 150, 170],
    ],
    render: [
      [45, 75, 225],
      [125, 60, 220],
      [205, 70, 180],
    ],
    shine: [40, 20, 110],
  },
}

const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uDpr;
uniform vec2 uCell;
uniform vec2 uPos;
uniform vec2 uTilt;
uniform float uScale;
uniform vec2 uOpen;
uniform float uTime;
uniform vec3 uPointer;
uniform vec4 uRipple[${RIPPLES}];
uniform vec3 uScan[3];
uniform vec3 uRender[3];
uniform vec3 uBody;
uniform vec3 uShine;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float ellipse(vec2 p, vec2 c, vec2 r, float a) {
  vec2 d = p - c;
  vec2 q = vec2(d.x * cos(a) + d.y * sin(a), d.y * cos(a) - d.x * sin(a)) / r;
  return length(q);
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 cell = floor(frag / uCell);
  vec2 f = frag / uCell - cell - 0.5;
  vec2 center = (cell + 0.5) * uCell / uDpr;

  vec2 d = center - uPos;
  vec2 l = vec2(d.x * uTilt.x + d.y * uTilt.y, d.y * uTilt.x - d.x * uTilt.y) / uScale;
  float ax = abs(l.x);
  vec2 uf = vec2(ax / uOpen.x, l.y);
  vec2 uh = vec2(ax / uOpen.y, l.y);
  float ef = ellipse(uf, vec2(${FORE[0]}, ${FORE[1]}), vec2(${FORE[2]}, ${FORE[3]}), ${FORE[4]});
  float eh = ellipse(uh, vec2(${HIND[0]}, ${HIND[1]}), vec2(${HIND[2]}, ${HIND[3]}), ${HIND[4]});
  bool body = ax * uScale < uCell.x / uDpr && l.y > ${BODY[0]} && l.y < ${BODY[1]};
  bool fore = ef < 1.0;
  if (!body && !fore && eh >= 1.0) discard;
  float e = fore ? ef : eh;
  vec2 u = fore ? uf : uh;

  float ring = 0.0;
  for (int i = 0; i < ${RIPPLES}; i++) {
    float gap = (distance(center, uRipple[i].xy) - uRipple[i].z) / 16.0;
    ring += uRipple[i].w * exp(-gap * gap);
  }
  ring = min(ring, 1.0);
  float near = distance(center, uPointer.xy) / ${GLOW_RADIUS}.0;
  float glow = uPointer.z * exp(-near * near);

  float h1 = hash(cell);
  float h2 = hash(cell + 17.0);
  vec3 col;
  float a;
  if (body) {
    col = mix(uBody, uShine, 0.35 * h2 + 0.4 * glow);
    a = 0.95;
  } else if (l.x < 0.0) {
    float density = 1.0 - 0.85 * smoothstep(0.2, 1.0, e) + ring + glow;
    if (h1 > density) discard;
    float spark = step(0.92, hash(cell + floor(uTime * 3.0 + h1 * 8.0)));
    col = mix(uScan[0], uScan[1], spark);
    a = mix(0.55 + 0.4 * h2, 1.0, spark);
    float lit = clamp(ring + 0.7 * glow, 0.0, 1.0);
    col = mix(col, uScan[2], lit);
    a = max(a, lit);
  } else {
    float k = clamp(smoothstep(0.6, 1.25, length(u)) + 0.3 * smoothstep(0.8, 1.0, e), 0.0, 1.0);
    col = k < 0.5 ? mix(uRender[0], uRender[1], k * 2.0) : mix(uRender[1], uRender[2], k * 2.0 - 1.0);
    float band = (u.x * 0.9 - u.y * 0.5 - 0.5 - 0.35 * sin(uTime * 0.7)) * 5.0;
    float sheen = 0.5 * exp(-band * band);
    col = mix(col, uShine, clamp(sheen + 0.85 * ring + 0.5 * glow, 0.0, 0.9));
    a = 0.72 + 0.28 * h2;
  }

  vec2 q = abs(f) - vec2(0.22, 0.28);
  float led = 1.0 - smoothstep(0.1, 0.18, length(max(q, 0.0)));
  a *= led;
  gl_FragColor = vec4(col * a, a);
}`

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const unit = (colors: RGB[]) => colors.flatMap((c) => c.map((v) => v / 255))

// Reads the computed text colour back as rgb (browsers may report lab()/oklch()).
const isDark = (el: Element) => {
  const probe = document.createElement('canvas').getContext('2d')
  if (!probe) return true
  probe.fillStyle = getComputedStyle(el).color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  return 0.299 * r + 0.587 * g + 0.114 * b > 128
}

/**
 * A WebGL pixel butterfly that flaps, drifts, and follows the pointer.
 * Pointer clicks send a ripple across the wings. Holds still for reduced-motion users.
 */
function TrackedButterflyAscii({ className, ...props }: ComponentProps<'div'>) {
  const rootRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const glCanvas = glRef.current
    if (!root || !glCanvas) return

    const gl = glCanvas.getContext('webgl', { premultipliedAlpha: true, antialias: false })
    const compiled = gl ? createProgram(gl, VERTEX, FRAGMENT) : null
    if (!gl || !compiled) return

    gl.useProgram(compiled.program)
    const quad = bindFullscreenQuad(gl, compiled.program, 'aPos')
    const uniform = (name: string) => gl.getUniformLocation(compiled.program, name)
    const loc = {
      res: uniform('uRes'),
      dpr: uniform('uDpr'),
      cell: uniform('uCell'),
      pos: uniform('uPos'),
      tilt: uniform('uTilt'),
      scale: uniform('uScale'),
      open: uniform('uOpen'),
      time: uniform('uTime'),
      pointer: uniform('uPointer'),
      ripple: uniform('uRipple'),
      scan: uniform('uScan'),
      render: uniform('uRender'),
      body: uniform('uBody'),
      shine: uniform('uShine'),
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let w = 0
    let h = 0
    let dpr = 1
    let scale = 0
    let cell = 4
    let theme = THEMES.dark
    let time = 0
    let phase = 0
    let startle = 0
    let tilt = 0
    let sinceRipple = 0
    let raf = 0
    let last = 0
    let visible = true
    let disposed = false
    const open = [1, 1]
    const pos = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0, active: false }
    const ripples: { x: number; y: number; age: number }[] = []
    const rippleData = new Float32Array(RIPPLES * 4)

    const ripple = (x: number, y: number) => {
      ripples.push({ x, y, age: 0 })
      if (ripples.length > RIPPLES) ripples.shift()
      sinceRipple = 0
    }

    const step = (dt: number, still: boolean) => {
      if (still) {
        ripples.length = 0
        open[0] = open[1] = 1
        tilt = 0
        pos.x = w / 2
        pos.y = h / 2
        return
      }

      time += dt
      startle *= Math.exp(-dt * 1.6)
      phase += dt * TAU * FLAP_HZ * (0.7 + 0.3 * Math.sin(time * 0.37) + 4 * startle)
      open[0] = 0.72 + 0.28 * Math.cos(phase)
      open[1] = 0.72 + 0.28 * Math.cos(phase - 0.4)

      const pull = pointer.active ? 0.12 : 0
      const tx = w / 2 + Math.sin(time * 0.23) * w * 0.05 + (pointer.x - w / 2) * pull
      const ty = h / 2 + Math.sin(time * 0.31 + 1) * h * 0.04 + (pointer.y - h / 2) * pull
      const ease = 1 - Math.exp(-dt * 2)
      const prevX = pos.x
      pos.x += (tx - pos.x) * ease
      pos.y += (ty - pos.y) * ease
      tilt += (clamp(((pos.x - prevX) / Math.max(dt, 1e-3)) * 0.002, -0.15, 0.15) - tilt) * ease

      for (const r of ripples) r.age += dt
      while (ripples.length && ripples[0].age > RIPPLE_LIFE) ripples.shift()
      sinceRipple += dt
      if (sinceRipple > RIPPLE_EVERY) ripple(pos.x, pos.y)
    }

    const paint = () => {
      rippleData.fill(0)
      ripples.forEach((r, i) => rippleData.set([r.x, r.y, r.age * RIPPLE_SPEED, 1 - r.age / RIPPLE_LIFE], i * 4))
      gl.viewport(0, 0, glCanvas.width, glCanvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(loc.res, glCanvas.width, glCanvas.height)
      gl.uniform1f(loc.dpr, dpr)
      gl.uniform2f(loc.cell, cell, Math.round(cell * CELL_ASPECT))
      gl.uniform2f(loc.pos, pos.x, pos.y)
      gl.uniform2f(loc.tilt, Math.cos(tilt), Math.sin(tilt))
      gl.uniform1f(loc.scale, scale)
      gl.uniform2f(loc.open, open[0], open[1])
      gl.uniform1f(loc.time, time)
      gl.uniform3f(loc.pointer, pointer.x, pointer.y, pointer.active ? 1 : 0)
      gl.uniform4fv(loc.ripple, rippleData)
      gl.uniform3fv(loc.scan, unit(theme.scan))
      gl.uniform3fv(loc.render, unit(theme.render))
      gl.uniform3fv(loc.body, unit([theme.body]))
      gl.uniform3fv(loc.shine, unit([theme.shine]))
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const render = (dt: number, still: boolean) => {
      step(dt, still)
      paint()
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      render(dt, false)
      raf = requestAnimationFrame(frame)
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      if (disposed || !w) return
      if (motion.matches) return render(0, true)
      if (!visible) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const resize = () => {
      const rect = root.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      const first = !w
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      scale = Math.min(w * 0.26, h * 0.4)
      cell = Math.max(3, Math.round((scale / COLUMNS) * dpr))
      glCanvas.width = Math.round(w * dpr)
      glCanvas.height = Math.round(h * dpr)
      if (first) {
        pos.x = w / 2
        pos.y = h / 2
      }
      schedule()
    }

    const track = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
      if (motion.matches) render(0, true)
    }
    const onLeave = () => {
      pointer.active = false
      if (motion.matches) render(0, true)
    }
    const onDown = (e: PointerEvent) => {
      track(e)
      if (motion.matches) return
      startle = 1
      ripple(pointer.x, pointer.y)
    }

    const syncTheme = () => {
      theme = isDark(root) ? THEMES.dark : THEMES.light
      if (motion.matches && w) render(0, true)
    }
    const themeObserver = new MutationObserver(syncTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })
    syncTheme()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })
    intersection.observe(root)
    motion.addEventListener('change', schedule)
    root.addEventListener('pointermove', track)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('pointerdown', onDown)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      intersection.disconnect()
      motion.removeEventListener('change', schedule)
      root.removeEventListener('pointermove', track)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointerdown', onDown)
      gl.deleteBuffer(quad)
      compiled.dispose()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Pixel butterfly"
      className={cn('relative overflow-hidden select-none', className)}
      {...props}
    >
      <canvas ref={glRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
    </div>
  )
}

export { TrackedButterflyAscii }
