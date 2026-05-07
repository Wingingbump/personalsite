import { SKILLS } from './windows/AboutWindow'
import { PROJECTS } from './windows/ProjectsWindow'
import { TIMELINE } from './windows/ExperienceWindow'
import { LINKS } from './windows/ContactWindow'

const BEVEL_UP   = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
const BEVEL_DOWN = 'inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf'

function Card({ accent = '#4a7fa5', title, children }) {
  return (
    <div style={{
      background: '#c0c0c0',
      boxShadow: BEVEL_UP + ', 4px 4px 0 #00000022',
      border: '1px solid #000',
      marginBottom: 16,
    }}>
      <div style={{
        background: `linear-gradient(to right, ${accent}, ${accent}cc)`,
        padding: '5px 10px',
        fontSize: 8,
        color: '#fff',
        letterSpacing: 2,
        textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
      }}>
        {title}
      </div>
      <div style={{ padding: 14, background: '#f5f2eb', boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff' }}>
        {children}
      </div>
    </div>
  )
}

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

export default function MobileSite() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#3d8b8b',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)',
      backgroundSize: '4px 4px',
      padding: '14px 12px 28px',
      fontFamily: "'Press Start 2P', monospace",
    }}>
      {/* Hero */}
      <div style={{
        background: '#c0c0c0',
        boxShadow: BEVEL_UP + ', 4px 4px 0 #00000033',
        border: '1px solid #000',
        marginBottom: 18,
      }}>
        <div style={{
          background: 'linear-gradient(to right, #000080, #1084d0)',
          padding: '5px 10px',
          fontSize: 8, color: '#fff', letterSpacing: 2,
          textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
        }}>
          portfolio.sys
        </div>
        <div style={{
          padding: '20px 18px 22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          <img
            src="/headshot.jpg"
            alt="Tommy Le"
            style={{
              width: '70%', maxWidth: 220,
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              imageRendering: 'auto',
              boxShadow: 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
              border: '1px solid #000',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, color: '#000', letterSpacing: 3, marginBottom: 8 }}>TOMMY LE</div>
            <div style={{ fontSize: 7, color: '#444', marginBottom: 4, lineHeight: 1.7 }}>Software Engineer @ Leidos</div>
            <div style={{ fontSize: 7, color: '#666', lineHeight: 1.7 }}>VT M.Eng. '26 · Virginia</div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <Card accent="#d4614e" title="// About">
        <p style={{ fontSize: 7, color: '#333', lineHeight: 2, margin: 0 }}>
          Software engineer at Leidos working on legacy modernization, document
          processing pipelines on Azure, and AI-driven automation for federal
          customers. Graduating with my M.Eng. in CS from Virginia Tech, with a
          focus on full-stack systems, machine learning, and applied AI.
        </p>
      </Card>

      {/* Resume CTA */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          marginBottom: 18,
        }}
      >
        <div style={{
          background: '#c0c0c0',
          boxShadow: BEVEL_UP + ', 4px 4px 0 #00000022',
          border: '1px solid #000',
          padding: '12px 14px',
          textAlign: 'center',
          fontSize: 9,
          color: '#000',
          letterSpacing: 2,
        }}>
          ⬇ View Resume
        </div>
      </a>

      {/* Experience */}
      <Card accent="#5f9e6e" title="// Experience">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TIMELINE.map(e => (
            <div key={`${e.role}-${e.period}`} style={{
              background: '#fff',
              boxShadow: 'inset 1px 1px #fff, inset -1px -1px #808080',
              borderLeft: `3px solid ${e.color}`,
              padding: '8px 10px',
            }}>
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
              <div style={{ fontSize: 7, color: '#000', marginBottom: 3, letterSpacing: 0.5 }}>
                {e.role}
              </div>
              <div style={{ fontSize: 6, color: e.color, marginBottom: 6 }}>
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
          ))}
        </div>
      </Card>

      {/* Projects */}
      <Card accent="#4a7fa5" title="// Projects">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.name} style={{
              borderLeft: `4px solid ${p.color}`,
              background: '#fff',
              boxShadow: 'inset -1px -1px #808080, inset 1px 1px #dfdfdf',
              padding: '8px 10px 8px 12px',
            }}>
              <div style={{ fontSize: 7, color: p.color, marginBottom: 6, letterSpacing: 0.5 }}>
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
      </Card>

      {/* Skills */}
      <Card accent="#8e5e8e" title="// Skills">
        <div>
          {SKILLS.map((s, i) => (
            <Tag key={s} label={s} color={['#d4614e','#4a7fa5','#5f9e6e','#8e5e8e'][i % 4]} />
          ))}
        </div>
      </Card>

      {/* Contact */}
      <Card accent="#d4614e" title="// Contact">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
              }}
            >
              <link.Icon size={22} />
              <div>
                <div style={{ fontSize: 8, color: link.color, marginBottom: 4 }}>{link.label}</div>
                <div style={{ fontSize: 7, color: '#666' }}>{link.value}</div>
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* Footer hint */}
      <div style={{
        textAlign: 'center',
        fontSize: 6,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 20,
        lineHeight: 1.8,
      }}>
        💻 view the full retro-OS portfolio<br/>on a desktop browser
      </div>
    </div>
  )
}
