import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Preview page: the whole Projects page twice, side by side, with hero idea 2 and hero idea 6.
// Not linked in the nav: visit /projects-hero-compare. Each side is the real site at desktop width,
// scaled down to fit, and scrolling one side scrolls the other.

const DESKTOP_WIDTH = 1440
const sides = [
  { n: 2, title: 'Home style', src: '/projects?hero=2' },
  { n: 6, title: 'Screenshot wall (current)', src: '/projects' },
]

export default function ProjectsHeroCompare() {
  const boxRef = useRef(null)
  const frames = useRef([])
  const [scale, setScale] = useState(0.45)

  // Shrink the desktop-width pages to fit their column.
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESKTOP_WIDTH))
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [])

  // Keep both sides at the same scroll position.
  const linkScroll = (i) => {
    const win = frames.current[i]?.contentWindow
    if (!win) return
    win.addEventListener('scroll', () => {
      const other = frames.current[1 - i]?.contentWindow
      if (other && Math.abs(other.scrollY - win.scrollY) > 1) other.scrollTo(0, win.scrollY)
    })
  }

  const frameHeight = `calc((100vh - 13rem) / ${scale})`

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Projects hero: 2 or 6?</h1>
      <p className="mt-2 text-fg-muted">
        The full{' '}
        <Link to="/projects" className="text-brand-bright underline">
          Projects page
        </Link>{' '}
        with each hero. Scroll either side and both move together.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {sides.map(({ n, title, src }, i) => (
          <div key={n}>
            <h2 className="mb-3 flex items-center gap-3 text-xl font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm text-white">{n}</span>
              {title}
            </h2>
            <div ref={i === 0 ? boxRef : undefined} className="overflow-hidden rounded-xl border border-line" style={{ height: 'calc(100vh - 13rem)' }}>
              <iframe
                ref={(el) => (frames.current[i] = el)}
                src={src}
                title={`Projects page with hero ${n}`}
                onLoad={() => linkScroll(i)}
                className="origin-top-left border-0"
                style={{ width: DESKTOP_WIDTH, height: frameHeight, transform: `scale(${scale})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
