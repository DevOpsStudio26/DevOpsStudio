import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp, Clock, Mail, Phone } from 'lucide-react'
import Logo from './Logo'
import { contactEmail, contactPhone, contactPhoneLink, navLinks } from '../data/siteData'

// Same hours as the Contact page.
const hours = 'Mon-Fri, 9 AM - 5 PM CT'

const contact = [
  { icon: Mail, text: contactEmail, href: `mailto:${contactEmail}` },
  { icon: Phone, text: contactPhone, href: contactPhoneLink },
  { icon: Clock, text: hours },
]

// Faint grid lines behind the footer, fading out toward the bottom.
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]'

// Dark in both themes (theme-dark), with a gradient line along the top and a purple glow.
export default function Footer() {
  return (
    <footer className="theme-dark relative isolate overflow-hidden bg-[#07070d]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-brand via-violet to-pink-500" />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]`} />
      <div aria-hidden="true" className="absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo small />
            <p className="mt-4 max-w-sm text-sm text-fg-muted">Building exceptional websites and apps for clients and companies.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand to-violet px-6 py-3 font-medium text-white shadow-lg shadow-violet/30 transition hover:shadow-violet/50"
            >
              Start a project <ArrowRight className="size-4" />
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Pages</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-fg-muted transition-colors hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              {contact.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3 text-fg-muted">
                  <Icon className="size-4 shrink-0 text-violet-bright" />
                  {href ? (
                    <a href={href} className="break-all transition-colors hover:text-fg">
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-sm text-fg-subtle">© {new Date().getFullYear()} DevOps Studio. All rights reserved.</p>
          {/* Thin gradient outline like the site's panels; the arrow lifts on hover */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group rounded-full bg-linear-135 from-brand via-violet to-pink-500 p-px shadow-lg shadow-violet/20 transition hover:shadow-violet/40"
          >
            <span className="flex items-center gap-3 rounded-full bg-[#07070d] py-1.5 pr-1.5 pl-5 text-sm font-medium text-fg transition-colors group-hover:bg-[#0f0d1d]">
              Back to top
              <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-brand to-violet text-white">
                <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
