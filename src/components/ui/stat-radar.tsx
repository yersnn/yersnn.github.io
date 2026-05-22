interface Stat {
  label: string
  value: number // 0–10
  note?: string
}

interface StatRadarProps {
  stats: Stat[]
  size?: number
}

/**
 * Cyberpunk character-sheet radar chart. SVG, no deps.
 *
 * - Concentric guide polygons at 2 / 4 / 6 / 8 / 10
 * - Solid neon polygon for the actual values
 * - Outer ring labels with stat name + numeric value
 *
 * Designed to be paired with a panel like:
 *
 *   ┌─ Attributes ────────────────┐
 *   │  CREATIVITY     9            │
 *   │  SPEED          8       /\\  │
 *   │  POLISH         9      <  > │
 *   │  RANGE          8       \\/  │
 *   │  ITERATION      9            │
 *   │  SHIPPING       8            │
 *   └─────────────────────────────┘
 */
export function StatRadar({ stats, size = 360 }: StatRadarProps) {
  const n = stats.length
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 24
  const angleFor = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2

  const point = (i: number, r: number) => {
    const a = angleFor(i)
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const
  }

  // Concentric guide rings at 2, 4, 6, 8, 10
  const rings = [2, 4, 6, 8, 10].map((step) => {
    const r = (step / 10) * radius
    const pts = Array.from({ length: n }, (_, i) => {
      const [x, y] = point(i, r)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
    return { step, pts, r }
  })

  // Axes (lines from center to each vertex of the outer ring)
  const axes = Array.from({ length: n }, (_, i) => {
    const [x, y] = point(i, radius)
    return { x, y }
  })

  // The actual data polygon
  const dataPts = stats
    .map((s, i) => {
      const [x, y] = point(i, (Math.max(0, Math.min(10, s.value)) / 10) * radius)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  // Label positions slightly outside the ring
  const labels = stats.map((s, i) => {
    const a = angleFor(i)
    const r = radius + 10
    const x = cx + Math.cos(a) * r
    const y = cy + Math.sin(a) * r
    let anchor: 'start' | 'middle' | 'end' = 'middle'
    if (Math.cos(a) > 0.2) anchor = 'start'
    else if (Math.cos(a) < -0.2) anchor = 'end'
    return { x, y, anchor, label: s.label }
  })

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="block h-full w-full overflow-visible"
      aria-label="Capability radar"
    >
      {/* Rings */}
      {rings.map((r, i) => (
        <polygon
          key={i}
          points={r.pts}
          fill="none"
          stroke="currentColor"
          strokeOpacity={i === rings.length - 1 ? 0.35 : 0.12}
          strokeWidth={i === rings.length - 1 ? 1.25 : 0.75}
          className="text-foreground"
        />
      ))}

      {/* Axes */}
      {axes.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={a.x}
          y2={a.y}
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeWidth={0.75}
          className="text-foreground"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPts}
        fill="#CBEE4C"
        fillOpacity={0.18}
        stroke="#CBEE4C"
        strokeWidth={1.5}
        style={{ filter: 'drop-shadow(0 0 6px rgba(203,238,76,0.45))' }}
      />

      {/* Vertex dots */}
      {stats.map((s, i) => {
        const [x, y] = point(i, (Math.max(0, Math.min(10, s.value)) / 10) * radius)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3.2}
            fill="#CBEE4C"
            style={{ filter: 'drop-shadow(0 0 4px rgba(203,238,76,0.7))' }}
          />
        )
      })}

      {/* Axis labels */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor={l.anchor}
          dominantBaseline="middle"
          className="font-hud fill-foreground/60"
          fontSize={10}
          letterSpacing={1.5}
        >
          {l.label}
        </text>
      ))}
    </svg>
  )
}
