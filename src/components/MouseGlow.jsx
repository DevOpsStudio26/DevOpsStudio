import { useEffect, useRef } from 'react'

// A soft purple light behind the whole page that follows the mouse. It sits in a fixed layer behind the content,
// so it stays put while the page scrolls. On touch screens it simply rests near the top of the page.
export default function MouseGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const move = (e) => {
      ref.current?.style.setProperty('--x', `${e.clientX}px`)
      ref.current?.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 [--x:50vw] [--y:30vh]"
      style={{ background: 'radial-gradient(600px circle at var(--x) var(--y), color-mix(in srgb, var(--color-violet) 16%, transparent), transparent 60%)' }}
    />
  )
}
