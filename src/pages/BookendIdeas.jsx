import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, ClipboardList, Hammer, Mail, Phone } from 'lucide-react'
import BookendCta from '../components/BookendCta'
import EdgeBeams from '../components/EdgeBeams'
import { useCurrentMonth } from '../hooks/useCurrentMonth'
import { contactEmail, contactPhone, contactPhoneLink } from '../data/siteData'

// Preview page for the Home page's closing "Have an idea? Let's build it." section, in the Home page's style.
// Not linked in the nav: visit /bookend-ideas.

const INF = 'M32 32c-5-7-9-11-15-11a11 11 0 1 0 0 22c6 0 10-4 15-11s9-11 15-11a11 11 0 1 1 0 22c-6 0-10-4-15-11Z'
const gradientHeadline = 'bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 font-bold text-transparent'
const accent = 'font-serif font-normal italic text-violet-bright'

// The hero-style dark band every idea sits in.
function Shell({ children, className = '' }) {
  return (
    <div className={`theme-dark relative isolate overflow-hidden bg-[#05050a] py-24 ${className}`}>
      <EdgeBeams boost only="top" />
      {children}
    </div>
  )
}

function Badge() {
  const month = useCurrentMonth()
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      Booking projects for {month}
    </span>
  )
}

function Buttons({ center = true }) {
  return (
    <div className={`mt-8 flex flex-wrap gap-4 ${center ? 'justify-center' : ''}`}>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-8 py-3 text-white shadow-lg shadow-brand/40 transition hover:shadow-violet/50"
      >
        Book a Free Call <ArrowRight className="size-4" />
      </Link>
      <Link to="/projects" className="inline-flex items-center rounded-lg border border-white/30 px-8 py-3 text-white transition hover:bg-white/10">
        View Our Work
      </Link>
    </div>
  )
}

// 2. Matching heading: italic accent over a huge outlined word, like Services / Work / Reviews
function OutlinedWord() {
  return (
    <Shell className="text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-80 rounded-full bg-violet/25 blur-3xl" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,16vw,12rem)] leading-none font-black tracking-tighter whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
      >
        LET&apos;S TALK
      </span>
      <div className="px-4">
        <Badge />
        <h3 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Have an idea? Let&apos;s <span className={accent}>build it.</span>
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Book a free 30-minute call. No pressure, just a plan.</p>
        <Buttons />
      </div>
    </Shell>
  )
}

// 3. Big infinity loop with light running around it
function InfinityLoop() {
  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <Badge />
          <h3 className={`mt-6 text-4xl sm:text-5xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
          <p className="mt-5 text-lg text-white/80">We build it, launch it, and keep making it better. Book a free 30-minute call.</p>
          <Buttons center={false} />
        </div>
        <svg viewBox="0 0 64 64" className="mx-auto w-full max-w-md" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="bk-inf" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset=".5" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#f472b6" />
            </linearGradient>
            <filter id="bk-glow">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>
          <path d={INF} stroke="url(#bk-inf)" strokeOpacity=".2" strokeWidth="3" />
          <path d={INF} stroke="url(#bk-inf)" strokeWidth="3" strokeLinecap="round" strokeDasharray="22 116" filter="url(#bk-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="-138" dur="3.5s" repeatCount="indefinite" />
          </path>
          <path d={INF} stroke="url(#bk-inf)" strokeWidth="2" strokeLinecap="round" strokeDasharray="22 116">
            <animate attributeName="stroke-dashoffset" from="0" to="-138" dur="3.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    </Shell>
  )
}

// 4. Three ways to reach you
function ContactCards() {
  const cards = [
    { icon: CalendarCheck, title: 'Book a free call', text: '30 minutes, no pressure.', to: '/contact', cta: 'Pick a time' },
    { icon: Mail, title: 'Email us', text: contactEmail, href: `mailto:${contactEmail}`, cta: 'Send an email' },
    { icon: Phone, title: 'Call us', text: contactPhone, href: contactPhoneLink, cta: 'Call now' },
  ]
  return (
    <Shell className="text-center">
      <div aria-hidden="true" className="absolute top-10 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />
      <div className="mx-auto max-w-5xl px-6">
        <Badge />
        <h3 className={`mt-6 text-4xl sm:text-5xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
        <p className="mt-4 text-lg text-white/80">Pick whatever&apos;s easiest for you.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, to, href, cta }) => {
            const inner = (
              <span className="flex h-full flex-col items-center rounded-[calc(1rem-1px)] bg-[#0b0b14] p-6 transition group-hover:bg-[#100e1f]">
                <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
                  <Icon className="size-6" />
                </span>
                <span className="mt-4 font-semibold text-white">{title}</span>
                <span className="mt-1 text-sm break-all text-white/60">{text}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-violet-bright">
                  {cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            )
            const cls = 'group rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/10 transition hover:-translate-y-1 hover:shadow-violet/30'
            return to ? (
              <Link key={title} to={to} className={cls}>
                {inner}
              </Link>
            ) : (
              <a key={title} href={href} className={cls}>
                {inner}
              </a>
            )
          })}
        </div>
      </div>
    </Shell>
  )
}

// 5. What happens next
function NextSteps() {
  const steps = [
    { icon: CalendarCheck, title: 'Book a free call', text: 'Tell us your idea in 30 minutes.' },
    { icon: ClipboardList, title: 'Get a plan & quote', text: 'A clear plan and price, no surprises.' },
    { icon: Hammer, title: 'We build it', text: 'Weekly updates until launch day.' },
  ]
  return (
    <Shell className="text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-96 rounded-full bg-violet/20 blur-3xl" />
      <div className="mx-auto max-w-5xl px-6">
        <Badge />
        <h3 className={`mt-6 text-4xl sm:text-5xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
        <div className="relative mt-12 grid gap-8 sm:grid-cols-3">
          <div aria-hidden="true" className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-brand-bright via-violet-bright to-pink-400 sm:block" />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="relative">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white shadow-[0_0_20px] shadow-violet/50 ring-4 ring-[#05050a]">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-xs tracking-widest text-violet-bright uppercase">Step {i + 1}</p>
              <p className="mt-1 font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-white/60">{text}</p>
            </div>
          ))}
        </div>
        <Buttons />
      </div>
    </Shell>
  )
}

// 6. Terminal that types a command (a nod to "DevOps")
const command = 'devops-studio start --project "your idea"'
const output = ['✓ Free 30-minute call booked', '✓ Plan & quote ready', '✓ Building your site…']
const fullLength = command.length + output.length * 12
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Terminal() {
  // With animations turned off, show the finished command and output straight away
  const [typed, setTyped] = useState(() => (reducedMotion() ? fullLength : 0))
  useEffect(() => {
    if (reducedMotion()) return
    const id = setInterval(() => setTyped((n) => (n > fullLength + 30 ? 0 : n + 1)), 70)
    return () => clearInterval(id)
  }, [])
  const lines = Math.max(0, Math.floor((typed - command.length) / 12))
  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <Badge />
          <h3 className={`mt-6 text-4xl sm:text-5xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
          <p className="mt-5 text-lg text-white/80">Book a free 30-minute call. No pressure, just a plan.</p>
          <Buttons center={false} />
        </div>
        <div className="rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-2xl shadow-violet/30">
          <div className="rounded-[calc(1rem-1px)] bg-[#0b0b14] font-mono text-sm">
            <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="min-h-44 p-5 text-white/90">
              <p>
                <span className="text-violet-bright">~</span> <span className="text-emerald-400">$</span> {command.slice(0, typed)}
                {typed < command.length && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-white/80" />}
              </p>
              {output.slice(0, lines).map((l) => (
                <p key={l} className="mt-2 text-emerald-400">
                  {l}
                </p>
              ))}
              {typed >= command.length && <span className="mt-2 inline-block h-4 w-2 animate-blink bg-white/80" />}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}

// 7. Spotlight that follows the mouse
function MouseSpotlight() {
  const ref = useRef(null)
  const move = (e) => {
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - box.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - box.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={move} className="[--x:50%] [--y:40%]">
      <Shell className="text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 transition-[background] duration-75"
          style={{ background: 'radial-gradient(500px circle at var(--x) var(--y), rgba(124,58,237,0.32), transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:36px_36px]"
          style={{ maskImage: 'radial-gradient(320px circle at var(--x) var(--y), black, transparent)', WebkitMaskImage: 'radial-gradient(320px circle at var(--x) var(--y), black, transparent)' }}
        />
        <div className="px-6">
          <Badge />
          <h3 className={`mt-6 text-4xl sm:text-6xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Move your mouse around this box: a purple light and grid follow it.</p>
          <Buttons />
        </div>
      </Shell>
    </div>
  )
}

// 8. Scrolling services band on top
function MarqueeBand() {
  const words = ['WEBSITES', 'APPS', 'DESIGN', 'SUPPORT']
  const row = [...words, ...words, ...words]
  return (
    <Shell className="pt-0 text-center">
      <div className="overflow-hidden border-b border-white/10 py-6 mask-x-from-85% mask-x-to-100%">
        <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
          {[...row, ...row].map((w, i) => (
            <span key={i} className="flex items-center gap-10 text-5xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)]">
              {w}
              <svg viewBox="0 0 64 64" className="size-8" fill="none" aria-hidden="true">
                <path d={INF} stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="relative px-6 pt-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-80 rounded-full bg-violet/25 blur-3xl" />
        <Badge />
        <h3 className={`mt-6 text-4xl sm:text-6xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Book a free 30-minute call. No pressure, just a plan.</p>
        <Buttons />
      </div>
    </Shell>
  )
}

// 9. Floating outlined card inside the band
function FloatingCard() {
  return (
    <Shell>
      <div aria-hidden="true" className="absolute top-1/2 left-1/4 -z-10 size-80 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/2 right-1/4 -z-10 size-80 -translate-y-1/2 rounded-full bg-pink-500/15 blur-3xl" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-2xl shadow-violet/30">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0b0b14]/90 px-8 py-14 text-center backdrop-blur sm:px-14">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
            <Badge />
            <h3 className={`mt-6 text-4xl sm:text-5xl ${gradientHeadline}`}>Have an idea? Let&apos;s build it.</h3>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">Book a free 30-minute call. No pressure, just a plan.</p>
            <Buttons />
          </div>
        </div>
      </div>
    </Shell>
  )
}

const ideas = [
  { title: 'What’s there now', description: 'Your current section with the moving rings, for comparison.', Component: BookendCta, tag: 'Current' },
  { title: 'Matching heading', description: 'The same heading style as Services, Work and Reviews: italic “build it.” over a huge outlined LET’S TALK.', Component: OutlinedWord },
  { title: 'Infinity loop', description: 'Your logo, big, with a glowing light racing around it. Text on the left, loop on the right.', Component: InfinityLoop },
  { title: 'Three ways to reach you', description: 'Gradient-outlined cards for booking a call, emailing and calling, with your real email and phone.', Component: ContactCards },
  { title: 'What happens next', description: 'Three steps connected by a gradient line, so visitors know exactly what happens after they click.', Component: NextSteps },
  { title: 'Typing terminal', description: 'A terminal window that types out starting your project. A fun nod to the “DevOps” name.', Component: Terminal },
  { title: 'Mouse spotlight', description: 'A purple light and a grid follow the visitor’s mouse around the section.', Component: MouseSpotlight },
  { title: 'Scrolling services band', description: 'Huge outlined WEBSITES ∞ APPS ∞ DESIGN ∞ SUPPORT scrolling across the top, then the call to action.', Component: MarqueeBand },
  { title: 'Floating card', description: 'The call to action in a gradient-outlined glass card, floating over blue and pink glows.', Component: FloatingCard },
]

export default function BookendIdeas() {
  return (
    <div className="space-y-20 py-16">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">“Have an idea?” section ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          {ideas.length - 1} more ways to end the{' '}
          <Link to="/" className="text-brand-bright underline">
            Home page
          </Link>
          , all in its style: the hero&apos;s dark background, gradient headline, light beams and your infinity logo. Each
          one is shown full width, the way it would sit above the footer.
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
          <Component />
        </section>
      ))}
    </div>
  )
}
