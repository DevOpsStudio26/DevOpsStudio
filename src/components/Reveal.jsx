import { useEffect, useRef, useState } from 'react'

// Where the content starts before it slides into place
const offsets = {
  up: 'translate-y-16', // rises up from below
  down: '-translate-y-16', // drops down from above
  left: '-translate-x-12', // comes in from the left
  right: 'translate-x-12', // comes in from the right
}

// Slides and fades its content into place the first time it scrolls into view (once per visit).
// Visitors who turn off animations see everything in place straight away.
export default function Reveal({ from = 'up', delay = 0, className = '', children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-1000 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : `${offsets[from]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}
