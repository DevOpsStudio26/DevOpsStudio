import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react'
import DotGrid from '../components/DotGrid'
import EdgeBeams from '../components/EdgeBeams'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import { projects } from '../data/siteData'

// Preview page for entrance effects on the Projects page. Not linked in the nav: visit /projects-effects-ideas.
// Each idea plays when it loads; "Replay" plays it again. Visitors who turn off animations see everything in place.

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fx = 'transition-all ease-out motion-reduce:transition-none'
const rows = [projects, [...projects].reverse()]
const stats = [
  [projects.length, 'Projects'],
  [projects.filter((p) => p.category === 'Web Development').length, 'Websites'],
  [projects.filter((p) => p.category === 'App Development').length, 'Apps'],
]

// False on the first frame, then true, so CSS transitions have something to animate from.
function useEntered() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setOn(true), 60)
    return () => clearTimeout(id)
  }, [])
  return on
}

// Fades and slides its content from `from` into place once `on` is true, after `delay` ms.
function In({ on, delay = 0, from = 'translate-y-6', duration = 700, className = '', children }) {
  return (
    <div
      className={`${fx} ${on ? 'translate-x-0 translate-y-0 opacity-100' : `${from} opacity-0`} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

// The real Projects hero, with one entrance effect switched on.
function HeroDemo({ effect }) {
  const on = useEntered()
  const glowRef = useRef(null)
  // Only the staggered idea holds the text back; the others show it straight away.
  const part = (i) => (effect === 'stagger' ? { on, delay: 150 + i * 200, from: '-translate-y-6' } : { on: true })

  useEffect(() => {
    if (effect !== 'glow' || reducedMotion()) return
    glowRef.current.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)', offset: 0.45 },
        { opacity: 0.45, transform: 'translate(-50%, -50%) scale(1)' },
      ],
      { duration: 2000, easing: 'ease-out', fill: 'forwards' },
    )
  }, [effect])

  return (
    <section className="theme-dark relative isolate overflow-hidden bg-[#05050a] py-24 text-center text-white">
      <EdgeBeams boost />
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex -rotate-6 flex-col justify-center gap-5 opacity-60">
        {rows.map((row, r) => (
          <In key={r} on={effect === 'rows' ? on : true} delay={r * 250} duration={1400} from={r ? 'translate-x-1/3' : '-translate-x-1/3'}>
            <div
              className="flex w-max animate-marquee gap-5 motion-reduce:animate-none"
              style={{ animationDirection: r ? 'reverse' : 'normal', animationDuration: '60s' }}
            >
              {[...row, ...row].map((p, n) => (
                <SmartImage key={n} src={p.image} alt="" className="aspect-video w-64 shrink-0 rounded-xl object-cover object-top" />
              ))}
            </div>
          </In>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0.85)_20%,rgba(5,5,10,0.45)_55%,rgba(5,5,10,0.1))]" />
      {effect === 'glow' && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 h-56 w-[36rem] max-w-full -translate-1/2 rounded-full bg-violet/50 opacity-45 blur-3xl"
        />
      )}
      <div className="px-4">
        <In {...part(0)}>
          <p className="text-sm font-semibold tracking-[0.3em] text-violet-300 uppercase">Our work</p>
        </In>
        <In {...part(1)}>
          {/* The wipe idea reveals the headline from left to right */}
          <h3
            className={`mt-4 bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-5xl font-bold tracking-tight text-transparent sm:text-6xl ${
              effect === 'wipe' ? `${fx} duration-[1200ms]` : ''
            }`}
            style={effect === 'wipe' ? { clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transitionDelay: '200ms' } : undefined}
          >
            Things we&apos;ve built
          </h3>
        </In>
        <In {...part(2)}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Real work for real clients: shops, clubs, games and more.</p>
        </In>
        <In {...part(3)} className="mt-8 flex justify-center">
          <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand to-violet px-8 py-3.5 font-medium text-white shadow-lg shadow-violet/40 ring-1 ring-white/15">
            See them all <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
            {effect === 'shimmer' && (
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent ${fx} duration-1000 motion-reduce:hidden`}
                style={{ left: on ? '130%' : '-60%', transitionDelay: '700ms' }}
              />
            )}
          </span>
        </In>
      </div>
    </section>
  )
}

function StatBoxes({ values }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(([, label], i) => (
        <div key={label} className="rounded-xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/10">
          <div className="h-full rounded-[calc(0.75rem-1px)] bg-bg px-5 py-3 text-center">
            <div className="text-2xl font-bold tabular-nums">{values[i]}</div>
            <div className="text-xs text-fg-muted">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 5. Numbers count up from 0
function CountUp() {
  const [values, setValues] = useState(() => stats.map(([n]) => (reducedMotion() ? n : 0)))
  useEffect(() => {
    if (reducedMotion()) return
    const start = performance.now()
    let id
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1)
      const eased = 1 - (1 - t) ** 3
      setValues(stats.map(([n]) => Math.round(n * eased)))
      if (t < 1) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div className="flex justify-center px-6 py-12">
      <StatBoxes values={values} />
    </div>
  )
}

// 6. Cards ripple in one after another
function CardCascade() {
  const on = useEntered()
  return (
    <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
      {projects.slice(0, 8).map((p, i) => (
        <In key={p.title} on={on} delay={i * 90} from="translate-y-8 scale-95">
          <div className="overflow-hidden rounded-xl border border-line bg-elevated">
            <SmartImage src={p.image} alt="" className="aspect-video w-full object-cover object-top" />
            <div className="truncate p-3 text-sm font-medium">{p.title}</div>
          </div>
        </In>
      ))}
    </div>
  )
}

// 7. Heading slides in from the left, stats from the right
function SectionReveal() {
  return (
    <div className="flex flex-col justify-between gap-8 overflow-hidden p-8 lg:flex-row lg:items-end">
      <Reveal from="left">
        <h3 className="text-4xl font-bold tracking-tight">
          All our{' '}
          <span className="bg-linear-to-r from-brand-bright via-violet-bright to-pink-400 bg-clip-text text-transparent">work</span>
        </h3>
        <p className="mt-3 text-fg-muted">Search by name, or filter by type. Click any project for details.</p>
      </Reveal>
      <Reveal from="right" delay={150}>
        <StatBoxes values={stats.map(([n]) => n)} />
      </Reveal>
    </div>
  )
}

// 8. The closing line and button rise in
function CtaReveal() {
  return (
    <div className="px-6 py-14 text-center">
      <Reveal>
        <p className="text-fg-muted">These are just a few examples of our work. We have many more projects under NDA.</p>
      </Reveal>
      <Reveal delay={200}>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-8 py-3 font-medium text-white shadow-lg shadow-violet/30">
          Discuss Your Project <ArrowRight className="size-4" />
        </span>
      </Reveal>
    </div>
  )
}

// 9. A soft purple light follows the mouse (here only inside the box; on the page it would cover everything)
function MouseGlowDemo() {
  const ref = useRef(null)
  const move = (e) => {
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - box.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - box.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={move} className="relative isolate px-6 py-16 text-center [--x:50%] [--y:30%]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(400px circle at var(--x) var(--y), rgba(124,58,237,0.22), transparent 60%)' }}
      />
      <h3 className="text-3xl font-bold">Move your mouse over this box</h3>
      <p className="mt-3 text-fg-muted">The glow follows the cursor, behind the cards and text.</p>
    </div>
  )
}

const ideas = [
  { title: 'Staggered entrance', description: '“Our work”, the headline, the subtitle and the button drop in one after another.', Component: () => <HeroDemo effect="stagger" /> },
  { title: 'Headline wipe', description: 'The gradient headline is revealed from left to right.', Component: () => <HeroDemo effect="wipe" /> },
  { title: 'Screenshot rows slide in', description: 'The two tilted rows glide in from opposite sides, then carry on scrolling.', Component: () => <HeroDemo effect="rows" /> },
  { title: 'Glow pulse', description: 'A violet glow swells behind the headline once, then settles to a soft glow.', Component: () => <HeroDemo effect="glow" /> },
  { title: 'Stats count up', description: 'The Projects, Websites and Apps numbers count up from 0, like the stats on Home.', Component: CountUp },
  { title: 'Cards cascade in', description: 'The project cards fade up in a quick ripple.', Component: CardCascade },
  { title: 'Section reveals', description: '“All our work” slides in from the left and the stats from the right, like About and Portfolio.', Component: SectionReveal },
  { title: 'Closing reveal', description: 'The NDA line and “Discuss Your Project” rise in at the bottom of the page.', Component: CtaReveal },
  { title: 'Mouse glow', description: 'A soft purple light follows the cursor behind the page.', Component: MouseGlowDemo },
  { title: 'Button shimmer', description: 'A light sweeps once across “See them all” after the hero loads.', Component: () => <HeroDemo effect="shimmer" /> },
]

function Idea({ n, title, description, Component }) {
  const [run, setRun] = useState(0)
  const boxRef = useRef(null)
  // Play it again the first time it scrolls into view, so it isn't over before you get there.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((r) => r + 1)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(boxRef.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section id={`idea-${n}`} className="mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{n}</span>
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-1 text-fg-muted">{description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-brand-bright/60"
        >
          <RotateCcw className="size-4" /> Replay
        </button>
      </div>
      <div ref={boxRef} className="overflow-hidden rounded-2xl border border-line bg-bg">
        <Component key={run} />
      </div>
    </section>
  )
}

export default function ProjectsEffectsIdeas() {
  return (
    <div className="space-y-20 py-16">
      <DotGrid />
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Projects page effects</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          {ideas.length} entrance effects for the{' '}
          <Link to="/projects" className="text-brand-bright underline">
            Projects page
          </Link>
          . Each one plays when it scrolls into view; press Replay to see it again.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {ideas.map(({ title }, i) => (
            <a key={title} href={`#idea-${i + 1}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-brand-bright/60">
              {i + 1}. {title}
            </a>
          ))}
        </nav>
      </header>
      {ideas.map((idea, i) => (
        <Idea key={idea.title} n={i + 1} {...idea} />
      ))}
    </div>
  )
}
