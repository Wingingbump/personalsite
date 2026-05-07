import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { DesktopProvider } from './contexts/DesktopContext'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import MobileSite from './components/MobileSite'

const MOBILE_BREAKPOINT = 720

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

export default function App() {
  const isMobile = useIsMobile()
  return (
    <>
      {isMobile ? (
        <MobileSite />
      ) : (
        <DesktopProvider>
          <Desktop />
          <Taskbar />
        </DesktopProvider>
      )}
      <Analytics />
    </>
  )
}
