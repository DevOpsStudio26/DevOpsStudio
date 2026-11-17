import { constellationGlobe, useCanvasScene } from '../lib/canvasScenes'

// Home hero backdrop: interactive starfield with a turning network globe on the right.
export default function HeroGlobeBackground() {
  const ref = useCanvasScene(constellationGlobe)
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#05050a]">
      <div className="absolute inset-0 bg-radial-[at_70%_45%] from-hero-tint to-transparent to-70%" />
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  )
}
