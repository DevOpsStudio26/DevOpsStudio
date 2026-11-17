import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import { navLinks } from '../data/siteData'

function getInitialTheme() {
  try {
    return localStorage.getItem('theme') || 'dark'
  } catch {
    return 'dark'
  }
}

export default function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage unavailable; theme just won't persist
    }
  }, [theme])

  // The current page gets a gradient pill, like the filter on the Projects page.
  const linkClass = ({ isActive }) =>
    `rounded-full transition-all duration-300 ${
      isActive ? 'bg-linear-to-r from-brand to-violet text-white shadow-lg shadow-violet/30' : 'text-fg-muted hover:bg-elevated hover:text-fg'
    }`

  const ThemeIcon = theme === 'dark' ? Sun : Moon

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo infinity />

        <div className="flex items-center gap-2 md:gap-4">
          {/* Phones use the floating menu at the bottom instead (MobileTabBar) */}
          <ul className="hidden items-center gap-1 rounded-full bg-surface p-1 text-sm ring-1 ring-line md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={(s) => `block px-4 py-1.5 ${linkClass(s)}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex size-9 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:bg-elevated"
          >
            <ThemeIcon className="size-4.5" />
          </button>

        </div>
      </nav>

    </header>
  )
}
