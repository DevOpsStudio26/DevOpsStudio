import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SmartImage from './SmartImage'

// Projects fanned out in 3D. Clicking a side card brings it to the middle;
// clicking the middle card calls onOpen(index), if given.
// Optional: `outlined` gives the cards the gradient outline (and the middle one a glow), `autoPlay` moves to the
// next card every that many milliseconds (pausing while hovered), `slideMs` sets how long each slide takes, and
// `onActiveChange(index)` reports the middle card.
export default function ProjectCoverflow({ projects, onOpen, outlined = false, autoPlay = 0, slideMs = 500, onActiveChange }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = projects.length
  const prev = () => setActive((a) => (a - 1 + n) % n)
  const next = () => setActive((a) => (a + 1) % n)

  useEffect(() => {
    if (!autoPlay || paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), autoPlay)
    return () => clearInterval(id)
  }, [autoPlay, paused, n])

  useEffect(() => {
    onActiveChange?.(active)
  }, [active, onActiveChange])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }}
    >
      <div className="relative h-80" aria-roledescription="carousel">
        {projects.map((p, i) => {
          let offset = i - active
          if (offset > n / 2) offset -= n
          if (offset < -n / 2) offset += n
          const visible = Math.abs(offset) <= 2
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => (offset === 0 ? onOpen?.(i) : setActive(i))}
              tabIndex={offset === 0 ? 0 : -1}
              aria-label={offset === 0 && onOpen ? `View details for ${p.title}` : p.title}
              className={`absolute top-0 left-1/2 w-64 rounded-2xl text-left shadow-2xl transition-all ease-in-out motion-reduce:transition-none sm:w-80 ${
                outlined
                  ? `bg-linear-135 from-brand via-violet to-pink-500 p-px ${offset === 0 ? 'shadow-violet/40' : ''}`
                  : 'overflow-hidden border border-line bg-surface'
              }`}
              style={{
                transitionDuration: `${slideMs}ms`,
                transform: `translateX(calc(-50% + ${offset * 60}%)) scale(${1 - Math.abs(offset) * 0.15}) perspective(900px) rotateY(${offset * -18}deg)`,
                zIndex: 10 - Math.abs(offset),
                opacity: visible ? 1 - Math.abs(offset) * 0.3 : 0,
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <div className={outlined ? 'overflow-hidden rounded-[calc(1rem-1px)] bg-surface' : ''}>
                <SmartImage src={p.image} alt="" fallbackLabel={p.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-fg-muted">{p.category}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line hover:bg-elevated"
        >
          <ArrowLeft className="size-5" />
        </button>
        <p key={active} className="w-full max-w-md text-center text-sm text-fg-muted animate-line-in" aria-live="polite">
          {projects[active].description}
        </p>
        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line hover:bg-elevated"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
