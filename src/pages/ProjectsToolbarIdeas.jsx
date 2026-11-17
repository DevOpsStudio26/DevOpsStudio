import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Globe, LayoutGrid, Search, Smartphone, X } from 'lucide-react'
import { projects } from '../data/siteData'

// Preview page for the stat boxes and search box on the Projects page. Not linked in the nav: visit
// /projects-toolbar-ideas. Everything uses the real project list, and the search boxes really search it.

const isApp = (p) => p.category === 'App Development'
const counts = { all: projects.length, sites: projects.filter((p) => !isApp(p)).length, apps: projects.filter(isApp).length }
const since = Math.min(...projects.map((p) => p.year))
const outline = 'rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const gradientNumber = 'bg-linear-to-r from-brand-bright to-violet-bright bg-clip-text font-bold text-transparent'

function useSearch() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches = projects.filter((p) => !q || [p.title, p.description].some((s) => s.toLowerCase().includes(q)))
  return { query, setQuery, matches }
}

// Small list under each search so you can see it working
function Results({ matches, query }) {
  return (
    <p className="mt-4 text-center text-sm text-fg-muted">
      {query ? (
        <>
          {matches.length} match{matches.length === 1 ? '' : 'es'}
          {matches.length > 0 && `: ${matches.map((p) => p.title).join(', ')}`}
        </>
      ) : (
        'Type to try it.'
      )}
    </p>
  )
}

// 1. Current
function Current() {
  const { query, setQuery, matches } = useSearch()
  return (
    <div className="p-8">
      <div className="mx-auto grid max-w-sm grid-cols-3 gap-3">
        {[
          [counts.all, 'Projects'],
          [counts.sites, 'Websites'],
          [counts.apps, 'Apps'],
        ].map(([n, label]) => (
          <div key={label} className="rounded-xl border border-line bg-surface px-4 py-3 text-center">
            <div className="text-2xl font-bold">{n}</div>
            <div className="text-xs text-fg-muted">{label}</div>
          </div>
        ))}
      </div>
      <label className="mx-auto mt-10 flex max-w-sm items-center gap-2 rounded-full bg-surface px-4 py-2 ring-1 ring-line focus-within:ring-violet-bright">
        <Search className="size-4 text-fg-subtle" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects" className="w-full bg-transparent text-sm outline-none placeholder:text-fg-subtle" />
      </label>
      <Results matches={matches} query={query} />
    </div>
  )
}

// 2. Home-style stat cards
function HomeStyleStats() {
  const stats = [
    [LayoutGrid, counts.all, 'Projects'],
    [Globe, counts.sites, 'Websites'],
    [Smartphone, counts.apps, 'Apps'],
    [Calendar, since, 'Building since'],
  ]
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 p-8 sm:grid-cols-4">
      {stats.map(([Icon, n, label]) => (
        <div key={label} className={outline}>
          <div className="h-full rounded-[calc(1rem-1px)] bg-bg p-4 text-center">
            <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
              <Icon className="size-5" />
            </span>
            <div className={`mt-2 text-3xl ${gradientNumber}`}>{n}</div>
            <div className="text-xs text-fg-muted">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 3. Clickable stat cards that ARE the filter
function StatFilters() {
  const [filter, setFilter] = useState('all')
  const options = [
    ['all', LayoutGrid, counts.all, 'All projects'],
    ['sites', Globe, counts.sites, 'Websites'],
    ['apps', Smartphone, counts.apps, 'Apps'],
  ]
  const shown = projects.filter((p) => filter === 'all' || (filter === 'apps') === isApp(p))
  return (
    <div className="p-8">
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4">
        {options.map(([value, Icon, n, label]) => {
          const on = filter === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={on}
              className={`rounded-2xl p-px transition-all duration-300 ${on ? 'bg-linear-135 from-brand via-violet to-pink-500 shadow-lg shadow-violet/30' : 'bg-line hover:bg-violet/40'}`}
            >
              <span className={`flex h-full flex-col items-center rounded-[calc(1rem-1px)] p-4 ${on ? 'bg-[#0f0d1d]' : 'bg-surface'}`}>
                <Icon className={`size-5 ${on ? 'text-violet-bright' : 'text-fg-subtle'}`} />
                <span className={`mt-1 text-3xl ${on ? gradientNumber : 'font-bold text-fg-muted'}`}>{n}</span>
                <span className={`text-xs ${on ? 'text-fg' : 'text-fg-muted'}`}>{label}</span>
              </span>
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-center text-sm text-fg-muted">
        Showing: {shown.map((p) => p.title).join(', ')}
      </p>
      <p className="mt-2 text-center text-xs text-fg-subtle">Click a card. The numbers and the filter become one thing, so nothing is shown twice.</p>
    </div>
  )
}

// 4. One-line stat strip under the heading
function StatStrip() {
  return (
    <div className="p-10 text-center">
      <h3 className="text-4xl font-bold tracking-tight">
        All our <span className="font-serif font-normal italic text-violet-bright">work</span>
      </h3>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-fg-muted">
        <span>
          <b className={`text-xl ${gradientNumber}`}>{counts.all}</b> projects
        </span>
        <span className="size-1 rounded-full bg-violet-bright" />
        <span>
          <b className={`text-xl ${gradientNumber}`}>{counts.sites}</b> websites
        </span>
        <span className="size-1 rounded-full bg-violet-bright" />
        <span>
          <b className={`text-xl ${gradientNumber}`}>{counts.apps}</b> apps
        </span>
        <span className="size-1 rounded-full bg-violet-bright" />
        <span>
          building since <b className={`text-xl ${gradientNumber}`}>{since}</b>
        </span>
      </p>
    </div>
  )
}

// 5. Glowing search with rotating examples and a clear button
function GlowSearch() {
  const { query, setQuery, matches } = useSearch()
  const [hint, setHint] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHint((h) => (h + 1) % projects.length), 2500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-8">
      <div className="mx-auto max-w-xl rounded-full bg-line p-px transition-all duration-300 focus-within:bg-linear-to-r focus-within:from-brand focus-within:via-violet focus-within:to-pink-500 focus-within:shadow-[0_0_30px_-5px] focus-within:shadow-violet/60">
        <label className="flex items-center gap-3 rounded-full bg-surface px-5 py-3">
          <Search className="size-5 text-violet-bright" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Try “${projects[hint].title}”`}
            aria-label="Search projects"
            className="w-full bg-transparent outline-none placeholder:text-fg-subtle"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="rounded-full p-1 text-fg-subtle hover:bg-elevated hover:text-fg">
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>
      <Results matches={matches} query={query} />
      <p className="mt-1 text-center text-xs text-fg-subtle">Click in the box: the border lights up. The example in the box changes every few seconds.</p>
    </div>
  )
}

// 6. Search with quick-pick chips
function SearchChips() {
  const { query, setQuery, matches } = useSearch()
  const chips = ['Veterans', 'Marketplace', 'Honey', 'Game', 'Journal']
  return (
    <div className="p-8">
      <label className="mx-auto flex max-w-xl items-center gap-3 rounded-full bg-surface px-5 py-3 ring-1 ring-line focus-within:ring-violet-bright">
        <Search className="size-5 text-fg-subtle" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects" className="w-full bg-transparent outline-none placeholder:text-fg-subtle" />
      </label>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-fg-subtle">Popular:</span>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setQuery(query.toLowerCase() === c.toLowerCase() ? '' : c)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              query.toLowerCase() === c.toLowerCase() ? 'bg-linear-to-r from-brand to-violet text-white' : 'border border-line text-fg-muted hover:text-fg'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <Results matches={matches} query={query} />
    </div>
  )
}

// 7. One toolbar: filter on the left, search on the right, in one outlined bar
function OneToolbar() {
  const { query, setQuery } = useSearch()
  const [filter, setFilter] = useState('all')
  const options = [
    ['all', LayoutGrid, 'All', counts.all],
    ['sites', Globe, 'Websites', counts.sites],
    ['apps', Smartphone, 'Apps', counts.apps],
  ]
  const q = query.trim().toLowerCase()
  const shown = projects.filter(
    (p) => (filter === 'all' || (filter === 'apps') === isApp(p)) && (!q || [p.title, p.description].some((s) => s.toLowerCase().includes(q))),
  )
  return (
    <div className="p-8">
      <div className={`mx-auto max-w-4xl ${outline} rounded-full`}>
        <div className="flex flex-col gap-2 rounded-full bg-bg p-1.5 sm:flex-row sm:items-center">
          <div className="flex">
            {options.map(([value, Icon, label, n]) => {
              const on = filter === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${on ? 'bg-linear-to-r from-brand to-violet text-white shadow-lg shadow-violet/30' : 'text-fg-muted hover:text-fg'}`}
                >
                  <Icon className="size-4" /> {label}
                  <span className={`rounded-full px-1.5 text-xs ${on ? 'bg-white/20' : 'bg-elevated'}`}>{n}</span>
                </button>
              )
            })}
          </div>
          <span className="hidden h-6 w-px bg-line sm:block" />
          <label className="flex flex-1 items-center gap-2 px-3">
            <Search className="size-4 text-fg-subtle" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects" className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-fg-subtle" />
          </label>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-fg-muted">Showing {shown.length}: {shown.map((p) => p.title).join(', ') || 'nothing'}</p>
      <p className="mt-1 text-center text-xs text-fg-subtle">The stat boxes go away: the counts already live in the filter.</p>
    </div>
  )
}

const ideas = [
  { title: 'What’s there now', description: 'The current stat boxes and search, for comparison. The same counts also appear on the filter buttons.', Component: Current, tag: 'Current' },
  { title: 'Home-style stat cards', description: 'Gradient-outlined cards with an icon and gradient number, like the Home page stats. Adds “Building since 2025”.', Component: HomeStyleStats },
  { title: 'Stat cards as the filter', description: 'The stat cards become the filter buttons. Click one to show those projects. No more showing the counts twice.', Component: StatFilters },
  { title: 'One-line stat strip', description: 'The numbers as one sentence under the heading. Lighter, and leaves the space to the projects.', Component: StatStrip },
  { title: 'Glowing search', description: 'The search border lights up with your gradient when you click in, the example changes, and there’s a clear (✕) button.', Component: GlowSearch },
  { title: 'Search with quick picks', description: 'One-click chips under the search for common searches.', Component: SearchChips },
  { title: 'One toolbar', description: 'Filter on the left, search on the right, in one gradient-outlined bar. The stat boxes are removed.', Component: OneToolbar },
]

export default function ProjectsToolbarIdeas() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl font-bold">Stats &amp; search ideas</h1>
        <p className="mt-3 max-w-3xl text-fg-muted">
          Ideas for the stat boxes and search box on the{' '}
          <Link to="/projects" className="text-brand-bright underline">
            Projects page
          </Link>
          . They use your real projects, and the search boxes really search them.
        </p>
      </header>
      {ideas.map(({ title, description, Component, tag }, i) => (
        <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
            <div>
              <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold">
                {title}
                {tag && <span className="rounded-full bg-elevated px-2.5 py-0.5 text-xs font-normal text-fg-muted">{tag}</span>}
              </h2>
              <p className="mt-1 text-fg-muted">{description}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-bg">
            <Component />
          </div>
        </section>
      ))}
    </div>
  )
}
