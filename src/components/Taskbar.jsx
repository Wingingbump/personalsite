import { useState, useEffect } from 'react'
import { useDesktop } from '../contexts/DesktopContext'
import { AboutIcon, ProjectsIcon, ExperienceIcon, ContactIcon, StartIcon } from './DesktopIcons'
import StartMenu from './StartMenu'

const BEVEL_UP   = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
const BEVEL_DOWN = 'inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf'

const APPS = [
  { id: 'about',      label: 'About',      Icon: AboutIcon,      color: '#d4614e' },
  { id: 'projects',   label: 'Projects',   Icon: ProjectsIcon,   color: '#4a7fa5' },
  { id: 'experience', label: 'Experience', Icon: ExperienceIcon, color: '#5f9e6e' },
  { id: 'contact',    label: 'Contact',    Icon: ContactIcon,    color: '#8e5e8e' },
]

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      setTime(`${h}:${m}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      padding: '3px 8px', fontSize: 8, color: '#000',
      background: '#c0c0c0', boxShadow: BEVEL_DOWN,
      letterSpacing: 1, whiteSpace: 'nowrap',
    }}>
      {time}
    </div>
  )
}

export default function Taskbar() {
  const { windows, openWindow, minimizeWindow } = useDesktop()
  const [startOpen, setStartOpen] = useState(false)
  const [shutdown, setShutdown] = useState(false)

  function handleApp(id) {
    const win = windows[id]
    if (!win || win.minimized) openWindow(id)
    else minimizeWindow(id)
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 40,
      background: '#c0c0c0',
      boxShadow: 'inset 0 1px #fff, inset 0 2px #dfdfdf',
      borderTop: '1px solid #000',
      display: 'flex', alignItems: 'center', gap: 4, padding: '0 4px',
      zIndex: 1000,
    }}>
      {/* Start button */}
      <button
        data-start-button
        onClick={() => setStartOpen(o => !o)}
        onMouseEnter={e => { if (!startOpen) e.currentTarget.style.background = '#d4d4d4' }}
        onMouseLeave={e => { if (!startOpen) e.currentTarget.style.background = '#c0c0c0' }}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '3px 8px', height: 30,
          background: '#c0c0c0',
          boxShadow: startOpen ? BEVEL_DOWN : BEVEL_UP,
          border: 'none', cursor: 'pointer', fontSize: 8,
          fontFamily: "'Press Start 2P', monospace",
          fontWeight: 'bold', color: '#000',
          whiteSpace: 'nowrap', letterSpacing: 1, marginRight: 4,
          transition: 'background 0.08s ease',
        }}>
        <StartIcon size={16} />
        <span>Start</span>
      </button>

      <div style={{ width: 1, height: 28, background: '#808080', marginRight: 4 }} />
      <div style={{ width: 1, height: 28, background: '#fff', marginRight: 4 }} />

      {APPS.map(app => {
        const isOpen = !!windows[app.id] && !windows[app.id]?.minimized
        return (
          <button
            key={app.id}
            onClick={() => handleApp(app.id)}
            onMouseEnter={e => { e.currentTarget.style.background = isOpen ? '#b8b8b8' : '#d4d4d4' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c0c0c0' }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 8px', height: 30,
              background: '#c0c0c0',
              boxShadow: isOpen ? BEVEL_DOWN : BEVEL_UP,
              border: 'none', cursor: 'pointer', fontSize: 7,
              fontFamily: "'Press Start 2P', monospace",
              color: isOpen ? '#000' : '#222',
              borderLeft: isOpen ? `2px solid ${app.color}` : 'none',
              letterSpacing: 0.5,
              transition: 'background 0.08s ease',
            }}
          >
            <app.Icon size={16} />
            <span style={{ display: window.innerWidth > 500 ? 'inline' : 'none' }}>{app.label}</span>
          </button>
        )
      })}

      <div style={{ flex: 1 }} />
      <Clock />

      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onShutdown={() => setShutdown(true)}
        />
      )}
      {shutdown && <ShutdownOverlay onClose={() => setShutdown(false)} />}
    </div>
  )
}

function ShutdownOverlay({ onClose }) {
  const [phase, setPhase] = useState('off')
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('safe'), 1400)
    return () => clearTimeout(t1)
  }, [])
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: '#000',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {phase === 'safe' && (
        <div style={{ textAlign: 'center', fontFamily: "'Press Start 2P', monospace" }}>
          <div style={{ fontSize: 14, color: '#e0b040', letterSpacing: 2, marginBottom: 16 }}>
            It's now safe to turn off
          </div>
          <div style={{ fontSize: 14, color: '#e0b040', letterSpacing: 2, marginBottom: 32 }}>
            your computer.
          </div>
          <div style={{ fontSize: 7, color: '#888' }}>(click anywhere to wake)</div>
        </div>
      )}
    </div>
  )
}
