import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroGlobeBackground from '../components/HeroGlobeBackground'
import EdgeBeams from '../components/EdgeBeams'
import InfinityDivider from '../components/InfinityDivider'
import BookendCta from '../components/BookendCta'
import Testimonials from '../components/Testimonials'
import BentoServices from '../components/BentoServices'
import DotGrid from '../components/DotGrid'
import ProjectCoverflow from '../components/ProjectCoverflow'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/siteData'

export default function Home() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <DotGrid />
      {/* Hero: stays dark in both themes; data-hero lets the background follow the mouse */}
      <section data-hero className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-[#05050a]">
        <HeroGlobeBackground />
        <EdgeBeams boost />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#05050a]/90 via-[#05050a]/45 via-30% to-transparent to-55%" />

        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="bg-linear-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text pb-2 text-5xl font-bold text-transparent sm:text-6xl">
              Building Digital Excellence
            </h1>
            <p className="mt-6 text-lg text-white/95 sm:text-xl">
              We create stunning websites and powerful applications that help businesses grow and succeed in the
              digital world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-8 py-3 text-white shadow-lg shadow-brand/40 transition hover:shadow-violet/50"
              >
                Start Your Project <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center rounded-lg border border-white/30 px-8 py-3 text-white transition hover:bg-white/10"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services: same heading as Recent Work and Reviews, with a soft purple glow behind the cards */}
      <section className="py-24">
        <div className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="absolute top-40 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet/20 blur-[90px]" />
          {/* Heading like the page headers: italic accent over a huge outlined "SERVICES" with a soft glow */}
          <div className="relative isolate mb-14 overflow-hidden py-6 text-center">
            <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,14vw,10rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
            >
              SERVICES
            </span>
            <h2 className="text-5xl font-bold tracking-tight">
              Our <span className="font-serif font-normal italic text-violet-bright">Services</span>
            </h2>
            <p className="mt-4 text-fg-muted">We offer comprehensive digital solutions tailored to your business needs.</p>
          </div>
          <BentoServices />
        </div>
      </section>

      {/* Infinity logo on the lines between sections */}
      <InfinityDivider />

      {/* Recent work: coverflow of every project; the middle card opens its details */}
      <section className="relative overflow-hidden bg-surface/60 py-24">
        <EdgeBeams line="bg-line" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading like the page headers: italic accent over a huge outlined "WORK" with a soft glow */}
          <div className="relative isolate mb-14 text-center">
            <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-56 rounded-full bg-violet/25 blur-3xl" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[clamp(4rem,14vw,10rem)] leading-none font-black tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-line)]"
            >
              WORK
            </span>
            <h2 className="text-5xl font-bold tracking-tight">
              Recent <span className="font-serif font-normal italic text-violet-bright">Work</span>
            </h2>
            <p className="mt-4 text-fg-muted">A few things we've built lately. Click the middle card for details.</p>
          </div>

          {/* Spotlight: a pool of purple light and a glowing floor under the middle card */}
          <div className="relative isolate">
            <div aria-hidden="true" className="absolute top-4 left-1/2 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet/30 blur-[90px]" />
            <div aria-hidden="true" className="absolute top-[17.5rem] left-1/2 -z-10 h-px w-[40rem] max-w-full -translate-x-1/2 bg-linear-to-r from-transparent via-violet-bright to-transparent" />
            <div aria-hidden="true" className="absolute top-[17.5rem] left-1/2 -z-10 h-24 w-[30rem] max-w-full -translate-x-1/2 bg-linear-to-b from-violet/25 to-transparent [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)]" />
            <ProjectCoverflow projects={projects} onOpen={setOpen} outlined autoPlay={6000} slideMs={1000} />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50"
            >
              See all projects <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <InfinityDivider />

      {/* Testimonials (hidden on the live site until real quotes are added) */}
      <Testimonials />

      {/* With no reviews yet (live site), this lands on the same line as the one above, so they show as one */}
      <InfinityDivider />

      {/* CTA: echoes the hero so the page starts and ends the same way */}
      <BookendCta />
      {open !== null && (
        <ProjectModal
          project={projects[open]}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i - 1 + projects.length) % projects.length)}
          onNext={() => setOpen((i) => (i + 1) % projects.length)}
        />
      )}
    </>
  )
}
