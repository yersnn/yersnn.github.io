import { useEffect, useRef, useState } from 'react'
import './fun-win95.css'

/**
 * Fun → Windows 95 desktop recreation.
 *
 * Layered structure:
 *  - <CRTMonitor>     beige bezel + recessed screen + stand (CSS-only)
 *  - <Desktop>        teal background, holds icons + dialog + taskbar
 *    - <DesktopIcon>  selectable / double-clickable
 *    - <FigmaDialog>  draggable, X closes, OK closes
 *    - <Taskbar>      Start button + active window + live clock
 *  - <CRTGlare>       full-screen white w/ mix-blend-multiply for the glass vignette
 *  - <BootCurtain>    CRT power-on flash (first visit only)
 */

type IconId =
  | 'my-computer'
  | 'recycle-bin'
  | 'network'
  | 'figma'
  | 'my-folder'

interface IconDef {
  id: IconId
  label: string
  src?: string // when undefined, render inline (e.g. Figma logo)
}

const ICONS: IconDef[] = [
  { id: 'my-computer', label: 'My Computer', src: '/win95/my-computer.png' },
  { id: 'recycle-bin', label: 'Recycle Bin', src: '/win95/recycle-bin.png' },
  {
    id: 'network',
    label: 'Network\nNeighbourhood',
    src: '/win95/my-computer.png', // re-used per Figma source
  },
  { id: 'figma', label: 'Figma' }, // drawn inline as colored squares
  { id: 'my-folder', label: 'My Folder', src: '/win95/my-folder.png' },
]

// ─── Inline Figma logo (5 colored squares, matches the Figma source) ──────
function FigmaLogo({ size = 32 }: { size?: number }) {
  // 3-column, 2-row-ish layout of the F logo as a 6-square grid
  // Colors and arrangement match the canonical Figma mark
  const u = size / 3
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 3 4.5"
      shapeRendering="crispEdges"
      style={{ display: 'block' }}
    >
      <rect x={0} y={0} width={1} height={1.5} fill="#f24e1e" />
      <rect x={1} y={0} width={1} height={1.5} fill="#a259ff" />
      <rect x={0} y={1.5} width={1} height={1.5} fill="#ff7262" />
      <rect x={1} y={1.5} width={1} height={1.5} fill="#1abcfe" />
      <rect x={0} y={3} width={1} height={1.5} fill="#0acf83" />
      <circle cx={1.5} cy={2.25} r={0.75} fill="#1abcfe" />
      <rect x={1} y={1.5} width={1} height={1.5} fill="#1abcfe" />
      {/* simplified — looks like a multi-color F mark at small sizes */}
      <rect x={0} y={0} width={u * 3} height={u * 3} fill="none" />
    </svg>
  )
}

// Simpler Figma mark — 4 colored squares (1abcfe / 0acf83 / a259ff / f24e1e / ff7262)
// laid out as the canonical Figma F.
function FigmaMark({ size = 32 }: { size?: number }) {
  const s = size / 3
  return (
    <div
      style={{
        width: s * 2,
        height: s * 3,
        display: 'grid',
        gridTemplateColumns: `${s}px ${s}px`,
        gridTemplateRows: `${s}px ${s}px ${s}px`,
      }}
    >
      {/* Row 1: orange | purple */}
      <div style={{ background: '#f24e1e', borderTopLeftRadius: s / 2 }} />
      <div
        style={{
          background: '#a259ff',
          borderTopRightRadius: s / 2,
          borderBottomRightRadius: s / 2,
        }}
      />
      {/* Row 2: pink | cyan-circle (we'll use plain cyan square — keep it pixel-y) */}
      <div style={{ background: '#ff7262' }} />
      <div style={{ background: '#1abcfe', borderRadius: s / 2 }} />
      {/* Row 3: green | empty */}
      <div
        style={{
          background: '#0acf83',
          borderBottomLeftRadius: s / 2,
        }}
      />
      <div />
    </div>
  )
}

// ─── Win95 close (X) button glyph ──────────────────────────────────────────
function CloseGlyph() {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      style={{ display: 'block' }}
    >
      {[
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [8, 8],
        [1, 8],
        [2, 7],
        [3, 6],
        [4, 5],
        [6, 3],
        [7, 2],
        [8, 1],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} fill="#000" />
      ))}
    </svg>
  )
}

// ─── Live clock ────────────────────────────────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])
  const h = now.getHours()
  const m = now.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = ((h + 11) % 12) + 1
  return (
    <span className="win95-clock-time">
      {hh}:{m} {ampm}
    </span>
  )
}

// ─── Desktop icon ──────────────────────────────────────────────────────────
function DesktopIcon({
  icon,
  selected,
  onSelect,
  onOpen,
}: {
  icon: IconDef
  selected: boolean
  onSelect: () => void
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      className={`win95-desktop-icon cursor-target ${selected ? 'is-selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      aria-label={icon.label.replace('\n', ' ')}
    >
      <div className="win95-desktop-icon__art">
        {icon.src ? (
          <img
            src={icon.src}
            alt=""
            draggable={false}
            style={{ width: 56, height: 56, imageRendering: 'pixelated' }}
          />
        ) : (
          <FigmaMark size={48} />
        )}
      </div>
      <div className="win95-desktop-icon__label">
        {icon.label.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </button>
  )
}

// ─── Draggable Figma dialog ────────────────────────────────────────────────
function FigmaDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (!dragOffsetRef.current) return
      setPos({
        x: e.clientX - dragOffsetRef.current.x,
        y: e.clientY - dragOffsetRef.current.y,
      })
    }
    function handleUp() {
      dragOffsetRef.current = null
      document.body.style.userSelect = ''
    }
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [])

  function onTitleBarPointerDown(e: React.PointerEvent) {
    if (!dialogRef.current) return
    const rect = dialogRef.current.getBoundingClientRect()
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    document.body.style.userSelect = 'none'
  }

  if (!open) return null
  return (
    <div
      ref={dialogRef}
      className="win95-dialog"
      style={
        pos
          ? { left: pos.x, top: pos.y, transform: 'none' }
          : undefined
      }
      role="dialog"
      aria-label="Figma"
    >
      <div
        className="win95-dialog__title"
        onPointerDown={onTitleBarPointerDown}
      >
        <div className="win95-dialog__title-left">
          <FigmaMark size={14} />
          <span className="win95-dialog__title-text">Figma</span>
        </div>
        <button
          type="button"
          className="win95-titlebar-btn cursor-target"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseGlyph />
        </button>
      </div>

      <div className="win95-dialog__body">
        <div className="win95-dialog__icon">
          <FigmaMark size={28} />
        </div>
        <p className="win95-dialog__text">
          This is truly a work of fiction. Windows 95 Design System created
          in Figma.
        </p>
      </div>

      <div className="win95-dialog__actions">
        <button
          type="button"
          className="win95-btn win95-btn--default cursor-target"
          onClick={onClose}
          autoFocus
        >
          <span className="win95-btn__focus">OK</span>
        </button>
      </div>
    </div>
  )
}

// ─── Taskbar ───────────────────────────────────────────────────────────────
function Taskbar({
  dialogOpen,
  onStartClick,
  onTaskClick,
}: {
  dialogOpen: boolean
  onStartClick: () => void
  onTaskClick: () => void
}) {
  return (
    <div className="win95-taskbar">
      <button
        type="button"
        className="win95-btn win95-start cursor-target"
        onClick={onStartClick}
      >
        <img
          src="/win95/windows-logo.png"
          alt=""
          draggable={false}
          style={{ width: 22, height: 22, imageRendering: 'pixelated' }}
        />
        <span className="win95-start__text">Start</span>
      </button>

      {dialogOpen && (
        <button
          type="button"
          className="win95-task is-active cursor-target"
          onClick={onTaskClick}
        >
          <FigmaMark size={14} />
          <span>Figma</span>
        </button>
      )}

      <div className="win95-taskbar-spacer" />

      <div className="win95-tray">
        <img
          src="/win95/volume.png"
          alt=""
          draggable={false}
          style={{ width: 18, height: 18, imageRendering: 'pixelated' }}
        />
        <LiveClock />
      </div>
    </div>
  )
}

// ─── Start menu (collapses on outside click) ────────────────────────────
function StartMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <>
      <div className="win95-startmenu-scrim" onClick={onClose} />
      <div className="win95-startmenu" role="menu">
        <div className="win95-startmenu__band">
          <div className="win95-startmenu__brand">
            Windows<span>95</span>
          </div>
        </div>
        <ul className="win95-startmenu__list">
          {[
            'Programs',
            'Documents',
            'Settings',
            'Find',
            'Help',
            'Run...',
          ].map((label) => (
            <li key={label} className="win95-startmenu__item">
              {label}
            </li>
          ))}
          <li className="win95-startmenu__sep" />
          <li className="win95-startmenu__item">Shut Down...</li>
        </ul>
      </div>
    </>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export function FunPage() {
  const [selected, setSelected] = useState<IconId | null>(null)
  const [dialogOpen, setDialogOpen] = useState(true)
  const [startOpen, setStartOpen] = useState(false)

  function openDialog() {
    setDialogOpen(true)
  }

  function handleIconOpen(id: IconId) {
    // For now, every icon just re-opens the Figma dialog. Hooks for future
    // per-icon windows.
    if (id === 'figma') openDialog()
    else openDialog()
  }

  return (
    <section className="win95-page" data-theme="light">
      {/* Black backdrop behind the monitor */}
      <div className="win95-backdrop" />

      <div className="win95-monitor">
        <div className="win95-monitor__bezel">
          <div className="win95-monitor__inner-plate">
            <div
              className="win95-screen"
              onClick={() => setSelected(null)}
              onPointerDown={() => setStartOpen(false)}
            >
              {/* Desktop icons */}
              <div className="win95-desktop-icons">
                {ICONS.map((icon) => (
                  <DesktopIcon
                    key={icon.id}
                    icon={icon}
                    selected={selected === icon.id}
                    onSelect={() => setSelected(icon.id)}
                    onOpen={() => handleIconOpen(icon.id)}
                  />
                ))}
              </div>

              <FigmaDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
              />

              {/* CRT glare overlay (non-interactive) */}
              <div className="win95-glare" aria-hidden="true" />

              {/* Brief power-on flash (200ms, non-blocking) */}
              <div className="win95-power-flash" aria-hidden="true" />

              <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />

              <Taskbar
                dialogOpen={dialogOpen}
                onStartClick={() => setStartOpen((v) => !v)}
                onTaskClick={() => setDialogOpen((v) => !v)}
              />
            </div>
          </div>
        </div>
        <div className="win95-monitor__neck" />
        <div className="win95-monitor__stand">
          <div className="win95-monitor__led" />
        </div>
        <div className="win95-monitor__base" />
      </div>
    </section>
  )
}
