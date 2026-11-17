import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Mail } from 'lucide-react'
import SmartImage from '../components/SmartImage'
import DotGrid from '../components/DotGrid'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { contactEmail, team } from '../data/siteData'

const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'


// Thin blue-purple-pink outline used around the photo and the details panel, matching the About page
const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow'

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          <span className="flex size-5 shrink-0 translate-y-1 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white">
            <Check className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// True once the element has scrolled into view (stays true after that).
function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
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
  }, [ref, threshold])
  return inView
}

// Slide-in classes: hidden off to one side until scrolled into view. Visitors who turn off animations
// see everything in place straight away.
const slide = 'transition-all duration-1000 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none'

function Member({ member, reverse }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  // The photo slides in from its own side, the details from the other
  const photoFrom = reverse ? 'translate-x-12' : '-translate-x-12'
  const detailsFrom = reverse ? '-translate-x-12' : 'translate-x-12'
  const socials = [
    { href: member.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: member.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: member.links.email, label: 'Email', Icon: Mail },
  ]
  const [firstName, ...rest] = member.name.split(' ')
  const lastName = rest.join(' ')
  const steps = [
    {
      title: 'Skills & Technologies',
      body: (
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>
      ),
    },
    { title: 'Key Achievements', body: <CheckList items={member.achievements} /> },
    { title: 'Notable Projects', body: <CheckList items={member.notableProjects} /> },
  ]

  return (
    <article ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
      {/* The photo sits on a dark grid panel with a purple glow and soft rings pulsing out behind it */}
      <div
        className={`${outline} ${slide} mx-auto w-full max-w-md ${reverse ? 'lg:order-2' : ''} ${
          inView ? 'translate-x-0 opacity-100' : `${photoFrom} opacity-0`
        }`}
      >
        <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-violet/30 blur-3xl" />
          {[0, 1].map((r) => (
            <span
              key={r}
              aria-hidden="true"
              className="absolute inset-0 -z-10 m-auto rounded-full border border-violet-bright/20 animate-ping-slow motion-reduce:hidden"
              style={{ width: `${70 + r * 20}%`, height: `${70 + r * 20}%`, animationDelay: `${r * 0.8}s`, animationDuration: '3.5s' }}
            />
          ))}
          {/* Fixed 4:5 frame so every photo shows at the same size, whatever the file's dimensions */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-linear-to-br from-[#1a1a45] to-photo-end shadow-2xl">
            <SmartImage src={member.image} alt={member.name} fallbackLabel={member.image} className="size-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 bg-linear-to-t from-black/60 to-transparent pt-16 pb-5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${member.name} on ${label}`}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:bg-brand"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details in a dark grid panel with a purple glow; theme-dark keeps it dark in light mode */}
      <div className={`${outline} ${slide} delay-200 ${inView ? 'translate-x-0 opacity-100' : `${detailsFrom} opacity-0`}`}>
        <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`} />
          <div aria-hidden="true" className="absolute -top-20 -left-20 -z-10 size-64 rounded-full bg-violet/30 blur-3xl" />
          {/* First name bold, last name in italic purple */}
          <h2 className="text-5xl font-bold tracking-tight">
            {firstName} <span className="font-serif font-normal italic text-violet-bright">{lastName}</span>
          </h2>
          <p className="mt-1 text-violet-bright">{member.role}</p>
          <p className="mt-4 leading-relaxed text-fg-muted">{member.bio}</p>

          {/* Skills, achievements and projects as numbered steps joined by a gradient line, like Why choose on About */}
          <ol className="relative mt-8 space-y-8 pl-14">
            <span aria-hidden="true" className="absolute top-4 bottom-4 left-4 w-0.5 bg-linear-to-b from-brand via-violet to-pink-500 opacity-60" />
            {steps.map(({ title, body }, i) => (
              <li key={title} className="relative">
                <span className="absolute top-0 -left-14 flex size-8 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet font-mono text-xs text-white shadow-lg shadow-violet/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="pt-1 font-semibold">{title}</h3>
                <div className="mt-3">{body}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  // The header slides down from the top as the page opens; "Let's Work Together" slides up from below when
  // scrolled into view
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef)
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef)

  return (
    <div className="overflow-x-clip py-20">
      <DotGrid />
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {/* A huge outlined "TEAM" sits behind the heading, with a small purple glow in the middle */}
        <header
          ref={headerRef}
          className={`relative isolate overflow-x-clip py-16 text-center transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            headerInView ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
          }`}
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-64 rounded-full bg-violet/25 blur-3xl" />
          <span
            aria-hidden="true"
            className="ghost-word text-[clamp(4rem,16vw,9.5rem)]"
          >
            TEAM
          </span>
          <h1 className="text-6xl font-bold tracking-tight">
            Meet Our <span className="font-serif font-normal italic text-violet-bright">Team</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">
            A dynamic duo combining technical expertise with creative excellence to deliver outstanding results.
          </p>
        </header>

        {team.map((m, i) => (
          <Member key={m.name} member={m} reverse={i % 2 === 1} />
        ))}

        {/* Dark grid panel with the gradient outline: text on the left, the button and email on the right */}
        <section
          ref={ctaRef}
          className={`${outline} transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="theme-dark relative isolate grid items-center gap-8 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8 sm:p-12 lg:grid-cols-[3fr_2fr]">
            <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
            <div aria-hidden="true" className="absolute -top-20 -left-20 -z-10 size-96 rounded-full bg-violet/30 blur-3xl" />
            <div>
              <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">Have a project in mind?</div>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Let's Work Together</h2>
              <p className="mt-4 text-lg text-fg-muted">
                We're always excited to take on new challenges and collaborate with passionate clients. Get in touch to
                discuss your project.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-8 py-3.5 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50"
              >
                Start a Conversation <ArrowRight className="size-4" />
              </Link>
              <a href={`mailto:${contactEmail}`} className="inline-flex items-center justify-center gap-2 text-sm text-fg-muted hover:text-fg">
                <Mail className="size-4" /> or email {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
