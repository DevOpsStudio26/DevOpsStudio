import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ExternalLink } from 'lucide-react'
import EdgeBeams from '../components/EdgeBeams'
import SmartImage from '../components/SmartImage'
import { projects } from '../data/siteData'

// Preview page for the hero at the top of the Projects page. Not linked in the nav: visit /projects-hero-ideas.
// Everything uses the real projects; buttons in the previews don't open anything.

const featured = projects.slice(0, 3)
const accent = 'font-serif font-normal italic text-violet-bright'
const gradientTitle = 'bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 font-bold text-transparent'
const typeOf = (p) => (p.category === 'App Development' ? 'App' : 'Website')
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Steps through `length` items every `ms`; returns [index, setIndex].
function useRotate(length, ms) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reducedMotion()) return
    const id = setInterval(() => setI((n) => (n + 1) % length), ms)
    return () => clearInterval(id)
  }, [length, ms])
  return [i, setI]
}

function Shell({ children, className = '' }) {
  return <div className={`theme-dark relative isolate overflow-hidden bg-[#05050a] text-white ${className}`}>{children}</div>
}

function PrimaryButton({ children = 'View project' }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-7 py-3 font-medium text-white shadow-lg shadow-violet/40">
      {children} <ArrowRight className="size-4" />
    </span>
  )
}

// 2. Home style: beams, gradient title, gradient progress bars
export function HomeStyle() {
  const [i, setI] = useRotate(featured.length, 6000)
  const p = featured[i]
  return (
    <Shell className="flex min-h-[520px] items-end">
      <EdgeBeams boost />
      <SmartImage key={p.title} src={p.image} alt="" className="absolute inset-0 -z-10 size-full animate-line-in object-cover object-top opacity-50" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#05050a] via-[#05050a]/60 to-[#05050a]/10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#05050a]/90 via-transparent to-transparent" />
      <div className="w-full px-8 pb-12 sm:px-12">
        <div key={p.title} className="max-w-2xl animate-line-in">
          <p className="text-sm font-semibold tracking-[0.3em] text-violet-300 uppercase">Our work · {typeOf(p)}</p>
          <h3 className={`mt-3 text-5xl sm:text-6xl ${gradientTitle}`}>{p.title}</h3>
          <p className="mt-3 line-clamp-2 text-lg text-white/80">{p.description}</p>
          <div className="mt-7">
            <PrimaryButton />
          </div>
        </div>
        <div className="mt-10 flex gap-2">
          {featured.map((f, n) => (
            <button key={f.title} type="button" onClick={() => setI(n)} aria-label={`Show ${f.title}`} className="h-1 w-16 overflow-hidden rounded-full bg-white/20">
              {n === i && <span key={i} className="block h-full animate-progress bg-linear-to-r from-brand-bright via-violet-bright to-pink-400" style={{ animationDuration: '6000ms' }} />}
              {n < i && <span className="block h-full bg-violet-bright" />}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  )
}

// 3. Thumbnail strip instead of thin bars
function ThumbStrip() {
  const [i, setI] = useRotate(featured.length, 6000)
  const p = featured[i]
  return (
    <Shell className="min-h-[560px]">
      <SmartImage key={p.title} src={p.image} alt="" className="absolute inset-0 -z-10 size-full animate-line-in object-cover object-top opacity-45" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#05050a] via-[#05050a]/50 to-transparent" />
      <div className="flex min-h-[560px] flex-col justify-end gap-10 px-8 pb-10 sm:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div key={p.title} className="max-w-xl animate-line-in">
          <p className="text-sm tracking-[0.3em] text-violet-300 uppercase">Our work · {typeOf(p)}</p>
          <h3 className="mt-3 text-5xl font-bold sm:text-6xl">{p.title}</h3>
          <p className="mt-3 line-clamp-2 text-white/75">{p.description}</p>
          <div className="mt-6">
            <PrimaryButton />
          </div>
        </div>
        <div className="flex gap-3">
          {featured.map((f, n) => (
            <button
              key={f.title}
              type="button"
              onClick={() => setI(n)}
              className={`w-36 overflow-hidden rounded-xl text-left transition-all duration-300 ${
                n === i ? 'bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/40' : 'p-px opacity-60 hover:opacity-100'
              }`}
            >
              <span className="block overflow-hidden rounded-[11px] bg-[#0b0b14]">
                <SmartImage src={f.image} alt="" className="aspect-video w-full object-cover object-top" />
                <span className="block truncate px-2 py-1.5 text-xs">{f.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </Shell>
  )
}

// 4. Browser window showcase: text left, the project in a browser window right
function BrowserShowcase() {
  const [i, setI] = useRotate(featured.length, 5000)
  const p = featured[i]
  return (
    <Shell className="py-20">
      <EdgeBeams boost />
      <div aria-hidden="true" className="absolute top-1/2 right-0 -z-10 size-[30rem] -translate-y-1/2 rounded-full bg-violet/30 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 lg:grid-cols-[2fr_3fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-violet-300 uppercase">Our work</p>
          <h3 className="mt-3 text-5xl font-bold tracking-tight">
            Things we&apos;ve <span className={accent}>built.</span>
          </h3>
          <ul className="mt-8 space-y-2">
            {featured.map((f, n) => (
              <li key={f.title}>
                <button
                  type="button"
                  onClick={() => setI(n)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${n === i ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
                >
                  <span className={`h-8 w-1 rounded-full ${n === i ? 'bg-linear-to-b from-brand-bright to-pink-400' : 'bg-white/15'}`} />
                  <span>
                    <span className="block font-semibold">{f.title}</span>
                    <span className="block text-xs text-white/50">{typeOf(f)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-2xl shadow-violet/30">
          <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-[#0b0b14]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">{p.title}</span>
            </div>
            <SmartImage key={p.title} src={p.image} alt={p.title} className="aspect-video w-full animate-line-in object-cover object-top" />
          </div>
        </div>
      </div>
    </Shell>
  )
}

// 5. Fanned collage: big heading with tilted project cards
function FannedCollage() {
  const tilt = ['-rotate-6 -translate-x-24 translate-y-6', 'z-10 -translate-y-2', 'rotate-6 translate-x-24 translate-y-6']
  return (
    <Shell className="py-20 text-center">
      <EdgeBeams boost />
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-96 rounded-full bg-violet/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-24 -z-10 text-[clamp(4rem,15vw,11rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
      >
        PROJECTS
      </span>
      <h3 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Our <span className={accent}>Work</span>
      </h3>
      <p className="mt-4 text-white/70">Websites and apps we&apos;ve designed and built.</p>
      <div className="group relative mx-auto mt-14 flex h-64 max-w-3xl items-center justify-center">
        {featured.map((p, n) => (
          <div
            key={p.title}
            className={`absolute w-72 rounded-xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:rotate-0 ${tilt[n]} ${
              n === 0 ? 'group-hover:-translate-x-80' : n === 2 ? 'group-hover:translate-x-80' : ''
            } group-hover:translate-y-0`}
          >
            <div className="overflow-hidden rounded-[11px] bg-[#0b0b14]">
              <SmartImage src={p.image} alt="" className="aspect-video w-full object-cover object-top" />
              <p className="px-3 py-2 text-left text-sm font-semibold">{p.title}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-white/40">Point at the cards: they fan out side by side.</p>
    </Shell>
  )
}

// 6. Scrolling wall of screenshots behind a centered headline
// onSeeAll: what "See them all" does (the Projects page scrolls down to the cards); does nothing in the preview.
export function ScreenshotWall({ onSeeAll }) {
  const rows = [projects, [...projects].reverse()]
  return (
    <Shell className="py-24 text-center">
      <EdgeBeams boost />
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex -rotate-6 flex-col justify-center gap-5 opacity-35">
        {rows.map((row, r) => (
          <div key={r} className="flex w-max animate-marquee gap-5 motion-reduce:animate-none" style={{ animationDirection: r ? 'reverse' : 'normal', animationDuration: '60s' }}>
            {[...row, ...row].map((p, n) => (
              <SmartImage key={n} src={p.image} alt="" className="aspect-video w-72 shrink-0 rounded-xl object-cover object-top" />
            ))}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,#05050a_25%,rgba(5,5,10,0.6)_60%,rgba(5,5,10,0.2))]" />
      <div className="px-6">
        <p className="text-sm font-semibold tracking-[0.3em] text-violet-300 uppercase">Our work</p>
        <h3 className={`mt-4 text-5xl sm:text-7xl ${gradientTitle}`}>Things we&apos;ve built</h3>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          {projects.length} websites and apps for businesses, nonprofits and passion projects.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSeeAll}
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white transition hover:bg-white/10"
          >
            See them all <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </Shell>
  )
}

// 7. Laptop and phone mockup
function DeviceMockup() {
  const [i, setI] = useRotate(featured.length, 5000)
  const p = featured[i]
  return (
    <Shell className="py-20">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -z-10 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-violet/30 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 lg:grid-cols-2">
        <div key={p.title} className="animate-line-in">
          <p className="text-sm tracking-[0.3em] text-violet-300 uppercase">Featured · {typeOf(p)}</p>
          <h3 className={`mt-3 text-5xl ${gradientTitle}`}>{p.title}</h3>
          <p className="mt-4 line-clamp-3 text-white/75">{p.description}</p>
          <div className="mt-7 flex items-center gap-4">
            <PrimaryButton />
            <div className="flex gap-1.5">
              {featured.map((f, n) => (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show ${f.title}`}
                  className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-linear-to-r from-brand-bright to-violet-bright' : 'w-2 bg-white/25'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative pb-8">
          <div className="rounded-t-xl border-[6px] border-b-0 border-[#1f1f2e] bg-[#1f1f2e]">
            <SmartImage key={p.title} src={p.image} alt="" className="aspect-video w-full animate-line-in rounded-t-md object-cover object-top" />
          </div>
          <div className="mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl bg-[#2a2a3d]" />
          <div className="absolute right-0 bottom-0 w-28 overflow-hidden rounded-[1.4rem] border-[5px] border-[#1f1f2e] bg-[#1f1f2e] shadow-2xl sm:w-32">
            <SmartImage key={`${p.title}-m`} src={p.image} alt="" className="aspect-[9/16] w-full animate-line-in rounded-2xl object-cover object-left-top" />
          </div>
        </div>
      </div>
    </Shell>
  )
}

// 8. Slow zoom ("Ken Burns") with a crossfade
function SlowZoom() {
  const [i] = useRotate(featured.length, 7000)
  return (
    <Shell className="flex min-h-[520px] items-center">
      {featured.map((p, n) => (
        <SmartImage
          key={p.title}
          src={p.image}
          alt=""
          className={`absolute inset-0 -z-10 size-full object-cover object-top transition-opacity duration-[1500ms] ${n === i ? 'opacity-50' : 'opacity-0'} ${
            n === i ? 'motion-safe:animate-[slow-zoom_7s_ease-out_both]' : ''
          }`}
        />
      ))}
      <style>{'@keyframes slow-zoom { from { transform: scale(1) } to { transform: scale(1.12) } }'}</style>
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#05050a] via-[#05050a]/70 to-transparent" />
      <div className="px-8 sm:px-12">
        <div key={featured[i].title} className="max-w-xl animate-line-in">
          <p className="text-sm tracking-[0.3em] text-violet-300 uppercase">Our work · {typeOf(featured[i])}</p>
          <h3 className="mt-3 text-5xl font-bold sm:text-6xl">{featured[i].title}</h3>
          <p className="mt-3 line-clamp-2 text-white/75">{featured[i].description}</p>
          <div className="mt-6">
            <PrimaryButton />
          </div>
        </div>
      </div>
    </Shell>
  )
}

// 1. The hero the Projects page had before option 2 replaced it: white title, white button and white bars
function PreviousHero() {
  const [i, setI] = useRotate(featured.length, 6000)
  const p = featured[i]
  return (
    <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-black text-white">
      <SmartImage key={p.title} src={p.image} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-60 animate-line-in [animation-duration:1s]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/40 to-black/10" />
      <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div key={p.title} className="max-w-2xl animate-line-in [animation-duration:0.8s]">
          <div className="text-sm tracking-widest text-white/60 uppercase">Our work · {p.category}</div>
          <h3 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">{p.title}</h3>
          <p className="mt-4 line-clamp-2 text-lg text-white/75">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:scale-105">
              View project <ArrowRight className="size-4" />
            </span>
            {p.url && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold transition hover:bg-white/10">
                Visit site <ExternalLink className="size-4" />
              </span>
            )}
          </div>
        </div>
        <div className="mt-10 flex gap-2">
          {featured.map((f, n) => (
            <button key={f.title} type="button" onClick={() => setI(n)} aria-label={`Show ${f.title}`} className="h-1 w-16 overflow-hidden rounded-full bg-white/25">
              {n === i && <span key={i} className="block h-full animate-progress bg-white" style={{ animationDuration: '6000ms' }} />}
              {n < i && <span className="block h-full bg-white" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

const ideas = [
  { title: 'What was there before', description: 'The hero the Projects page had before you picked option 2, for comparison.', Component: PreviousHero, tag: 'Before' },
  { title: 'Home style', description: 'Light beams, a gradient project title, a gradient button and gradient progress bars, like the Home hero.', Component: HomeStyle },
  { title: 'Thumbnail strip', description: 'Small clickable previews of the 3 featured projects instead of the thin bars. The current one gets a glowing outline.', Component: ThumbStrip },
  { title: 'Browser showcase', description: '“Things we’ve built.” with a project list on the left and the project in a browser window on the right.', Component: BrowserShowcase },
  { title: 'Fanned collage', description: '“Our Work” over a huge outlined PROJECTS, with tilted project cards that fan out when you point at them.', Component: FannedCollage },
  { title: 'Screenshot wall', description: 'All your projects scrolling slowly in tilted rows behind a big gradient headline.', Component: ScreenshotWall, tag: 'Current' },
  { title: 'Laptop & phone', description: 'The featured project shown on a laptop and a phone, switching every few seconds.', Component: DeviceMockup },
  { title: 'Slow zoom', description: 'Each background photo slowly zooms in and crossfades to the next, like a film.', Component: SlowZoom },
]

export default function ProjectsHeroIdeas() {
  return (
    <div className="space-y-20 py-16">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Projects hero ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          {ideas.length - 1} ideas for the top of the{' '}
          <Link to="/projects" className="text-brand-bright underline">
            Projects page
          </Link>
          , using your real project screenshots. Each one is shown full width, like on the page.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {ideas.map(({ title }, i) => (
            <a key={title} href={`#idea-${i + 1}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-brand-bright/60">
              {i + 1}. {title}
            </a>
          ))}
        </nav>
      </header>
      {ideas.map(({ title, description, Component, tag }, i) => (
        <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
          <div className="mx-auto mb-6 flex max-w-7xl items-baseline gap-3 px-4 sm:px-6 lg:px-8">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
                {title}
                {tag && <span className="rounded-full bg-elevated px-2.5 py-0.5 text-xs font-normal text-fg-muted">{tag}</span>}
              </h2>
              <p className="mt-1 text-fg-muted">{description}</p>
            </div>
          </div>
          <Component />
        </section>
      ))}
    </div>
  )
}
