import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import EdgeBeams from './EdgeBeams'
import SmartImage from './SmartImage'
import { projects } from '../data/siteData'

const rows = [projects, [...projects].reverse()]

// Hero for the Projects page: every project's screenshot scrolling slowly in two tilted rows behind
// a big gradient headline. Stays dark in both themes. "See them all" calls onSeeAll (scroll to the cards).
// On arrival the headline wipes in from left to right, then a light sweeps once across the button.
export default function ProjectsHero({ onSeeAll }) {
  // False on the first frame, so the entrance transitions have something to animate from.
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 60)
    return () => clearTimeout(id)
  }, [])

  return (
    <section className="theme-dark relative isolate overflow-hidden bg-[#05050a] py-28 text-center text-white sm:py-36">
      <EdgeBeams boost />
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex -rotate-6 flex-col justify-center gap-5 opacity-60">
        {rows.map((row, r) => (
          <div
            key={r}
            className="flex w-max animate-marquee gap-5 motion-reduce:animate-none"
            style={{ animationDirection: r ? 'reverse' : 'normal', animationDuration: '60s' }}
          >
            {/* Each row twice, so the loop has no gap */}
            {[...row, ...row].map((p, n) => (
              <SmartImage key={n} src={p.image} alt="" className="aspect-video w-72 shrink-0 rounded-xl object-cover object-top" />
            ))}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0.85)_20%,rgba(5,5,10,0.45)_55%,rgba(5,5,10,0.1))]" />
      <div className="px-4 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.3em] text-violet-300 uppercase">Our work</p>
        <h1 className="mt-4 bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-5xl font-bold tracking-tight text-transparent transition-[clip-path] delay-200 duration-[1200ms] ease-out motion-reduce:transition-none sm:text-7xl"
          style={{ clipPath: entered ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
        >
          Things we&apos;ve built
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
          Real work for real clients: shops, clubs, games and more.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSeeAll}
            className="group relative inline-flex items-center overflow-hidden gap-2 rounded-full bg-linear-to-r from-brand to-violet px-8 py-3.5 font-medium text-white shadow-lg shadow-violet/40 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/60 motion-reduce:hover:translate-y-0"
          >
            {/* Same gradient button as the rest of the site; the arrow bobs to hint at scrolling */}
            See them all <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
            {/* One-time shimmer, once the headline has wiped in */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent transition-[left] delay-[1300ms] duration-1000 ease-out motion-reduce:hidden"
              style={{ left: entered ? '130%' : '-60%' }}
            />
            {/* And again on every hover; it snaps back unseen when the pointer leaves */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-[60%] w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent group-hover:left-[130%] group-hover:transition-[left] group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
