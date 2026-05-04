const TIMELINE = [
  {
    role: 'Software Engineer',
    org: 'Leidos',
    period: 'Sept 2025 – Present',
    type: 'work',
    color: '#5f9e6e',
    current: true,
    bullets: [
      'Spearheaded legacy modernization, migrating on-prem clusters to Microsoft Dynamics & Fabric for federal customers',
      'Architected document processing pipelines on Azure Data Factory + Azure AI Document Intelligence',
      'Engineered end-to-end workflow automation in a CI/CD environment with AI-driven document processing',
    ],
  },
  {
    role: 'M.Eng. Computer Science',
    org: 'Virginia Tech',
    period: 'Aug 2025 – May 2026',
    type: 'edu',
    color: '#8e5e8e',
    meta: 'GPA 3.8',
    bullets: ['Graduate coursework in software engineering & systems'],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Leidos',
    period: 'May 2025 – Sept 2025',
    type: 'work',
    color: '#5f9e6e',
    bullets: [
      'Led end-to-end development of an internal AI-driven service for a federal team',
      'Delivered a production-ready tool that automated manual review processes',
      'Engineered modernization solutions to meet federal security & regulatory compliance',
    ],
  },
  {
    role: 'B.S. Computer Science',
    org: 'Virginia Tech',
    period: 'Aug 2021 – May 2025',
    type: 'edu',
    color: '#8e5e8e',
    meta: 'GPA 3.6',
    bullets: ['Focus on software engineering and systems', 'Go Hokies 🦃'],
  },
  {
    role: 'Business Development Systems Intern',
    org: 'Leidos',
    period: 'May 2024 – May 2025',
    type: 'work',
    color: '#4a7fa5',
    bullets: [
      'Analyzed 1M+ business opportunities by building AI-powered metadata analytics pipelines',
      'Built a full-stack PowerApps proposal management system with Dataverse & Azure APIs',
      'Shipped real-time Power BI dashboards and SharePoint scraping automations',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'BMRA',
    period: 'May 2023 – May 2025',
    type: 'work',
    color: '#4a7fa5',
    bullets: [
      'Built cross-platform automations across Office365, Adobe & Zoom APIs — saving 20+ hrs/week',
      'Reduced processing time by 60% with custom desktop tooling',
      'Developed Microsoft Graph + SQL Server services deployed on remote servers org-wide',
    ],
  },
]

function Marker({ color, type, current }) {
  // Pixel-art marker — briefcase glyph for work, grad-cap for edu
  return (
    <div style={{
      width: 22, height: 22,
      background: '#fff',
      boxShadow: `inset 0 0 0 2px ${color}, 1px 1px 0 rgba(0,0,0,0.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      zIndex: 2,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
        {type === 'work' ? (
          <>
            <rect x="5" y="2" width="4" height="1" fill={color}/>
            <rect x="2" y="3" width="10" height="8" fill={color}/>
            <rect x="2" y="6" width="10" height="1" fill="#fff"/>
            <rect x="6" y="5" width="2" height="3" fill="#fff"/>
          </>
        ) : (
          <>
            <rect x="1" y="5" width="12" height="2" fill={color}/>
            <rect x="3" y="7" width="8" height="3" fill={color}/>
            <rect x="6" y="3" width="2" height="2" fill={color}/>
            <rect x="11" y="6" width="1" height="4" fill={color}/>
          </>
        )}
      </svg>
      {current && (
        <span style={{
          position: 'absolute',
          top: -3, right: -3,
          width: 6, height: 6,
          background: '#5f9e6e',
          boxShadow: '0 0 0 1px #fff, 0 0 4px #5f9e6e',
        }} />
      )}
    </div>
  )
}

export default function ExperienceWindow() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Header card */}
      <div style={{
        background: '#fff',
        boxShadow: 'inset 1px 1px #fff, inset -1px -1px #808080',
        padding: '10px 12px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 36, height: 36,
          background: '#d4614e',
          boxShadow: 'inset -1px -1px #803020, inset 1px 1px #f08878',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 14, letterSpacing: 1,
          flexShrink: 0,
        }}>
          TL
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: '#000', marginBottom: 4, letterSpacing: 1 }}>Tommy Le</div>
          <div style={{ fontSize: 6, color: '#666', lineHeight: 1.6 }}>
            Software Engineer @ Leidos · 4 yrs experience<br/>
            Federal modernization · Azure · AI-driven automation
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 14, paddingLeft: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 6, color: '#555' }}>
          <span style={{ width: 8, height: 8, background: '#5f9e6e' }}/> Work
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 6, color: '#555' }}>
          <span style={{ width: 8, height: 8, background: '#8e5e8e' }}/> Education
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 6, color: '#555' }}>
          <span style={{ width: 6, height: 6, background: '#5f9e6e', boxShadow: '0 0 0 1px #fff, 0 0 4px #5f9e6e' }}/> Current
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 30 }}>
        {/* Rail */}
        <div style={{
          position: 'absolute',
          left: 10, top: 6, bottom: 6,
          width: 2,
          background: 'repeating-linear-gradient(to bottom, #808080 0 3px, transparent 3px 6px)',
        }} />

        {TIMELINE.map((e, i) => (
          <div key={`${e.role}-${e.period}`} style={{
            position: 'relative',
            marginBottom: i === TIMELINE.length - 1 ? 0 : 14,
          }}>
            {/* Marker positioned on the rail */}
            <div style={{ position: 'absolute', left: -30, top: 0 }}>
              <Marker color={e.color} type={e.type} current={e.current} />
            </div>

            {/* Period pill */}
            <div style={{
              fontSize: 6,
              color: '#fff',
              background: e.color,
              padding: '2px 6px',
              display: 'inline-block',
              marginBottom: 6,
              letterSpacing: 0.5,
            }}>
              {e.period}{e.meta ? ` · ${e.meta}` : ''}
            </div>

            {/* Card */}
            <div style={{
              background: '#fff',
              boxShadow: 'inset 1px 1px #fff, inset -1px -1px #808080',
              borderLeft: `3px solid ${e.color}`,
              padding: '8px 10px',
            }}>
              <div style={{ fontSize: 7, color: '#000', marginBottom: 3, letterSpacing: 0.5 }}>
                {e.role}
              </div>
              <div style={{ fontSize: 6, color: e.color, marginBottom: 6, letterSpacing: 0.5 }}>
                {e.org}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {e.bullets.map(b => (
                  <li key={b} style={{
                    fontSize: 6,
                    color: '#444',
                    lineHeight: 1.9,
                    paddingLeft: 10,
                    position: 'relative',
                    marginBottom: 2,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: e.color }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
