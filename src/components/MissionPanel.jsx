import { CircuitBoard } from 'lucide-react'

const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

// The square beside "Our Mission" on the About page: a dark grid panel with a gradient outline, the logo glowing in
// the middle and rings pulsing out. (Swap the logo block for an <img> here when a photo is ready.)
export default function MissionPanel() {
  return (
    <div aria-hidden="true" className="rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px card-shadow">
      <div className="theme-dark relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#07070d]">
        <div className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
        <div className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-violet/30 blur-3xl" />
        {[0, 1, 2].map((r) => (
          <span
            key={r}
            className="absolute inset-0 m-auto rounded-full border border-violet-bright/25 animate-ping-slow motion-reduce:hidden"
            style={{ width: `${40 + r * 20}%`, height: `${40 + r * 20}%`, animationDelay: `${r * 0.6}s`, animationDuration: '3s' }}
          />
        ))}
        <span className="relative flex size-28 items-center justify-center rounded-3xl bg-linear-to-br from-brand to-violet text-white shadow-2xl shadow-violet/50">
          <CircuitBoard className="size-14" />
        </span>
      </div>
    </div>
  )
}
