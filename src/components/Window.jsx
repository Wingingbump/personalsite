import { useRef, useCallback, useEffect } from 'react'
import { useDesktop } from '../contexts/DesktopContext'

const DEFAULT_WIN_W = 460
const MIN_VISIBLE = 80
const TASKBAR_H = 56

const ACCENT = {
  coral:       '#d4614e',
  'dusty-blue':'#4a7fa5',
  sage:        '#5f9e6e',
  mauve:       '#8e5e8e',
}

const BEVEL_UP   = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
const BEVEL_DOWN = 'inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf'

function TitleBtn({ label, onClick }) {
  return (
    <button
      onMouseDown={e => e.stopPropagation()}
      onClick={e => { e.stopPropagation(); onClick?.() }}
      style={{
        width: 18, height: 18,
        background: '#c0c0c0',
        boxShadow: BEVEL_UP,
        border: 'none',
        cursor: 'pointer',
        fontSize: 8,
        fontFamily: "'Press Start 2P', monospace",
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#000',
        flexShrink: 0,
        padding: 0,
      }}
    >
      {label}
    </button>
  )
}

export default function Window({ id, title, color = 'coral', icon = null, width = DEFAULT_WIN_W, children }) {
  const { windows, activeWindowId, closeWindow, minimizeWindow, focusWindow, moveWindow, getZ } = useDesktop()
  const win = windows[id]
  const dragRef = useRef(null)
  const isActive = activeWindowId === id
  const titleBg = isActive
    ? `linear-gradient(to right, ${ACCENT[color] ?? '#d4614e'}, ${ACCENT[color] ?? '#d4614e'}bb)`
    : 'linear-gradient(to right, #808080, #a0a0a0)'

  const clampPos = useCallback((x, y) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      x: Math.min(Math.max(-width + MIN_VISIBLE, x), vw - MIN_VISIBLE),
      y: Math.min(Math.max(0, y), vh - TASKBAR_H - 26),
    }
  }, [width])

  const onTitleMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    e.preventDefault()
    focusWindow(id)
    const startX = e.clientX - win.pos.x
    const startY = e.clientY - win.pos.y
    dragRef.current = { startX, startY }
    const prevUserSelect = document.body.style.userSelect
    const prevCursor = document.body.style.cursor
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'

    const onMove = (e) => {
      if (!dragRef.current) return
      moveWindow(id, clampPos(
        e.clientX - dragRef.current.startX,
        e.clientY - dragRef.current.startY,
      ))
    }
    const onUp = () => {
      dragRef.current = null
      document.body.style.userSelect = prevUserSelect
      document.body.style.cursor = prevCursor
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [id, win?.pos, focusWindow, moveWindow, clampPos])

  useEffect(() => {
    const onResize = () => {
      if (!win) return
      const next = clampPos(win.pos.x, win.pos.y)
      if (next.x !== win.pos.x || next.y !== win.pos.y) moveWindow(id, next)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [id, win, moveWindow, clampPos])

  if (!win || win.minimized) return null

  return (
    <div
      className="window-open"
      onMouseDown={() => focusWindow(id)}
      style={{
        position: 'fixed',
        left: win.pos.x,
        top: win.pos.y,
        width,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100vh - 56px)',
        zIndex: getZ(id),
        display: 'flex',
        flexDirection: 'column',
        background: '#c0c0c0',
        boxShadow: BEVEL_UP + ', 4px 4px 0 #00000055',
        border: '1px solid #000',
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={onTitleMouseDown}
        onDragStart={e => e.preventDefault()}
        draggable={false}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 4px',
          background: titleBg,
          cursor: 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          flexShrink: 0,
          minHeight: 26,
        }}
      >
        {icon && (
          <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: 1 }}>
            {icon}
          </span>
        )}
        <span style={{
          flex: 1,
          fontSize: 8,
          color: isActive ? '#fff' : '#d0d0d0',
          letterSpacing: 1,
          paddingLeft: 2,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
        }}>
          {title}
        </span>
        <TitleBtn label="−" onClick={() => minimizeWindow(id)} />
        <TitleBtn label="✕" onClick={() => closeWindow(id)} />
      </div>

      <div style={{ height: 1, background: '#808080' }} />
      <div style={{ height: 1, background: '#fff' }} />

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: '#f5f2eb',
        padding: 14,
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff',
        maxHeight: 'calc(100vh - 130px)',
      }}>
        {children}
      </div>

      {/* Status bar */}
      <div style={{
        padding: '3px 6px',
        fontSize: 7,
        color: '#444',
        borderTop: '1px solid #808080',
        background: '#c0c0c0',
        boxShadow: 'inset 1px 1px #fff',
        display: 'flex',
        gap: 8,
      }}>
        <span style={{ boxShadow: 'inset 1px 1px #808080', padding: '1px 6px' }}>Ready</span>
      </div>
    </div>
  )
}
