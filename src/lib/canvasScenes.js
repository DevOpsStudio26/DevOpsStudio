import { useEffect, useRef } from 'react'

// Animated canvas backgrounds shared by the home hero and the /hero-ideas page.

export const BLUE = '59,130,246'
export const PURPLE = '168,85,247'
export const LILAC = '192,132,252'

// Light mode swaps the purples for sky blues; read every frame so switching modes recolors the scene right away.
const darkTones = { purple: PURPLE, lilac: LILAC, pale: '#e9d5ff', spark: '#f5f3ff', planet: 'rgba(22,13,48,0.97)' }
const lightTones = { purple: '56,189,248', lilac: '125,211,252', pale: '#bae6fd', spark: '#f0f9ff', planet: 'rgba(8,24,48,0.97)' }
const tones = () => (document.documentElement.classList.contains('light') ? lightTones : darkTones)

// Runs a canvas scene, sized to its box, only while it's on screen.
// createScene(width, height) returns { draw(ctx, seconds, mouse) }.
export function useCanvasScene(createScene) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const host = canvas.closest('[data-hero]') || canvas.parentElement
    const mouse = { x: null, y: null }
    let scene
    let frame = 0
    let width = 0
    let height = 0

    function resize() {
      const box = canvas.getBoundingClientRect()
      width = box.width
      height = box.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene = createScene(width, height)
    }
    function render(time) {
      ctx.clearRect(0, 0, width, height)
      scene.draw(ctx, time / 1000, mouse)
    }
    function loop(time) {
      render(time)
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!reduce && !frame) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const onMove = (e) => {
      const box = canvas.getBoundingClientRect()
      mouse.x = e.clientX - box.left
      mouse.y = e.clientY - box.top
    }
    const onLeave = () => {
      mouse.x = mouse.y = null
    }

    resize()
    render(performance.now())
    const resizeObserver = new ResizeObserver(() => {
      resize()
      render(performance.now())
    })
    resizeObserver.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    visibility.observe(canvas)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibility.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [createScene])

  return ref
}

// fade: 'full' darkens toward the middle, 'left' only behind the text, false none

/* 5 & 10. Constellation, optionally reacting to the mouse */
export function makeConstellation(width, height, interactive, density = 9000) {
  const points = Array.from({ length: Math.round((width * height) / density) }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    blue: i % 2 === 1,
  }))
  const reach = 170

  return {
    draw(ctx, _t, mouse) {
      const { purple, lilac } = tones()
      const hasMouse = interactive && mouse.x !== null
      for (const p of points) {
        p.color = p.blue ? BLUE : purple
        p.x = (p.x + p.vx + width) % width
        p.y = (p.y + p.vy + height) % height
        p.dx = p.x
        p.dy = p.y
        if (hasMouse) {
          const d = Math.hypot(mouse.x - p.x, mouse.y - p.y)
          if (d < reach) {
            const pull = 0.25 * (1 - d / reach)
            p.dx += (mouse.x - p.x) * pull
            p.dy += (mouse.y - p.y) * pull
          }
        }
      }
      ctx.lineWidth = 1
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dist = Math.hypot(a.dx - b.dx, a.dy - b.dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(${a.color},${0.35 * (1 - dist / 120)})`
            ctx.beginPath()
            ctx.moveTo(a.dx, a.dy)
            ctx.lineTo(b.dx, b.dy)
            ctx.stroke()
          }
        }
      }
      if (hasMouse) {
        for (const p of points) {
          const d = Math.hypot(mouse.x - p.dx, mouse.y - p.dy)
          if (d < reach) {
            ctx.strokeStyle = `rgba(${lilac},${0.6 * (1 - d / reach)})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.dx, p.dy)
            ctx.stroke()
          }
        }
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        halo.addColorStop(0, `rgba(${purple},0.25)`)
        halo.addColorStop(1, `rgba(${purple},0)`)
        ctx.fillStyle = halo
        ctx.fillRect(mouse.x - 90, mouse.y - 90, 180, 180)
      }
      for (const p of points) {
        ctx.fillStyle = `rgba(${p.color},0.9)`
        ctx.beginPath()
        ctx.arc(p.dx, p.dy, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
    },
  }
}
export const constellation = (w, h) => makeConstellation(w, h, false)
export const interactiveConstellation = (w, h) => makeConstellation(w, h, true)

/* 11. Network Globe: a rotating sphere of linked points with deploy arcs */
export function networkGlobe(width, height, { interactive = false, occlude = false } = {}) {
  const count = 280
  const points = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = i * Math.PI * (3 - Math.sqrt(5))
    return [Math.cos(theta) * r, y, Math.sin(theta) * r]
  })
  const pairs = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const [ax, ay, az] = points[i]
      const [bx, by, bz] = points[j]
      if (ax * bx + ay * by + az * bz > 0.975) pairs.push([i, j])
    }
  }
  const hubs = [12, 47, 88, 130, 171, 205, 240, 266]
  const arcs = [[0, 3], [1, 5], [2, 6], [4, 7], [3, 6], [5, 0]].map(([a, b], i) => ({ a: hubs[a], b: hubs[b], offset: i / 6 }))

  const wide = width > 768
  const cx = wide ? width * 0.72 : width * 0.5
  const cy = height * 0.5
  const radius = Math.min(height * 0.42, width * (wide ? 0.27 : 0.42))
  const restTilt = 0.35
  let tilt = restTilt
  let turn = 0

  function project([x, y, z], spin) {
    const x1 = x * Math.cos(spin) + z * Math.sin(spin)
    const z1 = -x * Math.sin(spin) + z * Math.cos(spin)
    const y2 = y * Math.cos(tilt) - z1 * Math.sin(tilt)
    const z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt)
    return { x: cx + x1 * radius, y: cy + y2 * radius, z: z2 }
  }

  return {
    draw(ctx, t, mouse) {
      const { purple, lilac, pale, spark, planet } = tones()
      // Ease the globe's tilt and turn toward the mouse, and back to rest when it leaves
      const hasMouse = interactive && mouse.x !== null
      const targetTilt = hasMouse ? restTilt + ((mouse.y - cy) / height) * 0.7 : restTilt
      const targetTurn = hasMouse ? ((mouse.x - cx) / width) * 1.6 : 0
      tilt += (targetTilt - tilt) * 0.05
      turn += (targetTurn - turn) * 0.05

      const spin = t * 0.15 + turn
      const p = points.map((pt) => project(pt, spin))

      const halo = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.35)
      halo.addColorStop(0, `rgba(${purple},0.12)`)
      halo.addColorStop(1, `rgba(${purple},0)`)
      ctx.fillStyle = halo
      ctx.fillRect(cx - radius * 1.4, cy - radius * 1.4, radius * 2.8, radius * 2.8)

      if (occlude) {
        // Solid planet body so the stars behind it don't show through
        const body = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius * 1.03)
        body.addColorStop(0, planet)
        body.addColorStop(1, 'rgba(5,5,10,0.97)')
        ctx.fillStyle = body
        ctx.beginPath()
        ctx.arc(cx, cy, radius * 1.03, 0, Math.PI * 2)
        ctx.fill()
      }

      if (hasMouse) {
        ctx.lineWidth = 1
        for (const q of p) {
          if (q.z < 0.15) continue
          const d = Math.hypot(mouse.x - q.x, mouse.y - q.y)
          if (d < 150) {
            ctx.strokeStyle = `rgba(${lilac},${0.55 * (1 - d / 150) * q.z})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      ctx.lineWidth = 1
      for (const [i, j] of pairs) {
        const depth = (p[i].z + p[j].z + 2) / 4
        ctx.strokeStyle = `rgba(${BLUE},${0.03 + 0.3 * depth * depth})`
        ctx.beginPath()
        ctx.moveTo(p[i].x, p[i].y)
        ctx.lineTo(p[j].x, p[j].y)
        ctx.stroke()
      }
      for (const q of p) {
        const depth = (q.z + 1) / 2
        ctx.fillStyle = `rgba(${lilac},${0.15 + 0.75 * depth})`
        ctx.beginPath()
        ctx.arc(q.x, q.y, 0.8 + 1.4 * depth, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const arc of arcs) {
        const a = points[arc.a]
        const b = points[arc.b]
        const mid = [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
        const len = Math.hypot(...mid) || 1
        const lift = 1.45
        const control = project(mid.map((v) => (v / len) * lift), spin)
        const pa = project(a, spin)
        const pb = project(b, spin)
        if (pa.z < -0.1 || pb.z < -0.1) continue
        ctx.strokeStyle = `rgba(${purple},0.35)`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.quadraticCurveTo(control.x, control.y, pb.x, pb.y)
        ctx.stroke()
        const s = (t * 0.35 + arc.offset) % 1
        const x = (1 - s) ** 2 * pa.x + 2 * (1 - s) * s * control.x + s * s * pb.x
        const y = (1 - s) ** 2 * pa.y + 2 * (1 - s) * s * control.y + s * s * pb.y
        ctx.shadowColor = `rgb(${purple})`
        ctx.shadowBlur = 14
        ctx.fillStyle = spark
        ctx.beginPath()
        ctx.arc(x, y, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      for (const [k, h] of hubs.entries()) {
        const q = p[h]
        if (q.z < 0) continue
        const pulse = (Math.sin(t * 2 + k) + 1) / 2
        ctx.fillStyle = `rgba(${purple},${0.25 * pulse})`
        ctx.beginPath()
        ctx.arc(q.x, q.y, 6 + pulse * 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = pale
        ctx.beginPath()
        ctx.arc(q.x, q.y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    },
  }
}

/* 13. Constellation Globe: the interactive constellation with the globe in front of it */
export function constellationGlobe(width, height) {
  const stars = makeConstellation(width, height, true)
  const globe = networkGlobe(width, height, { interactive: true, occlude: true })
  return {
    draw(ctx, t, mouse) {
      stars.draw(ctx, t, mouse)
      globe.draw(ctx, t, mouse)
    },
  }
}

/* Drifting stars: small dots sliding slowly sideways (the 404 page). Purple in dark mode, sky blue in light. */
export function driftingStars(width, height) {
  const stars = Array.from({ length: Math.round((width * height) / 9000) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.4 + 0.3,
    speed: Math.random() * 0.25 + 0.05,
  }))
  return {
    draw(ctx) {
      const { purple } = tones()
      for (const s of stars) {
        s.x = (s.x + s.speed) % width
        ctx.fillStyle = `rgba(${purple},${0.35 + s.r * 0.3})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
    },
  }
}
