import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

// A styled dropdown that replaces the browser's own <select> list, which can't be styled.
// It still works in forms: a hidden input carries `name`, `required` and the chosen value, and it resets with the form.
// Keyboard: Enter, Space or the arrow keys open it; arrows move; Enter picks; Escape closes.
export default function Select({ name, options, placeholder, required = false, defaultValue = '', id }) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const buttonRef = useRef(null)
  const listId = useId()

  // Close when clicking anywhere else
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Go back to the default when the form is reset (e.g. after sending)
  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const onReset = () => setValue(defaultValue)
    form.addEventListener('reset', onReset)
    return () => form.removeEventListener('reset', onReset)
  }, [defaultValue])

  function openList() {
    setActive(Math.max(0, options.indexOf(value)))
    setOpen(true)
  }

  function choose(option) {
    setValue(option)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function onKeyDown(e) {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(options.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(options[active])
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      {/* Carries the value for the form; it also lets the browser's "please fill in this field" check work */}
      <input
        ref={inputRef}
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        onFocus={() => buttonRef.current?.focus()}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0"
      />
      <button
        ref={buttonRef}
        id={id}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white/5 px-4 py-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-violet-bright/30 ${
          open ? 'border-violet-bright' : 'border-white/10 hover:border-white/20 focus:border-violet-bright'
        }`}
      >
        <span className={value ? 'text-fg' : 'text-fg-subtle'}>{value || placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 text-fg-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={placeholder}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d16]/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl animate-line-in [animation-duration:0.15s]"
        >
          {options.map((option, i) => {
            const selected = option === value
            return (
              <li
                key={option}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  i === active ? 'bg-linear-to-r from-brand/30 to-violet/30 text-fg' : 'text-fg-muted'
                }`}
              >
                {option}
                {selected && <Check className="size-4 text-violet-bright" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
