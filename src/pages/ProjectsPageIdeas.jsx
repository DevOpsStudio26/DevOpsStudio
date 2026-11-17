import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Globe, LayoutGrid, Smartphone } from 'lucide-react'
import BookendCta from '../components/BookendCta'
import EdgeBeams from '../components/EdgeBeams'
import InfinityDivider from '../components/InfinityDivider'
import SmartImage from '../components/SmartImage'
import { projects } from '../data/siteData'

// Preview page for the Projects page, mostly bringing it into the Home page's style.
// Not linked in the nav: visit /projects-page-ideas. Text marked with <Sample> is placeholder wording.

const accent = 'font-serif font-normal italic text-violet-bright'
const outline = 'rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const isApp = (p) => p.category === 'App Development'
const sites = projects.filter((p) => !isApp(p))
const apps = projects.filter(isApp)
const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a)

function Sample({ children }) {
  return (
    <span className="rounded bg-amber-400/10 px-1 text-amber-300" title="Sample text: replace with your own">
      {children}
    </span>
  )
}

function OutlinedHeading({ word, before, accentWord, sub }) {
  return (
    <div className="relative isolate overflow-hidden py-6 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(3.5rem,13vw,9rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
      >
        {word}
      </span>
      <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {before} <span className={accent}>{accentWord}</span>
      </h3>
      {sub && <p className="mt-4 text-fg-muted">{sub}</p>}
    </div>
  )
}

// 1. Hero in the Home page's style
function HomeStyleHero() {
  const [active, setActive] = useState(0)
  const hero = projects[active]
  return (
    <div className="theme-dark relative isolate flex min-h-[480px] items-end overflow-hidden bg-[#05050a] text-white">
      <EdgeBeams boost />
      <SmartImage key={hero.title} src={hero.image} alt="" className="absolute inset-0 -z-10 size-full animate-line-in object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#05050a] via-[#05050a]/60 to-[#05050a]/10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#05050a]/90 via-transparent to-transparent" />
      <div className="w-full px-8 pb-12 sm:px-12">
        <div key={hero.title} className="max-w-2xl animate-line-in">
          <p className="text-sm font-semibold tracking-[0.3em] text-violet-bright uppercase">Our work · {hero.category}</p>
          <h3 className="mt-3 bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-5xl font-bold text-transparent sm:text-6xl">
            {hero.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-lg text-white/80">{hero.description}</p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-7 py-3 text-white shadow-lg shadow-brand/40">
            View project <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="mt-10 flex gap-2">
          {projects.slice(0, 3).map((p, i) => (
            <button key={p.title} type="button" onClick={() => setActive(i)} aria-label={`Show ${p.title}`} className="h-1 w-16 overflow-hidden rounded-full bg-white/20">
              {i === active && <span className="block h-full bg-linear-to-r from-brand-bright via-violet-bright to-pink-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. Matching heading + gradient-outlined stats
function MatchingHeading() {
  const stats = [
    [LayoutGrid, projects.length, 'Projects'],
    [Globe, sites.length, 'Websites'],
    [Smartphone, apps.length, 'Apps'],
  ]
  return (
    <div className="p-6 sm:p-10">
      <OutlinedHeading word="PROJECTS" before="All our" accentWord="work" sub="Search by name, or filter by type. Click any project for details." />
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
        {stats.map(([Icon, n, label]) => (
          <div key={label} className={outline}>
            <div className="h-full rounded-[calc(1rem-1px)] bg-bg p-4 text-center">
              <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
                <Icon className="size-5" />
              </span>
              <div className="mt-2 bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text text-3xl font-bold text-transparent">{n}</div>
              <div className="text-xs text-fg-muted">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 3. Device frames: websites in a browser window, apps in a phone
function DeviceCard({ p }) {
  if (isApp(p)) {
    return (
      <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-surface p-5">
        <div className="w-32 rounded-[1.5rem] border-4 border-elevated bg-bg p-1 shadow-xl">
          <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-elevated" />
          <SmartImage src={p.image} alt="" className="aspect-[9/16] w-full rounded-xl object-cover" />
        </div>
        <p className="mt-4 font-semibold">{p.title}</p>
        <p className="text-xs text-violet-bright">App</p>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
      <div className="overflow-hidden rounded-lg border border-line bg-bg shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 h-3 flex-1 rounded bg-elevated" />
        </div>
        <SmartImage src={p.image} alt="" className="aspect-video w-full object-cover object-top" />
      </div>
      <p className="mt-4 font-semibold">{p.title}</p>
      <p className="text-xs text-brand-bright">Website</p>
    </div>
  )
}

function DeviceFrames() {
  return (
    <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
      {[...sites.slice(0, 3), ...apps.slice(0, 1)].map((p) => (
        <DeviceCard key={p.title} p={p} />
      ))}
    </div>
  )
}

// 4. Featured case study
function CaseStudy() {
  const p = projects[0]
  return (
    <div className="p-6 sm:p-10">
      <div className={`${outline} rounded-3xl`}>
        <div className="grid items-center gap-8 rounded-[calc(1.5rem-1px)] bg-bg p-6 sm:p-10 lg:grid-cols-2">
          <SmartImage src={p.image} alt={p.title} className="aspect-video w-full rounded-xl object-cover object-top shadow-2xl shadow-violet/20" />
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-violet-bright uppercase">Featured project</p>
            <h3 className="mt-2 text-3xl font-bold">{p.title}</h3>
            <p className="mt-3 text-fg-muted">{p.description}</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">The goal</dt>
                <dd className="text-fg-muted">
                  <Sample>What the client needed, in one sentence.</Sample>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">What we built</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {['Event gallery', 'Online donations', 'Membership sign-ups'].map((x) => (
                    <span key={x} className="inline-flex items-center gap-1 rounded-full bg-elevated px-3 py-1">
                      <Check className="size-3.5 text-brand-bright" /> {x}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">The result</dt>
                <dd className="text-fg-muted">
                  <Sample>What changed for them afterwards.</Sample>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. Websites and apps as two rows instead of a filter
function SplitRows() {
  const rows = [
    ['Websites', sites, Globe],
    ['Apps', apps, Smartphone],
  ]
  return (
    <div className="space-y-10 p-6 sm:p-10">
      {rows.map(([label, list, Icon]) => (
        <div key={label}>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-brand to-violet text-white">
              <Icon className="size-4.5" />
            </span>
            <h3 className="text-2xl font-bold">{label}</h3>
            <span className="rounded-full bg-elevated px-2 py-0.5 text-xs text-fg-muted">{list.length}</span>
            <span className="h-px flex-1 bg-linear-to-r from-violet-bright/50 to-transparent" />
          </div>
          <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
            {list.map((p) => (
              <div key={p.title} className="w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-surface">
                <SmartImage src={p.image} alt="" className="aspect-video w-full object-cover object-top" />
                <p className="p-3 text-sm font-semibold">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// 6. Timeline by year
function YearTimeline() {
  return (
    <div className="p-6 sm:p-10">
      <div className="relative space-y-10 border-l border-line pl-8">
        {years.map((y) => (
          <div key={y} className="relative">
            <span className="absolute top-2 -left-[2.4rem] size-4 rounded-full bg-linear-to-br from-brand-bright to-violet-bright shadow-[0_0_12px] shadow-violet/60 ring-4 ring-bg" />
            <h3 className="bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text text-3xl font-bold text-transparent">{y}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => p.year === y)
                .map((p) => (
                  <div key={p.title} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2 pr-4">
                    <SmartImage src={p.image} alt="" className="size-14 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.title}</p>
                      <p className="text-xs text-fg-muted">{isApp(p) ? 'App' : 'Website'}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 7. Hover reveal cards
function HoverReveal() {
  return (
    <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
      {projects.slice(0, 3).map((p) => (
        <div key={p.title} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <SmartImage src={p.image} alt="" className="size-full object-cover object-top transition duration-700 group-hover:scale-110 group-hover:blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-t from-[#05050a] via-[#05050a]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs tracking-widest text-violet-300 uppercase">{isApp(p) ? 'App' : 'Website'}</p>
            <p className="text-xl font-bold">{p.title}</p>
            <p className="mt-2 line-clamp-2 max-h-0 text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">{p.description}</p>
          </div>
          <span className="absolute top-4 right-4 flex size-10 scale-50 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white opacity-0 shadow-lg shadow-violet/40 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      ))}
      <p className="text-sm text-fg-subtle sm:col-span-2 lg:col-span-3">Point at a card: the photo zooms, the description slides up and an arrow pops in.</p>
    </div>
  )
}

// 8. Infinity dividers + the Home page's closing section
function Ending() {
  return (
    <div>
      <div className="flex h-24 items-center justify-center text-sm text-fg-subtle">… project cards …</div>
      <InfinityDivider />
      <BookendCta />
    </div>
  )
}

const ideas = [
  { title: 'Hero in the Home style', description: 'The same near-black background, gradient title, gradient button and light beams as the Home hero. The progress bars turn gradient too.', Component: HomeStyleHero },
  { title: 'Matching heading + stats', description: '“All our work” in the same italic style as the Home sections, over a huge outlined PROJECTS, with stat cards like the Home page’s.', Component: MatchingHeading },
  { title: 'Device frames', description: 'Websites shown inside a browser window and apps inside a phone, so visitors instantly see which is which.', Component: DeviceFrames },
  { title: 'Featured case study', description: 'One project told as a story: the goal, what you built and the result. Fill in the highlighted parts.', Component: CaseStudy },
  { title: 'Websites and apps rows', description: 'Two swipeable rows, one for websites and one for apps, instead of the filter buttons.', Component: SplitRows },
  { title: 'Timeline by year', description: 'Projects grouped by year on a glowing line. Updates itself when you add projects.', Component: YearTimeline },
  { title: 'Hover reveal cards', description: 'Big photo cards where the description and an arrow appear when you point at them.', Component: HoverReveal },
  { title: 'Same ending as Home', description: 'Replace the plain “Discuss Your Project” button with the infinity divider and your new “Have an idea?” section.', Component: Ending },
]

export default function ProjectsPageIdeas() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-bold">Projects page ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          Ideas for the{' '}
          <Link to="/projects" className="text-brand-bright underline">
            Projects page
          </Link>
          , mostly bringing it into the same style as the Home page. They all use your real projects.{' '}
          <Sample>Highlighted text</Sample> is sample wording.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {ideas.map(({ title }, i) => (
            <a key={title} href={`#idea-${i + 1}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-brand-bright/60">
              {i + 1}. {title}
            </a>
          ))}
        </nav>
      </header>
      {ideas.map(({ title, description, Component }, i) => (
        <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-1 text-fg-muted">{description}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-bg">
            <Component />
          </div>
        </section>
      ))}
    </div>
  )
}
