import { useEffect, useRef, useState } from 'react'
import { useDesktop, WALLPAPERS } from '../contexts/DesktopContext'
import {
  AboutIcon, ProjectsIcon, ExperienceIcon, ContactIcon,
  SpendalyzerIcon, LinkedInIcon, GitHubIcon, ResumeIcon, KlondikeIcon,
} from './DesktopIcons'

const BEVEL_UP = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'

function PowerIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated', display: 'block', shapeRendering: 'crispEdges' }}>
      <rect x="7" y="2" width="2" height="6" fill="#d4614e"/>
      <rect x="4" y="5" width="1" height="1" fill="#d4614e"/>
      <rect x="11" y="5" width="1" height="1" fill="#d4614e"/>
      <rect x="3" y="6" width="1" height="3" fill="#d4614e"/>
      <rect x="12" y="6" width="1" height="3" fill="#d4614e"/>
      <rect x="4" y="9" width="1" height="2" fill="#d4614e"/>
      <rect x="11" y="9" width="1" height="2" fill="#d4614e"/>
      <rect x="5" y="11" width="6" height="1" fill="#d4614e"/>
      <rect x="6" y="12" width="4" height="1" fill="#d4614e"/>
    </svg>
  )
}

function WallpaperIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated', display: 'block', shapeRendering: 'crispEdges' }}>
      <rect x="1" y="2" width="14" height="10" fill="#3d8b8b"/>
      <rect x="1" y="2" width="14" height="1" fill="#5fadad"/>
      <rect x="3" y="9" width="10" height="3" fill="#5f9e6e"/>
      <rect x="11" y="3" width="2" height="2" fill="#e0b040"/>
      <rect x="2" y="12" width="12" height="1" fill="#1a1a1a"/>
      <rect x="6" y="13" width="4" height="1" fill="#808080"/>
      <rect x="5" y="14" width="6" height="1" fill="#808080"/>
    </svg>
  )
}

export default function StartMenu({ onClose, onShutdown }) {
  const { openWindow, wallpaper, setWallpaper } = useDesktop()
  const ref = useRef(null)
  const [submenu, setSubmenu] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !e.target.closest('[data-start-button]')) {
        onClose()
      }
    }
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('mousedown', handler)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('mousedown', handler)
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  function pick(action) {
    return () => { action(); onClose() }
  }

  function Item({ icon, label, onClick, hasSubmenu, onHover }) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '6px 10px',
          background: 'none', border: 'none', textAlign: 'left',
          fontFamily: "'Press Start 2P', monospace", fontSize: 8,
          color: '#000', cursor: 'pointer', letterSpacing: 0.5,
          whiteSpace: 'nowrap',
        }}
        onMouseOver={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff' }}
        onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#000' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 20, justifyContent: 'center' }}>{icon}</span>
        <span style={{ flex: 1 }}>{label}</span>
        {hasSubmenu && <span style={{ fontSize: 8, marginLeft: 8 }}>▶</span>}
      </button>
    )
  }

  function Divider() {
    return <div style={{ margin: '3px 6px', borderTop: '1px solid #808080', borderBottom: '1px solid #fff' }} />
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 40,
        left: 4,
        width: 240,
        background: '#c0c0c0',
        boxShadow: BEVEL_UP + ', 4px -4px 0 #00000033',
        border: '1px solid #000',
        zIndex: 9000,
        display: 'flex',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      {/* Sidebar */}
      <div style={{
        width: 22,
        background: 'linear-gradient(to bottom, #4a7fa5, #1a3850)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '8px 0',
        marginRight: 1,
      }}>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: '#fff',
          letterSpacing: 3,
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
        }}>
          wingingbump
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Item icon={<AboutIcon size={16} />}      label="About Me"    onClick={pick(() => openWindow('about'))} />
        <Item icon={<ProjectsIcon size={16} />}   label="Projects"    onClick={pick(() => openWindow('projects'))} />
        <Item icon={<ExperienceIcon size={16} />} label="Experience"  onClick={pick(() => openWindow('experience'))} />
        <Item icon={<ContactIcon size={16} />}    label="Contact"     onClick={pick(() => openWindow('contact'))} />
        <Item icon={<ResumeIcon size={16} />}     label="Resume"      onClick={pick(() => openWindow('resume'))} />
        <Divider />
        <Item icon={<KlondikeIcon size={16} />}   label="Klondike"    onClick={pick(() => openWindow('klondike'))} />
        <Divider />
        <Item icon={<SpendalyzerIcon size={16} />} label="Spendalyzer" onClick={pick(() => window.open('https://spend.wingingbump.com', '_blank', 'noopener,noreferrer'))} />
        <Item icon={<GitHubIcon size={16} />}      label="GitHub"      onClick={pick(() => window.open('https://github.com/Wingingbump', '_blank', 'noopener,noreferrer'))} />
        <Item icon={<LinkedInIcon size={16} />}    label="LinkedIn"    onClick={pick(() => window.open('https://linkedin.com/in/tommyle03', '_blank', 'noopener,noreferrer'))} />
        <Divider />
        <div style={{ position: 'relative' }}>
          <Item
            icon={<WallpaperIcon size={16} />}
            label="Wallpaper"
            hasSubmenu
            onHover={() => setSubmenu('wallpaper')}
            onClick={() => setSubmenu(submenu === 'wallpaper' ? null : 'wallpaper')}
          />
          {submenu === 'wallpaper' && (
            <div
              onMouseLeave={() => setSubmenu(null)}
              style={{
                position: 'absolute',
                left: '100%',
                bottom: 0,
                marginLeft: 2,
                width: 140,
                background: '#c0c0c0',
                boxShadow: BEVEL_UP + ', 3px 3px 0 #00000044',
                border: '1px solid #000',
                paddingTop: 2, paddingBottom: 2,
                zIndex: 9001,
              }}
            >
              {WALLPAPERS.map(wp => {
                const active = wallpaper.id === wp.id
                return (
                  <button
                    key={wp.id}
                    onClick={() => { setWallpaper(wp); setSubmenu(null); onClose() }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      width: '100%', padding: '5px 10px',
                      background: active ? '#000080' : 'none',
                      color: active ? '#fff' : '#000',
                      border: 'none', textAlign: 'left',
                      fontFamily: "'Press Start 2P', monospace", fontSize: 7,
                      cursor: 'pointer', letterSpacing: 0.5,
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#000080'; e.currentTarget.style.color = '#fff' }}
                    onMouseOut={e => { e.currentTarget.style.background = active ? '#000080' : 'none'; e.currentTarget.style.color = active ? '#fff' : '#000' }}
                  >
                    <span style={{
                      width: 12, height: 12, flexShrink: 0,
                      background: wp.color,
                      boxShadow: 'inset 1px 1px #00000044, inset -1px -1px #ffffff33',
                    }} />
                    {wp.label}
                    {active && <span style={{ marginLeft: 'auto', fontSize: 6 }}>✓</span>}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <Divider />
        <Item icon={<PowerIcon size={16} />} label="Shut Down..." onClick={pick(onShutdown)} />
      </div>
    </div>
  )
}
