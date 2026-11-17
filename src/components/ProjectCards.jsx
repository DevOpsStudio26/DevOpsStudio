import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Globe, LayoutGrid, Search, Smartphone } from 'lucide-react'
import SmartImage from './SmartImage'
import { projects } from '../data/siteData'

// `value` matches a project's category; `label` is what the button shows. Counts update with siteData.
const filters = [
  { value: 'All', label: 'All', icon: LayoutGrid },
  { value: 'Web Development', label: 'Websites', icon: Globe },
  { value: 'App Development', label: 'Apps', icon: Smartphone },
].map((f) => ({ ...f, count: projects.filter((p) => f.value === 'All' || p.category === f.value).length }))
const isApp = (p) => p.category === 'App Development'
// ?type=websites or ?type=apps in the link opens the page with that filter already on.
const fromLink = { websites: 'Web Development', apps: 'App Development' }

// Filters, a search box (matches names and descriptions) and photo cards that reveal their description on hover.
// Clicking a card calls onOpen(visibleProjects, index). The cards ripple in the first time they scroll into view.
export default function ProjectCards({ onOpen }) {
  const gridRef = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])
  const [params] = useSearchParams()
  const [filter, setFilter] = useState(() => fromLink[params.get('type')] ?? 'All')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const shown = projects.filter(
    (p) =>
      (filter === 'All' || p.category === filter) &&
      (!q || [p.title, p.description].some((s) => s.toLowerCase().includes(q))),
  )

  return (
    <>
      {/* Filter on the left, search on the right, each with a gradient outline and soft glow */}
      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/10 sm:w-auto">
          <div className="flex rounded-full bg-bg p-1" role="group" aria-label="Filter projects">
            {filters.map(({ value, label, icon: Icon, count }) => {
              const active = filter === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  aria-pressed={active}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 sm:flex-none ${
                    active
                      ? 'bg-linear-to-r from-brand to-violet text-white shadow-lg shadow-violet/30'
                      : 'text-fg-muted hover:bg-elevated hover:text-fg'
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs leading-none tabular-nums ${
                      active ? 'bg-white/20 text-white' : 'bg-elevated text-fg-subtle'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/10 transition-shadow focus-within:shadow-violet/40">
          <label className="flex items-center gap-2 rounded-full bg-bg px-4 py-2">
            <Search className="size-4 shrink-0 text-fg-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full bg-transparent text-sm outline-none placeholder:text-fg-subtle sm:w-52"
            />
          </label>
        </div>
      </div>

      <div ref={gridRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          // Fades up one after another; this wrapper carries the delay so hovering the card stays instant
          <div
            key={p.title}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'}`}
            style={{ transitionDelay: seen ? `${Math.min(i, 8) * 90}ms` : undefined }}
          >
          {/* Photo card: pointing at it (or tabbing to it) lifts it with a glowing gradient border, zooms the photo,
              slides up the description and pops in an arrow. On touch screens, which can't hover, the description
              simply shows all the time. */}
          <button
            type="button"
            onClick={() => onOpen(shown, i)}
            className="group block w-full rounded-2xl bg-line p-px card-shadow edge-line text-left outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-linear-to-br hover:from-brand hover:via-violet hover:to-pink-500 hover:shadow-2xl hover:shadow-violet/30 focus-visible:-translate-y-1 focus-visible:bg-linear-to-br focus-visible:from-brand focus-visible:via-violet focus-visible:to-pink-500 focus-visible:shadow-2xl focus-visible:shadow-violet/30 motion-reduce:hover:translate-y-0"
          >
            <div className="theme-dark relative aspect-[4/3] overflow-hidden rounded-[15px]">
              <SmartImage
                src={p.image}
                alt=""
                className="size-full object-cover object-top transition duration-700 group-hover:scale-110 group-hover:blur-[2px] group-focus-visible:scale-110 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#05050a] via-[#05050a]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className={`text-xs tracking-widest uppercase ${isApp(p) ? 'text-violet-300' : 'text-blue-300'}`}>{isApp(p) ? 'App' : 'Website'}</p>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 line-clamp-2 max-h-0 text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100 group-focus-visible:max-h-12 group-focus-visible:opacity-100 [@media(hover:none)]:max-h-12 [@media(hover:none)]:opacity-100">
                  {p.description}
                </p>
            </div>
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 flex size-10 scale-50 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white opacity-0 shadow-lg shadow-violet/40 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
            >
              <ArrowUpRight className="size-5" />
            </span>
            </div>
          </button>
          </div>
        ))}
      </div>
      {shown.length === 0 && <p className="mt-10 text-center text-fg-muted">Nothing matches "{query}". Try another word.</p>}
    </>
  )
}
