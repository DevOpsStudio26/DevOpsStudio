import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp, ArrowUpRight, Clock, Mail, Phone } from 'lucide-react'
import Logo from '../components/Logo'
import { contactEmail, contactPhone, contactPhoneLink, navLinks } from '../data/siteData'

// Preview page for the site footer. Not linked in the nav: visit /footer-ideas.
// Each idea is a full footer; the real one is still at the bottom of this page for comparison.

const tagline = 'Building exceptional websites and apps for clients and companies.'
const hours = 'Mon-Fri, 9 AM - 5 PM CT'
const year = new Date().getFullYear()
const accent = 'font-serif font-normal italic text-violet-bright'
const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'
const gradientButton =
  'inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50'
const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('en-US', { month: 'long' })

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

function Links({ className = 'space-y-2' }) {
  return (
    <ul className={`text-sm ${className}`}>
      {navLinks.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="text-fg-muted transition-colors hover:text-fg">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function ContactList() {
  const rows = [
    [Mail, contactEmail, `mailto:${contactEmail}`],
    [Phone, contactPhone, contactPhoneLink],
    [Clock, hours, null],
  ]
  return (
    <ul className="space-y-3 text-sm">
      {rows.map(([Icon, text, href]) => (
        <li key={text} className="flex items-center gap-3 text-fg-muted">
          <Icon className="size-4 shrink-0 text-violet-bright" />
          {href ? (
            <a href={href} className="break-all transition-colors hover:text-fg">
              {text}
            </a>
          ) : (
            text
          )}
        </li>
      ))}
    </ul>
  )
}

function Copyright({ className = '' }) {
  return <p className={`text-sm text-fg-subtle ${className}`}>© {year} DevOps Studio. All rights reserved.</p>
}

/* 1. What's there now */
function Current() {
  return (
    <footer className="border-t border-line bg-bg px-6">
      <div className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo small />
          <p className="mt-4 max-w-sm text-sm text-fg-muted">{tagline}</p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <Links />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>
          <p className="mb-4 text-sm text-fg-muted">Ready to start your project?</p>
          <Link to="/contact" className="inline-block rounded-sm bg-brand px-4 py-2 text-sm text-white transition-colors hover:bg-brand-hover">
            Get in Touch
          </Link>
        </div>
      </div>
      <div className="border-t border-line py-8 text-center">
        <Copyright />
      </div>
    </footer>
  )
}

/* 2. Dark grid footer with a gradient line on top and your contact details */
function DarkGrid() {
  return (
    <footer className="theme-dark relative isolate overflow-hidden bg-[#07070d] px-6">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-brand via-violet to-pink-500" />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]`} />
      <div aria-hidden="true" className="absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />
      <div className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo small />
          <p className="mt-4 max-w-sm text-sm text-fg-muted">{tagline}</p>
          <Link to="/contact" className={`mt-6 ${gradientButton}`}>
            Start a project <ArrowRight className="size-4" />
          </Link>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Pages</h3>
          <Links />
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ContactList />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <Copyright />
        <button type="button" onClick={toTop} className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
          Back to top <ArrowUp className="size-4" />
        </button>
      </div>
    </footer>
  )
}

/* 3. A big call to action on top, then a compact row of links */
function BigCta() {
  return (
    <footer className="border-t border-line px-6">
      <div className="relative isolate py-20 text-center">
        <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-violet/20 blur-3xl" />
        <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Let's build something <span className={accent}>together</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">{tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className={gradientButton}>
            Start a project <ArrowRight className="size-4" />
          </Link>
          <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 transition-colors hover:border-violet-bright/60">
            <Mail className="size-4" /> {contactEmail}
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 border-t border-line py-8 md:flex-row">
        <Logo small />
        <Links className="flex flex-wrap justify-center gap-6" />
        <Copyright />
      </div>
    </footer>
  )
}

/* 4. A huge outlined name across the bottom */
function GiantName() {
  return (
    <footer className="overflow-hidden border-t border-line px-6">
      <div className="grid gap-10 pt-14 md:grid-cols-3">
        <div>
          <p className="max-w-xs text-fg-muted">{tagline}</p>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 font-medium text-violet-bright hover:underline">
            Start a project <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <Links />
        <ContactList />
      </div>
      <div
        aria-hidden="true"
        className="mt-10 -mb-[0.18em] text-center text-[clamp(3rem,13vw,11rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-fg-subtle)]"
      >
        DEVOPS STUDIO
      </div>
      <div className="border-t border-line py-6 text-center">
        <Copyright />
      </div>
    </footer>
  )
}

/* 5. One clean line */
function Minimal() {
  return (
    <footer className="px-6">
      <div aria-hidden="true" className="h-px bg-linear-to-r from-transparent via-violet to-transparent" />
      <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <Logo small />
        <Links className="flex flex-wrap justify-center gap-6" />
        <Copyright />
      </div>
    </footer>
  )
}

/* 6. Availability badge and a back-to-top button */
function Availability() {
  return (
    <footer className="border-t border-line px-6">
      <div className="flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Booking projects for {nextMonth}
          </span>
          <h2 className="mt-4 text-3xl font-bold">
            Have a project in <span className={accent}>mind?</span>
          </h2>
          <a href={`mailto:${contactEmail}`} className="mt-2 inline-block text-fg-muted hover:text-fg">
            {contactEmail}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/contact" className={gradientButton}>
            Get in touch <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="flex size-12 items-center justify-center rounded-full border border-line transition-colors hover:border-violet-bright/60"
          >
            <ArrowUp className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
        <Logo small />
        <Links className="flex flex-wrap justify-center gap-6" />
        <Copyright />
      </div>
    </footer>
  )
}

/* 7. A floating panel, like the cards on the About page */
function FloatingPanel() {
  return (
    <footer className="px-0 pb-6 sm:px-6">
      <div className={outline}>
        <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] px-8 sm:px-12">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
          <div aria-hidden="true" className="absolute -top-20 -left-20 -z-10 size-72 rounded-full bg-violet/30 blur-3xl" />
          <div className="grid gap-10 py-12 md:grid-cols-3">
            <div>
              <Logo small />
              <p className="mt-4 max-w-sm text-sm text-fg-muted">{tagline}</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Pages</h3>
              <Links />
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ContactList />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
            <Copyright />
            <button type="button" onClick={toTop} className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
              Back to top <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

const ideas = [
  ["What's there now", 'The current footer, for comparison.', Current],
  ['Dark Grid', 'A dark grid footer with a gradient line along the top, your email, phone and hours, and back-to-top.', DarkGrid],
  ['Big Call to Action', "A huge “Let's build something together.” with buttons, then a slim row of links.", BigCta],
  ['Giant Name', 'Links and contact details above a huge outlined "DEVOPS STUDIO" across the bottom.', GiantName],
  ['Minimal', 'One clean line: logo, links, copyright, under a thin gradient line.', Minimal],
  ['Availability', 'A live "Booking projects for next month" badge, your email, and a back-to-top button.', Availability],
  ['Floating Panel', 'The footer as a dark outlined panel floating off the page edges, like your About page cards.', FloatingPanel],
]

export default function FooterIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">Footer Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">
            7 footers for the bottom of every page, using your real links, email, phone and hours.
          </p>
        </header>

        {ideas.map(([title, description, Footer], i) => (
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
              <Footer />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
