import { useNavigate } from 'react-router-dom'
import './cyber-nav.css'

export interface CyberNavItem {
  label: string
  href: string
}

interface CyberNavProps {
  items: CyberNavItem[]
  activeHref?: string
}

/**
 * Cyberpunk radio-glitch nav.
 * Adapted from uiverse.io/andrew-demchenk0/loud-pig-91.
 *
 * Uses native radio inputs for the :checked + :hover sibling-selector magic
 * that drives the glitch keyframes, then programmatically navigates on change.
 */
export function CyberNav({ items, activeHref }: CyberNavProps) {
  const navigate = useNavigate()

  return (
    <nav className="cyber-nav" aria-label="Primary">
      {items.map((item, i) => (
        <label key={item.href} className="cn-wrap">
          <input
            type="radio"
            name="cyber-nav-radio"
            className="cn-input"
            checked={activeHref === item.href}
            onChange={() => navigate(item.href)}
            aria-label={item.label}
          />
          <span className="cn-btn">
            <span className="cn-btn__glitch" aria-hidden="true">
              {item.label}
            </span>
            <span className="cn-number" aria-hidden="true">
              R-{String(i).padStart(2, '0')}
            </span>
            {item.label}
          </span>
        </label>
      ))}
    </nav>
  )
}
