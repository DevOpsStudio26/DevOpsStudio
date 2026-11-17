import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Clock,
  Globe,
  Mail,
  MapPin,
  Palette,
  Phone,
  Send,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { team } from '../data/siteData'

// Preview page for the Contact page. Not linked in the nav: visit /contact-ideas.
// Forms here only show a "sent" message; nothing is actually sent.

const info = [
  { icon: Mail, label: 'Email', value: 'devopsstudio26@gmail.com' },
  { icon: Phone, label: 'Phone', value: '(228) 363-3068' },
  { icon: MapPin, label: 'Location', value: 'Remote - Serving clients everywhere' },
  { icon: Clock, label: 'Working Hours', value: 'Mon-Fri: 9:00 AM - 5:00 PM CT' },
]
const projectTypes = [
  { label: 'Website', icon: Globe },
  { label: 'App', icon: Smartphone },
  { label: 'UI/UX Design', icon: Palette },
  { label: 'Something else', icon: Sparkles },
]
const budgets = ['Under $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+']

const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const inner = 'rounded-[calc(1.5rem-1px)]'
const accent = 'font-serif font-normal italic text-violet-bright'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'
const gradientButton =
  'flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-violet py-4 text-lg font-semibold text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50'
const darkInput =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-violet-bright focus:outline-none focus:ring-2 focus:ring-violet-bright/30'

function DarkPanel({ className = '', glow = '-top-20 -left-20', children }) {
  return (
    <div className={outline}>
      <div className={`theme-dark relative isolate h-full overflow-hidden bg-[#07070d] ${inner} ${className}`}>
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]`} />
        <div aria-hidden="true" className={`absolute -z-10 size-72 rounded-full bg-violet/30 blur-3xl ${glow}`} />
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  )
}

function SentNote() {
  return (
    <p className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-3 text-emerald-400" role="status">
      <CircleCheck className="size-5" /> Thanks! Your message has been received. (Preview only, nothing was sent.)
    </p>
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

function useFakeSend() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  return [sent, onSubmit]
}

/* 1. Same layout as now, in the About/Portfolio style */
function Matched() {
  const [sent, onSubmit] = useFakeSend()
  return (
    <>
      <header className="relative isolate overflow-hidden py-14 text-center">
        <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-64 rounded-full bg-violet/25 blur-3xl" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(5rem,18vw,13rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
        >
          HELLO
        </span>
        <h1 className="text-6xl font-bold tracking-tight">
          Get In <span className={accent}>Touch</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">
          Ready to start your project? Fill out the form and we'll get back to you within 24 hours.
        </p>
      </header>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DarkPanel className="p-6 sm:p-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name *">
                  <input required placeholder="John Doe" className={darkInput} />
                </Field>
                <Field label="Email *">
                  <input required type="email" placeholder="john@example.com" className={darkInput} />
                </Field>
                <Field label="Project Type">
                  <select className={darkInput}>
                    {projectTypes.map((t) => (
                      <option key={t.label}>{t.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget Range">
                  <select className={darkInput}>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Message *">
                <textarea required rows={6} placeholder="Tell us about your project..." className={darkInput} />
              </Field>
              {sent && <SentNote />}
              <button type="submit" className={gradientButton}>
                <Send className="size-5" /> Send Message
              </button>
            </form>
          </DarkPanel>
        </div>
        <div className="space-y-6">
          <DarkPanel className="p-7" glow="-top-20 -right-20">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <ul className="mt-6 space-y-5">
              {info.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className="text-sm text-fg-muted">{value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </DarkPanel>
          <DarkPanel className="p-7" glow="-bottom-20 -left-20">
            <h2 className="text-2xl font-semibold">Quick Response</h2>
            <p className="mt-3 text-fg-muted">We typically respond to all inquiries within 24 hours during business days.</p>
          </DarkPanel>
        </div>
      </div>
    </>
  )
}

/* 2. A dark panel on the left with who you'll talk to; the form on the right */
function PeopleSplit() {
  const [sent, onSubmit] = useFakeSend()
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <DarkPanel className="flex flex-col p-8 sm:p-10">
        <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">Contact</div>
        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Let's <span className={accent}>talk</span>
        </h1>
        <p className="mt-4 text-lg text-fg-muted">Tell us what you're building. You'll hear back from one of us within 24 hours.</p>
        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-3">
            {team.slice(0, 2).map((p) => (
              <div key={p.name} className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-0.5">
                <Avatar person={p} className="size-14 rounded-full border-2 border-[#07070d]" />
              </div>
            ))}
          </div>
          <div className="text-sm">
            <div className="font-semibold">{team.map((p) => p.name.split(' ')[0]).join(' & ')}</div>
            <div className="text-fg-muted">The people who'll build your project</div>
          </div>
        </div>
        <ul className="mt-auto space-y-3 pt-10 text-sm">
          {info.map(({ icon: Icon, value }) => (
            <li key={value} className="flex items-center gap-3 text-fg-muted">
              <Icon className="size-4 text-violet-bright" /> {value}
            </li>
          ))}
        </ul>
      </DarkPanel>
      <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-line bg-surface p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name *">
            <input required placeholder="John Doe" className={darkInput} />
          </Field>
          <Field label="Email *">
            <input required type="email" placeholder="john@example.com" className={darkInput} />
          </Field>
        </div>
        <Field label="What do you need?">
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((t) => (
              <label key={t.label} className="cursor-pointer">
                <input type="radio" name="type2" className="peer sr-only" />
                <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors peer-checked:border-transparent peer-checked:bg-linear-to-r peer-checked:from-brand peer-checked:to-violet peer-checked:text-white">
                  <t.icon className="size-4" /> {t.label}
                </span>
              </label>
            ))}
          </div>
        </Field>
        <Field label="Message *">
          <textarea required rows={6} placeholder="Tell us about your project..." className={darkInput} />
        </Field>
        {sent && <SentNote />}
        <button type="submit" className={gradientButton}>
          <Send className="size-5" /> Send Message
        </button>
      </form>
    </div>
  )
}

/* 3. A short step-by-step form */
function Steps() {
  const [step, setStep] = useState(0)
  const [type, setType] = useState(null)
  const [budget, setBudget] = useState(null)
  const [sent, onSubmit] = useFakeSend()
  const titles = ['What do you need?', "What's your budget?", 'How can we reach you?']
  return (
    <DarkPanel className="mx-auto max-w-3xl p-8 sm:p-12" glow="-top-24 left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-between text-sm text-fg-muted">
        <span>
          Step {step + 1} of {titles.length}
        </span>
        {step > 0 && !sent && (
          <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-1 hover:text-fg">
            <ArrowLeft className="size-4" /> Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-linear-to-r from-brand to-violet transition-[width] duration-500" style={{ width: `${((step + 1) / titles.length) * 100}%` }} />
      </div>
      <h2 key={step} className="mt-8 text-3xl font-bold animate-line-in">
        {titles[step]}
      </h2>

      {step === 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 animate-line-in">
          {projectTypes.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => {
                setType(t.label)
                setStep(1)
              }}
              className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors ${
                type === t.label ? 'border-violet-bright bg-violet/15' : 'border-white/10 bg-white/5 hover:border-violet-bright/50'
              }`}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white">
                <t.icon className="size-5" />
              </span>
              <span className="font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 animate-line-in">
          {[...budgets, 'Not sure yet'].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setBudget(b)
                setStep(2)
              }}
              className={`rounded-2xl border px-5 py-4 text-left font-medium transition-colors ${
                budget === b ? 'border-violet-bright bg-violet/15' : 'border-white/10 bg-white/5 hover:border-violet-bright/50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={onSubmit} className="mt-6 space-y-5 animate-line-in">
          <div className="flex flex-wrap gap-2 text-sm">
            {[type, budget].filter(Boolean).map((x) => (
              <span key={x} className="flex items-center gap-1.5 rounded-full bg-violet/15 px-3 py-1 text-violet-bright">
                <Check className="size-3.5" /> {x}
              </span>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <input required placeholder="Your name" className={darkInput} />
            <input required type="email" placeholder="Your email" className={darkInput} />
          </div>
          <textarea rows={4} placeholder="Anything else we should know? (optional)" className={darkInput} />
          {sent && <SentNote />}
          <button type="submit" className={gradientButton}>
            <Send className="size-5" /> Send
          </button>
        </form>
      )}
    </DarkPanel>
  )
}

/* 4. Like a chat: the form asks one question at a time */
function Chat() {
  const questions = [
    { key: 'name', ask: "Hi! I'm Tyler. What's your name?", placeholder: 'Your name' },
    { key: 'project', ask: 'Nice to meet you, {name}! What are you looking to build?', placeholder: 'A website for my bakery…' },
    { key: 'email', ask: "Sounds great. What's the best email to reach you?", placeholder: 'you@example.com', type: 'email' },
  ]
  const [answers, setAnswers] = useState({})
  const [value, setValue] = useState('')
  const step = Object.keys(answers).length
  const done = step >= questions.length
  const fill = (text) => text.replace('{name}', answers.name ?? '')
  const send = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    setAnswers({ ...answers, [questions[step].key]: value.trim() })
    setValue('')
  }
  const person = team[0]
  return (
    <DarkPanel className="mx-auto max-w-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Avatar person={person} className="size-10 rounded-full" />
        <div>
          <div className="font-semibold">{person.name}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Usually replies within a day
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {questions.slice(0, Math.min(step + 1, questions.length)).map((q, i) => (
          <div key={q.key} className="space-y-3">
            <div className="max-w-sm rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm animate-line-in">{fill(q.ask)}</div>
            {answers[q.key] && (
              <div className="ml-auto w-fit max-w-sm rounded-2xl rounded-br-sm bg-linear-to-br from-brand to-violet px-4 py-2.5 text-sm text-white animate-line-in">
                {answers[q.key]}
              </div>
            )}
            {i === questions.length - 1 && done && (
              <div className="max-w-sm rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm animate-line-in">
                Thanks, {answers.name}! We'll email you within 24 hours. (Preview only, nothing was sent.)
              </div>
            )}
          </div>
        ))}
      </div>
      {!done && (
        <form onSubmit={send} className="mt-6 flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={questions[step].type ?? 'text'}
            placeholder={questions[step].placeholder}
            className={darkInput}
          />
          <button type="submit" aria-label="Send" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white">
            <Send className="size-5" />
          </button>
        </form>
      )}
    </DarkPanel>
  )
}

/* 5. Minimal: big words, your email, and a short form */
function Minimal() {
  const [sent, onSubmit] = useFakeSend()
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h1 className="text-6xl leading-none font-bold tracking-tight sm:text-8xl">
          Say <span className={accent}>hello</span>.
        </h1>
        <p className="mt-6 max-w-md text-lg text-fg-muted">Prefer email? Write to us directly and we'll reply within a day.</p>
        <a href="mailto:devopsstudio26@gmail.com" className="group mt-6 inline-flex items-center gap-3 text-2xl font-semibold sm:text-3xl">
          <span className="bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text text-transparent">devopsstudio26@gmail.com</span>
          <ArrowRight className="size-6 text-violet-bright transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <form onSubmit={onSubmit} className="space-y-8">
        {['Your name', 'Your email', 'What are you building?'].map((label, i) => (
          <label key={label} className="block border-b border-line pb-3 focus-within:border-violet-bright">
            <span className="text-sm text-fg-muted">{label}</span>
            <input required={i < 2} type={i === 1 ? 'email' : 'text'} className="mt-1 w-full bg-transparent text-xl outline-none" />
          </label>
        ))}
        {sent && <SentNote />}
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-fg px-8 py-4 font-semibold text-bg transition hover:opacity-85">
          Send <ArrowRight className="size-4" />
        </button>
      </form>
    </div>
  )
}

const ideas = [
  ['Matched Style', 'Same layout as now, in the About/Portfolio style: outlined "HELLO" behind the heading, dark grid panels, gradient icons and button.', Matched],
  ['People + Form', "A dark panel with 'Let's talk', your and Blair's photos and contact details; the form beside it with clickable project types.", PeopleSplit],
  ['Step by Step', 'Three quick steps: pick what you need, pick a budget, then name and email. Feels easy, gets better leads.', Steps],
  ['Chat', 'The form asks one question at a time, like a chat with Tyler.', Chat],
  ['Minimal', 'Big "Say hello.", your email up front, and a short three-line form.', Minimal],
]

export default function ContactIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">Contact Page Ideas</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">
            5 looks for the whole Contact page. The forms work so you can try them, but nothing is sent.
          </p>
        </header>

        {ideas.map(([title, description, Concept], i) => (
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
            <Concept />
          </section>
        ))}
      </div>
    </div>
  )
}
