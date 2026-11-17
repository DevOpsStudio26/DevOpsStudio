import { useState } from 'react'
import {
  BadgeDollarSign,
  Check,
  Code2,
  FolderOpen,
  Handshake,
  Heart,
  LifeBuoy,
  MessageCircle,
  RotateCcw,
  Shield,
  Target,
  Zap,
} from 'lucide-react'
import ApproachSection from '../components/ApproachSection'
import DotGrid from '../components/DotGrid'
import MissionPanel from '../components/MissionPanel'
import ReasonList from '../components/ReasonList'
import Reveal from '../components/Reveal'

const missionPoints = [
  {
    title: 'What we believe',
    text: 'At DevOps Studio, our mission is to empower businesses through innovative technology solutions. We believe that every company, regardless of size, deserves access to professional, high-quality web and mobile applications that help them grow and succeed.',
  },
  {
    title: 'How we do it',
    text: 'We combine technical expertise with creative thinking to deliver solutions that not only meet your requirements but also delight your users and drive measurable results for your business.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Client-Focused',
    text: 'Your success is our priority. We work closely with you to understand your goals and deliver solutions that exceed expectations.',
    practice: [
      'A free first call to learn your business',
      'Weekly updates you can actually understand',
      'You approve every major step',
    ],
  },
  {
    icon: Zap,
    title: 'Innovation',
    text: 'We stay ahead of technology trends to provide cutting-edge solutions that give you a competitive advantage.',
    practice: [
      'Fast, mobile-first sites',
      'Automation that saves you time',
      'Only new tech that helps you, never tech for show',
    ],
  },
  {
    icon: Shield,
    title: 'Quality & Security',
    text: 'We follow industry best practices and security standards to ensure your applications are reliable and secure.',
    practice: [
      'Every site tested on phones and computers',
      'Secure hosting and regular backups',
      'Updates so nothing goes stale',
    ],
  },
  {
    icon: Heart,
    title: 'Passion',
    text: 'We love what we do, and it shows in the quality of our work and the relationships we build with our clients.',
    practice: ['We sweat the small details', 'We pick up the phone', 'We are proud to put our name on it'],
  },
]

// Shown in the numbered Why Choose list. `short` and `icon` are used by the Reason Circle idea (/why-choose-ideas).
const reasons = [
  {
    icon: Handshake,
    title: 'Work directly with the builders',
    short: 'Direct contact',
    text: 'No account managers or hand-offs. The people you talk to are the people building your site.',
  },
  {
    icon: Code2,
    title: 'Modern technology',
    short: 'Modern tech',
    text: 'We use current, proven tools so your site is fast, secure and easy to grow.',
  },
  {
    icon: MessageCircle,
    title: 'Clear communication',
    short: 'Clear updates',
    text: 'Regular updates in plain English. You always know where your project stands.',
  },
  {
    icon: LifeBuoy,
    title: 'Support after launch',
    short: 'Real support',
    text: 'We don’t disappear when the site goes live. We keep it running smoothly.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fair, upfront pricing',
    short: 'Fair pricing',
    text: 'You get a clear quote before work starts. No surprise bills.',
  },
  {
    icon: FolderOpen,
    title: 'Real work you can see',
    short: 'Proven work',
    text: 'Look through our projects and judge our work for yourself.',
    link: '/projects',
  },
]

const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

// Flips on hover (mouse) or tap (touch) to show what the value looks like in practice.
function ValueCard({ icon: Icon, title, text, practice }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${title}: ${flipped ? 'show description' : 'show what this looks like'}`}
      className="group h-80 w-full text-left perspective-[1000px]"
    >
      <div
        className={`relative size-full transition-transform duration-500 transform-3d motion-reduce:transition-none [@media(hover:hover)]:group-hover:rotate-y-180 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front: dark grid with a purple glow inside a thin blue-purple-pink outline */}
        <div className="absolute inset-0 rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow backface-hidden">
          <div className="theme-dark relative isolate flex size-full flex-col overflow-hidden rounded-[15px] bg-[#07070d] p-6">
            <div
              aria-hidden="true"
              className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`}
            />
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-16 -z-10 size-48 rounded-full bg-violet/30 blur-3xl"
            />
            <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{text}</p>
            <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-fg-subtle">
              <RotateCcw className="size-3" /> Flip to see it in action
            </span>
          </div>
        </div>
        {/* Back: the brand gradient with faint grid lines */}
        <div className="absolute inset-0 isolate flex rotate-y-180 flex-col justify-center overflow-hidden rounded-2xl bg-linear-135 from-brand to-violet p-6 text-white backface-hidden">
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} opacity-70`} />
          <h3 className="text-lg font-semibold">What this looks like</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            {practice.map((p) => (
              <li key={p} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}
export default function About() {
  return (
    <div className="overflow-x-clip py-20">
      <DotGrid />
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {/* Each section slides in as it scrolls into view, like the Portfolio page */}
        <Reveal from="down">
          <header className="text-center">
            <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">Who we are</div>
            <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
              About <span className="font-serif font-normal italic text-violet-bright">DevOps Studio</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-fg-muted">
              We are a passionate team dedicated to creating exceptional digital experiences for businesses of all
              sizes.
            </p>
          </header>
        </Reveal>

        <section className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <h2 className="text-5xl font-bold tracking-tight">Our Mission</h2>
            {/* Numbered with the same gradient circles and line as the Why choose list */}
            <ol className="relative mt-10 space-y-8 pl-16">
              <span
                aria-hidden="true"
                className="absolute top-5 bottom-5 left-5 w-0.5 bg-linear-to-b from-brand via-violet to-pink-500 opacity-60"
              />
              {missionPoints.map(({ title, text }, i) => (
                <li key={title} className="relative">
                  <span className="absolute top-0 -left-16 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet font-mono text-sm text-white shadow-lg shadow-violet/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="pt-1.5 text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-fg-muted">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal from="right" delay={200}>
            <MissionPanel />
          </Reveal>
        </section>

        <section>
          <Reveal>
            <h2 className="text-center text-3xl font-bold">Our Values</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 150}>
                <ValueCard {...value} />
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <ReasonList
            reasons={reasons}
            heading={
              <>
                Why choose <span className="font-serif font-normal italic text-violet-bright">DevOps Studio?</span>
              </>
            }
            intro="Six honest reasons small businesses work with a two-person studio."
          />
        </Reveal>

        <Reveal>
          <ApproachSection variant="split" />
        </Reveal>
      </div>
    </div>
  )
}
