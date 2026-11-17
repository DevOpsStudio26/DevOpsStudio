import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react'
import EdgeBeams from '../components/EdgeBeams'
import BentoServices from '../components/BentoServices'

// Preview page for ideas that make the Home page sections look and flow better together.
// Not linked in the nav: visit /home-flow-ideas.

const INF = 'M32 32c-5-7-9-11-15-11a11 11 0 1 0 0 22c6 0 10-4 15-11s9-11 15-11a11 11 0 1 1 0 22c-6 0-10-4-15-11Z'
const accent = 'font-serif font-normal italic text-violet-bright'
const sections = ['Hero', 'Stats', 'Services', 'Recent Work', 'Reviews', 'Call to action']

function Preview({ number, title, description, why, children }) {
  return (
    <section id={`idea-${number}`} className="scroll-mt-20">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {number}
        </span>
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-fg-muted">{description}</p>
          {why && <p className="mt-1 text-sm text-fg-subtle">Why: {why}</p>}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg">{children}</div>
    </section>
  )
}

// The heading style Recent Work and Reviews already use: italic accent word over a huge outlined word.
function SectionHeading({ word, before, accentWord, sub, eyebrow }) {
  return (
    <div className="relative isolate overflow-hidden py-6 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(3.5rem,12vw,8rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
      >
        {word}
      </span>
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-violet-bright uppercase">{eyebrow}</p>}
      <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {before} <span className={accent}>{accentWord}</span>
      </h3>
      <p className="mt-4 text-fg-muted">{sub}</p>
    </div>
  )
}

// 1. Matching headings
function MatchingHeadings() {
  return (
    <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div className="p-8">
        <p className="mb-6 text-center text-xs tracking-widest text-fg-subtle uppercase">Services now</p>
        <div className="py-6 text-center">
          <h3 className="text-4xl font-bold">Our Services</h3>
          <p className="mt-4 text-fg-muted">We offer comprehensive digital solutions tailored to your business needs.</p>
        </div>
      </div>
      <div className="p-8">
        <p className="mb-6 text-center text-xs tracking-widest text-fg-subtle uppercase">Matching Work &amp; Reviews</p>
        <SectionHeading word="SERVICES" before="Our" accentWord="Services" sub="We offer comprehensive digital solutions tailored to your business needs." />
      </div>
    </div>
  )
}

// 2. Numbered sections
function NumberedSections() {
  const rows = [
    ['01', 'Services', 'SERVICES', 'Our', 'Services', 'What we build for you.'],
    ['02', 'Work', 'WORK', 'Recent', 'Work', 'A few things we’ve built lately.'],
    ['03', 'Reviews', 'REVIEWS', 'What Clients', 'Say', 'Real words from the people we’ve built for.'],
  ]
  return (
    <div className="space-y-2 p-6">
      {rows.map(([n, label, word, before, acc, sub]) => (
        <SectionHeading key={n} eyebrow={`${n} — ${label}`} word={word} before={before} accentWord={acc} sub={sub} />
      ))}
    </div>
  )
}

// 3. Infinity dividers between sections
function InfinityDivider() {
  return (
    <div className="relative flex items-center justify-center py-2">
      <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-violet-bright/60 to-transparent" />
      <span className="relative flex size-12 items-center justify-center rounded-full border border-line bg-bg shadow-[0_0_24px] shadow-violet/40">
        <svg viewBox="0 0 64 64" className="size-7" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="div-inf" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d={INF} stroke="url(#div-inf)" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  )
}

function Block({ label }) {
  return (
    <div className="flex h-28 items-center justify-center text-fg-subtle">
      <div className="h-16 w-2/3 rounded-xl border border-dashed border-line" />
      <span className="absolute text-sm">{label}</span>
    </div>
  )
}

function Dividers() {
  return (
    <div className="relative px-6 py-6">
      <Block label="Services" />
      <InfinityDivider />
      <Block label="Recent Work" />
      <InfinityDivider />
      <Block label="Reviews" />
    </div>
  )
}

// 4. One continuous glow line down the page
function JourneyLine() {
  return (
    <div className="relative grid gap-10 py-10 pr-6 pl-16 sm:pl-24">
      <div className="absolute top-0 bottom-0 left-8 w-px bg-linear-to-b from-brand-bright via-violet-bright to-pink-400 sm:left-12" />
      <span className="absolute left-8 h-16 w-px animate-[beam-down_4s_linear_infinite] bg-linear-to-b from-transparent via-white to-transparent shadow-[0_0_10px_2px] shadow-violet sm:left-12 motion-reduce:hidden" />
      <style>{'@keyframes beam-down { from { top: -4rem } to { top: 100% } }'}</style>
      {sections.slice(1).map((s, i) => (
        <div key={s} className="relative">
          <span className="absolute top-1 -left-[2.6rem] flex size-5 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet ring-4 ring-bg sm:-left-[3.6rem]">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
          <p className="text-xs tracking-widest text-violet-bright uppercase">Step {i + 1}</p>
          <p className="text-xl font-semibold">{s}</p>
          <div className="mt-3 h-14 rounded-xl border border-dashed border-line" />
        </div>
      ))}
    </div>
  )
}

// 5. Scroll progress bar under the navbar
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  return (
    <div className="relative h-80">
      <div className="absolute inset-x-0 top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
        <div className="flex h-11 items-center px-4 text-sm font-semibold">DevOps Studio</div>
        <div className="h-0.5 bg-linear-to-r from-brand via-violet to-pink-500 transition-[width] duration-100" style={{ width: `${pct}%` }} />
      </div>
      <div
        className="h-full overflow-y-auto px-6 pt-16 pb-6"
        onScroll={(e) => {
          const el = e.currentTarget
          setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
        }}
      >
        <p className="mb-4 flex items-center gap-2 text-sm text-fg-muted">
          <ArrowDown className="size-4" /> Scroll inside this box and watch the bar under the menu fill up.
        </p>
        {sections.map((s) => (
          <div key={s} className="mb-4 flex h-28 items-center justify-center rounded-xl border border-dashed border-line text-fg-subtle">
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

// 6. Scroll reveal
function ScrollReveal() {
  const [run, setRun] = useState(0)
  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:bg-elevated"
      >
        <RotateCcw className="size-4" /> Replay
      </button>
      <div key={run} className="grid gap-4 sm:grid-cols-3">
        {['Web Development', 'App Development', 'Ongoing Support'].map((s, i) => (
          <div
            key={s}
            className="rounded-2xl border border-line bg-surface p-6 motion-safe:animate-[reveal_0.7s_ease-out_both]"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="size-10 rounded-xl bg-linear-to-br from-brand to-violet" />
            <p className="mt-4 font-semibold">{s}</p>
            <div className="mt-2 h-2 w-3/4 rounded bg-elevated" />
          </div>
        ))}
      </div>
      <style>{'@keyframes reveal { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }'}</style>
      <p className="mt-6 text-sm text-fg-subtle">On the real page this plays once, when each section scrolls into view.</p>
    </div>
  )
}

// 7. Soft section edges
function SoftEdges() {
  return (
    <div className="grid gap-px bg-line md:grid-cols-2">
      {[false, true].map((soft) => (
        <div key={String(soft)} className="bg-bg">
          <p className="px-6 pt-5 text-xs tracking-widest text-fg-subtle uppercase">{soft ? 'Soft fade' : 'Hard edge (now)'}</p>
          <div className="mt-4 h-24" />
          <div
            className={`flex h-32 items-center justify-center text-sm text-fg-subtle ${
              soft ? 'bg-linear-to-b from-transparent via-surface to-transparent' : 'bg-surface'
            }`}
          >
            Stats / Recent Work band
          </div>
          <div className="h-24" />
        </div>
      ))}
    </div>
  )
}

// 8. Bookend call to action that echoes the hero
function BookendCta() {
  return (
    <div className="theme-dark relative isolate overflow-hidden bg-[#05050a] px-8 py-20 text-center">
      <EdgeBeams />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[28rem] -translate-1/2 rounded-full border border-violet/30 bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_70%)]" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[20rem] -translate-1/2 rounded-full border border-brand/20" />
      <h3 className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-4xl font-bold text-transparent sm:text-5xl">
        Have an idea? Let&apos;s build it.
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-white/80">Book a free 30-minute call. No pressure, just a plan.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-8 py-3 text-white shadow-lg shadow-brand/40">
          Book a Free Call <ArrowRight className="size-4" />
        </span>
        <span className="inline-flex items-center rounded-lg border border-white/30 px-8 py-3 text-white">View Our Work</span>
      </div>
    </div>
  )
}

// 9. Side dots
function SideDots() {
  const [active, setActive] = useState(0)
  return (
    <div className="relative h-80">
      <div
        className="h-full snap-y snap-mandatory overflow-y-auto"
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight))}
      >
        {sections.map((s, i) => (
          <div key={s} className="flex h-80 snap-start items-center justify-center text-2xl font-semibold text-fg-subtle">
            {i === 0 && <ArrowDown className="mr-2 size-5" />}
            {s}
          </div>
        ))}
      </div>
      <ul className="absolute top-1/2 right-4 flex -translate-y-1/2 flex-col gap-3">
        {sections.map((s, i) => (
          <li key={s} className="group flex items-center justify-end gap-2">
            <span className={`text-xs transition-opacity ${i === active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{s}</span>
            <span
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'h-6 w-2 bg-linear-to-b from-brand to-violet' : 'size-2 bg-fg-subtle/50'
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

// 10. Services with the same spotlight as Recent Work
function ServicesSpotlight() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div aria-hidden="true" className="absolute top-24 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet/20 blur-[90px]" />
      <SectionHeading word="SERVICES" before="Our" accentWord="Services" sub="We offer comprehensive digital solutions tailored to your business needs." />
      <div className="mt-8">
        <BentoServices />
      </div>
    </div>
  )
}

const ideas = [
  {
    title: 'Matching section headings',
    description: 'Give Services the same heading style as Recent Work and Reviews: an italic accent word over a huge outlined word.',
    why: 'Right now Services is the only plain heading, so it feels like it belongs to a different site.',
    Component: MatchingHeadings,
  },
  {
    title: 'Numbered sections',
    description: 'A small "01 — Services", "02 — Work", "03 — Reviews" label above each heading.',
    why: 'Numbers tell people the page is a story with an order, and pull them to the next one.',
    Component: NumberedSections,
  },
  {
    title: 'Infinity dividers',
    description: 'Your Infinity Loop logo in a glowing circle on a fading line between sections.',
    why: 'Repeats your brand mark down the page and gives clean breaks between sections.',
    Component: Dividers,
  },
  {
    title: 'Journey line',
    description: 'One glowing line runs down the side of the page with a dot at each section, and a light streak travels along it.',
    why: 'Literally connects the sections, and matches the light beams you already have.',
    Component: JourneyLine,
  },
  {
    title: 'Scroll progress bar',
    description: 'A thin gradient bar under the menu that fills as you scroll down. Try it in the box.',
    why: 'A small, polished touch that makes the whole page feel like one piece.',
    Component: ScrollProgress,
  },
  {
    title: 'Scroll reveal',
    description: 'Cards fade and slide up one after another as each section comes into view.',
    why: 'Gives every section the same entrance, so the page feels smooth instead of static.',
    Component: ScrollReveal,
  },
  {
    title: 'Soft section edges',
    description: 'The gray bands (stats, Recent Work) fade in and out instead of starting and stopping with a hard line.',
    why: 'Softer transitions make one section flow into the next.',
    Component: SoftEdges,
  },
  {
    title: 'Bookend call to action',
    description: 'The last section uses the hero’s dark look, gradient headline and light beams.',
    why: 'Starting and ending the page the same way makes it feel complete, like a book cover.',
    Component: BookendCta,
  },
  {
    title: 'Side dots',
    description: 'Small dots on the right edge show which section you’re on; the current one stretches into a gradient pill. Scroll the box.',
    why: 'Shows the page’s structure at a glance and matches your pill-style menu.',
    Component: SideDots,
  },
  {
    title: 'Services spotlight',
    description: 'Services with the matching heading and a soft purple glow, like the spotlight behind Recent Work.',
    why: 'Puts ideas 1 and the Recent Work glow together, so Services feels as special as your favorite sections.',
    Component: ServicesSpotlight,
  },
]

export default function HomeFlowIdeas() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-bold">Home page flow ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          Ideas to make the{' '}
          <Link to="/" className="text-brand-bright underline">
            Home page
          </Link>{' '}
          sections look like they belong together, built around the parts you like: the hero, Recent Work and the reviews.
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm font-semibold">Your page today</p>
          <ol className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            {sections.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 ${['Hero', 'Recent Work', 'Reviews'].includes(s) ? 'bg-linear-to-r from-brand to-violet text-white' : 'bg-elevated text-fg-muted'}`}>
                  {s}
                </span>
                {i < sections.length - 1 && <ArrowRight className="size-3.5 text-fg-subtle" />}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-fg-subtle">Highlighted: the sections you like. The ideas below bring the others up to match.</p>
        </div>
        <nav className="mt-6 flex flex-wrap gap-2">
          {ideas.map(({ title }, i) => (
            <a key={title} href={`#idea-${i + 1}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-brand-bright/60">
              {i + 1}. {title}
            </a>
          ))}
        </nav>
      </header>
      {ideas.map(({ title, description, why, Component }, i) => (
        <Preview key={title} number={i + 1} title={title} description={description} why={why}>
          <Component />
        </Preview>
      ))}
    </div>
  )
}
