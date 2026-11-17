import { useId } from 'react'

const INF = 'M32 32c-5-7-9-11-15-11a11 11 0 1 0 0 22c6 0 10-4 15-11s9-11 15-11a11 11 0 1 1 0 22c-6 0-10-4-15-11Z'

// The Infinity Loop logo: a blue-to-purple (sky blue in light mode) infinity sign in a glowing circle. Also used as the navbar logo.
export function InfinityMark({ className = 'size-12', iconClassName = 'size-7' }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full border border-line bg-bg shadow-[0_0_24px] shadow-violet/40 ${className}`}>
      <svg viewBox="0 0 64 64" className={iconClassName} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`inf-${id}`} x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" style={{ stopColor: 'var(--color-violet-bright)' }} />
          </linearGradient>
        </defs>
        <path d={INF} stroke={`url(#inf-${id})`} strokeWidth="6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

// The Infinity Loop logo, centered on the line where two sections meet.
// It takes up no space: put it between two sections and it sits on top of the boundary (and any beam line there).
export default function InfinityDivider() {
  return (
    <div aria-hidden="true" className="relative z-20 h-0">
      <InfinityMark className="absolute top-0 left-1/2 size-12 -translate-1/2" />
    </div>
  )
}
