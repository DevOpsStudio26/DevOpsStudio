import ProcessTimeline from '../components/ProcessTimeline'

// Preview page for the background behind the Discover -> Deploy steps in "Our Approach" (About page).
// Not linked in the nav: visit /steps-background-ideas. Each option sits on the same dark section it would on the site.

// Inline style: Tailwind can't see class names that are built at runtime.
const grid = (alpha, size) => ({
  backgroundImage: `linear-gradient(rgba(255,255,255,${alpha}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${alpha}) 1px, transparent 1px)`,
  backgroundSize: `${size}px ${size}px`,
})

// Fades anything it's applied to out toward every edge.
const fadeEdges = '[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]'

function Current() {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl bg-surface p-6 sm:p-8">
      <div aria-hidden="true" style={grid(0.11, 32)} className={`absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]`} />
      <ProcessTimeline />
    </div>
  )
}

function FadedCard() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div aria-hidden="true" className={`absolute inset-0 -z-10 bg-surface ${fadeEdges}`} />
      <div aria-hidden="true" style={grid(0.11, 32)} className={`absolute inset-0 -z-10 ${fadeEdges}`} />
      <ProcessTimeline />
    </div>
  )
}

function GridOnly() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div aria-hidden="true" style={grid(0.09, 32)} className={`absolute -inset-8 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]`} />
      <ProcessTimeline />
    </div>
  )
}

function Spotlight() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-3/4 w-3/4 -translate-1/2 rounded-full bg-violet/25 blur-3xl" />
      <div aria-hidden="true" style={grid(0.08, 32)} className={`absolute inset-0 -z-10 ${fadeEdges}`} />
      <ProcessTimeline />
    </div>
  )
}

function DotGrid() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1.5px)] [background-size:20px_20px] ${fadeEdges}`}
      />
      <ProcessTimeline />
    </div>
  )
}

function GridFloor() {
  return (
    <div className="relative isolate overflow-hidden p-6 pb-16 sm:p-10 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 [perspective:300px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div
          style={grid(0.14, 40)} className={`absolute inset-x-[-50%] bottom-0 h-[200%] origin-bottom [transform:rotateX(60deg)] [mask-image:linear-gradient(to_top,black,transparent_70%)]`}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-violet/20 to-transparent" />
      <ProcessTimeline />
    </div>
  )
}

function GlassCard() {
  return (
    <div className="relative isolate p-6 sm:p-10">
      <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-2xl bg-white/[0.03] backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-violet-bright/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-brand-bright/60 to-transparent"
      />
      <ProcessTimeline />
    </div>
  )
}

const ideas = [
  { title: "What's there now", description: 'The card with hard edges, for comparison.', Component: Current, tag: 'Current' },
  { title: 'Faded card', description: 'The same card and grid, but every edge fades into the dark background. The closest to what you have.', Component: FadedCard, tag: 'Recommended' },
  { title: 'Grid only', description: 'No card at all. Just the grid lines, fading out in every direction around the steps.', Component: GridOnly },
  { title: 'Purple spotlight', description: 'A soft purple glow behind the steps, with a faint fading grid.', Component: Spotlight },
  { title: 'Dot grid', description: 'Little dots instead of lines, fading toward the edges. Lighter and calmer.', Component: DotGrid },
  { title: 'Grid floor', description: 'A grid that tilts away like a floor, glowing at the bottom and fading into the distance.', Component: GridFloor },
  { title: 'Glass strip', description: 'A frosted band whose sides fade away, with thin glowing lines top and bottom.', Component: GlassCard },
]

export default function StepsBackgroundIdeas() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-bold">Steps background ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          Backgrounds for the Discover → Deploy steps in &ldquo;Our Approach&rdquo; on the About page. Each one sits on the same
          dark panel it would on the site.
        </p>
      </header>
      {ideas.map(({ title, description, Component, tag }, i) => (
        <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
                {title}
                {tag && <span className="rounded-full bg-elevated px-2.5 py-0.5 text-xs font-normal text-fg-muted">{tag}</span>}
              </h2>
              <p className="mt-1 text-fg-muted">{description}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px">
            <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-6 sm:p-10">
              <Component />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
