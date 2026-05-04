const SKILLS = [
  'C#', 'Python', 'Java', 'TypeScript', 'JavaScript', 'React', 'FastAPI',
  'PostgreSQL', 'Azure', 'Docker', '.NET', 'SQL', 'Kotlin', 'C++', 'Bash',
]

function Tag({ label, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 7px',
      fontSize: 7,
      color: '#fff',
      background: color,
      marginRight: 5,
      marginBottom: 5,
    }}>
      {label}
    </span>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 7,
        color: '#fff',
        background: '#d4614e',
        padding: '3px 8px',
        marginBottom: 10,
        letterSpacing: 1,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function AboutWindow() {
  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Name header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
        paddingBottom: 14,
        borderBottom: '1px solid #c0c0c0',
      }}>
        <span style={{ fontSize: 36 }}>👤</span>
        <div>
          <div style={{ fontSize: 12, color: '#d4614e', marginBottom: 6, letterSpacing: 2 }}>Tommy Le</div>
          <div style={{ fontSize: 7, color: '#555' }}>Software Engineer @ Leidos · VT M.Eng. '26</div>
        </div>
      </div>

      <Section title="// Bio">
        <p style={{ fontSize: 7, color: '#333', lineHeight: 2.2 }}>
          Software engineer at Leidos working on legacy modernization, document
          processing pipelines on Azure, and AI-driven automation for federal
          customers. Graduating with my M.Eng. in CS from Virginia Tech and
          building Spendalyzer — a personal finance platform with a Claude-powered
          financial advisor — on the side.
        </p>
      </Section>

      <Section title="// Skills">
        <div>
          {SKILLS.map((s, i) => (
            <Tag key={s} label={s} color={['#d4614e','#4a7fa5','#5f9e6e','#8e5e8e'][i % 4]} />
          ))}
        </div>
      </Section>

      <Section title="// Tools">
        <p style={{ fontSize: 7, color: '#333', lineHeight: 2.2 }}>
          Azure Data Factory · Azure AI Document Intelligence · Microsoft Fabric ·
          Microsoft Dynamics · Power Automate · Power BI · Dataverse · Tailwind ·
          Node · Git · Unix
        </p>
      </Section>

      <Section title="// Interests">
        <p style={{ fontSize: 7, color: '#333', lineHeight: 2.2 }}>
          🎣 Fishing &nbsp; 🎮 Game dev &nbsp; 🌲 The outdoors &nbsp; ✨ Creative coding
        </p>
      </Section>
    </div>
  )
}
