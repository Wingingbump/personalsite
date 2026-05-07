import { LinkedInIcon, GitHubIcon, ContactIcon } from '../DesktopIcons'

export const LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/tommyle03',    href: 'https://linkedin.com/in/tommyle03',        Icon: LinkedInIcon, color: '#4a7fa5' },
  { label: 'GitHub',   value: 'github.com/Wingingbump',       href: 'https://github.com/Wingingbump',           Icon: GitHubIcon,   color: '#1a1a1a' },
  { label: 'Email',    value: 'rocketmanlee1@gmail.com',      href: 'mailto:rocketmanlee1@gmail.com',           Icon: ContactIcon,  color: '#d4614e' },
]

export default function ContactWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <p style={{ fontSize: 7, color: '#555', lineHeight: 2 }}>
        Want to collaborate, have a question, or just want to chat? Pick your channel:
      </p>

      {LINKS.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 12px',
            background: '#fff',
            boxShadow: 'inset -1px -1px #808080, inset 1px 1px #dfdfdf',
            textDecoration: 'none',
            borderLeft: `4px solid ${link.color}`,
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          <link.Icon size={22} />
          <div>
            <div style={{ fontSize: 8, color: link.color, marginBottom: 4 }}>{link.label}</div>
            <div style={{ fontSize: 7, color: '#666' }}>{link.value}</div>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: link.color }}>▸</span>
        </a>
      ))}

      <div style={{
        marginTop: 4,
        padding: '10px 12px',
        background: '#fff',
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #dfdfdf',
        fontSize: 7,
        color: '#666',
        lineHeight: 2.2,
      }}>
        📍 Based in Virginia, USA<br />
        ⏱ Response time: ~24 hours<br />
        💼 Open to full-time roles
      </div>
    </div>
  )
}
