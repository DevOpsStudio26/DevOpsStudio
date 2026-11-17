import { useEffect, useRef, useState } from 'react'
import { Calendar, Globe, Rocket, Smartphone } from 'lucide-react'
import { projects } from '../data/siteData'

// Counted from the project list in siteData, so the numbers update whenever a project is added.
const stats = [
  { value: projects.length, label: 'Projects Built', icon: Rocket },
  { value: projects.filter((p) => p.category === 'Web Development').length, label: 'Websites', icon: Globe },
  { value: projects.filter((p) => p.category === 'App Development').length, label: 'Apps', icon: Smartphone },
  // The year doesn't count up: in-between numbers would briefly show years we weren't building.
  { value: Math.min(...projects.map((p) => p.year)), static: true, label: 'Building Since', icon: Calendar },
]

const DURATION = 1600

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True once the element has scrolled into view (stays true after that).
function useInView(ref, threshold = 0.35) {
  const [inView, setInView] = useState(prefersReducedMotion)
  useEffect(() => {
    if (inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold, inView])
  return inView
}

function Counter({ to, suffix = '', start }) {
  const [n, setN] = useState(() => (prefersReducedMotion() ? to : 0))

  useEffect(() => {
    if (!start || prefersReducedMotion()) return
    let frame
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DURATION)
      setN(Math.round(to * (1 - (1 - p) ** 3)))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, to])

  return (
    <span>
      {n}
      {suffix}
    </span>
  )
}

// Stat cards that count up and fill a bar when scrolled into view.
export default function AnimatedStats() {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {stats.map(({ value, static: still, suffix, label, icon: Icon }) => (
        // Thin blue-purple-pink outline, matching the panels on the other pages
        <div key={label} className="rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow edge-line hover-lift">
          <div className="h-full rounded-[calc(1rem-1px)] bg-bg p-6 text-center">
            {/* Icon in a gradient square, like the Our Values cards */}
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
              <Icon className="size-6" />
            </span>
            <div className="mt-3 bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text text-4xl font-bold text-transparent">
              {still ? value : <Counter to={value} suffix={suffix} start={inView} />}
            </div>
            <div className="mt-1 text-sm text-fg-muted">{label}</div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-elevated">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand to-violet transition-[width] duration-[1600ms] ease-out motion-reduce:transition-none"
                style={{ width: inView ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
