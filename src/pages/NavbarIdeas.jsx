import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Menu, Moon, Phone, X } from 'lucide-react'
import { contactPhone, contactPhoneLink, navLinks } from '../data/siteData'

// Preview page for navbar (menu bar) designs. Not linked in the nav: visit /navbar-ideas. Footers are on /footer-ideas.
// The previews are pictures of each design: links inside them don't go anywhere, except the phone number.

const INF = 'M32 32c-5-7-9-11-15-11a11 11 0 1 0 0 22c6 0 10-4 15-11s9-11 15-11a11 11 0 1 1 0 22c-6 0-10-4-15-11Z'
const gradientText = 'bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent'
const month = new Date().toLocaleString('en-US', { month: 'long' })

function InfinityMark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nf-inf" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d={INF} stroke="url(#nf-inf)" strokeWidth="6.5" strokeLinecap="round" />
    </svg>
  )
}

function Brand({ small = false }) {
  return (
    <span className="flex items-center gap-2">
      <InfinityMark className={small ? 'size-7' : 'size-9'} />
      <span className={`font-semibold ${small ? 'text-base' : 'text-lg'}`}>DevOps Studio</span>
    </span>
  )
}

function Preview({ id, number, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {number}
        </span>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-1 text-fg-muted">{description}</p>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg">{children}</div>
    </section>
  )
}

// Fake page content under each navbar so you can judge it in context.
function PageBehind() {
  return (
    <div className="space-y-3 px-6 pt-8 pb-10 opacity-30">
      <div className="h-8 w-1/2 rounded bg-elevated" />
      <div className="h-3 w-2/3 rounded bg-elevated" />
      <div className="h-3 w-1/2 rounded bg-elevated" />
    </div>
  )
}

const ThemeButton = () => (
  <span className="flex size-9 items-center justify-center rounded-lg border border-line">
    <Moon className="size-4" />
  </span>
)

// ---------- Navbars ----------

function FloatingPill() {
  return (
    <div className="bg-linear-to-b from-tint-blue to-bg pt-4">
      <div className="mx-4 flex items-center justify-between rounded-full border border-white/10 bg-surface/70 py-2 pr-2 pl-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:mx-auto sm:max-w-4xl">
        <Brand small />
        <ul className="hidden items-center gap-1 text-sm lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.to} className={`rounded-full px-4 py-1.5 ${i === 0 ? 'bg-elevated text-fg' : 'text-fg-muted'}`}>
              {l.label}
            </li>
          ))}
        </ul>
        <span className="rounded-full bg-linear-to-r from-brand to-violet px-4 py-2 text-sm font-medium text-white">Start a project</span>
      </div>
      <PageBehind />
    </div>
  )
}

function UnderlineCta() {
  return (
    <div>
      <div className="flex h-16 items-center justify-between border-b border-line px-6">
        <Brand />
        <ul className="hidden items-center gap-8 text-sm lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.to} className={`relative py-5 ${i === 0 ? 'text-fg' : 'text-fg-muted'}`}>
              {l.label}
              {i === 0 && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-linear-to-r from-brand-bright via-violet-bright to-pink-400" />}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeButton />
          <span className="hidden items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-4 py-2 text-sm font-medium text-white sm:inline-flex">
            Book a free call <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
      <PageBehind />
    </div>
  )
}

function AnnouncementBar() {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 bg-linear-to-r from-brand via-violet to-pink-500 px-4 py-2 text-center text-sm text-white">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-white/80 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>
        Now booking projects for {month}.
        <span className="font-semibold underline underline-offset-2">Book a free call →</span>
      </div>
      <div className="flex h-14 items-center justify-between border-b border-line px-6">
        <Brand small />
        <ul className="hidden items-center gap-8 text-sm lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.to} className={i === 0 ? 'text-brand-bright' : 'text-fg-muted'}>
              {l.label}
            </li>
          ))}
        </ul>
        <ThemeButton />
      </div>
      <PageBehind />
    </div>
  )
}

function SplitCenter() {
  const half = Math.ceil(navLinks.length / 2)
  return (
    <div>
      <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center border-b border-line px-6 text-sm">
        <ul className="hidden gap-8 lg:flex">
          {navLinks.slice(0, half).map((l, i) => (
            <li key={l.to} className={i === 0 ? 'text-fg' : 'text-fg-muted'}>
              {l.label}
            </li>
          ))}
        </ul>
        <span className="flex flex-col items-center">
          <InfinityMark className="size-10" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase">DevOps Studio</span>
        </span>
        <ul className="hidden justify-end gap-8 lg:flex">
          {navLinks.slice(half).map((l) => (
            <li key={l.to} className="text-fg-muted">
              {l.label}
            </li>
          ))}
        </ul>
      </div>
      <PageBehind />
    </div>
  )
}

function SlidingPill() {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="flex h-16 items-center justify-between border-b border-line px-6">
        <Brand />
        <ul className="relative hidden rounded-full bg-surface p-1 text-sm ring-1 ring-line lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.to}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                  i === active ? 'bg-linear-to-r from-brand to-violet text-white shadow-lg shadow-violet/30' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <ThemeButton />
      </div>
      <p className="px-6 pt-4 text-sm text-fg-subtle">Try it: click the links. Matches the new Projects filter.</p>
      <PageBehind />
    </div>
  )
}

function MobileOverlay() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex justify-center bg-surface p-8">
      <div className="relative h-[560px] w-72 overflow-hidden rounded-[2.5rem] border-8 border-elevated bg-bg">
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          <Brand small />
          <button type="button" onClick={() => setOpen(!open)} aria-label="Toggle preview menu" className="flex size-9 items-center justify-center">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <PageBehind />
        <div
          className={`absolute inset-x-0 top-14 bottom-0 flex flex-col bg-linear-to-br from-tint-blue via-bg to-tint-purple p-6 transition-all duration-300 ${
            open ? 'opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
          }`}
        >
          <ul className="space-y-4">
            {navLinks.map((l, i) => (
              <li key={l.to} className={`text-3xl font-bold ${i === 0 ? gradientText : ''}`}>
                {l.label}
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3">
            <span className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-violet py-3 font-medium text-white">
              <Calendar className="size-4" /> Book a free call
            </span>
            <a href={contactPhoneLink} className="flex items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm">
              <Phone className="size-4" /> {contactPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const navIdeas = [
  { title: 'Floating pill', description: 'The bar floats off the top edge as a rounded, see-through pill, with a "Start a project" button.', Component: FloatingPill },
  { title: 'Gradient underline + button', description: 'Your current layout, plus a gradient line under the page you are on and a "Book a free call" button.', Component: UnderlineCta },
  { title: 'Announcement bar', description: 'A thin gradient strip above the menu with a live "booking now" message. The month updates itself.', Component: AnnouncementBar },
  { title: 'Centered logo', description: 'Logo in the middle with links on both sides. Feels like a design studio.', Component: SplitCenter },
  { title: 'Sliding pill links', description: 'The current page gets a gradient pill, like the new Projects filter.', Component: SlidingPill },
  { title: 'Full-screen phone menu', description: 'On phones, the menu opens as a full screen with big links and a call button. Tap the X to close it.', Component: MobileOverlay },
]

export default function NavbarIdeas() {
  // Numbers run on from one group to the next, so `start` is how many ideas came before.
  const group = (heading, ideas, prefix, start) => (
    <div className="space-y-16">
      <h2 className={`border-b border-line pb-3 text-3xl font-bold ${gradientText}`}>{heading}</h2>
      {ideas.map(({ title, description, Component }, i) => (
        <Preview key={title} id={`${prefix}-${start + i + 1}`} number={start + i + 1} title={title} description={description}>
          <Component />
        </Preview>
      ))}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-bold">Navbar ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          {navIdeas.length} menu bars using your Infinity Loop logo. Your current menu bar is at the top of this page to
          compare. Footer designs are on the{' '}
          <Link to="/footer-ideas" className="text-brand-bright underline">
            footer ideas page
          </Link>
          .
        </p>
      </header>
      {group('Navbar (menu bar)', navIdeas, 'nav', 0)}
    </div>
  )
}
