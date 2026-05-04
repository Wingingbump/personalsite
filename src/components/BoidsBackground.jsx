import { useEffect, useRef } from 'react'

// Saturated pastels — readable against dark bg, leave glowing trails
const PALETTE = [
  '#4de8d4', // teal
  '#f060a4', // pink
  '#a060f0', // violet
  '#f0c040', // gold
  '#50e890', // mint
  '#60b8f8', // sky
  '#f08858', // coral
]

const BOID_N = 180
const VISION_R = 70
const SEP_R = 20
const MAX_SPD = 2.2
const MIN_SPD = 0.75

function sampleTextPixels(text, W, H) {
  const off = document.createElement('canvas')
  off.width = W; off.height = H
  const c = off.getContext('2d')
  const fs = Math.min(W / 6.2, H * 0.30)
  c.font = `900 ${fs}px "Arial Black", Arial, sans-serif`
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillStyle = '#000'
  c.fillText(text, W / 2, H / 2)
  const { data } = c.getImageData(0, 0, W, H)
  const step = Math.max(5, Math.round(Math.sqrt((W * H) / (BOID_N * 1.8))))
  const pts = []
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y])
    }
  }
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]]
  }
  return pts
}

function clampSpeed(vx, vy, min, max) {
  const s = Math.hypot(vx, vy)
  if (s < 0.001) return [min, 0]
  const ns = Math.max(min, Math.min(max, s))
  return [vx * ns / s, vy * ns / s]
}

export default function BoidsBackground({ onReady }) {
  const canvasRef = useRef(null)
  const onReadyRef = useRef(onReady)
  useEffect(() => { onReadyRef.current = onReady }, [onReady])

  useEffect(() => {
    const canvas = canvasRef.current
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W
    canvas.height = H
    // alpha: true so the CSS dot-grid background shows through
    const ctx = canvas.getContext('2d')

    const textPts = sampleTextPixels('TOMMY LE', W, H)

    const boids = Array.from({ length: BOID_N }, (_, i) => {
      const side = i % 4
      let x, y
      if (side === 0)      { x = Math.random() * W; y = -30 }
      else if (side === 1) { x = W + 30; y = Math.random() * H }
      else if (side === 2) { x = Math.random() * W; y = H + 30 }
      else                 { x = -30; y = Math.random() * H }

      const dx = W / 2 - x, dy = H / 2 - y
      const d = Math.hypot(dx, dy)
      return {
        x, y,
        vx: (dx / d) * 3.2 + (Math.random() - 0.5) * 1.0,
        vy: (dy / d) * 3.2 + (Math.random() - 0.5) * 1.0,
        color: PALETTE[i % PALETTE.length],
        sz: 4 + Math.random() * 2.5,
        target: i < textPts.length ? textPts[i] : null,
      }
    })

    let phase = 'form'
    let holdStart = 0
    let frame = 0
    let raf
    const mouse = { x: -9999, y: -9999 }
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    function drawBoid(b) {
      const angle = Math.atan2(b.vy, b.vx)
      const s = b.sz
      ctx.save()
      ctx.translate(b.x, b.y)
      ctx.rotate(angle)

      // Soft glow halo
      ctx.beginPath()
      ctx.moveTo(s * 3.4, 0)
      ctx.lineTo(-s * 0.9, s * 1.05)
      ctx.lineTo(-s * 0.9, -s * 1.05)
      ctx.closePath()
      ctx.fillStyle = b.color
      ctx.globalAlpha = 0.15
      ctx.fill()

      // Solid body — clean elongated triangle
      ctx.beginPath()
      ctx.moveTo(s * 2.7, 0)
      ctx.lineTo(-s * 0.7, s * 0.70)
      ctx.lineTo(-s * 0.7, -s * 0.70)
      ctx.closePath()
      ctx.fillStyle = b.color
      ctx.globalAlpha = 0.90
      ctx.fill()

      ctx.globalAlpha = 1
      ctx.restore()
    }

    function tick() {
      frame++

      if (phase === 'form') {
        let arrived = 0
        for (const b of boids) {
          if (!b.target) { arrived++; continue }
          const dx = b.x - b.target[0], dy = b.y - b.target[1]
          if (dx * dx + dy * dy < 196) arrived++
        }
        if (arrived / BOID_N >= 0.75 || frame > 380) {
          phase = 'hold'; holdStart = frame
        }
      } else if (phase === 'hold' && frame - holdStart > 75) {
        phase = 'free'
        onReadyRef.current?.()
      }

      for (let i = 0; i < BOID_N; i++) {
        const b = boids[i]

        if (phase !== 'free') {
          if (b.target) {
            const [tx, ty] = b.target
            const dx = tx - b.x, dy = ty - b.y
            const k = phase === 'hold' ? 0.045 : 0.09
            b.vx += dx * k
            b.vy += dy * k
            const damp = phase === 'hold' ? 0.78 : 0.82
            b.vx *= damp
            b.vy *= damp
          }
        } else {
          let sx = 0, sy = 0
          let ax = 0, ay = 0, cn = 0
          let cohX = 0, cohY = 0

          for (let j = 0; j < BOID_N; j++) {
            if (i === j) continue
            const o = boids[j]
            const dx = b.x - o.x, dy = b.y - o.y
            const d = Math.hypot(dx, dy)
            if (d < SEP_R && d > 0) {
              sx += (dx / d) * (SEP_R - d)
              sy += (dy / d) * (SEP_R - d)
            }
            if (d < VISION_R) {
              ax += o.vx; ay += o.vy
              cohX += o.x; cohY += o.y; cn++
            }
          }

          b.vx += sx * 0.09
          b.vy += sy * 0.09
          if (cn > 0) {
            b.vx += (ax / cn - b.vx) * 0.040
            b.vy += (ay / cn - b.vy) * 0.040
            b.vx += (cohX / cn - b.x) * 0.003
            b.vy += (cohY / cn - b.y) * 0.003
          }

          // Gentle cursor drift — boids within 160px softly attracted
          const cdx = mouse.x - b.x, cdy = mouse.y - b.y
          const cd = Math.hypot(cdx, cdy)
          if (cd < 160 && cd > 1) {
            const f = ((160 - cd) / 160) * 0.005
            b.vx += (cdx / cd) * f * 38
            b.vy += (cdy / cd) * f * 38
          }

          const m = 90
          if (b.x < m) b.vx += (m - b.x) * 0.016
          if (b.x > W - m) b.vx -= (b.x - (W - m)) * 0.016
          if (b.y < m) b.vy += (m - b.y) * 0.016
          if (b.y > H - m) b.vy -= (b.y - (H - m)) * 0.016
        }

        const maxS = phase === 'free' ? MAX_SPD : 4.8
        const minS = phase === 'free' ? MIN_SPD : 0.4;
        [b.vx, b.vy] = clampSpeed(b.vx, b.vy, minS, maxS)
        b.x += b.vx
        b.y += b.vy

        if (phase === 'free') {
          if (b.x < -45) b.x = W + 45
          if (b.x > W + 45) b.x = -45
          if (b.y < -45) b.y = H + 45
          if (b.y > H + 45) b.y = -45
        }
      }

      // Trail fade — semi-transparent dark fill so each frame's boids
      // ghost into the background over ~6-8 frames
      ctx.fillStyle = 'rgba(12, 20, 34, 0.20)'
      ctx.fillRect(0, 0, W, H)

      for (const b of boids) drawBoid(b)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
