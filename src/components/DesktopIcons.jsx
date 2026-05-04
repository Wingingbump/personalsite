const px = { imageRendering: 'pixelated', display: 'block', shapeRendering: 'crispEdges' }

// Klondike — playing card pixel icon
export function KlondikeIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Back card (offset) */}
      <rect x="3" y="2" width="9" height="12" fill="#4a7fa5"/>
      <rect x="3" y="2" width="9" height="1" fill="#78a8c8"/>
      <rect x="3" y="2" width="1" height="12" fill="#78a8c8"/>
      <rect x="11" y="2" width="1" height="12" fill="#305878"/>
      <rect x="3" y="13" width="9" height="1" fill="#305878"/>
      {/* Front card */}
      <rect x="1" y="4" width="9" height="11" fill="#fdfdf5"/>
      <rect x="1" y="4" width="9" height="1" fill="#ffffff"/>
      <rect x="9" y="4" width="1" height="11" fill="#a0a0a0"/>
      <rect x="1" y="14" width="9" height="1" fill="#a0a0a0"/>
      {/* Suit indicator (red fish) */}
      <rect x="2" y="6" width="3" height="2" fill="#c0382a"/>
      <rect x="3" y="5" width="2" height="4" fill="#c0382a"/>
      <rect x="5" y="6" width="1" height="2" fill="#c0382a"/>
      {/* Big center fish */}
      <rect x="3" y="10" width="5" height="3" fill="#c0382a"/>
      <rect x="4" y="9" width="3" height="5" fill="#c0382a"/>
      <rect x="7" y="10" width="1" height="3" fill="#c0382a"/>
    </Px>
  )
}

// Resume — document with text lines and a corner fold
export function ResumeIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Page */}
      <rect x="2" y="1" width="11" height="14" fill="#ffffff"/>
      <rect x="2" y="1" width="11" height="1" fill="#ffffff"/>
      <rect x="2" y="14" width="11" height="1" fill="#a0a0a0"/>
      <rect x="13" y="1" width="1" height="14" fill="#a0a0a0"/>
      {/* Folded corner */}
      <rect x="10" y="1" width="3" height="3" fill="#e0e0e0"/>
      <rect x="10" y="1" width="1" height="3" fill="#808080"/>
      <rect x="10" y="3" width="3" height="1" fill="#808080"/>
      {/* Header bar */}
      <rect x="3" y="3" width="6" height="2" fill="#d4614e"/>
      {/* Text lines */}
      <rect x="3" y="6" width="9" height="1" fill="#404040"/>
      <rect x="3" y="8" width="7" height="1" fill="#808080"/>
      <rect x="3" y="9" width="9" height="1" fill="#808080"/>
      <rect x="3" y="10" width="6" height="1" fill="#808080"/>
      <rect x="3" y="12" width="9" height="1" fill="#808080"/>
      <rect x="3" y="13" width="5" height="1" fill="#808080"/>
    </Px>
  )
}

// LinkedIn — blue square with "in"
export function LinkedInIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={px}>
      <rect x="0" y="0" width="16" height="16" fill="#0a66c2"/>
      <rect x="0" y="0" width="16" height="1" fill="#3a86d2"/>
      <rect x="0" y="15" width="16" height="1" fill="#063e80"/>
      {/* i dot */}
      <rect x="3" y="3" width="2" height="2" fill="#ffffff"/>
      {/* i stem */}
      <rect x="3" y="6" width="2" height="7" fill="#ffffff"/>
      {/* n */}
      <rect x="6" y="6" width="2" height="7" fill="#ffffff"/>
      <rect x="8" y="6" width="3" height="2" fill="#ffffff"/>
      <rect x="11" y="7" width="2" height="6" fill="#ffffff"/>
    </svg>
  )
}

// GitHub — octocat-ish silhouette
export function GitHubIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={px}>
      <rect x="0" y="0" width="16" height="16" fill="#1a1a1a"/>
      <rect x="0" y="0" width="16" height="1" fill="#3a3a3a"/>
      <rect x="0" y="15" width="16" height="1" fill="#0a0a0a"/>
      {/* Ears */}
      <rect x="3" y="3" width="2" height="2" fill="#ffffff"/>
      <rect x="11" y="3" width="2" height="2" fill="#ffffff"/>
      {/* Head */}
      <rect x="3" y="4" width="10" height="6" fill="#ffffff"/>
      <rect x="2" y="5" width="1" height="4" fill="#ffffff"/>
      <rect x="13" y="5" width="1" height="4" fill="#ffffff"/>
      {/* Eyes */}
      <rect x="5" y="6" width="2" height="2" fill="#1a1a1a"/>
      <rect x="9" y="6" width="2" height="2" fill="#1a1a1a"/>
      {/* Body / arms */}
      <rect x="4" y="10" width="8" height="3" fill="#ffffff"/>
      <rect x="3" y="11" width="1" height="1" fill="#ffffff"/>
      <rect x="12" y="11" width="1" height="1" fill="#ffffff"/>
      {/* Tail */}
      <rect x="6" y="13" width="1" height="2" fill="#ffffff"/>
      <rect x="9" y="13" width="1" height="2" fill="#ffffff"/>
    </svg>
  )
}

// Spendalyzer — coin stack with bar chart
export function SpendalyzerIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={px}>
      {/* Monitor / chart background */}
      <rect x="1" y="1" width="14" height="11" fill="#1a3850"/>
      <rect x="1" y="1" width="14" height="1" fill="#3a6080"/>
      <rect x="1" y="1" width="1" height="11" fill="#3a6080"/>
      <rect x="1" y="11" width="14" height="1" fill="#0a1828"/>
      <rect x="14" y="1" width="1" height="11" fill="#0a1828"/>
      {/* Bars */}
      <rect x="3" y="8" width="2" height="3" fill="#5f9e6e"/>
      <rect x="3" y="8" width="2" height="1" fill="#88c098"/>
      <rect x="6" y="6" width="2" height="5" fill="#e0b040"/>
      <rect x="6" y="6" width="2" height="1" fill="#f0d070"/>
      <rect x="9" y="4" width="2" height="7" fill="#d4614e"/>
      <rect x="9" y="4" width="2" height="1" fill="#e88878"/>
      {/* Trendline dot */}
      <rect x="12" y="3" width="2" height="2" fill="#ffffff"/>
      {/* Stand */}
      <rect x="6" y="12" width="4" height="1" fill="#808080"/>
      <rect x="4" y="13" width="8" height="2" fill="#a0a0a0"/>
      <rect x="4" y="13" width="8" height="1" fill="#c0c0c0"/>
      {/* Trendline */}
      <rect x="3" y="7" width="1" height="1" fill="#ffffff"/>
      <rect x="6" y="5" width="1" height="1" fill="#ffffff"/>
      <rect x="9" y="3" width="1" height="1" fill="#ffffff"/>
    </svg>
  )
}

// Win95-flag style start icon — 4 colored panes with a wavy edge
export function StartIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={px}>
      {/* Top-left red */}
      <rect x="2" y="2" width="5" height="5" fill="#d4614e"/>
      <rect x="2" y="2" width="5" height="1" fill="#e88878"/>
      {/* Top-right green */}
      <rect x="8" y="2" width="5" height="5" fill="#5f9e6e"/>
      <rect x="8" y="2" width="5" height="1" fill="#88c098"/>
      {/* Bottom-left blue */}
      <rect x="2" y="8" width="5" height="5" fill="#4a7fa5"/>
      <rect x="2" y="8" width="5" height="1" fill="#78a8c8"/>
      {/* Bottom-right yellow */}
      <rect x="8" y="8" width="5" height="5" fill="#e0b040"/>
      <rect x="8" y="8" width="5" height="1" fill="#f0d070"/>
      {/* Wavy right edge — fold */}
      <rect x="13" y="3" width="1" height="1" fill="#a04030"/>
      <rect x="14" y="4" width="1" height="2" fill="#a04030"/>
      <rect x="13" y="6" width="1" height="2" fill="#406040"/>
      <rect x="14" y="9" width="1" height="2" fill="#305878"/>
      <rect x="13" y="11" width="1" height="1" fill="#305878"/>
      <rect x="13" y="12" width="1" height="1" fill="#a07820"/>
    </svg>
  )
}

function Px({ size = 32, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={px}>
      {children}
    </svg>
  )
}

// User ID badge — pixel portrait on a card
export function AboutIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Card background */}
      <rect x="1" y="1" width="14" height="14" fill="#e8e0c8"/>
      <rect x="1" y="1" width="14" height="1" fill="#fff8e8"/>
      <rect x="1" y="1" width="1" height="14" fill="#fff8e8"/>
      <rect x="1" y="14" width="14" height="1" fill="#806840"/>
      <rect x="14" y="1" width="1" height="14" fill="#806840"/>
      {/* Portrait window */}
      <rect x="3" y="3" width="6" height="8" fill="#7090c0"/>
      <rect x="3" y="3" width="6" height="1" fill="#90b0e0"/>
      {/* Head */}
      <rect x="4" y="5" width="4" height="3" fill="#f5c090"/>
      <rect x="4" y="4" width="4" height="2" fill="#3a1a08"/>
      <rect x="4" y="6" width="1" height="1" fill="#1a1030"/>
      <rect x="7" y="6" width="1" height="1" fill="#1a1030"/>
      {/* Shoulders */}
      <rect x="3" y="9" width="6" height="2" fill="#4060a0"/>
      <rect x="5" y="9" width="2" height="1" fill="#f5c090"/>
      {/* Info lines */}
      <rect x="10" y="4" width="4" height="1" fill="#404040"/>
      <rect x="10" y="6" width="4" height="1" fill="#808080"/>
      <rect x="10" y="8" width="3" height="1" fill="#808080"/>
      <rect x="3" y="12" width="11" height="1" fill="#a09078"/>
    </Px>
  )
}

// Yellow folder with paper poking out
export function ProjectsIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Folder back tab */}
      <rect x="1" y="3" width="6" height="2" fill="#d8a830"/>
      <rect x="1" y="3" width="6" height="1" fill="#f0c850"/>
      {/* Paper sticking out */}
      <rect x="3" y="5" width="10" height="6" fill="#ffffff"/>
      <rect x="3" y="5" width="10" height="1" fill="#ffffff"/>
      <rect x="12" y="5" width="1" height="6" fill="#a0a0a0"/>
      <rect x="5" y="7" width="6" height="1" fill="#808080"/>
      <rect x="5" y="9" width="5" height="1" fill="#808080"/>
      {/* Folder front */}
      <rect x="1" y="6" width="14" height="8" fill="#f0c850"/>
      <rect x="1" y="6" width="14" height="1" fill="#ffe080"/>
      <rect x="1" y="6" width="1" height="8" fill="#ffe080"/>
      <rect x="1" y="13" width="14" height="1" fill="#806020"/>
      <rect x="14" y="6" width="1" height="8" fill="#a07820"/>
    </Px>
  )
}

// Classic briefcase
export function ExperienceIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Handle */}
      <rect x="6" y="2" width="4" height="1" fill="#1a1208"/>
      <rect x="5" y="3" width="1" height="2" fill="#1a1208"/>
      <rect x="10" y="3" width="1" height="2" fill="#1a1208"/>
      <rect x="6" y="3" width="4" height="1" fill="#1a1208"/>
      {/* Body */}
      <rect x="1" y="5" width="14" height="9" fill="#a05028"/>
      {/* Highlights / shadows */}
      <rect x="1" y="5" width="14" height="1" fill="#c87040"/>
      <rect x="1" y="5" width="1" height="9" fill="#c87040"/>
      <rect x="1" y="13" width="14" height="1" fill="#603010"/>
      <rect x="14" y="5" width="1" height="9" fill="#603010"/>
      {/* Center seam */}
      <rect x="1" y="9" width="14" height="1" fill="#603010"/>
      <rect x="1" y="10" width="14" height="1" fill="#c87040"/>
      {/* Clasp */}
      <rect x="6" y="7" width="4" height="3" fill="#e0c060"/>
      <rect x="6" y="7" width="4" height="1" fill="#fff0a0"/>
      <rect x="6" y="9" width="4" height="1" fill="#806020"/>
      <rect x="7" y="8" width="2" height="1" fill="#806020"/>
    </Px>
  )
}

// Envelope with letter peeking out
export function ContactIcon({ size = 32 }) {
  return (
    <Px size={size}>
      {/* Letter behind */}
      <rect x="3" y="2" width="9" height="6" fill="#ffffff"/>
      <rect x="4" y="4" width="6" height="1" fill="#808080"/>
      <rect x="4" y="6" width="5" height="1" fill="#808080"/>
      {/* Envelope body */}
      <rect x="1" y="5" width="14" height="9" fill="#e8e8ff"/>
      <rect x="1" y="5" width="14" height="1" fill="#ffffff"/>
      <rect x="1" y="5" width="1" height="9" fill="#ffffff"/>
      <rect x="1" y="13" width="14" height="1" fill="#6868a0"/>
      <rect x="14" y="5" width="1" height="9" fill="#6868a0"/>
      {/* Flap V */}
      <rect x="2" y="5" width="1" height="1" fill="#7878b0"/>
      <rect x="3" y="6" width="1" height="1" fill="#7878b0"/>
      <rect x="4" y="7" width="1" height="1" fill="#7878b0"/>
      <rect x="5" y="8" width="1" height="1" fill="#7878b0"/>
      <rect x="6" y="9" width="1" height="1" fill="#7878b0"/>
      <rect x="7" y="10" width="2" height="1" fill="#7878b0"/>
      <rect x="13" y="5" width="1" height="1" fill="#7878b0"/>
      <rect x="12" y="6" width="1" height="1" fill="#7878b0"/>
      <rect x="11" y="7" width="1" height="1" fill="#7878b0"/>
      <rect x="10" y="8" width="1" height="1" fill="#7878b0"/>
      <rect x="9" y="9" width="1" height="1" fill="#7878b0"/>
      {/* Wax seal */}
      <rect x="7" y="9" width="2" height="2" fill="#c03028"/>
      <rect x="7" y="9" width="1" height="1" fill="#e05038"/>
    </Px>
  )
}
