import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Clock,
  Code,
  Headphones,
  MessageSquare,
  Palette,
  PenTool,
  Rocket,
  RotateCcw,
  Search,
  Server,
  ShoppingCart,
  Smartphone,
  Tag,
} from 'lucide-react'
import BentoServices, { DevicesPreview, SpotlightCard } from '../components/BentoServices'
import DotGrid from '../components/DotGrid'

// Preview page for the Our Services section on Home. Not linked in the nav: visit /services-ideas.
// Prices, timelines and the tool list are placeholders to swap for your own.

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fx = 'transition-all ease-out motion-reduce:transition-none'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    text: 'Custom websites and web apps, fast, accessible and built to grow.',
    includes: ['Mobile-friendly design', 'Fast loading and SEO basics', 'Contact forms and galleries', 'Easy to update'],
    time: '2–4 weeks',
    price: 'From $___',
    link: ['See our websites', '/projects?type=websites'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    text: 'Native and cross-platform apps for iOS and Android.',
    includes: ['iOS and Android', 'Clean, simple screens', 'App store setup', 'Updates after launch'],
    time: '4–8 weeks',
    price: 'From $___',
    link: ['See our apps', '/projects?type=apps'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    text: 'Clean, modern designs you approve before we build.',
    includes: ['Mock-ups before any code', 'Your colors and brand', 'Layouts for every screen size', 'Rounds of changes'],
    time: '1–2 weeks',
    price: 'From $___',
    link: ['See all our work', '/projects'],
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    text: 'Updates, monitoring and fixes after launch.',
    includes: ['Content updates', 'Uptime monitoring', 'Bug fixes', 'Monthly check-ins'],
    time: 'Monthly',
    price: 'From $___/mo',
    link: ['Talk to us', '/contact'],
  },
]
const extraServices = [
  { icon: Search, title: 'SEO & Speed', text: 'Get found on Google and load in a blink.' },
  { icon: Server, title: 'Hosting & Domains', text: 'We set up and look after where your site lives.' },
  { icon: ShoppingCart, title: 'Online Stores', text: 'Sell products with secure checkout.' },
  { icon: PenTool, title: 'Logo & Branding', text: 'A look that’s yours, from logo to colors.' },
]
const steps = [
  { icon: MessageSquare, title: 'Talk', text: 'Tell us about your idea and goals.' },
  { icon: Palette, title: 'Design', text: 'We mock it up; you approve it.' },
  { icon: Code, title: 'Build', text: 'We build it and keep you posted.' },
  { icon: Rocket, title: 'Launch', text: 'We go live and stay on hand.' },
]
const tools = ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML & CSS', 'Node.js', 'GitHub', 'Figma', 'Netlify', 'Vercel']
const bars = [60, 80, 70, 95, 85, 100, 90, 100, 95, 100, 98, 100]

// False on the first frame, then true, so CSS transitions have something to animate from.
function useEntered() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setOn(true), 60)
    return () => clearTimeout(id)
  }, [])
  return on
}

function IconBox({ icon: Icon, small = false }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30 ${small ? 'size-10' : 'size-12'}`}
    >
      <Icon className={small ? 'size-5' : 'size-6'} />
    </span>
  )
}

function CardTop({ s }) {
  return (
    <>
      <IconBox icon={s.icon} />
      <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
      <p className="mt-2 text-fg-muted">{s.text}</p>
    </>
  )
}

const GradientText = ({ children }) => (
  <span className="bg-linear-to-r from-brand-bright via-violet-bright to-pink-400 bg-clip-text text-transparent">{children}</span>
)

function ShimmerButton({ to, children }) {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand to-violet px-8 py-3.5 font-medium text-white shadow-lg shadow-violet/30 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/60 motion-reduce:hover:translate-y-0"
    >
      {children} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-[60%] w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent group-hover:left-[130%] group-hover:transition-[left] group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
      />
    </Link>
  )
}

// 1. The same grid, with illustrations that play: lines type in, the phone scrolls, devices light up, bars grow
function AnimatedBento() {
  const on = useEntered()
  const phoneRef = useRef(null)
  useEffect(() => {
    if (reducedMotion()) return
    const a = phoneRef.current.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-45%)' }], {
      duration: 3500,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: 600,
    })
    return () => a.cancel()
  }, [])
  const grow = (w, i) => ({ width: on ? w : '0%', transitionDelay: `${200 + i * 250}ms`, transitionDuration: '700ms' })

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SpotlightCard className="md:col-span-2">
        <CardTop s={services[0]} />
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-bg" aria-hidden="true">
          <div className="flex gap-1.5 border-b border-line px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="space-y-2 p-4">
            <div className={`h-3 rounded bg-linear-to-r from-brand to-violet ${fx}`} style={grow('33%', 0)} />
            <div className={`h-2 rounded bg-elevated ${fx}`} style={grow('66%', 1)} />
            <div className={`h-2 rounded bg-elevated ${fx}`} style={grow('50%', 2)} />
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={`h-12 rounded bg-elevated ${fx} duration-500 ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                  style={{ transitionDelay: `${1000 + n * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard className="md:row-span-2">
        <CardTop s={services[1]} />
        <div className="mx-auto mt-8 w-36 rounded-[1.75rem] border-4 border-elevated bg-bg p-3" aria-hidden="true">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-elevated" />
          <div className="h-52 overflow-hidden">
            <div ref={phoneRef}>
              <div className="h-20 rounded-lg bg-linear-to-br from-brand to-violet" />
              <div className="mt-3 space-y-2">
                <div className="h-2 rounded bg-elevated" />
                <div className="h-2 w-2/3 rounded bg-elevated" />
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className={`h-8 rounded-lg ${n === 2 ? 'bg-violet/40' : 'bg-elevated'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard>
        <CardTop s={services[2]} />
        <div className="mt-6" aria-hidden="true">
          <div className={`${fx} duration-700 ${on ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`} style={{ transitionDelay: '400ms' }}>
            <DevicesPreview />
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard>
        <CardTop s={services[3]} />
        <div className="mt-6 flex h-12 items-end gap-1" aria-hidden="true">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm bg-linear-to-t from-brand/40 to-violet-bright/80 ${fx} duration-500`}
              style={{ height: on ? `${h}%` : '0%', transitionDelay: `${300 + i * 70}ms` }}
            />
          ))}
        </div>
      </SpotlightCard>
    </div>
  )
}

// 2. Hover a card and a "what's included" checklist slides up (always shown on touch screens)
function IncludesCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <SpotlightCard key={s.title}>
          <CardTop s={s} />
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
            <ul className="space-y-2 overflow-hidden">
              <li className="mt-5 border-t border-line pt-4 text-xs font-semibold tracking-widest text-violet-bright uppercase">What’s included</li>
              {s.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 shrink-0 text-violet-bright" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>
      ))}
    </div>
  )
}

// 3. A timeline and starting-price tag on each card
function PriceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <SpotlightCard key={s.title}>
          <CardTop s={s} />
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-badge px-3 py-1 text-xs text-brand-bright">
              <Clock className="size-3.5" /> {s.time}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 px-3 py-1 text-xs text-violet-bright">
              <Tag className="size-3.5" /> {s.price}
            </span>
          </div>
        </SpotlightCard>
      ))}
    </div>
  )
}

// 4. Each card ends with a link to matching work
function LinkedCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <SpotlightCard key={s.title}>
          <CardTop s={s} />
          <Link to={s.link[1]} className="group/link mt-5 inline-flex items-center gap-1.5 font-medium text-violet-bright">
            {s.link[0]} <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </SpotlightCard>
      ))}
    </div>
  )
}

// 5. Four more services, so the section shows more range
function MoreServices() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...services, ...extraServices].map((s) => (
        <SpotlightCard key={s.title}>
          <IconBox icon={s.icon} small />
          <h3 className="mt-4 font-semibold">{s.title}</h3>
          <p className="mt-1.5 text-sm text-fg-muted">{s.text}</p>
        </SpotlightCard>
      ))}
    </div>
  )
}

// 6. Four steps under the cards, joined by a line that fills in as each one lights up
function HowItWorks() {
  const on = useEntered()
  return (
    <div className="relative grid gap-8 sm:grid-cols-4">
      <div aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-line sm:block">
        <div className={`h-full bg-linear-to-r from-brand via-violet to-pink-500 ${fx} duration-[1800ms]`} style={{ width: on ? '100%' : '0%', transitionDelay: '200ms' }} />
      </div>
      {steps.map((s, i) => (
        <div key={s.title} className="relative text-center">
          <span
            className={`mx-auto flex size-12 items-center justify-center rounded-full border transition-all duration-500 motion-reduce:transition-none ${
              on ? 'border-transparent bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/40' : 'border-line bg-bg text-fg-subtle'
            }`}
            style={{ transitionDelay: `${200 + i * 550}ms` }}
          >
            <s.icon className="size-5" />
          </span>
          <div className="mt-4 text-xs font-semibold tracking-widest text-violet-bright uppercase">Step {i + 1}</div>
          <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
        </div>
      ))}
    </div>
  )
}

// 7. A slow-scrolling row of the tools you build with
function ToolMarquee() {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 motion-reduce:animate-none" style={{ animationDuration: '30s' }}>
        {[...tools, ...tools].map((t, n) => (
          <span key={n} className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-px">
            <span className="block rounded-full bg-bg px-5 py-2 text-sm font-medium whitespace-nowrap">{t}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// 8. A closing nudge under the cards
function ClosingCta() {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto h-40 w-96 max-w-full rounded-full bg-violet/25 blur-3xl" />
      <h3 className="text-3xl font-bold">
        Not sure what you <GradientText>need</GradientText>?
      </h3>
      <p className="mx-auto mt-3 max-w-md text-fg-muted">Tell us about your idea and we’ll point you the right way. No pressure, no jargon.</p>
      <div className="mt-7">
        <ShimmerButton to="/contact">Let’s talk</ShimmerButton>
      </div>
    </div>
  )
}

// 9. Service names on the left; a big panel on the right switches as you hover or click
function ServiceTabs() {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
      <div className="flex flex-col gap-2" role="tablist" aria-label="Services">
        {services.map((t, i) => (
          <button
            key={t.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left font-medium transition ${
              i === active ? 'border-violet/60 bg-surface shadow-lg shadow-violet/20' : 'border-line text-fg-muted hover:text-fg'
            }`}
          >
            <IconBox icon={t.icon} small />
            {t.title}
          </button>
        ))}
      </div>
      <SpotlightCard>
        <div key={s.title} className="grid animate-line-in gap-6 sm:grid-cols-2 sm:p-2">
          <div>
            <CardTop s={s} />
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-badge px-3 py-1 text-xs text-brand-bright">
                <Clock className="size-3.5" /> {s.time}
              </span>
            </div>
            <Link to={s.link[1]} className="group/link mt-6 inline-flex items-center gap-1.5 font-medium text-violet-bright">
              {s.link[0]} <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
          <ul className="space-y-3 rounded-xl border border-line bg-bg p-5">
            <li className="text-xs font-semibold tracking-widest text-violet-bright uppercase">What’s included</li>
            {s.includes.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-violet-bright" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </div>
  )
}

// 10. The cards slide and fade in one after another
function RevealBento() {
  const on = useEntered()
  const card = (i, span = '') =>
    `${span} ${fx} duration-700 ${on ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`
  const delay = (i) => ({ transitionDelay: `${i * 150}ms` })
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((s, i) => (
        <div key={s.title} className={card(i, ['md:col-span-2', 'md:row-span-2', '', ''][i])} style={delay(i)}>
          <SpotlightCard className="h-full">
            <CardTop s={s} />
          </SpotlightCard>
        </div>
      ))}
    </div>
  )
}

const ideas = [
  { title: 'What’s there now', description: 'Your current Services cards (now with idea 1), for comparison.', Component: BentoServices },
  { title: 'Animated illustrations', description: 'Same grid, but the mini pictures play: lines type in, the phone scrolls, the devices fade in, the bars grow.', Component: AnimatedBento, tag: 'Current' },
  { title: '“What’s included” on hover', description: 'Point at a card and a short checklist slides up. On phones it’s always shown.', Component: IncludesCards },
  { title: 'Timelines & starting prices', description: 'Small tags on each card. The numbers are placeholders for yours.', Component: PriceCards },
  { title: 'Link to real work', description: 'Each card ends with a link. “See our websites” opens Projects already filtered to Websites.', Component: LinkedCards },
  { title: 'More services', description: 'SEO & Speed, Hosting & Domains, Online Stores and Logo & Branding join the four you have.', Component: MoreServices },
  { title: '“How it works” strip', description: 'Talk → Design → Build → Launch, joined by a glowing line that fills in step by step.', Component: HowItWorks },
  { title: 'Tool marquee', description: 'A slow-scrolling row of the tools you use. Swap in your real list.', Component: ToolMarquee },
  { title: 'Closing call-to-action', description: '“Not sure what you need?” with the shimmer button, under the cards.', Component: ClosingCta },
  { title: 'Tabs', description: 'Service names on the left; hover or click one and the big panel on the right switches.', Component: ServiceTabs },
  { title: 'Cards reveal on scroll', description: 'The cards slide and fade in one after another, like the Projects page.', Component: RevealBento },
]

function Idea({ n, title, description, Component, tag }) {
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
      { threshold: 0.3 },
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
            <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
              {title}
              {tag && <span className="rounded-full bg-elevated px-2.5 py-0.5 text-xs font-normal text-fg-muted">{tag}</span>}
            </h2>
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
      <div ref={boxRef} className="rounded-2xl border border-line p-4 sm:p-6">
        <Component key={run} />
      </div>
    </section>
  )
}

export default function ServicesIdeas() {
  return (
    <div className="space-y-20 py-16">
      <DotGrid />
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Our Services ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          {ideas.length - 1} ways to give the Services section on the{' '}
          <Link to="/" className="text-brand-bright underline">
            Home page
          </Link>{' '}
          more. Each one plays when it scrolls into view; press Replay to see it again.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {ideas.map(({ title }, i) => (
            <a key={title} href={`#idea-${i}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-brand-bright/60">
              {i}. {title}
            </a>
          ))}
        </nav>
      </header>
      {ideas.map((idea, i) => (
        <Idea key={idea.title} n={i} {...idea} />
      ))}
    </div>
  )
}
