import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail, MessageSquare, Send } from 'lucide-react'
import AvailabilityCta from '../components/AvailabilityCta'
import { team } from '../data/siteData'

// Preview page for the "Let's Work Together" box at the bottom of the Portfolio page.
// Not linked in the nav: visit /cta-ideas. All ideas use the current words.

const blurb =
  "We're always excited to take on new challenges and collaborate with passionate clients. Get in touch to discuss your project."
const email = team[0]?.links.email ?? 'mailto:devopsstudio26@gmail.com'
const emailText = email.replace('mailto:', '')

const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const inner = 'rounded-[calc(1.5rem-1px)]'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'
const gradientButton =
  'inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-8 py-3.5 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50'

// Dark grid panel with the gradient outline, like the rest of the Portfolio and About pages
function DarkPanel({ className = '', glow = 'top', children }) {
  const glowPos = { top: '-top-32 left-1/2 -translate-x-1/2', left: '-top-20 -left-20', center: 'inset-0 m-auto' }[glow]
  return (
    <div className={outline}>
      <div className={`theme-dark relative isolate overflow-hidden bg-[#07070d] ${inner} ${className}`}>
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
        <div aria-hidden="true" className={`absolute -z-10 size-96 rounded-full bg-violet/30 blur-3xl ${glowPos}`} />
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

/* 1. What's there now */
function Current() {
  return (
    <section className="rounded-lg bg-linear-to-br from-tint-blue to-tint-purple px-6 py-12 text-center">
      <h2 className="text-3xl font-bold">Let's Work Together</h2>
      <p className="mx-auto mt-4 max-w-2xl">{blurb}</p>
      <Link to="/contact" className="mt-6 inline-block rounded-lg bg-brand px-8 py-3 text-white transition-colors hover:bg-brand-hover">
        Start a Conversation
      </Link>
    </section>
  )
}

/* 2. Dark grid panel, centered */
function DarkCentered() {
  return (
    <DarkPanel className="px-6 py-16 text-center sm:px-12">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Let's <span className="font-serif font-normal italic text-violet-bright">Work Together</span>
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-fg-muted">{blurb}</p>
      <Link to="/contact" className={`mt-8 ${gradientButton}`}>
        Start a Conversation <ArrowRight className="size-4" />
      </Link>
    </DarkPanel>
  )
}

/* 3. Text on the left, button and email on the right */
function DarkSplit() {
  return (
    <DarkPanel className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[3fr_2fr]" glow="left">
      <div>
        <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">Have a project in mind?</div>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">Let's Work Together</h2>
        <p className="mt-4 text-lg text-fg-muted">{blurb}</p>
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        <Link to="/contact" className={`justify-center ${gradientButton}`}>
          Start a Conversation <ArrowRight className="size-4" />
        </Link>
        <a href={email} className="inline-flex items-center justify-center gap-2 text-sm text-fg-muted hover:text-fg">
          <Mail className="size-4" /> or email {emailText}
        </a>
      </div>
    </DarkPanel>
  )
}

/* 4. With both of your photos: "talk to the people who build it" */
function WithFounders() {
  return (
    <DarkPanel className="px-6 py-14 text-center sm:px-12">
      <div className="flex justify-center -space-x-4">
        {team.slice(0, 2).map((p) => (
          <div key={p.name} className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-0.5">
            <Avatar person={p} className="size-20 rounded-full border-4 border-[#07070d]" />
          </div>
        ))}
      </div>
      <h2 className="mt-6 text-4xl font-bold tracking-tight">Let's Work Together</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">{blurb}</p>
      <p className="mt-2 text-sm text-violet-bright">You'll talk directly with {team.map((p) => p.name.split(' ')[0]).join(' & ')}.</p>
      <Link to="/contact" className={`mt-8 ${gradientButton}`}>
        Start a Conversation <ArrowRight className="size-4" />
      </Link>
    </DarkPanel>
  )
}

/* 5. Solid brand gradient with grid lines and a white button */
function GradientFill() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 px-6 py-16 text-center text-white sm:px-12">
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]`} />
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Let's Work Together</h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{blurb}</p>
      <Link
        to="/contact"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-black transition hover:scale-105"
      >
        Start a Conversation <ArrowRight className="size-4" />
      </Link>
    </section>
  )
}

/* 6. A glow that follows the mouse */
function Spotlight() {
  const ref = useRef(null)
  const move = (e) => {
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - box.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - box.top}px`)
  }
  return (
    <div className={outline}>
      <section
        ref={ref}
        onMouseMove={move}
        className={`theme-dark relative isolate overflow-hidden bg-[#07070d] px-6 py-16 text-center [--x:50%] [--y:0%] sm:px-12 ${inner}`}
      >
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} opacity-60`} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(450px circle at var(--x) var(--y), rgba(124,58,237,0.4), transparent 60%)' }}
        />
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Let's Work Together</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-fg-muted">{blurb}</p>
        <Link to="/contact" className={`mt-8 ${gradientButton}`}>
          Start a Conversation <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  )
}

/* 7. Same box as the bottom of the home page */
function SameAsHome() {
  return <AvailabilityCta />
}

/* 8. No box: huge words between thin lines */
function BigWords() {
  return (
    <section className="border-y border-line py-16 text-center">
      <p className="text-fg-muted">{blurb}</p>
      <Link to="/contact" className="group mt-6 inline-flex items-center gap-4 text-5xl font-bold tracking-tight sm:text-7xl">
        Let's <span className="font-serif font-normal italic text-violet-bright">talk</span>
        <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white transition-transform group-hover:rotate-45 sm:size-20">
          <ArrowUpRight className="size-7 sm:size-9" />
        </span>
      </Link>
    </section>
  )
}

/* 9. Pick how to get in touch */
function ContactOptions() {
  const options = [
    { icon: Send, title: 'Start a project', text: 'Tell us what you need on the contact form.', to: '/contact' },
    { icon: Mail, title: 'Email us', text: emailText, href: email },
    { icon: MessageSquare, title: 'Just a question?', text: 'Ask anything, no project needed.', to: '/contact' },
  ]
  return (
    <DarkPanel className="p-8 sm:p-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Let's Work Together</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">{blurb}</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {options.map(({ icon: Icon, title, text, to, href }) => {
          const body = (
            <>
              <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white">
                <Icon className="size-5" />
              </span>
              <span className="mt-4 flex items-center gap-1.5 font-semibold">
                {title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block text-sm text-fg-muted">{text}</span>
            </>
          )
          const cls = 'group block rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-colors hover:border-violet-bright/50'
          return to ? (
            <Link key={title} to={to} className={cls}>
              {body}
            </Link>
          ) : (
            <a key={title} href={href} className={cls}>
              {body}
            </a>
          )
        })}
      </div>
    </DarkPanel>
  )
}

const ideas = [
  ["What's there now", 'The current box, for comparison.', Current],
  ['Dark Panel', 'Dark grid panel with the gradient outline, "Work Together" in italic purple, and a gradient button.', DarkCentered],
  ['Split', 'Text on the left; the button and your email address on the right.', DarkSplit],
  ['With the Founders', "Your and Blair's photos up top, and a line saying they'll talk directly with you.", WithFounders],
  ['Gradient Fill', 'A bold blue-purple-pink box with grid lines and a white button.', GradientFill],
  ['Spotlight', 'A dark panel where a purple glow follows your mouse.', Spotlight],
  ['Same as Home', 'The availability box from the bottom of your home page, with next month in the badge.', SameAsHome],
  ['Big Words', 'No box: a huge "Let’s talk" with a round arrow button that spins on hover.', BigWords],
  ['Contact Options', 'Three ways to reach you: start a project, email, or just ask a question.', ContactOptions],
]

export default function CtaIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">"Let's Work Together" Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">
            9 looks for the box at the bottom of the Portfolio page. Try light mode too (sun button in the navbar).
          </p>
        </header>

        {ideas.map(([title, description, Box], i) => (
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
            <Box />
          </section>
        ))}
      </div>
    </div>
  )
}
