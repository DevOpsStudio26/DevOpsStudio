import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'

// A terminal window that runs a project's program in the browser; visitors type answers at the prompt.
// `program({ write, readLine, ready })` runs it: write() prints, readLine(prompt) resolves with what the visitor
// typed, and ready() swaps the loading message for the program's output.
// Always dark like a real terminal; the accents follow the theme (purple in dark mode, sky blue in light).
export default function TerminalRunner({ program, title, intro, tip, runLabel = 'Run it' }) {
  // 'idle' | 'loading' | 'running' | 'done' | 'error'
  const [phase, setPhase] = useState('idle')
  const [output, setOutput] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [line, setLine] = useState('')
  const pendingRef = useRef(null)
  const runIdRef = useRef(0)
  const screenRef = useRef(null)
  const inputRef = useRef(null)

  // Keep the newest output in view
  useEffect(() => {
    const screen = screenRef.current
    if (screen) {
      screen.scrollTop = screen.scrollHeight
      screen.scrollLeft = 0
    }
  }, [output, waiting])

  // preventScroll: focusing shouldn't slide a wide terminal sideways
  useEffect(() => {
    if (waiting) inputRef.current?.focus({ preventScroll: true })
  }, [waiting])

  // Closing the popup (or moving to another project) mid-run: stop answering the old run
  useEffect(
    () => () => {
      runIdRef.current += 1
    },
    [],
  )

  const start = async () => {
    const runId = ++runIdRef.current
    const isCurrent = () => runId === runIdRef.current
    pendingRef.current = null
    setWaiting(false)
    setLine('')
    setOutput('')
    setPhase('loading')

    try {
      await program({
        ready: () => {
          if (isCurrent()) setPhase('running')
        },
        write: (text) => {
          if (isCurrent()) setOutput((prev) => prev + text)
        },
        readLine: (prompt = '') => {
          if (!isCurrent()) return new Promise(() => {})
          setOutput((prev) => prev + prompt)
          setWaiting(true)
          return new Promise((resolve) => {
            pendingRef.current = resolve
          })
        },
      })
      if (isCurrent()) setPhase('done')
    } catch (error) {
      if (!isCurrent()) return
      setOutput((prev) => `${prev}\n${error.message || error}\n`)
      setPhase('error')
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const resolve = pendingRef.current
    if (!resolve) return
    pendingRef.current = null
    setOutput((prev) => `${prev}${line}\n`)
    setLine('')
    setWaiting(false)
    resolve(line)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c10] text-left shadow-lg">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#18181f] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-neutral-400">{title}</span>
        {phase !== 'idle' && phase !== 'loading' && (
          <button
            type="button"
            onClick={start}
            className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-neutral-300 transition hover:border-violet-bright hover:text-violet-bright"
          >
            <RotateCcw className="size-3" /> Restart
          </button>
        )}
      </div>

      <div
        ref={screenRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
        aria-label={`${title} output`}
        className="h-[min(52vh,26rem)] cursor-text overflow-auto p-3 sm:p-4"
      >
        {phase === 'idle' ? (
          <div className="flex h-full flex-col items-center justify-center gap-2.5 text-center text-neutral-300">
            <p className="max-w-[34ch]">{intro}</p>
            {tip && <p className="max-w-[34ch] text-sm text-neutral-400">{tip}</p>}
            <button
              type="button"
              onClick={start}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-brand to-violet px-5 py-3 font-semibold text-white shadow-lg shadow-violet/40 transition hover:-translate-y-0.5 hover:shadow-violet/60 motion-reduce:hover:translate-y-0"
            >
              <Play className="size-4 fill-current" />
              {runLabel}
            </button>
          </div>
        ) : (
          // Lines never wrap, like a real terminal: menus and tables keep their shape and the screen scrolls sideways
          <pre className="m-0 font-mono text-xs leading-relaxed whitespace-pre text-neutral-200 sm:text-sm">
            {phase === 'loading' ? 'Starting… (the first run takes a few seconds)\n' : output}
            {waiting && (
              <form onSubmit={submit} className="inline">
                <input
                  ref={inputRef}
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  aria-label="Type your answer and press Enter"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  enterKeyHint="send"
                  // A fixed width in characters, so long table lines don't stretch it off to the right
                  className="w-[16ch] border-0 bg-transparent p-0 font-mono text-violet-bright caret-violet-bright outline-none"
                />
              </form>
            )}
            {phase === 'done' && <span className="text-neutral-500">{'\n'}[Program finished. Press Restart to run it again.]</span>}
          </pre>
        )}
      </div>
    </div>
  )
}
