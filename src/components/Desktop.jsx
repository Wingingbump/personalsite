import { useState, useCallback } from 'react'
import { useDesktop } from '../contexts/DesktopContext'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import ContextMenu from './ContextMenu'
import AboutWindow from './windows/AboutWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ContactWindow from './windows/ContactWindow'
import ResumeWindow from './windows/ResumeWindow'
import KlondikeWindow from './windows/KlondikeWindow'
import { AboutIcon, ProjectsIcon, ExperienceIcon, ContactIcon, SpendalyzerIcon, ResumeIcon, KlondikeIcon } from './DesktopIcons'

const ICONS = [
  { id: 'about',      label: 'About Me',   icon: <AboutIcon /> },
  { id: 'projects',   label: 'Projects',   icon: <ProjectsIcon /> },
  { id: 'experience', label: 'Experience', icon: <ExperienceIcon /> },
  { id: 'contact',    label: 'Contact',    icon: <ContactIcon /> },
]

const WINDOWS = {
  about:      { title: 'About Me',   color: 'coral',      Component: AboutWindow,      Icon: AboutIcon },
  projects:   { title: 'Projects',   color: 'dusty-blue', Component: ProjectsWindow,   Icon: ProjectsIcon },
  experience: { title: 'Experience', color: 'sage',       Component: ExperienceWindow, Icon: ExperienceIcon },
  contact:    { title: 'Contact',    color: 'mauve',      Component: ContactWindow,    Icon: ContactIcon },
  resume:     { title: 'Resume',     color: 'coral',      Component: ResumeWindow,     Icon: ResumeIcon, width: 720 },
  klondike:   { title: 'Lakeside Klondike', color: 'sage', Component: KlondikeWindow,   Icon: KlondikeIcon, width: 540 },
}

const BEVEL_UP = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'

export default function Desktop() {
  const { windows, wallpaper } = useDesktop()
  const [menu, setMenu] = useState(null)

  const onContextMenu = useCallback((e) => {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div
      onContextMenu={onContextMenu}
      onClick={() => setMenu(null)}
      style={{
        position: 'fixed', inset: '0 0 40px 0', zIndex: 1,
        backgroundColor: wallpaper.color,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
      }}
    >
      {/* Top-left desktop shortcuts */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        display: 'flex', flexDirection: 'column', gap: 8,
        zIndex: 2, userSelect: 'none',
      }}>
        <DesktopIcon
          id="spendalyzer"
          label="Spendalyzer"
          icon={<SpendalyzerIcon />}
          href="https://spend.wingingbump.com"
        />
        <DesktopIcon
          id="resume"
          label="Resume"
          icon={<ResumeIcon />}
        />
        <DesktopIcon
          id="klondike"
          label="Klondike"
          icon={<KlondikeIcon />}
        />
      </div>

      {/* Centered hero — name card + icons */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 12, zIndex: 2, userSelect: 'none',
      }}>
        {/* Name card */}
        <div style={{ pointerEvents: 'none', width: 430 }}>
          <div style={{
            background: '#c0c0c0',
            boxShadow: BEVEL_UP + ', 4px 4px 0 #00000033',
            border: '1px solid #000',
          }}>
            <div style={{
              background: 'linear-gradient(to right, #000080, #1084d0)',
              padding: '5px 8px',
            }}>
              <div style={{ fontSize: 9, color: '#fff', letterSpacing: 2, textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>
                portfolio.sys
              </div>
            </div>
            <div style={{ padding: '20px 32px 22px' }}>
              <div style={{ fontSize: 18, color: '#000', letterSpacing: 3, marginBottom: 10 }}>TOMMY LE</div>
              <div style={{ fontSize: 7, color: '#444', marginBottom: 5 }}>Software Engineer</div>
              <div style={{ fontSize: 7, color: '#666' }}>Leidos · Virginia Tech</div>
            </div>
          </div>
        </div>

        {/* Icon tray */}
        <div style={{
          background: '#c0c0c0',
          boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff, 4px 4px 0 #00000033',
          border: '1px solid #000',
          padding: '6px 8px',
          display: 'flex', flexDirection: 'row', gap: 2,
          pointerEvents: 'auto',
        }}>
          {ICONS.map(icon => <DesktopIcon key={icon.id} {...icon} />)}
        </div>
      </div>

      {/* Open windows */}
      {Object.keys(windows).map(id => {
        const cfg = WINDOWS[id]
        if (!cfg) return null
        const { title, color, Component, Icon, width } = cfg
        return (
          <Window key={id} id={id} title={title} color={color} icon={<Icon size={16} />} width={width}>
            <Component />
          </Window>
        )
      })}

      {menu && <ContextMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />}
    </div>
  )
}
