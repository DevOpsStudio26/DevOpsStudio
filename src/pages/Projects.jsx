import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProjectsHero from '../components/ProjectsHero'
import ProjectCards from '../components/ProjectCards'
import ProjectModal from '../components/ProjectModal'
import DotGrid from '../components/DotGrid'
import Reveal from '../components/Reveal'
import { projects } from '../data/siteData'
import { HomeStyle } from './ProjectsHeroIdeas'

const stats = [
  [projects.length, 'Projects'],
  [projects.filter((p) => p.category === 'Web Development').length, 'Websites'],
  [projects.filter((p) => p.category === 'App Development').length, 'Apps'],
]

// Screenshot-wall hero, then stats, filters, search and cards for everything.
export default function Projects() {
  // The open popup: the list it was opened from (the filtered cards) and the index in it.
  const [modal, setModal] = useState(null)
  const open = (list, i) => setModal({ list, i })
  const step = (dir) => setModal((m) => ({ ...m, i: (m.i + dir + m.list.length) % m.list.length }))
  // ?hero=2 swaps in the previous "Home style" hero, for /projects-hero-compare.
  const [params] = useSearchParams()

  return (
    <>
      <DotGrid />
      {params.get('hero') === '2' ? (
        <HomeStyle />
      ) : (
        <ProjectsHero onSeeAll={() => document.getElementById('all-work').scrollIntoView({ behavior: 'smooth' })} />
      )}

      <section id="all-work" className="mx-auto max-w-7xl scroll-mt-20 overflow-x-clip px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* The heading slides in from the left and the stats from the right, like About and Portfolio */}
          <Reveal from="left">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              All our{' '}
              <span className="bg-linear-to-r from-brand-bright via-violet-bright to-pink-400 bg-clip-text text-transparent">work</span>
            </h2>
            <p className="mt-3 text-fg-muted">Search by name, or filter by type. Click any project for details.</p>
          </Reveal>
          {/* Stat boxes with the same gradient outline and glow as the filter and search below */}
          <Reveal from="right" delay={150} className="grid grid-cols-3 gap-3">
            {stats.map(([n, label]) => (
              <div key={label} className="rounded-xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/10">
                <div className="h-full rounded-[calc(0.75rem-1px)] bg-bg px-4 py-3 text-center">
                  <div className="text-2xl font-bold">{n}</div>
                  <div className="text-xs text-fg-muted">{label}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <ProjectCards onOpen={open} />

        {/* The closing line, then the button, rise in at the bottom */}
        <div className="mt-20 text-center">
          <Reveal>
            <p className="text-fg-muted">These are just a few examples of our work. We have many more projects under NDA.</p>
          </Reveal>
          <Reveal delay={200}>
          {/* Same gradient button as the rest of the site; on hover it lifts, glows and the arrow nudges right */}
          <Link
            to="/contact"
            className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand to-violet px-8 py-3 font-medium text-white shadow-lg shadow-violet/30 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/60 motion-reduce:hover:translate-y-0"
          >
            Discuss Your Project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            {/* On hover a light sweeps across once, like "See them all"; it snaps back unseen on leave */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-[60%] w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent group-hover:left-[130%] group-hover:transition-[left] group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
            />
          </Link>
          </Reveal>
        </div>
      </section>

      {modal && (
        <ProjectModal project={modal.list[modal.i]} onClose={() => setModal(null)} onPrev={() => step(-1)} onNext={() => step(1)} />
      )}
    </>
  )
}
