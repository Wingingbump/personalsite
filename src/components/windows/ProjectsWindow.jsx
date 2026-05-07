const PROJECTS = [
  {
    name: 'Spendalyzer',
    desc: 'Full-stack personal finance platform at spend.wingingbump.com — Plaid aggregation, Voyage embeddings for merchant normalization, and a Claude-powered advisor with streaming responses, goal tracking, and proactive nudges. Drag-and-drop dashboard with Recharts (bar/line/pie/Sankey), duplicate/transfer detection, and recurring subscription detection.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Plaid', 'Anthropic', 'Voyage'],
    color: '#d4614e',
  },
  {
    name: 'Got Food? — MEng Capstone',
    desc: 'Map-based platform helping Virginia residents locate food pantries with filtering by ZIP, dietary support (Halal/Vegan/Vegetarian/Kosher), eligibility, and current open status. React + Vite SPA with React Leaflet maps, Flask REST API with JWT-gated admin endpoints, a custom PostgreSQL schema enforcing geographic-bounding and ZIP-code constraints, and Redis-backed response caching — all containerized with Docker Compose.',
    tags: ['React', 'Vite', 'Flask', 'PostgreSQL', 'Redis', 'Leaflet', 'Docker'],
    color: '#5f9e6e',
  },
  {
    name: 'Lockheed Martin Autodelivery — Undergrad Capstone',
    desc: 'Factory autonomous drone delivery system for Lockheed Martin (Spring 2025). Built a React + TypeScript "Mission Center" for fleet management and live telemetry, a Flask REST API bridging MAVLink to ArduPilot, and Raspberry Pi companion-computer software for autonomous flight, AprilTag-based precision landing, and payload grabber control.',
    tags: ['React', 'TypeScript', 'Flask', 'MySQL', 'MAVLink', 'ArduPilot', 'OpenCV', 'Raspberry Pi'],
    color: '#4a7fa5',
  },
  {
    name: 'wingingbump.com',
    desc: 'This site — an interactive retro-OS portfolio built on Vite + React with a draggable window system, pixel-art chrome, and a fishing/lake theme.',
    tags: ['React', 'Vite', 'Three.js'],
    color: '#8e5e8e',
  },
  {
    name: 'BMRA Production App',
    desc: 'Modern Windows desktop application for remote distribution, built on the Windows UI Library with COM interop. Shipped new features and performance improvements for daily production use.',
    tags: ['C#', 'XAML', 'WinUI', 'COM Interop'],
    color: '#d4614e',
  },
  {
    name: 'Quoteth Bot',
    desc: 'Interactive Discord game bot with SQLite persistence.',
    tags: ['Python', 'SQLite'],
    color: '#5f9e6e',
  },
]

function Tag({ label, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 6px',
      fontSize: 6,
      color: '#fff',
      background: color,
      marginRight: 4,
    }}>
      {label}
    </span>
  )
}

export default function ProjectsWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {PROJECTS.map((p, i) => (
        <div key={p.name} style={{
          borderLeft: `4px solid ${p.color}`,
          paddingLeft: 10,
          paddingTop: 4,
          paddingBottom: 4,
          background: '#fff',
          boxShadow: 'inset -1px -1px #808080, inset 1px 1px #dfdfdf',
          padding: '8px 10px 8px 14px',
        }}>
          <div style={{
            fontSize: 7,
            color: p.color,
            marginBottom: 6,
            letterSpacing: 0.5,
          }}>
            {String(i + 1).padStart(2, '0')}. {p.name}
          </div>
          <div style={{ fontSize: 7, color: '#555', lineHeight: 1.9, marginBottom: 8 }}>
            {p.desc}
          </div>
          <div>
            {p.tags.map(t => <Tag key={t} label={t} color={p.color} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
