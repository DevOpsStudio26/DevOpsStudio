// Thin lines along the top and bottom edges of a section, with streaks of light running across them: left to right
// along the top, right to left along the bottom. The section needs `relative overflow-hidden`.
// `line` is the line's color (the hero uses a faint white; light sections use the theme's line color).
// `only="top"` or `only="bottom"` draws just that edge (e.g. when the section above already has a beam there).
// `flip` makes the streaks travel the other way.
// `boost` is for a dark section on a light page (the hero in light mode): there the edge meets white, and a thin
//   violet streak disappears into that boundary, so in light mode the streaks get thicker, brighter and glowier.
// The moving streaks are hidden for visitors who turn off animations.
const edges = [
  { edge: 'top', side: 'top-0', reverse: false, delays: [0, 5] },
  { edge: 'bottom', side: 'bottom-0', reverse: true, delays: [2.5, 7.5] },
]

const boosted = '[.light_&]:h-[3px] [.light_&]:via-fuchsia-300 [.light_&]:shadow-[0_0_18px_5px] [.light_&]:shadow-violet-bright/80'

export default function EdgeBeams({ line = 'bg-white/10', only, flip = false, boost = false }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {edges.filter(({ edge }) => !only || edge === only).map(({ side, reverse, delays }) => (
        <div key={side} className={`absolute inset-x-0 h-px ${line} ${side}`}>
          {delays.map((delay) => (
            // Anchored to the section's inside edge, so a thicker (boosted) streak grows inward, not off the edge
            <span
              key={delay}
              className={`absolute ${side} h-px w-48 bg-linear-to-r from-transparent via-violet-bright to-transparent shadow-[0_0_12px_2px] shadow-violet/60 animate-beam-across motion-reduce:hidden ${boost ? boosted : ''}`}
              // fill-mode backwards: while waiting for its delay, a streak sits off the edge instead of parked at the left
              style={{
                animationDelay: `${delay}s`,
                animationDirection: reverse !== flip ? 'reverse' : 'normal',
                animationFillMode: 'backwards',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
