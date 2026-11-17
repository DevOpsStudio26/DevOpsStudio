import { useState } from 'react'
import Portfolio from './Portfolio'
import { makeConstellation, useCanvasScene } from '../lib/canvasScenes'

// Preview page for a background behind the whole Portfolio page. Not linked in the nav: visit /background-ideas.
// The real Portfolio page is shown on top; the switcher changes only the background layer behind it.
// The Portfolio page now has the dots built in, so they show under every option here.

// Each background is a fixed layer behind the page, so it stays put while you scroll.
function Layer({ children, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

/* 2. Faint grid over the whole page */
function GridBg() {
  return (
    <Layer>
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_85%)]" />
    </Layer>
  )
}

/* 4. Big soft colors drifting slowly */
function BlobsBg() {
  return (
    <Layer>
      <div className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-brand/20 blur-[120px] animate-drift-1 motion-reduce:animate-none" />
      <div className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-violet/20 blur-[120px] animate-drift-2 motion-reduce:animate-none" />
      <div className="absolute -bottom-40 left-1/4 size-[30rem] rounded-full bg-pink-500/10 blur-[120px] animate-drift-3 motion-reduce:animate-none" />
    </Layer>
  )
}

/* 5. Aurora: a colorful glow along the top that fades down */
function AuroraBg() {
  return (
    <Layer>
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(37,99,235,0.25),transparent),radial-gradient(ellipse_70%_55%_at_80%_0%,rgba(124,58,237,0.28),transparent),radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(236,72,153,0.15),transparent)]" />
    </Layer>
  )
}

/* 6. Faint stars that drift and link up */
function StarsCanvas() {
  const ref = useCanvasScene((w, h) => makeConstellation(w, h, false, 26000))
  return <canvas ref={ref} className="absolute inset-0 size-full opacity-50" />
}
function StarsBg() {
  return (
    <Layer>
      <StarsCanvas />
    </Layer>
  )
}

/* 7. Glows in the corners and darker edges */
function VignetteBg() {
  return (
    <Layer>
      <div className="absolute -top-32 -left-32 size-[30rem] rounded-full bg-brand/20 blur-[110px]" />
      <div className="absolute -right-32 -bottom-32 size-[30rem] rounded-full bg-violet/25 blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45))]" />
    </Layer>
  )
}

/* 9. Thin vertical lines with light running down them */
function BeamsBg() {
  const lines = [8, 22, 38, 62, 78, 92]
  return (
    <Layer>
      {lines.map((left, i) => (
        <div key={left} className="absolute inset-y-0 w-px bg-line/60" style={{ left: `${left}%` }}>
          <span
            className="absolute -top-40 left-0 h-40 w-px bg-linear-to-b from-transparent via-violet-bright to-transparent motion-reduce:hidden"
            style={{ animation: `beam ${7 + (i % 3) * 2}s linear ${i * 1.3}s infinite` }}
          />
        </div>
      ))}
      <style>{'@keyframes beam { to { transform: translateY(calc(100vh + 10rem)); } }'}</style>
    </Layer>
  )
}

const options = [
  ['none', 'Dots (now live)', null],
  ['grid', 'Grid', GridBg],
  ['blobs', 'Drifting Color', BlobsBg],
  ['aurora', 'Aurora', AuroraBg],
  ['stars', 'Stars', StarsBg],
  ['vignette', 'Corner Glow', VignetteBg],
  ['beams', 'Light Beams', BeamsBg],
]

export default function BackgroundIdeas() {
  const [pick, setPick] = useState('none')
  const Bg = options.find(([key]) => key === pick)[2]

  return (
    <>
      {Bg && <Bg />}

      {/* Switcher: sticks under the navbar */}
      <div className="sticky top-14 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <span className="shrink-0 text-sm text-fg-muted">Background:</span>
          {options.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setPick(key)}
              aria-pressed={pick === key}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                pick === key ? 'bg-linear-to-r from-brand to-violet text-white' : 'text-fg-muted ring-1 ring-line hover:text-fg'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Portfolio />
    </>
  )
}
