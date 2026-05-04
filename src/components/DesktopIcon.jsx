import { useState } from 'react'
import { useDesktop } from '../contexts/DesktopContext'

export default function DesktopIcon({ id, label, icon, color = '#fff', href }) {
  const { openWindow } = useDesktop()
  const handleClick = () => {
    setSelected(true)
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
    else openWindow(id)
  }
  const [selected, setSelected] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const iconTransform = pressed
    ? 'translateY(2px) scale(0.91)'
    : hovered
    ? 'translateY(-6px) scale(1.12)'
    : 'translateY(0) scale(1)'

  const iconShadow = pressed
    ? 'drop-shadow(1px 1px 0 rgba(0,0,0,0.6))'
    : hovered
    ? 'drop-shadow(2px 8px 3px rgba(0,0,0,0.30))'
    : 'drop-shadow(1px 2px 0 rgba(0,0,0,0.5))'

  const iconTransition = pressed
    ? 'transform 0.06s ease, filter 0.06s ease'
    : 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.22s ease'

  return (
    <button
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '10px 8px 8px',
        background: selected ? 'rgba(0,0,128,0.5)' : 'transparent',
        border: selected ? '1px dotted #fff' : '1px solid transparent',
        cursor: 'pointer',
        width: 88,
        flexShrink: 0,
      }}
    >
      <span style={{
        display: 'block',
        transform: iconTransform,
        filter: iconShadow,
        transition: iconTransition,
        willChange: 'transform, filter',
      }}>
        {icon}
      </span>
      <span style={{
        fontSize: 7,
        color,
        textShadow: '1px 1px 0 rgba(0,0,0,0.7)',
        whiteSpace: 'nowrap',
        letterSpacing: 0.3,
        display: 'block',
      }}>
        {label}
      </span>
    </button>
  )
}
