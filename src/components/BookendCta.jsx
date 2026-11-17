import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import EdgeBeams from './EdgeBeams'
import { useCurrentMonth } from '../hooks/useCurrentMonth'

// The Home page's closing call to action, built to echo the hero so the page starts and ends the same way:
// the same near-black background, gradient headline, button styles and light beams, with glowing rings in place of
// the globe. Stays dark in light mode (theme-dark), like the hero. Only the top edge gets a beam, because the footer
// right below already has a gradient line along its top.
// One glowing arc per ring: the colored side of a transparent border, spun slowly.
const rings = [
  { size: 'size-[24rem]', arc: 'border-t-brand-bright shadow-[0_-8px_20px_-10px] shadow-brand-bright', duration: '14s' },
  { size: 'size-[34rem]', arc: 'border-t-violet-bright shadow-[0_-8px_24px_-10px] shadow-violet-bright', duration: '22s', reverse: true },
  { size: 'size-[46rem]', arc: 'border-t-pink-400/60', duration: '34s' },
]

export default function BookendCta() {
  const month = useCurrentMonth()

  return (
    <section className="theme-dark relative isolate overflow-hidden bg-[#05050a] py-28 text-center">
      <EdgeBeams boost only="top" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[34rem] -translate-1/2 rounded-full border border-violet/30 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-violet)_28%,transparent),transparent_70%)]" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[24rem] -translate-1/2 rounded-full border border-brand/25" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[46rem] -translate-1/2 rounded-full border border-white/5" />

      {/* Movement: a glowing arc travels around each ring (different speeds and directions), and a faint ripple grows
          out from the center every few seconds. All of it is hidden for visitors who turn off animations. */}
      {rings.map(({ size, arc, duration, reverse }) => (
        <div
          key={size}
          aria-hidden="true"
          className={`absolute top-1/2 left-1/2 -z-10 ${size} -translate-1/2 motion-reduce:hidden`}
        >
          <div
            className={`size-full animate-spin rounded-full border-2 border-transparent ${arc}`}
            style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
          />
        </div>
      ))}
      {[0, 3].map((delay) => (
        <div
          key={delay}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-[24rem] -translate-1/2 animate-[cta-ripple_6s_ease-out_infinite] rounded-full border border-violet-bright/40 opacity-0 motion-reduce:hidden"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <style>{'@keyframes cta-ripple { 0% { transform: scale(1); opacity: 0.6 } 100% { transform: scale(2.1); opacity: 0 } }'}</style>

      {/* Huge outlined "LET'S TALK" behind the heading, like the outlined words behind Services, Work and Reviews */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,16vw,12rem)] leading-none font-black tracking-tighter whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
      >
        LET&apos;S TALK
      </span>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Booking projects for {month}
        </span>
        {/* Same heading style as the other sections: white, with an italic purple accent */}
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Have an idea? Let&apos;s <span className="font-serif font-normal italic text-violet-bright">build it.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">Book a free 30-minute call. No pressure, just a plan.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        <p className="mt-6 text-sm text-white/50">Average response time: under 24 hours</p>
      </div>
    </section>
  )
}
