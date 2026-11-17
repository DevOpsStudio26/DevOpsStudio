import { useState } from 'react'
import { projects, team } from '../data/siteData'

// Preview page for the "Meet Our Team" header on the Portfolio page. Not linked in the nav: visit /team-header-ideas.
// Every idea uses the current subtitle.

const subtitle = 'A dynamic duo combining technical expertise with creative excellence to deliver outstanding results.'
const label = 'text-sm font-semibold tracking-widest text-violet-bright uppercase'
const accent = 'font-serif font-normal italic text-violet-bright'
const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'
const firstNames = team.map((p) => p.name.split(' ')[0])

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

/* 1. What's there now */
function Current() {
  return (
    <header className="py-6 text-center">
      <h1 className="text-5xl font-bold">Meet Our Team</h1>
      <p className="mx-auto mt-4 max-w-2xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

/* 2. Italic accent, matching the About page header */
function ItalicAccent() {
  return (
    <header className="py-10 text-center">
      <div className={label}>The people behind it</div>
      <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
        Meet Our <span className={accent}>Team</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

/* 3. Your first names in the heading */
function NamesHeading() {
  return (
    <header className="py-10 text-center">
      <div className={label}>Meet our team</div>
      <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
        <span className={accent}>{firstNames[0]}</span> &amp; <span className={accent}>{firstNames[1]}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

/* 4. Both of you in small gradient rings above the heading */
function AvatarsAbove() {
  return (
    <header className="py-10 text-center">
      <div className="flex justify-center -space-x-4">
        {team.slice(0, 2).map((p) => (
          <div key={p.name} className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-0.5">
            <Avatar person={p} className="size-20 rounded-full border-4 border-bg" />
          </div>
        ))}
      </div>
      <h1 className="mt-6 text-6xl font-bold tracking-tight sm:text-7xl">
        Meet Our <span className={accent}>Team</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

/* 5. In a dark grid panel */
function DarkPanel() {
  return (
    <div className={outline}>
      <header className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] px-6 py-20 text-center sm:px-12">
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
        <div aria-hidden="true" className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl" />
        <div className={label}>The people behind it</div>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
          Meet Our <span className={accent}>Team</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">{subtitle}</p>
      </header>
    </div>
  )
}

/* 6. Heading on the left, quick facts on the right */
function WithFacts() {
  const facts = [
    [team.length, 'People'],
    [new Set(team.flatMap((p) => p.skills)).size, 'Skills between us'],
    [projects.length, 'Projects'],
  ]
  return (
    <header className="grid items-end gap-10 py-8 lg:grid-cols-[3fr_2fr]">
      <div>
        <div className={label}>The people behind it</div>
        <h1 className="mt-4 text-6xl font-bold tracking-tight">
          Meet Our <span className={accent}>Team</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl text-fg-muted">{subtitle}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {facts.map(([n, l]) => (
          <div key={l} className={outline}>
            <div className="h-full rounded-[calc(1.5rem-1px)] bg-surface px-4 py-4 text-center">
              <div className="text-3xl font-bold">{n}</div>
              <div className="mt-1 text-xs text-fg-muted">{l}</div>
            </div>
          </div>
        ))}
      </div>
    </header>
  )
}

/* 7. Huge outlined word behind the heading */
function OutlinedBackdrop() {
  return (
    <header className="relative isolate overflow-hidden py-20 text-center">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(5rem,20vw,15rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
      >
        TEAM
      </span>
      <h1 className="text-6xl font-bold tracking-tight">
        Meet Our <span className={accent}>Team</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

/* 8. Gradient heading with a soft glow, like the home page hero */
function GradientHeading() {
  return (
    <header className="relative isolate py-14 text-center">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl" />
      <h1 className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
        Meet Our Team
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">{subtitle}</p>
    </header>
  )
}

const ideas = [
  ["What's there now", 'The current header, for comparison.', Current],
  ['Italic Accent', "Bigger, with a small label and 'Team' in italic purple. Matches the About page header.", ItalicAccent],
  ['Your Names', `"${firstNames[0]} & ${firstNames[1]}" as the heading, in italic purple.`, NamesHeading],
  ['Photos Above', 'Both of you in small gradient rings above the heading.', AvatarsAbove],
  ['Dark Panel', 'The header in a dark grid panel with the gradient outline, like the panels below it.', DarkPanel],
  ['With Facts', 'Heading on the left; people, skills and projects counts on the right.', WithFacts],
  ['Outlined Backdrop', 'A huge outlined "TEAM" behind the heading.', OutlinedBackdrop],
  ['Gradient Heading', 'The blue-purple-pink gradient text from the home page hero.', GradientHeading],
]

export default function TeamHeaderIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">"Meet Our Team" Header Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">8 looks for the header at the top of the Portfolio page.</p>
        </header>

        {ideas.map(([title, description, Header], i) => (
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
            <div className="rounded-xl border border-dashed border-line p-4 sm:p-8">
              <Header />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
