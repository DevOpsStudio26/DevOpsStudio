import ProcessTimeline from './ProcessTimeline'

const blurb =
  'We follow a collaborative, transparent process that keeps you involved at every step. From initial consultation to final deployment and beyond, we ensure clear communication, regular updates, and a focus on delivering exactly what you need.'

// "Our Approach" on the About page.
// variant="band" (default): a dark band with a faint grid and a purple glow. theme-dark keeps it, and the
//   timeline inside, dark in light mode too.
// variant="split": heading and text on the left, the timeline in its own card on the right, on the same dark
//   grid-and-glow background as the band. Both have the thin blue-purple-pink outline.
export default function ApproachSection({ variant = 'band' }) {
  if (variant === 'split') {
    return (
      <section className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow">
        <div className="theme-dark relative isolate grid items-center gap-10 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8 sm:p-12 lg:grid-cols-[2fr_3fr]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-20 -z-10 size-96 rounded-full bg-violet/30 blur-3xl"
          />
          <div>
            <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">How we work</div>
            <h2 className="mt-3 text-4xl font-bold">Our Approach</h2>
            <p className="mt-6 leading-relaxed text-fg-muted">{blurb}</p>
          </div>
          {/* No card: just grid lines fading out in every direction around the steps */}
          <div className="relative isolate p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            />
            <ProcessTimeline />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow">
      <div className="theme-dark relative isolate overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d] p-8 text-center sm:p-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl"
        />
        <h2 className="text-3xl font-bold">Our Approach</h2>
        <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-fg-muted">{blurb}</p>
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  )
}
