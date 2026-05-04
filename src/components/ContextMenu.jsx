import { useEffect, useRef } from 'react'
import { useDesktop, WALLPAPERS } from '../contexts/DesktopContext'
import { AboutIcon, ProjectsIcon, ExperienceIcon, ContactIcon } from './DesktopIcons'

const BEVEL_UP = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'

export default function ContextMenu({ x, y, onClose }) {
  const { openWindow, wallpaper, setWallpaper } = useDesktop()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [onClose])

  const menuW = 200
  const cx = Math.min(x, window.innerWidth  - menuW - 8)
  const cy = Math.min(y, window.innerHeight - 260)

  function Item({ children, onClick, disabled }) {
    return (
      <button
        disabled={disabled}
        onClick={() => { onClick?.(); onClose() }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: '5px 10px',
          background: 'none', border: 'none', textAlign: 'left',
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: disabled ? '#808080' : '#000',
          cursor: disabled ? 'default' : 'pointer',
          letterSpacing: 0.5,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff' } }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = disabled ? '#808080' : '#000' }}
      >
        {children}
      </button>
    )
  }

  function Divider() {
    return <div style={{ margin: '3px 6px', borderTop: '1px solid #808080', borderBottom: '1px solid #fff' }} />
  }

  function WallpaperSwatch({ wp }) {
    const active = wallpaper.id === wp.id
    return (
      <button
        onClick={() => { setWallpaper(wp); onClose() }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: '5px 10px',
          background: active ? '#000080' : 'none', border: 'none', textAlign: 'left',
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: active ? '#fff' : '#000',
          cursor: 'pointer', letterSpacing: 0.5,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = active ? '#000080' : 'none'; e.currentTarget.style.color = active ? '#fff' : '#000' }}
      >
        <span style={{
          width: 12, height: 12, flexShrink: 0,
          background: wp.color,
          boxShadow: 'inset 1px 1px #00000044, inset -1px -1px #ffffff33',
          display: 'inline-block',
        }} />
        {wp.label}
        {active && <span style={{ marginLeft: 'auto', fontSize: 6 }}>✓</span>}
      </button>
    )
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', left: cx, top: cy, width: menuW,
        background: '#c0c0c0',
        boxShadow: BEVEL_UP + ', 3px 3px 0 #00000044',
        border: '1px solid #000',
        zIndex: 8000, paddingTop: 2, paddingBottom: 2,
      }}
    >
      <Item onClick={() => openWindow('about')}><AboutIcon size={14} /> About Me</Item>
      <Item onClick={() => openWindow('projects')}><ProjectsIcon size={14} /> Projects</Item>
      <Item onClick={() => openWindow('experience')}><ExperienceIcon size={14} /> Experience</Item>
      <Item onClick={() => openWindow('contact')}><ContactIcon size={14} /> Contact</Item>
      <Divider />
      <Item onClick={() => window.open('https://github.com/Wingingbump', '_blank')}>🐙 GitHub</Item>
      <Divider />
      <div style={{ padding: '3px 10px 2px', fontSize: 7, color: '#444', fontFamily: "'Press Start 2P', monospace", letterSpacing: 0.5 }}>
        Wallpaper
      </div>
      {WALLPAPERS.map(wp => <WallpaperSwatch key={wp.id} wp={wp} />)}
    </div>
  )
}
