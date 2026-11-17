import { useEffect, useState } from 'react'
import { CircuitBoard, Code, Rocket, Search } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Discover', text: 'We learn your goals, users and must-haves in a free consultation.' },
  { icon: CircuitBoard, title: 'Design', text: 'Wireframes and a clickable design you approve before we build.' },
  { icon: Code, title: 'Develop', text: 'Weekly demos so you see real progress and can steer early.' },
  { icon: Rocket, title: 'Deploy', text: 'Launch with monitoring and automated backups, then ongoing support.' },
]

const STEP_MS = 6000

// Discover → Deploy steps that play through slowly on their own, looping forever.
export default function ProcessTimeline() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), STEP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute top-6 right-[12.5%] left-[12.5%] h-0.5 bg-elevated">
        <div
          className="h-full bg-linear-to-r from-brand to-violet transition-[width] duration-[1500ms] ease-in-out motion-reduce:transition-none"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <ol className="relative grid grid-cols-4">
        {steps.map(({ icon: Icon, title }, i) => (
          <li key={title} className="text-center" aria-current={i === step ? 'step' : undefined}>
            <div
              className={`mx-auto flex size-12 items-center justify-center rounded-full border-2 transition-all duration-1000 motion-reduce:transition-none ${
                i <= step
                  ? 'border-transparent bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30'
                  : 'border-line bg-bg text-fg-subtle'
              } ${i === step ? 'scale-110' : ''}`}
            >
              <Icon className="size-5" />
            </div>
            <div className={`mt-3 text-sm font-semibold transition-colors duration-1000 ${i === step ? 'text-fg' : 'text-fg-muted'}`}>
              {title}
            </div>
          </li>
        ))}
      </ol>

      <div
        key={step}
        className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-line bg-bg p-6 text-center animate-line-in [animation-duration:0.8s]"
        aria-live="polite"
      >
        <div className="text-sm text-violet-bright">Step {step + 1}</div>
        <div className="mt-1 text-xl font-semibold">{steps[step].title}</div>
        <p className="mt-2 text-fg-muted">{steps[step].text}</p>
        {/* Time until the next step */}
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand to-violet animate-progress motion-reduce:hidden"
          style={{ animationDuration: `${STEP_MS}ms` }}
        />
      </div>
    </div>
  )
}
