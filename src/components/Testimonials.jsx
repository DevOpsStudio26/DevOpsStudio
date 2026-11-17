import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../data/siteData'

const placeholders = [1, 2, 3].map((n) => ({
  quote: `A real quote from client ${n} goes here: what you built, how the process felt, and the result they got.`,
  name: 'Client Name',
  role: 'Role',
  company: 'Company',
  rating: 5,
  placeholder: true,
}))

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function Avatar({ name, photo }) {
  const [failed, setFailed] = useState(false)
  if (photo && !failed) {
    return <img src={photo} alt="" className="size-11 rounded-full object-cover" onError={() => setFailed(true)} />
  }
  return (
    <span className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-sm font-semibold text-white">
      {initials(name)}
    </span>
  )
}

const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

// A dark grid card with the blue-purple-pink outline, like the panels on the other pages.
// theme-dark keeps it dark in light mode too.
function TestimonialCard({ t }) {
  return (
    <div className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow edge-line hover-lift">
      <figure className="theme-dark relative isolate flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-7">
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`} />
        <div aria-hidden="true" className="absolute -top-16 -left-16 -z-10 size-48 rounded-full bg-violet/30 blur-3xl" />
        {t.placeholder && (
          <span className="absolute top-4 right-4 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-400">Placeholder</span>
        )}
        <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
          <Quote className="size-5" />
        </span>
        {t.rating > 0 && (
          <div className="mt-5 flex gap-0.5 text-amber-400" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`size-4 ${i < t.rating ? 'fill-current' : 'opacity-30'}`} />
            ))}
          </div>
        )}
        <blockquote className={`mt-3 flex-1 leading-relaxed ${t.placeholder ? 'text-fg-muted italic' : ''}`}>“{t.quote}”</blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <Avatar name={t.name} photo={t.photo} />
          <span>
            <span className="block font-semibold">{t.name}</span>
            <span className="block text-sm text-fg-muted">{[t.role, t.company].filter(Boolean).join(', ')}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

const SPEED = 30 // pixels per second, the same on any screen refresh rate
const RESUME_AFTER = 700 // ms for an arrow's smooth jump (or a swipe) to finish before drifting again

// One row of quotes drifting left on a loop that never stops. Arrows (or a swipe) jump one card, then it keeps drifting.
function QuoteRow({ list }) {
  const trackRef = useRef(null)
  const resumeAt = useRef(0)
  const pos = useRef(0)

  // Repeat the list so one copy is wider than the screen, then render it twice so the loop is seamless.
  const copies = Math.ceil(8 / list.length)
  const base = Array.from({ length: copies }, () => list).flat()
  const items = [...base, ...base]

  useEffect(() => {
    const el = trackRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame
    let wasMoving = false
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000 // seconds since last frame, capped after a hidden tab
      last = now
      const half = el.scrollWidth / 2
      const moving = !reduced && now > resumeAt.current
      if (moving) {
        if (!wasMoving) pos.current = el.scrollLeft // pick up wherever arrows or a swipe left it
        pos.current += SPEED * dt
        if (pos.current >= half) pos.current -= half
        el.scrollLeft = pos.current
      } else if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      }
      wasMoving = moving
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const pause = () => {
    resumeAt.current = performance.now() + RESUME_AFTER
  }

  const nudge = (dir) => {
    const el = trackRef.current
    const step = el.firstElementChild.getBoundingClientRect().width
    if (dir < 0 && el.scrollLeft < step) el.scrollLeft += el.scrollWidth / 2 // wrap so there's always room to go back
    pause()
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const arrow = 'absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-fg shadow-lg backdrop-blur transition hover:border-brand-bright/60 hover:bg-elevated'

  return (
    <div className="relative">
      <button type="button" onClick={() => nudge(-1)} aria-label="Previous review" className={`${arrow} left-0 sm:-left-5`}>
        <ChevronLeft className="size-5" />
      </button>
      <div
        ref={trackRef}
        onPointerDown={pause}
        onWheel={pause}
        className="flex overflow-x-auto py-2 [scrollbar-width:none] mask-x-from-90% mask-x-to-100% [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <div key={i} className="w-80 shrink-0 pr-6 sm:w-96 [&>*]:h-full" aria-hidden={i >= list.length || undefined}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => nudge(1)} aria-label="Next review" className={`${arrow} right-0 sm:-right-5`}>
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

// Client quotes from siteData. With none added, placeholders show only in development
// and the whole section is hidden on the live site. `bare` skips the page-section wrapper.
export default function Testimonials({ bare = false }) {
  const showPlaceholders = testimonials.length === 0
  if (showPlaceholders && !import.meta.env.DEV) return null
  const list = showPlaceholders ? placeholders : testimonials

  const content = (
    <div>
      {/* Heading like the other sections: italic accent over a huge outlined "REVIEWS" with a soft glow */}
      <div className="relative isolate mb-14 overflow-hidden py-6 text-center">
        <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,13vw,9rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
        >
          REVIEWS
        </span>
        <h2 className="text-5xl font-bold tracking-tight">
          What Clients <span className="font-serif font-normal italic text-violet-bright">Say</span>
        </h2>
        <p className="mt-4 text-fg-muted">Real words from the people we've built for.</p>
      </div>
      {/* A scrolling row needs at least 3 quotes to look right; with fewer, show them side by side */}
      {list.length >= 3 ? (
        <QuoteRow list={list} />
      ) : (
        <div className={`grid gap-6 ${list.length === 1 ? 'mx-auto max-w-xl' : 'mx-auto max-w-4xl md:grid-cols-2'}`}>
          {list.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      )}
    </div>
  )

  if (bare) return content
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{content}</div>
    </section>
  )
}
