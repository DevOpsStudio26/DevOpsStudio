import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useCurrentMonth } from '../hooks/useCurrentMonth'

export default function AvailabilityCta() {
  const month = useCurrentMonth()

  return (
    // A glowing beam travels around the border: a spinning cone of light behind the box, which covers all of it
    // except a thin ring at the edge. The softer gradient outline stays underneath.
    <div className="relative isolate overflow-hidden rounded-2xl p-[2px]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-brand via-violet to-pink-500 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin motion-reduce:hidden"
        style={{
          animationDuration: '6s',
          background: 'conic-gradient(from 0deg, transparent 0deg 290deg, var(--color-violet) 320deg, var(--color-violet-pale) 350deg, transparent 360deg)',
        }}
      />
      <div className="relative overflow-hidden rounded-[14px] bg-bg px-6 py-14 text-center">
        <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 animate-ping-slow motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Booking projects for {month}
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Have an Idea? Let's Build It.</h2>
          <p className="mx-auto mt-3 max-w-xl text-fg-muted">Book a free 30-minute call. No pressure, just a plan.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-7 py-3 text-white shadow-lg shadow-brand/30 transition hover:shadow-violet/50"
            >
              Book a Free Call <ArrowRight className="size-4" />
            </Link>
            <Link to="/projects" className="inline-flex items-center rounded-lg border border-line px-7 py-3 transition-colors hover:bg-elevated">
              View Our Work
            </Link>
          </div>
          <p className="mt-6 text-sm text-fg-subtle">Average response time: under 24 hours</p>
        </div>
      </div>
    </div>
  )
}
