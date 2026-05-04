import { DesktopProvider } from './contexts/DesktopContext'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'

export default function App() {
  return (
    <DesktopProvider>
      <Desktop />
      <Taskbar />
    </DesktopProvider>
  )
}
