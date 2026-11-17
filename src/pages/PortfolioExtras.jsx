import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Code, Palette, RotateCcw, Sparkles } from 'lucide-react'
import SmartImage from '../components/SmartImage'
import { projects, team } from '../data/siteData'

// Preview page for extra sections on the Portfolio page. Not linked in the nav: visit /portfolio-extras.

const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const inner = 'rounded-[calc(1.5rem-1px)]'
const accent = 'font-serif font-normal italic text-violet-bright'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

function DarkPanel({ className = '', glow = '-top-20 -left-20', children }) {
  return (
    <div className={outline}>
      <div className={`theme-dark relative isolate h-full overflow-hidden bg-[#07070d] ${inner} ${className}`}>
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
        <div aria-hidden="true" className={`absolute -z-10 size-64 rounded-full bg-violet/30 blur-3xl ${glow}`} />
        {children}
      </div>
    </div>
  )
}

function Avatar({ person, className }) {
  const [failed, setFailed] = useState(false)
  if (person.image && !failed) {
    return <img src={person.image} alt={person.name} onError={() => setFailed(true)} className={`object-cover object-top ${className}`} />
  }
  return (
    <span className={`flex items-center justify-center bg-linear-to-br from-brand to-violet font-semibold text-white ${className}`}>
      {person.name.split(' ').map((p) => p[0]).join('')}
    </span>
  )
}

function Idea({ number, title, description, children }) {
  return (
    <section id={`idea-${number}`} className="scroll-mt-20">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {number}
        </span>
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-1 text-fg-muted">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

/* 1. How the two of you split the work, meeting in the middle */
function HowWeWork() {
  const sides = [
    { person: team[0], icon: Code, label: 'Builds it', skills: team[0]?.skills.slice(0, 4) ?? [] },
    { person: team[1], icon: Palette, label: 'Designs it', skills: team[1]?.skills.slice(0, 4) ?? [] },
  ]
  const side = ({ person, icon: Icon, label, skills }, right) => (
    <DarkPanel className="p-7" glow={right ? '-top-20 -right-20' : '-top-20 -left-20'}>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-0.5">
          <Avatar person={person} className="size-14 rounded-full border-2 border-[#07070d]" />
        </div>
        <div>
          <div className="text-xl font-bold">
            {person.name.split(' ')[0]} <span className={accent}>{label}</span>
          </div>
          <div className="text-sm text-fg-muted">{person.role}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-bright">
        <Icon className="size-4" /> Focus
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
    </DarkPanel>
  )
  return (
    <>
      <h3 className="mb-12 text-center text-4xl font-bold tracking-tight">
        How We Work <span className={accent}>Together</span>
      </h3>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {side(sides[0], false)}
        <div className="relative flex flex-col items-center gap-3 py-4 lg:px-4">
          <span aria-hidden="true" className="absolute top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-linear-to-r from-brand via-violet to-pink-500 opacity-60 lg:block" />
          <span className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white shadow-2xl shadow-violet/50">
            <Sparkles className="size-9" />
          </span>
          <span className="relative rounded-full bg-bg px-3 text-sm font-semibold">Your project</span>
        </div>
        {side(sides[1], true)}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-fg-muted">
        One of us designs it, the other builds it, and you talk to both of us the whole way through.
      </p>
    </>
  )
}

/* 2. A strip of your work, linking to the Projects page */
function BuiltByUs() {
  const shots = projects.slice(0, 3)
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <h3 className="text-4xl font-bold tracking-tight">
          Built <span className={accent}>by us</span>
        </h3>
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition-colors hover:border-violet-bright/60">
          See all projects <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {shots.map((p) => (
          <Link key={p.title} to="/projects" className={`group ${outline}`}>
            <div className={`relative overflow-hidden ${inner}`}>
              <SmartImage src={p.image} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                <div>
                  <div className="text-xs text-white/70">{p.category}</div>
                  <div className="font-semibold">{p.title}</div>
                </div>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

/* 3. Every skill between you, scrolling past */
function Toolbox() {
  const skills = [...new Set(team.flatMap((p) => p.skills))]
  const rows = [skills.slice(0, Math.ceil(skills.length / 2)), skills.slice(Math.ceil(skills.length / 2))]
  return (
    <>
      <h3 className="mb-10 text-center text-4xl font-bold tracking-tight">
        Our <span className={accent}>Toolbox</span>
      </h3>
      <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <div className={`flex shrink-0 gap-3 pr-3 animate-marquee motion-reduce:animate-none ${r ? '[animation-direction:reverse]' : ''}`}>
              {[...row, ...row, ...row, ...row].map((s, i) => (
                <span key={i} className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm whitespace-nowrap">
                  <span className={`size-2 rounded-full ${i % 2 ? 'bg-violet-bright' : 'bg-brand-bright'}`} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* 4. Each person slides into view when scrolled to */
function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.25 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function RevealDemo() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [replay, setReplay] = useState(0)
  const shown = inView
  const base = 'transition-all duration-1000 ease-out motion-reduce:transition-none'
  return (
    <div ref={ref}>
      <div className="mb-6 flex justify-end">
        <button type="button" onClick={() => setReplay((n) => n + 1)} className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
          <RotateCcw className="size-4" /> Replay
        </button>
      </div>
      <div key={replay} className="space-y-10">
        {team.slice(0, 2).map((person, i) => (
          <RevealRow key={person.name} person={person} reverse={i === 1} shown={shown} base={base} />
        ))}
      </div>
    </div>
  )
}

function RevealRow({ person, reverse, shown, base }) {
  // Starts hidden on every mount (so Replay works), then slides in on the next frame
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!shown) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [shown])
  const from = reverse ? 'translate-x-12' : '-translate-x-12'
  const to = reverse ? '-translate-x-12' : 'translate-x-12'
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_2fr]">
      <div className={`${base} ${reverse ? 'md:order-2' : ''} ${ready ? 'translate-x-0 opacity-100' : `${from} opacity-0`}`}>
        <div className={outline}>
          <Avatar person={person} className={`aspect-[4/5] w-full ${inner}`} />
        </div>
      </div>
      <div className={`${base} delay-200 ${ready ? 'translate-x-0 opacity-100' : `${to} opacity-0`}`}>
        <DarkPanel className="p-7">
          <div className="text-3xl font-bold">
            {person.name.split(' ')[0]} <span className={accent}>{person.name.split(' ').slice(1).join(' ')}</span>
          </div>
          <div className="mt-1 text-violet-bright">{person.role}</div>
          <p className="mt-3 text-fg-muted">{person.bio}</p>
        </DarkPanel>
      </div>
    </div>
  )
}

/* 5. A personal touch: fun facts (sample text) */
function FunFacts() {
  const facts = ['Sample: favorite thing to build', 'Sample: what you do when not coding', 'Sample: go-to coffee order']
  return (
    <>
      <h3 className="mb-10 text-center text-4xl font-bold tracking-tight">
        When We're <span className={accent}>Not Coding</span>
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {team.slice(0, 2).map((person, i) => (
          <DarkPanel key={person.name} className="p-7" glow={i ? '-bottom-20 -right-20' : '-top-20 -left-20'}>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-0.5">
                <Avatar person={person} className="size-12 rounded-full border-2 border-[#07070d]" />
              </div>
              <div className="text-xl font-bold">{person.name.split(' ')[0]}</div>
            </div>
            <ul className="mt-5 space-y-3">
              {facts.map((f) => (
                <li key={f} className="rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-fg-muted italic">
                  {f}
                </li>
              ))}
            </ul>
          </DarkPanel>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-fg-subtle">These are placeholders; you'd fill in real facts about yourselves.</p>
    </>
  )
}

export default function PortfolioExtras() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">Portfolio Page Extras</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">
            5 sections you could add to the Portfolio page, all in its current style.
          </p>
        </header>

        <Idea number={1} title="How We Work Together" description="You and Blair on either side, meeting in the middle at 'Your project'. Shows why a duo works.">
          <HowWeWork />
        </Idea>
        <Idea number={2} title="Built by Us" description="Three project screenshots linking to the Projects page, so the page shows work, not just skills.">
          <BuiltByUs />
        </Idea>
        <Idea number={3} title="Our Toolbox" description="Every skill between you two, scrolling past in two rows. Could sit under the header.">
          <Toolbox />
        </Idea>
        <Idea number={4} title="Slide In on Scroll" description="Each photo and panel slides into view as you scroll down. Press Replay to watch again.">
          <RevealDemo />
        </Idea>
        <Idea number={5} title="When We're Not Coding" description="A personal touch: a few fun facts each. The text here is placeholder.">
          <FunFacts />
        </Idea>
      </div>
    </div>
  )
}
