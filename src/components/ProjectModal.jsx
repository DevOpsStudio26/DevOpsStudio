import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, X } from 'lucide-react'
import SmartImage from './SmartImage'
import TerminalRunner from './TerminalRunner'
import { TERMINAL_PROGRAMS } from '../lib/terminal/terminalPrograms'

// Previous/Next: like the close button, on hover they grow a little and turn the brand gradient with a soft glow,
// and the arrow nudges the way it points.
const stepButton =
  'group flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm text-fg-muted transition duration-200 hover:scale-105 hover:border-transparent hover:bg-linear-to-br hover:from-brand hover:to-violet hover:text-white hover:shadow-lg hover:shadow-violet/50 motion-reduce:hover:scale-100'

// The bottom-right call to action; on hover it lifts and its glow grows.
const ctaButton =
  'group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-linear-to-r from-brand to-violet px-5 py-2 text-sm text-white shadow-lg shadow-violet/30 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/60 motion-reduce:hover:translate-y-0'

// On hover a light sweeps across the call to action once, like the shimmer on "See them all"; it snaps back unseen on leave
function Shimmer() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 -left-[60%] w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent group-hover:left-[130%] group-hover:transition-[left] group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
    />
  )
}

// Popup with a project's full details. Escape or clicking outside closes it; arrow keys step through.
export default function ProjectModal({ project, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)
  // Terminal projects (a `play` value in siteData) let visitors run the program here instead of showing a screenshot
  const terminal = project.play ? TERMINAL_PROGRAMS[project.play] : null

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // Arrow keys move the cursor while typing (e.g. in a project's terminal), not to another project
      if (e.target.closest?.('input, textarea')) return
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Lock page scroll and move focus into the popup while it's open.
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      {/* The same glowing blue-purple-pink border the project cards get on hover */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl animate-line-in rounded-2xl bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-[0_0_60px_-10px] shadow-violet/60"
      >
        <div className="relative max-h-[90vh] overflow-y-auto rounded-[15px] bg-bg">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            // On hover: grows a little and turns the brand gradient with a soft glow
            className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white transition duration-200 hover:scale-115 hover:bg-linear-to-br hover:from-brand hover:to-violet hover:shadow-lg hover:shadow-violet/50 motion-reduce:hover:scale-100"
          >
            <X className="size-5" />
          </button>

          {terminal ? (
            // Top padding keeps the close button clear of the terminal's title bar
            <div className="px-4 pt-16 sm:px-6">
              <TerminalRunner
                key={project.title}
                program={terminal.program}
                title={`${project.title} · ${terminal.command}`}
                intro={terminal.intro}
                tip={terminal.tip}
                runLabel={terminal.runLabel}
              />
            </div>
          ) : (
            <SmartImage key={project.image} src={project.image} alt={project.title} fallbackLabel={project.image} className="aspect-video w-full object-cover" />
          )}

          <div key={project.title} className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-badge px-3 py-1 text-xs text-brand-bright">{project.category}</span>
              <span className="flex items-center gap-1.5 text-sm text-fg-subtle">
                <Calendar className="size-3.5" /> {project.year}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold">{project.title}</h2>
            <p className="mt-4 leading-relaxed text-fg-muted">{project.description}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className={stepButton}
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Previous
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className={stepButton}
                >
                  Next <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
              {/* Like the Portfolio site: terminal projects run right here, so they say so instead. Otherwise the button
                  opens the live site (or the GitHub repo for code-only projects) in a new tab, and stays greyed out
                  until the project's link is filled in in siteData. */}
              {terminal ? (
                <span className="max-w-xs text-sm text-fg-subtle">Runs entirely in your browser. Nothing you type is sent anywhere.</span>
              ) : project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={ctaButton}>
                  {project.url.includes('github.com') ? 'View on GitHub' : 'Visit live site'}{' '}
                  <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <Shimmer />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Live link coming soon"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-5 py-2 text-sm text-white opacity-50 ring-1 ring-white/15"
                >
                  Visit live site <ExternalLink className="size-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
