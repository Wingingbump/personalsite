import { useEffect, useRef } from 'react'

const PW = 640
const PH = 360
const WATER_Y = 56   // thin sky strip, rest is underwater
const PS = 2         // canvas pixels per sprite cell

// ── Sprites — 0=empty 1=body 2=tail 3=belly 4=fin 5=stripe 6=eye 7=shell ───

const SPRITE_BASS = [
  [0,0,0,4,4,4,4,0,0,0,0,0,0,0],
  [0,0,4,1,1,1,1,1,1,0,0,0,0,0],
  [2,0,1,1,5,5,5,1,1,1,1,0,0,0],
  [2,2,1,1,5,5,5,1,1,1,1,1,1,6],
  [2,0,1,1,3,3,3,1,1,1,1,0,0,0],
  [0,0,4,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,4,4,4,4,0,0,0,0,0,0,0],
]
const SPRITE_BLUEGILL = [
  [0,0,4,4,4,4,0,0,0,0,0],
  [0,4,1,1,1,1,1,1,0,0,0],
  [2,1,1,3,3,1,1,1,1,0,0],
  [2,1,1,3,3,1,1,1,1,1,6],
  [2,1,1,3,3,1,1,1,1,0,0],
  [0,4,1,1,1,1,1,1,0,0,0],
  [0,0,4,4,4,4,0,0,0,0,0],
]
const SPRITE_CATFISH = [
  [0,0,2,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
  [1,1,1,1,3,3,3,3,1,1,1,1,1,1,0,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,0,0,0,0],
]
const SPRITE_CRAPPIE = [
  [0,0,4,4,4,0,0,0,0,0,0,0],
  [0,4,1,1,1,1,1,1,0,0,0,0],
  [2,1,1,3,3,3,1,1,1,1,0,0],
  [2,1,1,3,3,3,1,1,1,1,1,6],
  [2,1,1,3,3,3,1,1,1,1,0,0],
  [0,4,1,1,1,1,1,1,0,0,0,0],
  [0,0,4,4,4,0,0,0,0,0,0,0],
]
const SPRITE_BAIT = [
  [0,2,1,1,1,0],
  [2,1,1,1,1,6],
  [0,2,1,1,1,0],
]
const SPRITE_TURTLE = [
  [0,0,0,7,7,7,7,7,7,7,0,0,0,0],
  [0,0,7,7,7,7,7,7,7,7,7,0,0,0],
  [0,7,7,1,1,7,7,7,1,1,7,7,1,0],
  [4,7,7,1,1,7,7,7,1,1,7,7,1,6],
  [0,7,7,7,7,7,7,7,7,7,7,7,1,0],
  [4,7,7,1,1,7,7,7,1,1,7,7,1,0],
  [0,7,7,1,1,7,7,7,1,1,7,7,0,0],
  [0,0,7,7,7,7,7,7,7,7,7,0,0,0],
  [0,0,0,7,7,7,7,7,7,7,0,0,0,0],
]
const SPRITE_CRAY = [
  [0,1,0,0,0,1,1,1,0,0],
  [1,1,1,0,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,6],
  [1,1,1,0,1,1,1,1,1,0],
  [0,1,0,0,0,1,1,1,0,0],
]

const SPECIES = {
  bass:    { body:'#4a6e2a', tail:'#354f1e', fin:'#5a7e36', belly:'#c8b870', stripe:'#2a4010', eye:'#fff', shell:'#4a6e2a' },
  bluegill:{ body:'#4878a0', tail:'#385e80', fin:'#5890b8', belly:'#d4702a', stripe:'#4878a0', eye:'#fff', shell:'#4878a0' },
  catfish: { body:'#7a6e58', tail:'#5a5040', fin:'#8a7e68', belly:'#c8b898', stripe:'#7a6e58', eye:'#fff', shell:'#7a6e58' },
  crappie: { body:'#708090', tail:'#506070', fin:'#809098', belly:'#d0ccc0', stripe:'#708090', eye:'#fff', shell:'#708090' },
  bait:    { body:'#c8d4b0', tail:'#a8b498', fin:'#c8d4b0', belly:'#e0e8d0', stripe:'#c8d4b0', eye:'#222', shell:'#c8d4b0' },
  turtle:  { body:'#5a7040', tail:'#405030', fin:'#789050', belly:'#8a9860', stripe:'#405030', eye:'#fff', shell:'#485e32' },
  cray:    { body:'#b05a2a', tail:'#883818', fin:'#c06a38', belly:'#d08050', stripe:'#883818', eye:'#222', shell:'#b05a2a' },
}

function getSpriteData(type) {
  if (type === 'bass')    return SPRITE_BASS
  if (type === 'bluegill')return SPRITE_BLUEGILL
  if (type === 'catfish') return SPRITE_CATFISH
  if (type === 'crappie') return SPRITE_CRAPPIE
  if (type === 'bait')    return SPRITE_BAIT
  if (type === 'turtle')  return SPRITE_TURTLE
  if (type === 'cray')    return SPRITE_CRAY
  return SPRITE_BASS
}

function drawSprite(ctx, sp, x, y, pal, flipX) {
  const rows = sp.length, cols = sp[0].length
  const px = Math.round(x - (cols * PS) / 2)
  const py = Math.round(y - (rows * PS) / 2)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ci = flipX ? cols - 1 - c : c
      const v  = sp[r][ci]
      if (!v) continue
      ctx.fillStyle =
        v === 1 ? pal.body   :
        v === 2 ? pal.tail   :
        v === 3 ? pal.belly  :
        v === 4 ? pal.fin    :
        v === 5 ? pal.stripe :
        v === 6 ? pal.eye    :
        pal.shell
      ctx.fillRect(px + c * PS, py + r * PS, PS, PS)
    }
  }
}

function makeFish(type) {
  const sp = getSpriteData(type)
  const dir = Math.random() > 0.5 ? 1 : -1
  const cols = sp[0].length
  const spriteW = cols * PS
  const depthRange = {
    bass:    [WATER_Y + 16,  WATER_Y + 100],
    bluegill:[WATER_Y + 40,  WATER_Y + 160],
    catfish: [PH - 50,       PH - 26],
    crappie: [WATER_Y + 60,  WATER_Y + 180],
    bait:    [WATER_Y + 12,  WATER_Y + 70],
  }
  const [minY, maxY] = depthRange[type] ?? [WATER_Y + 40, PH - 60]
  const by = minY + Math.random() * (maxY - minY)
  return {
    x: dir === 1 ? -spriteW : PW + spriteW,
    baseY: by, y: by, dir,
    type, pal: SPECIES[type], cols, spriteW,
    speed:     type === 'catfish' ? 0.10 + Math.random() * 0.12
             : type === 'bait'    ? 0.36 + Math.random() * 0.18
             : 0.18 + Math.random() * 0.22,
    phase:     Math.random() * Math.PI * 2,
    wobble:    type === 'catfish' ? 0.10 : type === 'bait' ? 1.1 : 0.4 + Math.random() * 0.3,
    wobbleAmp: type === 'catfish' ? 2    : type === 'bait' ? 4   : 6 + Math.random() * 8,
  }
}

function makeSchool(baseX, baseY) {
  return Array.from({ length: 12 }, () => ({
    ox: (Math.random() - 0.5) * 40,
    oy: (Math.random() - 0.5) * 20,
    phase: Math.random() * Math.PI * 2,
    schoolX: baseX, schoolY: baseY,
    schoolDir: Math.random() > 0.5 ? 1 : -1,
    schoolSpeed: 0.45 + Math.random() * 0.2,
  }))
}

function makeBubble() {
  return {
    x:     8 + Math.floor(Math.random() * (PW - 16)),
    y:     PH - 10 - Math.floor(Math.random() * (PH - WATER_Y - 20)),
    speed: 0.05 + Math.random() * 0.09,
    phase: Math.random() * Math.PI * 2,
    size:  Math.random() > 0.65 ? 4 : 2,
  }
}

// Debris particles — slowly drift upward and sideways
function makeDebris() {
  return {
    x: Math.random() * PW,
    y: WATER_Y + Math.random() * (PH - WATER_Y),
    vy: -(0.01 + Math.random() * 0.03),
    vx: (Math.random() - 0.5) * 0.04,
    phase: Math.random() * Math.PI * 2,
  }
}

const ROCKS = Array.from({ length: 32 }, (_, i) => ({
  x: Math.round(16 + (PW - 32) * (i / 31) + (Math.random() - 0.5) * 32),
  w: 8 + Math.floor(Math.random() * 24),
  h: 4 + Math.floor(Math.random() * 12),
  color: ['#3a3428','#4a4438','#504840','#3e3830','#2e2820'][Math.floor(Math.random() * 5)],
  highlight: Math.random() > 0.5,
}))

const LILY_STEMS = [60, 130, 200, 280, 360, 440, 510, 580, 95, 165, 320, 490].map(x => ({
  x, length: 36 + Math.floor(Math.random() * 50),
  phase: Math.random() * Math.PI * 2,
  thick: Math.random() > 0.5 ? 2 : 1,
}))

const LOGS = [
  { x: 160, y: PH - 28, w: 148, h: 14 },
  { x: 420, y: PH - 22, w: 110, h: 10 },
]

// Tall aquatic plants (mid-height weeds)
const TALL_PLANTS = [45, 115, 190, 265, 340, 415, 490, 565, 620].map(x => ({
  x: x + Math.floor(Math.random() * 20) - 10,
  h: 40 + Math.floor(Math.random() * 50),
  phase: Math.random() * Math.PI * 2,
  blades: 2 + Math.floor(Math.random() * 2),
}))

// Short bottom grass
const GRASS_X = Array.from({ length: 48 }, (_, i) =>
  Math.round(10 + (PW - 20) * (i / 47) + (Math.random() - 0.5) * 10)
)

// Treeline — dense across 640px
const TREES = (() => {
  const result = []
  for (let x = 0; x <= PW + 8; x += 13) {
    const type = Math.sin(x * 0.25) > 0 ? 'pine' : 'oak'
    const h = type === 'pine'
      ? 30 + Math.round(Math.abs(Math.sin(x * 0.13)) * 20 + 8)
      : 22 + Math.round(Math.abs(Math.sin(x * 0.18)) * 16 + 6)
    result.push([x, type, Math.min(h, WATER_Y - 2)])
  }
  return result
})()

function drawTreeline(ctx) {
  ctx.fillStyle = '#1a2c0e'
  for (const [x, type, h] of TREES) {
    if (type === 'pine') {
      for (let row = 0; row < h; row++) {
        const w = Math.max(1, Math.round((row / h) * 10))
        ctx.fillRect(x - w, WATER_Y - h + row, w * 2, 1)
      }
    } else {
      for (let row = 0; row < h; row++) {
        const w = Math.round(Math.sin((row / h) * Math.PI) * 9 + 1)
        ctx.fillRect(x - w, WATER_Y - h + row, w * 2, 1)
      }
    }
  }
  // Dark treeline base to merge with water
  ctx.fillStyle = '#121e08'
  ctx.fillRect(0, WATER_Y - 4, PW, 4)
}

export default function FishingBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width  = PW
    canvas.height = PH
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    const fish = [
      makeFish('bass'),    makeFish('bass'),    makeFish('bass'),
      makeFish('bluegill'),makeFish('bluegill'),makeFish('bluegill'),makeFish('bluegill'),
      makeFish('catfish'), makeFish('catfish'),
      makeFish('crappie'), makeFish('crappie'),
    ]
    const school1  = makeSchool(PW * 0.25, WATER_Y + 30)
    const school2  = makeSchool(PW * 0.70, WATER_Y + 55)
    const bubbles  = Array.from({ length: 36 }, makeBubble)
    const debris   = Array.from({ length: 20 }, makeDebris)
    const turtle1  = { x: PW * 0.25, baseY: PH - 60, y: PH - 60, dir:  1, speed: 0.08, phase: 0 }
    const turtle2  = { x: PW * 0.75, baseY: PH - 80, y: PH - 80, dir: -1, speed: 0.06, phase: 1.5 }
    const cray1    = { x: PW * 0.55, y: PH - 16, dir: -1, speed: 0.05, pause: 0 }
    const cray2    = { x: PW * 0.20, y: PH - 16, dir:  1, speed: 0.04, pause: 60 }

    let t = 0, frame

    function drawLog(log) {
      ctx.fillStyle = '#3a2818'
      ctx.fillRect(log.x, log.y, log.w, log.h)
      // Bark grain rings
      ctx.fillStyle = 'rgba(0,0,0,0.22)'
      for (let gx = log.x + 8; gx < log.x + log.w - 6; gx += 10)
        ctx.fillRect(gx, log.y, 2, log.h)
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.fillRect(log.x, log.y, log.w, 2)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(log.x, log.y + log.h - 2, log.w, 2)
      // End cap
      ctx.fillStyle = '#2a1c0c'
      ctx.fillRect(log.x, log.y, 4, log.h)
      ctx.fillRect(log.x + log.w - 4, log.y, 4, log.h)
      // Algae on top
      ctx.fillStyle = '#2a4018'
      for (let ax = log.x + 4; ax < log.x + log.w - 4; ax += 6)
        ctx.fillRect(ax, log.y - 2, 3, 3)
    }

    function drawSchool(school, flip) {
      const lead = school[0]
      lead.schoolX += lead.schoolDir * lead.schoolSpeed
      lead.schoolY += Math.sin(t * 0.38) * 0.4
      if (lead.schoolX > PW + 30) { lead.schoolDir = -1; lead.schoolX = PW + 30 }
      if (lead.schoolX < -30)     { lead.schoolDir =  1; lead.schoolX = -30 }
      lead.schoolY = Math.max(WATER_Y + 10, Math.min(WATER_Y + 80, lead.schoolY))
      for (const b of school) {
        const bx = lead.schoolX + b.ox + Math.sin(t * 0.85 + b.phase) * 3
        const by = lead.schoolY + b.oy + Math.sin(t * 1.1 + b.phase) * 2
        if (by > WATER_Y + 4 && bx > 0 && bx < PW)
          drawSprite(ctx, SPRITE_BAIT, bx, by, SPECIES.bait, lead.schoolDir === -1)
      }
    }

    function draw() {
      // ── Sky strip ────────────────────────────────────────────────────────
      ctx.fillStyle = '#8aaec4'
      ctx.fillRect(0, 0, PW, WATER_Y)
      ctx.fillStyle = 'rgba(200,220,200,0.12)'
      ctx.fillRect(0, 0, PW, WATER_Y)
      drawTreeline(ctx)

      // ── Water surface wave ────────────────────────────────────────────────
      for (let x = 0; x < PW; x++) {
        const wy = WATER_Y + Math.round(
          Math.sin(x * 0.04 + t) * 1.5
          + Math.sin(x * 0.09 - t * 0.35) * 1.0
        )
        const wg = ctx.createLinearGradient(0, wy, 0, PH)
        wg.addColorStop(0,    '#567840')
        wg.addColorStop(0.06, '#3e5a2e')
        wg.addColorStop(0.18, '#2a3e1c')
        wg.addColorStop(0.45, '#1a2810')
        wg.addColorStop(0.75, '#101808')
        wg.addColorStop(1,    '#0c1408')
        ctx.fillStyle = wg
        ctx.fillRect(x, wy, 1, PH - wy)
        ctx.fillStyle = 'rgba(160,190,120,0.55)'
        ctx.fillRect(x, wy, 1, 1)
      }

      // ── Surface light ripples ─────────────────────────────────────────────
      for (let x = 0; x < PW; x += 4) {
        const ripple = Math.round(Math.sin(x * 0.10 + t * 1.2) * 3)
        ctx.fillStyle = 'rgba(140,180,100,0.07)'
        ctx.fillRect(x, WATER_Y + 3 + ripple, 3, 1)
      }

      // ── Light rays ────────────────────────────────────────────────────────
      const RAY_ORIGINS = [60, 130, 200, 280, 360, 440, 510, 580]
      for (let ri = 0; ri < RAY_ORIGINS.length; ri++) {
        const rx    = RAY_ORIGINS[ri] + Math.round(Math.sin(t * 0.07 + ri * 1.1) * 10)
        const angle = (ri % 2 === 0 ? 1 : -1) * 0.05
        const rayW  = 3 + (ri % 3)
        const rayLen = 90 + Math.round(Math.sin(t * 0.1 + ri) * 18)
        for (let d = 0; d < rayLen; d++) {
          const lx = Math.round(rx + d * angle)
          const ly = WATER_Y + 3 + d
          const alpha = (1 - d / rayLen) * 0.048
          ctx.fillStyle = `rgba(160,200,120,${alpha.toFixed(3)})`
          ctx.fillRect(lx - 1, ly, rayW, 1)
        }
      }

      // ── Caustics on the bottom ────────────────────────────────────────────
      for (let i = 0; i < 8; i++) {
        const lx = Math.round(PW * (0.07 + i * 0.12) + Math.sin(t * 0.07 + i * 1.4) * 16)
        const ly = Math.round(PH - 40 + Math.sin(t * 0.09 + i) * 8)
        const lr = 10 + Math.round(Math.sin(t * 0.11 + i) * 5)
        ctx.fillStyle = 'rgba(140,180,80,0.045)'
        for (let dy = -Math.round(lr * 0.5); dy <= Math.round(lr * 0.5); dy++) {
          const hw = Math.round(Math.sqrt(Math.max(0, 1 - (dy / (lr * 0.5)) ** 2)) * lr)
          if (hw > 0) ctx.fillRect(lx - hw, ly + dy, hw * 2, 1)
        }
      }

      // ── Lily pad stems ────────────────────────────────────────────────────
      for (const stem of LILY_STEMS) {
        const sway = Math.round(Math.sin(t * 0.18 + stem.phase) * 2.5)
        ctx.fillStyle = '#2a4818'
        for (let d = 0; d < stem.length; d++) {
          const sx = stem.x + Math.round(sway * (d / stem.length))
          ctx.fillRect(sx, WATER_Y + d, stem.thick, 1)
        }
        ctx.fillStyle = '#3a5c20'
        ctx.fillRect(stem.x - 5, WATER_Y, 11, 3)
        ctx.fillStyle = '#4a7028'
        ctx.fillRect(stem.x - 4, WATER_Y - 1, 9, 2)
        ctx.fillStyle = '#2a4010'
        ctx.fillRect(stem.x - 1, WATER_Y - 2, 3, 2)
      }

      // ── Tall aquatic plants (mid-column weeds) ────────────────────────────
      for (const plant of TALL_PLANTS) {
        for (let b = 0; b < plant.blades; b++) {
          const ox = b * 5 - 2
          const sway = Math.sin(t * 0.22 + plant.phase + b * 0.8)
          ctx.fillStyle = b % 2 === 0 ? '#1e3c12' : '#2a4c18'
          for (let s = 0; s < plant.h; s++) {
            const goff = Math.round(sway * (s / plant.h) * 4)
            const py = PH - 14 - s
            if (py < WATER_Y + 10) break
            ctx.fillRect(plant.x + ox + goff, py, 2, 1)
          }
          // Tip wisp
          ctx.fillStyle = '#3a6020'
          ctx.fillRect(plant.x + ox + Math.round(sway * 4), PH - 14 - plant.h, 3, 2)
        }
      }

      // ── Short bottom grass ────────────────────────────────────────────────
      for (const gx of GRASS_X) {
        const sway = Math.round(Math.sin(t * 0.18 + gx * 0.09) * 2)
        const gh   = 10 + Math.round(Math.abs(Math.sin(gx * 0.25)) * 12)
        ctx.fillStyle = '#243c14'
        for (let s = 0; s < gh; s++) {
          const goff = Math.round(sway * (s / gh))
          ctx.fillRect(gx + goff, PH - 10 - s, 1, 1)
        }
        ctx.fillRect(gx + 3 + Math.round(sway * 0.5), PH - 10, 1, Math.round(gh * 0.65))
      }

      // ── Sunken logs ───────────────────────────────────────────────────────
      for (const log of LOGS) drawLog(log)

      // ── Rocky/muddy bottom ────────────────────────────────────────────────
      ctx.fillStyle = '#1c1408'
      ctx.fillRect(0, PH - 10, PW, 10)
      ctx.fillStyle = '#241c10'
      ctx.fillRect(0, PH - 14, PW, 4)
      ctx.fillStyle = '#2a2218'
      ctx.fillRect(0, PH - 16, PW, 2)
      for (const rock of ROCKS) {
        ctx.fillStyle = rock.color
        ctx.fillRect(rock.x - Math.round(rock.w / 2), PH - 10 - rock.h, rock.w, rock.h)
        if (rock.highlight) {
          ctx.fillStyle = 'rgba(255,255,255,0.07)'
          ctx.fillRect(rock.x - Math.round(rock.w / 2), PH - 10 - rock.h, rock.w, 2)
        }
        ctx.fillStyle = 'rgba(0,0,0,0.15)'
        ctx.fillRect(rock.x - Math.round(rock.w / 2), PH - 12 - rock.h, rock.w, 2)
      }

      // ── Debris particles (silt drifting) ──────────────────────────────────
      for (const d of debris) {
        d.y += d.vy + Math.sin(t * 0.3 + d.phase) * 0.02
        d.x += d.vx + Math.sin(t * 0.5 + d.phase) * 0.03
        if (d.y < WATER_Y + 4) d.y = PH - 10
        if (d.x < 0) d.x = PW
        if (d.x > PW) d.x = 0
        const depth = (d.y - WATER_Y) / (PH - WATER_Y)
        const alpha = 0.1 + depth * 0.15
        ctx.fillStyle = `rgba(140,160,100,${alpha.toFixed(2)})`
        ctx.fillRect(Math.round(d.x), Math.round(d.y), 1, 1)
      }

      // ── Baitfish schools ──────────────────────────────────────────────────
      drawSchool(school1)
      drawSchool(school2)

      // ── Fish ─────────────────────────────────────────────────────────────
      for (const f of fish) {
        f.x += f.dir * f.speed
        f.y  = f.baseY + Math.sin(t * f.wobble + f.phase) * f.wobbleAmp
        if (f.dir ===  1 && f.x > PW + f.spriteW) { f.x = -f.spriteW; f.baseY = newDepth(f.type) }
        if (f.dir === -1 && f.x < -f.spriteW)     { f.x = PW + f.spriteW; f.baseY = newDepth(f.type) }
        if (f.y > WATER_Y + 5 && f.y < PH - 8)
          drawSprite(ctx, getSpriteData(f.type), f.x, f.y, f.pal, f.dir === -1)
      }

      // ── Turtles ───────────────────────────────────────────────────────────
      for (const turtle of [turtle1, turtle2]) {
        turtle.x += turtle.dir * turtle.speed
        turtle.y = turtle.baseY + Math.sin(t * 0.14 + turtle.phase) * 5
        if (turtle.x > PW + 20) turtle.dir = -1
        if (turtle.x < -20)     turtle.dir =  1
        if (turtle.y > WATER_Y + 8 && turtle.y < PH - 12)
          drawSprite(ctx, SPRITE_TURTLE, turtle.x, turtle.y, SPECIES.turtle, turtle.dir === -1)
      }

      // ── Crayfish ──────────────────────────────────────────────────────────
      for (const cray of [cray1, cray2]) {
        if (cray.pause > 0) {
          cray.pause--
        } else {
          cray.x += cray.dir * cray.speed
          if (Math.random() < 0.003) { cray.dir *= -1; cray.pause = 60 + Math.floor(Math.random() * 120) }
          if (cray.x > PW - 12) cray.dir = -1
          if (cray.x < 12)      cray.dir =  1
        }
        drawSprite(ctx, SPRITE_CRAY, cray.x, PH - 16, SPECIES.cray, cray.dir === -1)
      }

      // ── Bubbles ───────────────────────────────────────────────────────────
      for (const b of bubbles) {
        b.y -= b.speed
        b.x += Math.sin(t * 0.5 + b.phase) * 0.12
        if (b.y < WATER_Y) { b.x = 8 + Math.floor(Math.random() * (PW - 16)); b.y = PH - 12 }
        const alpha = Math.min(1, (b.y - WATER_Y) / 30) * 0.45
        const bx = Math.round(b.x), by = Math.round(b.y)
        ctx.fillStyle = `rgba(150,185,110,${alpha})`
        if (b.size === 4) {
          ctx.fillRect(bx,     by - 2, 4, 2)
          ctx.fillRect(bx - 2, by,     8, 2)
          ctx.fillRect(bx,     by + 2, 4, 2)
          ctx.fillStyle = `rgba(200,220,170,${alpha * 0.5})`
          ctx.fillRect(bx - 1, by - 1, 2, 2)
        } else {
          ctx.fillRect(bx, by, 2, 2)
        }
      }

      // ── Fishing line + bobber ─────────────────────────────────────────────
      const bobX = Math.round(PW * 0.58)
      const bobY = WATER_Y - 2 + Math.round(Math.sin(t * 0.65) * 2)
      const rodX = PW + 4, rodY = WATER_Y - 18
      for (let i = 0; i < 32; i++) {
        const pct = i / 31
        const lx  = Math.round(rodX + (bobX - rodX) * pct)
        const ly  = Math.round(rodY + (bobY - rodY) * pct + Math.round(Math.sin(pct * Math.PI) * 8))
        ctx.fillStyle = 'rgba(140,110,50,0.85)'
        ctx.fillRect(lx, ly, 1, 1)
      }
      // Bobber — white top, red bottom
      ctx.fillStyle = '#f0f0e0'
      ctx.fillRect(bobX - 4, bobY - 6, 9, 6)
      ctx.fillStyle = '#bb2211'
      ctx.fillRect(bobX - 4, bobY,     9, 6)
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(bobX - 5, bobY - 6, 11, 1)
      ctx.fillRect(bobX - 5, bobY + 5, 11, 1)
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fillRect(bobX - 2, bobY - 4, 3, 2)
      // Line underwater
      ctx.fillStyle = 'rgba(140,110,50,0.3)'
      for (let y = bobY + 6; y < bobY + 28; y++) ctx.fillRect(bobX, y, 1, 1)

      t += 0.016
      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        imageRendering: 'pixelated',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}

function newDepth(type) {
  if (type === 'catfish') return PH - 50 + Math.random() * 20
  if (type === 'bass')    return WATER_Y + 16 + Math.random() * 84
  if (type === 'bluegill')return WATER_Y + 40 + Math.random() * 120
  if (type === 'crappie') return WATER_Y + 60 + Math.random() * 120
  return WATER_Y + 30 + Math.random() * 100
}
