import { useState } from 'react'
import { CircleAlert, CircleCheck, Clock, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import Select from '../components/Select'
import Reveal from '../components/Reveal'
import { contactEmail, contactPhone, contactPhoneLink } from '../data/siteData'

const info = [
  { icon: Mail, label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
  { icon: Phone, label: 'Phone', value: contactPhone, href: contactPhoneLink },
  { icon: MapPin, label: 'Location', value: 'Remote - Serving clients everywhere' },
  { icon: Clock, label: 'Working Hours', value: 'Mon-Fri: 9:00 AM - 5:00 PM CT' },
]

const projectTypes = ['Web Development', 'App Development', 'UI/UX Design', 'Other']
const timelines = ['As soon as possible', 'Within 1-3 months', '3+ months from now', "I'm flexible"]

// Thin blue-purple-pink outline and dark grid panels, matching the About and Portfolio pages
const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-violet-bright focus:outline-none focus:ring-2 focus:ring-violet-bright/30'

// theme-dark keeps the panel (and the fields inside it) dark in light mode too
function DarkPanel({ className = '', glow = '-top-20 -left-20', children }) {
  return (
    <div className={outline}>
      <div
        className={`theme-dark relative isolate h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] ${className}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]`}
        />
        <div aria-hidden="true" className={`absolute -z-10 size-72 rounded-full bg-violet/30 blur-3xl ${glow}`} />
        {children}
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">
        {label} {required && '*'}
      </span>
      {children}
    </label>
  )
}

// The Cloudflare Worker that emails form messages to the studio inbox (the contact-worker folder).
// Set in .env.development (local) and .env.production (live site).
const contactUrl = import.meta.env.VITE_CONTACT_URL

export default function Contact() {
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      if (!contactUrl) throw new Error("The contact form isn't connected yet. Please email us instead.")
      const res = await fetch(contactUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.ok) throw new Error(result.error || "Your message couldn't be sent. Please email us instead.")
      setStatus('sent')
      form.reset()
    } catch (err) {
      // A network failure (offline, Worker down) has a technical message, so show a friendly one instead
      setError(err instanceof TypeError ? "Your message couldn't be sent. Check your connection or email us instead." : err.message)
      setStatus('error')
    }
  }

  return (
    <section className="overflow-x-clip py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* A huge outlined "HELLO" and a small glow sit behind the heading. Sections slide in like About and Portfolio. */}
        <Reveal from="down">
          <header className="relative isolate overflow-x-clip py-14 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 m-auto size-64 rounded-full bg-violet/25 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="ghost-word text-[clamp(4rem,15vw,9rem)]"
            >
              HELLO
            </span>
            <h1 className="text-6xl font-bold tracking-tight">
              Get In <span className="font-serif font-normal italic text-violet-bright">Touch</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">
              Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </header>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal from="left" className="lg:col-span-2">
            <DarkPanel className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input name="name" required placeholder="John Doe" className={inputClass} />
                  </Field>
                  <Field label="Email" required>
                    <input name="email" type="email" required placeholder="john@example.com" className={inputClass} />
                  </Field>
                  <Field label="Project Type" required>
                    <Select
                      name="projectType"
                      required
                      options={projectTypes}
                      defaultValue={projectTypes[0]}
                      placeholder="Select a project type"
                    />
                  </Field>
                  <Field label="When do you need it?">
                    <Select name="timeline" options={timelines} placeholder="Select a timeline" />
                  </Field>
                </div>
                <Field label="Message" required>
                  <textarea
                    name="message"
                    required
                    rows={7}
                    placeholder="Tell us about your project..."
                    className={inputClass}
                  />
                </Field>

                {/* Hidden from people; spam bots fill it in, and the Worker quietly drops those messages */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {status === 'sent' && (
                  <p
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-3 text-emerald-400"
                    role="status"
                  >
                    <CircleCheck className="size-5 shrink-0" /> Thanks! Your message has been sent. We'll get back to you within 24 hours.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 text-red-400" role="alert">
                    <CircleAlert className="size-5 shrink-0" />
                    <span>
                      {error}{' '}
                      <a href={`mailto:${contactEmail}`} className="underline hover:text-red-300">
                        {contactEmail}
                      </a>
                    </span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-violet py-4 text-lg font-semibold text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle className="size-5 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </DarkPanel>
          </Reveal>

          <aside className="space-y-6">
            <Reveal from="right" delay={200}>
              <DarkPanel className="p-7" glow="-top-20 -right-20">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <ul className="mt-6 space-y-5">
                  {info.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <div className="font-semibold">{label}</div>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm break-all text-fg-muted transition-colors hover:text-violet-bright"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="text-sm text-fg-muted">{value}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </DarkPanel>
            </Reveal>
            <Reveal from="right" delay={400}>
              <DarkPanel className="p-7" glow="-bottom-20 -left-20">
                <h2 className="text-2xl font-semibold">Quick Response</h2>
                <p className="mt-3 text-fg-muted">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <p className="mt-3 text-fg-muted">For urgent matters, please call us directly.</p>
              </DarkPanel>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
