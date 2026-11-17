// A fine dot pattern behind the whole page, fading out toward the edges: purple dots in dark mode, sky blue in
// light mode (the `dot` theme color). It's fixed, so it stays put while the page scrolls.
export default function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(var(--color-dot)_1.2px,transparent_1.3px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
    />
  )
}
