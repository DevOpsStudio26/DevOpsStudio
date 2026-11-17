import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import ProjectCoverflow from '../components/ProjectCoverflow'
import ProjectModal from '../components/ProjectModal'
import EdgeBeams from '../components/EdgeBeams'
import { projects } from '../data/siteData'

// Preview page for the look of the "Recent Work" section on the home page. Not linked in the nav:
// visit /recent-work-ideas. Every idea keeps the coverflow; clicking the middle card opens the popup.

const accent = 'font-serif font-normal italic text-violet-bright'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'
const gradientButton =
  'inline-flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50'

function SeeAll({ className = 'inline-flex shrink-0 items-center gap-2 rounded-lg border border-line px-6 py-3 transition-colors hover:border-brand-bright/60' }) {
  return (
    <Link to="/projects" className={className}>
      See all projects <ArrowRight className="size-4" />
    </Link>
  )
}

function HeadingRow({ title = <>Recent Work</>, sub = "A few things we've built lately. Click the middle card for details.", button }) {
  return (
    <div className="mb-14 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
      <div>
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-4 text-fg-muted">{sub}</p>
      </div>
      {button ?? <SeeAll />}
    </div>
  )
}

/* 1. What's there now */
function Current({ open }) {
  return (
    <section className="relative overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div className="px-4 sm:px-8">
        <HeadingRow />
        <ProjectCoverflow projects={projects} onOpen={open} />
      </div>
    </section>
  )
}

/* 2. Heading like the other pages: italic accent and a huge outlined word behind */
function MatchedHeading({ open }) {
  return (
    <section className="relative overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div className="px-4 sm:px-8">
        <div className="relative isolate mb-14 text-center">
          <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,14vw,10rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
          >
            WORK
          </span>
          <h2 className="text-5xl font-bold tracking-tight">
            Recent <span className={accent}>Work</span>
          </h2>
          <p className="mt-4 text-fg-muted">A few things we've built lately. Click the middle card for details.</p>
        </div>
        <ProjectCoverflow projects={projects} onOpen={open} />
        <div className="mt-10 text-center">
          <SeeAll className={gradientButton} />
        </div>
      </div>
    </section>
  )
}

/* 3. Cards with the gradient outline; the middle one glows */
function OutlinedCards({ open }) {
  return (
    <section className="relative overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div className="px-4 sm:px-8">
        <HeadingRow />
        <ProjectCoverflow projects={projects} onOpen={open} outlined />
      </div>
    </section>
  )
}

/* 4. A spotlight: a pool of light under the middle card */
function Spotlight({ open }) {
  return (
    <section className="relative isolate overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div aria-hidden="true" className="absolute top-40 left-1/2 -z-10 h-80 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet/30 blur-[90px]" />
      <div aria-hidden="true" className="absolute top-[26rem] left-1/2 -z-10 h-px w-[40rem] max-w-full -translate-x-1/2 bg-linear-to-r from-transparent via-violet-bright to-transparent" />
      <div aria-hidden="true" className="absolute top-[26rem] left-1/2 -z-10 h-24 w-[30rem] max-w-full -translate-x-1/2 bg-linear-to-b from-violet/25 to-transparent [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)]" />
      <div className="px-4 sm:px-8">
        <HeadingRow />
        <ProjectCoverflow projects={projects} onOpen={open} outlined />
      </div>
    </section>
  )
}

/* 5. The whole section as a dark grid band */
function DarkBand({ open }) {
  return (
    <section className="theme-dark relative isolate overflow-hidden bg-[#07070d] py-24">
      <EdgeBeams />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-3xl" />
      <div className="px-4 sm:px-8">
        <HeadingRow
          title={
            <>
              Recent <span className={accent}>Work</span>
            </>
          }
          button={<SeeAll className={gradientButton} />}
        />
        <ProjectCoverflow projects={projects} onOpen={open} outlined />
      </div>
    </section>
  )
}

/* 6. Coverflow on the left, the middle project's details on the right */
function WithDetails({ open }) {
  const [active, setActive] = useState(0)
  const p = projects[active]
  return (
    <section className="relative overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div className="px-4 sm:px-8">
        <h2 className="mb-12 text-center text-5xl font-bold tracking-tight">
          Recent <span className={accent}>Work</span>
        </h2>
        <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <ProjectCoverflow projects={projects} onOpen={open} outlined onActiveChange={setActive} />
          <div className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px">
            <div key={active} className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8 animate-line-in">
              <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`} />
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-violet/20 px-3 py-1 text-violet-bright">{p.category}</span>
                <span className="flex items-center gap-1.5 text-fg-subtle">
                  <Calendar className="size-3.5" /> {p.year}
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-bold">{p.title}</h3>
              <p className="mt-3 line-clamp-4 text-fg-muted">{p.description}</p>
              {p.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={() => open(active)} className={gradientButton}>
                  View details <ArrowRight className="size-4" />
                </button>
                <SeeAll className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 transition-colors hover:border-violet-bright/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 7. Plays through on its own */
function AutoPlay({ open }) {
  return (
    <section className="relative overflow-hidden bg-surface/60 py-24">
      <EdgeBeams line="bg-line" />
      <div className="px-4 sm:px-8">
        <HeadingRow sub="Moves to the next project every 4 seconds. Hover to pause." />
        <ProjectCoverflow projects={projects} onOpen={open} outlined autoPlay={4000} />
      </div>
    </section>
  )
}

const ideas = [
  ['The old look', 'What the home page had before, for comparison.', Current],
  ['Matched Heading', '"Recent Work" with the italic accent over a huge outlined "WORK", like your page headers, and a gradient button under the cards.', MatchedHeading],
  ['Outlined Cards', 'The cards get the gradient outline, and the middle one glows.', OutlinedCards],
  ['Spotlight', 'Now live on the home page, with the Matched Heading (2). A pool of purple light and a glowing floor line under the middle card.', Spotlight],
  ['Dark Band', 'The whole section as a dark grid band with a glow behind the cards. Stays dark in light mode.', DarkBand],
  ['With Details', "The coverflow on the left; the middle project's details, tags and buttons on the right.", WithDetails],
  ['Auto Play', 'Moves to the next project every 4 seconds on its own, pausing while you hover.', AutoPlay],
]

export default function RecentWorkIdeas() {
  const [modal, setModal] = useState(null)
  const step = (dir) => setModal((i) => (i + dir + projects.length) % projects.length)
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">"Recent Work" Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">7 looks for the Recent Work section on the home page. They all keep the coverflow.</p>
        </header>

        {ideas.map(([title, description, Idea], i) => (
          <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-1 text-fg-muted">{description}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-dashed border-line">
              <Idea open={setModal} />
            </div>
          </section>
        ))}
      </div>

      {modal !== null && (
        <ProjectModal project={projects[modal]} onClose={() => setModal(null)} onPrev={() => step(-1)} onNext={() => step(1)} />
      )}
    </div>
  )
}
