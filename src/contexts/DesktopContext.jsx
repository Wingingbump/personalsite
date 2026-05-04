import { createContext, useContext, useState, useCallback } from 'react'

const DesktopContext = createContext(null)

export const WALLPAPERS = [
  { id: 'teal',       label: 'Teal',       color: '#3d8b8b' },
  { id: 'periwinkle', label: 'Periwinkle', color: '#7070a8' },
  { id: 'sage',       label: 'Sage',       color: '#527864' },
  { id: 'mauve',      label: 'Mauve',      color: '#907080' },
  { id: 'slate',      label: 'Slate',      color: '#4e6880' },
]

const DEFAULT_POSITIONS = {
  about:      { x: 120, y: 60  },
  projects:   { x: 180, y: 90  },
  experience: { x: 240, y: 75  },
  contact:    { x: 300, y: 105 },
  resume:     { x: 140, y: 50  },
  klondike:   { x: 200, y: 40  },
}

export function DesktopProvider({ children }) {
  const [windows, setWindows]   = useState({})
  const [zOrder, setZOrder]     = useState([])
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0])

  const openWindow = useCallback((id) => {
    setWindows(prev => {
      if (prev[id]) return { ...prev, [id]: { ...prev[id], minimized: false } }
      return { ...prev, [id]: { id, minimized: false, pos: DEFAULT_POSITIONS[id] ?? { x: 120, y: 80 } } }
    })
    setZOrder(prev => [...prev.filter(z => z !== id), id])
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => { const n = { ...prev }; delete n[id]; return n })
    setZOrder(prev => prev.filter(z => z !== id))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], minimized: true } }))
  }, [])

  const focusWindow = useCallback((id) => {
    setZOrder(prev => [...prev.filter(z => z !== id), id])
  }, [])

  const moveWindow = useCallback((id, pos) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], pos } }))
  }, [])

  const getZ = (id) => {
    const idx = zOrder.indexOf(id)
    return idx === -1 ? 10 : 10 + idx
  }

  const activeWindowId = zOrder[zOrder.length - 1] ?? null

  return (
    <DesktopContext.Provider value={{
      windows, zOrder, activeWindowId, wallpaper, setWallpaper,
      openWindow, closeWindow, minimizeWindow, focusWindow, moveWindow, getZ,
    }}>
      {children}
    </DesktopContext.Provider>
  )
}

export const useDesktop = () => useContext(DesktopContext)
