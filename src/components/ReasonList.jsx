import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Numbered list of reasons. The heading sits in a small dark grid panel (matching the Our Approach band) that stays
// in place on wide screens while the list scrolls. The numbers are circles joined by a gradient line; hovering a
// reason fills its circle. Each reason: { title, text, link? }.
export default function ReasonList({ reasons, heading, intro }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
      <div className="lg:sticky lg:top-24 lg:h-fit">
        {/* Thin blue-purple-pink outline, matching the other About page panels */}
        <div className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow">
          <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -top-20 -left-20 -z-10 size-64 rounded-full bg-violet/30 blur-3xl"
            />
            <h2 className="text-4xl font-bold tracking-tight">{heading}</h2>
            {intro && <p className="mt-4 text-fg-muted">{intro}</p>}
          </div>
        </div>
      </div>

      <ol className="relative space-y-10 pl-16">
        <span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-5 w-0.5 bg-linear-to-b from-brand via-violet to-pink-500 opacity-60"
        />
        {reasons.map((r, i) => (
          <li key={r.title} className="group relative">
            <span className="absolute top-0 -left-16 flex size-10 items-center justify-center rounded-full border-2 border-violet-bright/50 bg-bg font-mono text-sm transition-all group-hover:scale-110 group-hover:border-transparent group-hover:bg-linear-to-br group-hover:from-brand group-hover:to-violet group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet/40">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="pt-1.5 text-2xl font-semibold">{r.title}</h3>
            <p className="mt-2 text-fg-muted">{r.text}</p>
            {r.link && (
              <Link
                to={r.link}
                className="mt-2 inline-flex items-center gap-1 text-sm text-brand-bright hover:underline"
              >
                See our projects <ArrowRight className="size-3.5" />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
