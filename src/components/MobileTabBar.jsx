import { NavLink } from 'react-router-dom'
import { Briefcase, FolderKanban, House, Mail, Users } from 'lucide-react'
import { navLinks } from '../data/siteData'

// Phones only: a floating frosted menu at the bottom of the screen, where thumbs reach. It replaces the menu
// button at the top on small screens. The current page gets the gradient pill (purple in dark mode, sky in light).
const icons = { '/': House, '/projects': FolderKanban, '/about': Users, '/portfolio': Briefcase, '/contact': Mail }
// Shorter labels so all five fit on a narrow phone
const shortLabels = { 'About Us': 'About' }

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-50 rounded-2xl border border-line bg-surface/80 p-1.5 shadow-lg backdrop-blur-md md:hidden"
    >
      <ul className="flex justify-between gap-1">
        {navLinks.map((link) => {
          const Icon = icons[link.to] ?? House
          return (
            <li key={link.to} className="flex-1">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[0.68rem] transition-all duration-300 ${
                    isActive ? 'bg-linear-to-br from-brand to-violet text-white shadow-lg shadow-violet/30' : 'text-fg-subtle hover:text-fg'
                  }`
                }
              >
                <Icon className="size-5" />
                {shortLabels[link.label] ?? link.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
