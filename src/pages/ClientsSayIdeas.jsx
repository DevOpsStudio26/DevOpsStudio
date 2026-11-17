import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MessageSquareHeart, Quote, Star } from 'lucide-react'
import Testimonials from '../components/Testimonials'
import EdgeBeams from '../components/EdgeBeams'
import { contactEmail } from '../data/siteData'

// Preview page for "What Clients Say" on the home page, in the site's current style. Not linked in the nav:
// visit /clients-say-ideas. All names and quotes here are made-up samples.

const samples = [
  { quote: 'They rebuilt our site in three weeks and bookings went up almost right away. Clear updates the whole way.', name: 'Sample Client', role: 'Owner, Landscaping Company' },
  { quote: 'Every week we got a demo, so there were no surprises at launch.', name: 'Example Person', role: 'Founder, Fitness Startup' },
  { quote: 'Friendly, fast, and they actually listened to what we needed.', name: 'Test Customer', role: 'Manager, Local Restaurant' },
  { quote: 'They still help us months after launch. It feels like having our own tech team.', name: 'Demo Reviewer', role: 'Director, Nonprofit' },
]

const accent = 'font-serif font-normal italic text-violet-bright'
const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const inner = 'rounded-[calc(1.5rem-1px)]'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'
const gradientButton =
  'inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50'

const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2)

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  )
}

function Person({ t, size = 'size-10' }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-sm font-semibold text-white`}>
        {initials(t.name)}
      </span>
      <div>
        <div className="font-semibold">{t.name}</div>
        <div className="text-sm text-fg-muted">{t.role}</div>
      </div>
    </div>
  )
}

function DarkCard({ className = '', glow = '-top-16 -left-16', children }) {
  return (
    <div className={outline}>
      <div className={`theme-dark relative isolate h-full overflow-hidden bg-[#07070d] ${inner} ${className}`}>
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`} />
        <div aria-hidden="true" className={`absolute -z-10 size-48 rounded-full bg-violet/30 blur-3xl ${glow}`} />
        {children}
      </div>
    </div>
  )
}

function Heading({ sub = "Real words from the people we've built for." }) {
  return (
    <div className="relative isolate mb-14 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,13vw,9rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
      >
        REVIEWS
      </span>
      <h2 className="text-5xl font-bold tracking-tight">
        What Clients <span className={accent}>Say</span>
      </h2>
      <p className="mt-4 text-fg-muted">{sub}</p>
    </div>
  )
}

/* 1. What's there now */
function Current() {
  return <Testimonials bare />
}

/* 2. Dark grid cards with the gradient outline */
function DarkCards() {
  return (
    <>
      <Heading />
      <div className="grid gap-6 md:grid-cols-3">
        {samples.slice(0, 3).map((t, i) => (
          <DarkCard key={t.name} className="flex flex-col p-7" glow={i % 2 ? '-bottom-16 -right-16' : '-top-16 -left-16'}>
            <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
              <Quote className="size-5" />
            </span>
            <div className="mt-5">
              <Stars />
            </div>
            <blockquote className="mt-3 flex-1 leading-relaxed">“{t.quote}”</blockquote>
            <div className="mt-6 border-t border-white/10 pt-5">
              <Person t={t} />
            </div>
          </DarkCard>
        ))}
      </div>
    </>
  )
}

/* 3. One big quote on a stage, moving on slowly, like Recent Work */
function Spotlight() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % samples.length), 7000)
    return () => clearInterval(id)
  }, [paused])
  const t = samples[active]
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Heading />
      <div className="relative isolate mx-auto max-w-3xl text-center">
        <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 h-64 w-[32rem] max-w-full -translate-x-1/2 rounded-full bg-violet/25 blur-[90px]" />
        <Quote className="mx-auto size-12 text-violet-bright/60" />
        <blockquote key={active} className="mt-6 text-2xl leading-relaxed font-medium animate-line-in [animation-duration:0.8s] sm:text-3xl">
          “{t.quote}”
        </blockquote>
        <div className="mx-auto mt-10 h-px w-80 max-w-full bg-linear-to-r from-transparent via-violet-bright to-transparent" />
        <div key={`p${active}`} className="mt-6 flex justify-center animate-line-in">
          <Person t={t} size="size-12" />
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {samples.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Show quote ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-linear-to-r from-brand to-violet' : 'w-3 bg-elevated hover:bg-fg-subtle'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* 4. One featured quote in a box with a beam running around its border */
function BeamBox() {
  const t = samples[0]
  return (
    <>
      <Heading />
      <div className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-3xl p-[2px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-brand via-violet to-pink-500 opacity-40" />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin motion-reduce:hidden"
          style={{
            animationDuration: '6s',
            background: 'conic-gradient(from 0deg, transparent 0deg 290deg, #7c3aed 320deg, #e9d5ff 350deg, transparent 360deg)',
          }}
        />
        <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#07070d] px-8 py-12 text-center sm:px-14">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
          <div className="flex justify-center">
            <Stars />
          </div>
          <blockquote className="mt-6 text-2xl leading-relaxed font-medium">“{t.quote}”</blockquote>
          <div className="mt-8 flex justify-center">
            <Person t={t} size="size-12" />
          </div>
        </div>
      </div>
    </>
  )
}

/* 5. Two rows of outlined quote cards drifting past, with light beams on the edges */
function BeamMarquee() {
  const rows = [samples, [...samples].reverse()]
  return (
    <section className="relative overflow-hidden py-16">
      <EdgeBeams line="bg-line" />
      <Heading />
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="group flex overflow-hidden">
            <div className={`flex shrink-0 gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none ${r ? '[animation-direction:reverse]' : ''}`}>
              {[...row, ...row, ...row].map((t, i) => (
                <div key={i} className="w-80 shrink-0 rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px">
                  <figure className="h-full rounded-[calc(1rem-1px)] bg-surface p-5">
                    <Stars />
                    <blockquote className="mt-3 line-clamp-3 text-sm leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-4">
                      <Person t={t} size="size-9" />
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* 6. Before you have real quotes: ask past clients for one */
function AskForReviews() {
  return (
    <>
      <Heading sub="We're collecting our first reviews." />
      <DarkCard className="mx-auto max-w-3xl px-8 py-12 text-center sm:px-14" glow="-top-20 left-1/2 -translate-x-1/2">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
          <MessageSquareHeart className="size-7" />
        </span>
        <h3 className="mt-6 text-3xl font-bold">
          Worked with <span className={accent}>us?</span>
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-fg-muted">
          We'd love to hear how it went. A sentence or two about your project helps other businesses decide if we're a good
          fit.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${contactEmail}?subject=A%20review%20for%20DevOps%20Studio`} className={gradientButton}>
            <Mail className="size-4" /> Send us a review
          </a>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 transition-colors hover:border-violet-bright/60">
            See our work <ArrowRight className="size-4" />
          </Link>
        </div>
      </DarkCard>
    </>
  )
}

const ideas = [
  ["What's there now", 'The current section. On the live site it stays hidden until real quotes are added.', Current],
  ['Dark Cards', 'Three dark grid cards with the gradient outline, a gradient quote icon and stars, under the matched "What Clients Say" heading.', DarkCards],
  ['Spotlight', 'One big quote under a glow, moving to the next slowly every 7 seconds (hover to pause), like Recent Work.', Spotlight],
  ['Beam Box', 'One featured quote in a dark box with a beam running around its border, like the "Have an Idea?" box.', BeamBox],
  ['Beam Marquee', 'Two rows of outlined quote cards drifting past, with the light beams along the edges.', BeamMarquee],
  ['Ask for Reviews', "For now, while you don't have quotes yet: invite past clients to send one, straight to your email.", AskForReviews],
]

export default function ClientsSayIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">"What Clients Say" Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">6 looks in your site's current style.</p>
          <p className="mx-auto mt-4 w-fit rounded-full bg-amber-400/15 px-4 py-1.5 text-sm text-amber-400">
            All names and quotes here are made-up samples. Only real quotes from real clients should go live.
          </p>
        </header>

        {ideas.map(([title, description, Idea], i) => (
          <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
            <div className="mb-8 flex items-baseline gap-3 border-b border-dashed border-line pb-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-1 text-fg-muted">{description}</p>
              </div>
            </div>
            <Idea />
          </section>
        ))}
      </div>
    </div>
  )
}
