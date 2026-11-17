import { useState } from 'react'
import { ArrowRight, Check, ExternalLink, Sparkles } from 'lucide-react'
import EdgeBeams from '../components/EdgeBeams'

// Preview page for light-mode colors: dark mode keeps its purple, light mode swaps every purple for blues.
// Not linked in the nav: visit /light-color-ideas.
// Nearly all the site's purple comes from a few color variables (violet, violet-bright, violet-400, pink-400/500,
// fuchsia-300, tint-purple), so each idea is just new values for those, shown on the site's real styles.

// Light-mode page colors, so every preview looks light whichever mode the site is in
const lightBase = {
  '--color-bg': '#ffffff',
  '--color-surface': '#f8fafc',
  '--color-elevated': '#f1f5f9',
  '--color-line': '#e2e8f0',
  '--color-fg': '#0f172a',
  '--color-fg-muted': '#475569',
  '--color-fg-subtle': '#64748b',
  '--color-tint-blue': '#eef2ff',
  '--color-badge': '#dbeafe',
}

const palettes = [
  {
    id: 'current',
    name: 'What’s there now',
    note: 'The dark-mode purple, for comparison.',
    colors: {
      violet: '#7c3aed', 'violet-bright': '#a855f7', 'violet-400': '#a78bfa',
      'pink-500': '#ec4899', 'pink-400': '#f472b6', 'fuchsia-300': '#f0abfc', 'tint-purple': '#f5f3ff',
    },
  },
  {
    id: 'sky',
    name: 'Sky',
    note: 'Royal blue into bright sky blue, with a cyan finish. Bright and airy, closest in energy to the purple.',
    colors: {
      violet: '#0284c7', 'violet-bright': '#38bdf8', 'violet-400': '#38bdf8',
      'pink-500': '#22d3ee', 'pink-400': '#67e8f9', 'fuchsia-300': '#bae6fd', 'tint-purple': '#f0f9ff',
    },
  },
  {
    id: 'ice',
    name: 'Ice',
    note: 'Pale icy blues. The softest option: light beams look like frost, glows are gentle.',
    colors: {
      violet: '#0ea5e9', 'violet-bright': '#7dd3fc', 'violet-400': '#7dd3fc',
      'pink-500': '#a5f3fc', 'pink-400': '#cffafe', 'fuchsia-300': '#e0f2fe', 'tint-purple': '#f0f9ff',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    note: 'Deeper cobalt into light blue and teal-cyan. More contrast on white, so text and buttons stand out most.',
    colors: {
      violet: '#1d4ed8', 'violet-bright': '#60a5fa', 'violet-400': '#60a5fa',
      'pink-500': '#06b6d4', 'pink-400': '#22d3ee', 'fuchsia-300': '#a5f3fc', 'tint-purple': '#eff6ff',
    },
  },
  {
    id: 'azure',
    name: 'Azure & Teal',
    note: 'Azure blue with a teal accent where the pink was. A little greener and fresher.',
    colors: {
      violet: '#0369a1', 'violet-bright': '#0ea5e9', 'violet-400': '#38bdf8',
      'pink-500': '#14b8a6', 'pink-400': '#2dd4bf', 'fuchsia-300': '#99f6e4', 'tint-purple': '#f0fdfa',
    },
  },
]

const toVars = (colors) => Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--color-${k}`, v]))

// "Try it on the site": recolors light mode everywhere until the page is reloaded, without touching dark mode
const STYLE_ID = 'light-color-trial'
function tryOnSite(palette) {
  document.getElementById(STYLE_ID)?.remove()
  if (!palette) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  const rules = Object.entries(toVars(palette.colors)).map(([k, v]) => `${k}: ${v};`).join(' ')
  style.textContent = `html.light { ${rules} }`
  document.head.append(style)
}

const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'

// One idea: the dark hero band light mode keeps, then a light section with the site's usual purple pieces
function Preview({ palette }) {
  return (
    <div style={{ ...lightBase, ...toVars(palette.colors) }} className="overflow-hidden rounded-2xl border border-line bg-bg text-fg">
      {/* Dark hero band with the light beams along its edges */}
      <div className="theme-dark relative isolate overflow-hidden bg-[#05050a] px-6 py-14 text-center">
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]`} />
        <div aria-hidden="true" className="absolute -top-24 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-violet/35 blur-3xl" />
        <EdgeBeams />
        <h3 className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-1 text-4xl font-bold text-transparent sm:text-5xl">
          DevOps Studio
        </h3>
        <p className="mt-3 text-fg-muted">We build fast, beautiful websites.</p>
      </div>

      {/* Light section */}
      <div className="relative overflow-hidden px-6 py-10">
        <EdgeBeams line="bg-line" only="bottom" />
        <span className="rounded-full bg-badge px-3 py-1 text-xs text-brand-bright">Web Design</span>
        <h4 className="mt-4 text-2xl font-bold">
          Our recent{' '}
          <span className="bg-linear-to-r from-brand-bright via-violet-bright to-pink-400 bg-clip-text text-transparent">work</span>
        </h4>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-5 py-2 text-sm text-white shadow-lg shadow-violet/30 ring-1 ring-white/15">
            Visit live site <ExternalLink className="size-4" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-br from-brand to-violet px-3 py-2 text-sm text-white shadow-lg shadow-violet/50">
            Next <ArrowRight className="size-4" />
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Project card with the glowing gradient border it gets on hover */}
          <div className="rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-[0_0_40px_-10px] shadow-violet/60">
            <div className="h-full rounded-[15px] bg-bg p-5">
              <Sparkles className="size-5 text-violet" />
              <p className="mt-3 font-semibold">Project card</p>
              <p className="mt-1 text-sm text-fg-muted">Gradient border and glow on hover.</p>
            </div>
          </div>
          {/* Tinted panel with a stat */}
          <div className="rounded-2xl bg-linear-to-br from-tint-blue to-tint-purple p-5">
            <div className="bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text text-4xl font-bold text-transparent">50+</div>
            <p className="mt-1 text-sm text-fg-muted">Tinted panel and stat number.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LightColorIdeas() {
  // Leaving the page keeps the trial so you can look around the site; reloading clears it
  const [trying, setTrying] = useState(() => document.getElementById(STYLE_ID)?.dataset.id ?? null)

  const choose = (palette) => {
    tryOnSite(palette)
    if (palette) document.getElementById(STYLE_ID).dataset.id = palette.id
    setTrying(palette?.id ?? null)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">Light-mode color ideas</h1>
      <p className="mt-3 max-w-3xl text-fg-muted">
        Dark mode stays purple. In light mode, every purple (buttons, gradients, glows, card borders and the light beams)
        becomes blue. Each preview is drawn in light mode whichever mode you're in. Press <b>Try it on the site</b>, switch
        to light mode and browse around. It lasts until you reload.
      </p>
      {trying && (
        <button type="button" onClick={() => choose(null)} className="mt-4 rounded-lg border border-line px-4 py-2 text-sm text-fg-muted hover:text-fg">
          Stop trying “{palettes.find((p) => p.id === trying)?.name}”
        </button>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {palettes.map((palette, i) => (
          <section key={palette.id}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">
                  {i}. {palette.name}
                </h2>
                <p className="mt-1 max-w-md text-sm text-fg-muted">{palette.note}</p>
                <div className="mt-3 flex gap-1.5">
                  {['violet', 'violet-bright', 'pink-500', 'fuchsia-300'].map((k) => (
                    <span key={k} title={palette.colors[k]} className="size-6 rounded-full ring-1 ring-black/10" style={{ background: palette.colors[k] }} />
                  ))}
                </div>
              </div>
              {palette.id !== 'current' && (
                <button
                  type="button"
                  onClick={() => choose(trying === palette.id ? null : palette)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${
                    trying === palette.id ? 'bg-brand text-white' : 'border border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  {trying === palette.id ? <><Check className="size-4" /> Trying on the site</> : 'Try it on the site'}
                </button>
              )}
            </div>
            <Preview palette={palette} />
          </section>
        ))}
      </div>
    </div>
  )
}
