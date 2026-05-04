const RESUME_PATH = '/resume.pdf'
const RESUME_FILENAME = 'Thomas-Le-Resume.pdf'

const BEVEL_UP = 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
const BEVEL_DOWN = 'inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf'

function ToolBtn({ children, href, download, onClick }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      download={download}
      target={href && !download ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      onMouseDown={e => { e.currentTarget.style.boxShadow = BEVEL_DOWN }}
      onMouseUp={e => { e.currentTarget.style.boxShadow = BEVEL_UP }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = BEVEL_UP }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 10px',
        background: '#c0c0c0',
        boxShadow: BEVEL_UP,
        border: 'none',
        cursor: 'pointer',
        fontSize: 7,
        fontFamily: "'Press Start 2P', monospace",
        color: '#000',
        letterSpacing: 0.5,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Tag>
  )
}

export default function ResumeWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: 6,
        padding: '4px 0',
        flexWrap: 'wrap',
      }}>
        <ToolBtn href={RESUME_PATH} download={RESUME_FILENAME}>
          ⬇ Download PDF
        </ToolBtn>
        <ToolBtn href={RESUME_PATH}>
          ↗ Open in new tab
        </ToolBtn>
      </div>

      {/* Status / hint */}
      <div style={{
        fontSize: 6,
        color: '#666',
        lineHeight: 1.8,
        padding: '0 2px',
      }}>
        Last updated May 2026 · PDF · ~80 KB
      </div>

      {/* Embedded PDF */}
      <div style={{
        flex: 1,
        minHeight: 480,
        background: '#808080',
        boxShadow: 'inset 1px 1px #000, inset -1px -1px #fff',
        padding: 1,
      }}>
        <iframe
          title="Tommy Le Resume"
          src={`${RESUME_PATH}#view=FitH`}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 478,
            border: 'none',
            background: '#fff',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
