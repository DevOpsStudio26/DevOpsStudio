import { useEffect, useRef, useState } from 'react'
import { Code, Headphones, Palette, Smartphone } from 'lucide-react'

// White icon in a gradient square, like the stat cards and Our Values cards
function IconBox({ icon: Icon }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
      <Icon className="size-6" />
    </span>
  )
}

// Card with a glow that follows the mouse while hovered.
export function SpotlightCard({ className = '', children }) {
  const ref = useRef(null)
  const move = (e) => {
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - box.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - box.top}px`)
  }
  // The outer div is the thin blue-purple-pink outline (and takes the grid sizes); the card sits inside it
  return (
    <div className={`rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow edge-line hover-lift ${className}`}>
      <div
        ref={ref}
        onMouseMove={move}
        className="group relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-surface p-6 [--x:50%] [--y:50%]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(320px circle at var(--x) var(--y), color-mix(in srgb, var(--color-violet) 18%, transparent), transparent 70%)' }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}

// The same design on a laptop, tablet and phone, lifting one after another on hover.
// With shown={false} they wait below, hidden; switching it to true makes them rise in one after another.
export function DevicesPreview({ shown = true }) {
  const screen = (
    <>
      <div className="h-2 rounded-sm bg-linear-to-r from-brand to-violet" />
      <div className="mt-1 h-1 w-2/3 rounded-sm bg-fg-muted/50" />
      <div className="mt-1 h-1 w-1/2 rounded-sm bg-fg-muted/30" />
    </>
  )
  // The entrance lives on a wrapper, so its delay doesn't slow down the hover lift inside
  const rise = (n, children) => (
    <div
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      style={{ transitionDelay: `${n * 200}ms` }}
    >
      {children}
    </div>
  )
  return (
    <div className="flex items-end justify-center gap-3">
      {rise(
        0,
        <div className="transition-transform group-hover:-translate-y-1">
          <div className="h-16 w-28 rounded-t-md border-2 border-elevated bg-bg p-1.5">{screen}</div>
          <div className="mx-auto h-1.5 w-32 -translate-x-2 rounded-b-md bg-elevated" />
        </div>,
      )}
      {rise(1, <div className="h-16 w-12 rounded-md border-2 border-elevated bg-bg p-1 transition-transform delay-75 group-hover:-translate-y-1">{screen}</div>)}
      {rise(2, <div className="h-12 w-7 rounded-md border-2 border-elevated bg-bg p-0.5 transition-transform delay-150 group-hover:-translate-y-1">{screen}</div>)}
    </div>
  )
}

const fx = 'transition-all ease-out motion-reduce:transition-none'

// True a moment after the element first scrolls into view (stays true). Each card's picture uses its own,
// so the bottom row plays when you reach it, not when the top row does. The short wait lets the empty starting
// state get drawn first; without it, a page that opens already scrolled here (a reload) jumps to the end.
function useSeen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    let timer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setSeen(true), 250)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
  return [ref, seen]
}
const bars = [60, 80, 70, 95, 85, 100, 90, 100, 95, 100, 98, 100]

// Services as a mixed-size grid, each card with a mini illustration that plays the first time it scrolls into view:
// the browser lines type in, the phone screen scrolls, the devices rise in, the bars grow.
export default function BentoServices() {
  const [webRef, on] = useSeen()
  const [appRef, appOn] = useSeen()
  const [designRef, designOn] = useSeen()
  const [supportRef, supportOn] = useSeen()
  const phoneRef = useRef(null)

  // The phone screen scrolls gently up and down, forever, once it has been seen.
  useEffect(() => {
    if (!appOn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const a = phoneRef.current.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-45%)' }], {
      duration: 3500,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: 300,
    })
    return () => a.cancel()
  }, [appOn])

  const grow = (w, i) => ({ width: on ? w : '0%', transitionDelay: `${200 + i * 250}ms`, transitionDuration: '700ms' })

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SpotlightCard className="md:col-span-2">
        <IconBox icon={Code} />
        <h3 className="mt-4 text-xl font-semibold">Web Development</h3>
        <p className="mt-2 max-w-md text-fg-muted">Custom websites and web apps, fast, accessible and built to grow.</p>
        <div ref={webRef} className="mt-6 overflow-hidden rounded-lg border border-line bg-bg" aria-hidden="true">
          <div className="flex gap-1.5 border-b border-line px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="space-y-2 p-4">
            <div className={`h-3 rounded bg-linear-to-r from-brand to-violet ${fx}`} style={grow('33%', 0)} />
            <div className={`h-2 rounded bg-elevated ${fx}`} style={grow('66%', 1)} />
            <div className={`h-2 rounded bg-elevated ${fx}`} style={grow('50%', 2)} />
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={`h-12 rounded bg-elevated ${fx} duration-500 ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
                  style={{ transitionDelay: `${1000 + n * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard className="md:row-span-2">
        <IconBox icon={Smartphone} />
        <h3 className="mt-4 text-xl font-semibold">App Development</h3>
        <p className="mt-2 text-fg-muted">Native and cross-platform apps for iOS and Android.</p>
        <div ref={appRef} className="mx-auto mt-8 w-36 rounded-[1.75rem] border-4 border-elevated bg-bg p-3" aria-hidden="true">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-elevated" />
          {/* The screen shows the top of a longer page that scrolls */}
          <div className="h-52 overflow-hidden">
            <div ref={phoneRef}>
              <div className="h-20 rounded-lg bg-linear-to-br from-brand to-violet" />
              <div className="mt-3 space-y-2">
                <div className="h-2 rounded bg-elevated" />
                <div className="h-2 w-2/3 rounded bg-elevated" />
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className={`h-8 rounded-lg ${n === 2 ? 'bg-violet/40' : 'bg-elevated'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard>
        <IconBox icon={Palette} />
        <h3 className="mt-4 text-xl font-semibold">UI/UX Design</h3>
        <p className="mt-2 text-fg-muted">Clean, modern designs you approve before we build.</p>
        <div ref={designRef} className="mt-6" aria-hidden="true">
          <DevicesPreview shown={designOn} />
        </div>
      </SpotlightCard>

      <SpotlightCard>
        <IconBox icon={Headphones} />
        <h3 className="mt-4 text-xl font-semibold">Ongoing Support</h3>
        <p className="mt-2 text-fg-muted">Updates, monitoring and fixes after launch.</p>
        <div ref={supportRef} className="mt-6 flex h-12 items-end gap-1" aria-hidden="true">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm bg-linear-to-t from-brand/40 to-violet-bright/80 ${fx} duration-500`}
              style={{ height: supportOn ? `${h}%` : '0%', transitionDelay: `${i * 70}ms` }}
            />
          ))}
        </div>
      </SpotlightCard>
    </div>
  )
}
