import { forwardRef } from 'react'
import './entry-ticket.css'

/**
 * Entry ticket — adapted from uiverse.io/marcelodolza.
 * Drops in from the top once on mount, then idles with a subtle float.
 */

function QrPlaceholder() {
  // A small SVG that visually mimics a QR code (3 finder squares + data dots).
  const cells: { x: number; y: number }[] = []
  const seed = (x: number, y: number) =>
    (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      if (
        (x < 3 && y < 3) ||
        (x > 8 && y < 3) ||
        (x < 3 && y > 8) ||
        (x > 9 && y > 9)
      ) {
        continue // skip finder zones; we'll draw them separately
      }
      if (Math.abs(seed(x, y)) > 0.55) cells.push({ x, y })
    }
  }
  return (
    <svg width="58" height="58" viewBox="0 0 60 60">
      {/* Finder squares (3 corners) */}
      {[
        { x: 0, y: 0 },
        { x: 45, y: 0 },
        { x: 0, y: 45 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="15" height="15" fill="#0f1114" />
          <rect x={p.x + 3} y={p.y + 3} width="9" height="9" fill="white" />
          <rect x={p.x + 5} y={p.y + 5} width="5" height="5" fill="#0f1114" />
        </g>
      ))}
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x * 5}
          y={c.y * 5}
          width="4"
          height="4"
          fill="#0f1114"
        />
      ))}
    </svg>
  )
}

interface EntryTicketProps {
  className?: string
  topLeft?: string
  topRight?: string
  eventBoldLeft?: string
  eventLight?: string
  eventSub?: string
  number?: string
}

export const EntryTicket = forwardRef<HTMLDivElement, EntryTicketProps>(
  function EntryTicket(
    {
      className = '',
      topLeft = 'ACCESS',
      topRight = 'PASS',
      eventBoldLeft = 'yer',
      eventLight = 'snn',
      eventSub = 'DESIGNER 2026',
      number = '#001',
    },
    ref,
  ) {
    return (
      <div ref={ref} className={`entry-ticket-root ${className}`}>
        <div className="ticket-drop">
        <div className="ticket-float">
          <div className="ticket-body">
            <div className="reflex"></div>

            <svg
              className="icon-cube"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                style={{ ['--i' as never]: 1 }}
                className="path-center"
                d="M12 12.75L14.25 11.437M12 12.75L9.75 11.437M12 12.75V15"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 2 }}
                d="M9.75 3.562L12 2.25L14.25 3.563"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 3 }}
                d="M21 7.5L18.75 6.187M21 7.5V9.75M21 7.5L18.75 8.813"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 4 }}
                d="M21 14.25V16.5L18.75 17.813"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 5 }}
                d="M12 21.75L14.25 20.437M12 21.75V19.5M12 21.75L9.75 20.437"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 6 }}
                d="M5.25 17.813L3 16.5V14.25"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                style={{ ['--i' as never]: 7 }}
                d="M3 7.5L5.25 6.187M3 7.5L5.25 8.813M3 7.5V9.75"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <header>
              <div className="ticket-name">
                <div>
                  {topLeft.split('').map((ch, i) => (
                    <span key={i} style={{ ['--i' as never]: i + 1 }}>
                      {ch}
                    </span>
                  ))}
                </div>
                <div>
                  {topRight.split('').map((ch, i) => (
                    <span
                      key={i}
                      className="bold"
                      style={{ ['--i' as never]: i + 8 }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
              <div className="barcode"></div>
            </header>

            <div className="contents">
              <div className="event">
                <div>
                  <span className="bold">{eventBoldLeft}</span>
                  <span>{eventLight}</span>
                </div>
                <div>{eventSub}</div>
              </div>
              <div className="number">{number}</div>
              <div className="qrcode">
                <QrPlaceholder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  },
)
