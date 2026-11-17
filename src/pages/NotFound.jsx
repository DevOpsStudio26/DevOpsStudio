import { useId } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { driftingStars, useCanvasScene } from '../lib/canvasScenes'

// Shown for any address that isn't a page on the site (an old or mistyped link).
// A floating 404 among drifting stars; the zero is the turning logo ring. Purple in dark mode, sky blue in light.
function SpinningZero() {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="size-20 animate-spin [animation-duration:6s] motion-reduce:animate-none sm:size-24">
      <defs>
        <linearGradient id={`zero-${id}`} x1="0" x2="64" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--color-brand)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-violet-bright)' }} />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" stroke={`url(#zero-${id})`} strokeWidth="5" strokeDasharray="120 44" strokeLinecap="round" />
    </svg>
  )
}

export default function NotFound() {
  const stars = useCanvasScene(driftingStars)
  return (
    <section className="relative isolate flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-radial-[at_50%_40%] from-violet/20 to-transparent to-70%" />
      <canvas ref={stars} aria-hidden="true" className="absolute inset-0 -z-10 size-full" />

      <div className="flex flex-col items-center gap-4">
        <h1 className="flex animate-bob items-center gap-1 text-8xl font-black tracking-tighter motion-reduce:animate-none sm:text-9xl">
          <span className="sr-only">404</span>
          <span aria-hidden="true">4</span>
          <SpinningZero />
          <span aria-hidden="true">4</span>
        </h1>
        <p className="text-xl font-bold">This page took a wrong turn</p>
        <p className="max-w-sm text-fg-muted">The link may be old or mistyped. Here's a way back.</p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:-translate-y-0.5 hover:shadow-violet/50"
        >
          Back to home <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
