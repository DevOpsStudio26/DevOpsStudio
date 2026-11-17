import { useState } from 'react'
import { Award, Briefcase, Check, Code, Mail } from 'lucide-react'
import SmartImage from '../components/SmartImage'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { team } from '../data/siteData'

// Preview page for the look of the team section on the Portfolio page. Not linked in the nav: visit /portfolio-ideas.
// The layout stays the same in every idea (photo on one side, details on the other, alternating); only the look changes.

const outline = 'rounded-3xl bg-linear-135 from-brand via-violet to-pink-500 p-px'
const inner = 'rounded-[calc(1.5rem-1px)]'
const gridBg =
  'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]'

const sections = [
  ['achievements', 'Key Achievements', Award],
  ['notableProjects', 'Notable Projects', Briefcase],
]

function socialsFor(member) {
  return [
    { href: member.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: member.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: member.links.email, label: 'Email', Icon: Mail },
  ]
}

function Socials({ member, className = '' }) {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {socialsFor(member).map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={`${member.name} on ${label}`}
          className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:bg-brand"
        >
          <Icon className="size-4.5" />
        </a>
      ))}
    </div>
  )
}

// The photo as it is now, inside whatever frame an idea gives it
function Photo({ member, className = '' }) {
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden bg-linear-to-br from-[#1a1a45] to-[#24133d] ${className}`}>
      <SmartImage src={member.image} alt={member.name} fallbackLabel={member.image} className="size-full object-cover object-top" />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent pt-16 pb-5">
        <Socials member={member} />
      </div>
    </div>
  )
}

function Bullets({ items, check = false }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          {check ? (
            <span className="flex size-5 shrink-0 translate-y-1 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet text-white">
              <Check className="size-3" />
            </span>
          ) : (
            <span className="size-1.5 shrink-0 rounded-full bg-brand-bright" />
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}

function Layout({ reverse, photo, children }) {
  return (
    <article className="grid items-center gap-12 lg:grid-cols-2">
      <div className={`mx-auto w-full max-w-md ${reverse ? 'lg:order-2' : ''}`}>{photo}</div>
      <div>{children}</div>
    </article>
  )
}

/* 1. What's there now */
function Current({ member, reverse }) {
  return (
    <Layout reverse={reverse} photo={<Photo member={member} className="rounded-lg border border-line" />}>
      <h2 className="text-3xl font-bold">{member.name}</h2>
      <p className="mt-2 text-lg text-brand-bright">{member.role}</p>
      <p className="mt-4 leading-relaxed">{member.bio}</p>
      <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold">
        <Code className="size-5 text-brand-bright" /> Skills &amp; Technologies
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {member.skills.map((s) => (
          <span key={s} className="rounded-full bg-elevated px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
      {sections.map(([key, title, Icon]) => (
        <div key={key}>
          <h3 className="mt-8 mb-4 flex items-center gap-2 text-lg font-semibold">
            <Icon className="size-5 text-brand-bright" /> {title}
          </h3>
          <Bullets items={member[key]} />
        </div>
      ))}
    </Layout>
  )
}

/* 2. Match the About page: outlined photo, details in a dark grid panel */
function AboutMatch({ member, reverse }) {
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className={outline}>
          <Photo member={member} className={inner} />
        </div>
      }
    >
      <div className={outline}>
        <div className={`theme-dark relative isolate overflow-hidden bg-[#07070d] p-8 ${inner}`}>
          <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_80%)]`} />
          <div aria-hidden="true" className="absolute -top-20 -left-20 -z-10 size-64 rounded-full bg-violet/30 blur-3xl" />
          <h2 className="text-3xl font-bold">{member.name}</h2>
          <p className="mt-1 text-violet-bright">{member.role}</p>
          <p className="mt-4 leading-relaxed text-fg-muted">{member.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                {s}
              </span>
            ))}
          </div>
          {sections.map(([key, title, Icon]) => (
            <div key={key}>
              <h3 className="mt-7 mb-3 flex items-center gap-2 font-semibold">
                <Icon className="size-4.5 text-violet-bright" /> {title}
              </h3>
              <Bullets items={member[key]} check />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

/* 3. Italic name accent, gradient icon squares, glowing photo */
function GradientAccents({ member, reverse }) {
  const [first, ...rest] = member.name.split(' ')
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-6 -z-10 rounded-3xl bg-violet/40 blur-3xl" />
          <div className={outline}>
            <Photo member={member} className={inner} />
          </div>
        </div>
      }
    >
      <div className="text-sm font-semibold tracking-widest text-violet-bright uppercase">{member.role}</div>
      <h2 className="mt-3 text-5xl font-bold tracking-tight">
        {first} <span className="font-serif font-normal italic text-violet-bright">{rest.join(' ')}</span>
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">{member.bio}</p>
      <h3 className="mt-8 flex items-center gap-3 text-lg font-semibold">
        <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-brand to-violet text-white">
          <Code className="size-4.5" />
        </span>
        Skills &amp; Technologies
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {member.skills.map((s) => (
          <span key={s} className="rounded-full bg-violet/15 px-3 py-1 text-sm text-violet-bright">
            {s}
          </span>
        ))}
      </div>
      {sections.map(([key, title, Icon]) => (
        <div key={key}>
          <h3 className="mt-8 mb-4 flex items-center gap-3 text-lg font-semibold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-brand to-violet text-white">
              <Icon className="size-4.5" />
            </span>
            {title}
          </h3>
          <Bullets items={member[key]} check />
        </div>
      ))}
    </Layout>
  )
}

/* 4. The photo on a dark grid panel with rings, like the Our Mission panel */
function PhotoOnPanel({ member, reverse }) {
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className={outline}>
          <div className={`theme-dark relative isolate overflow-hidden bg-[#07070d] p-8 ${inner}`}>
            <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]`} />
            <div aria-hidden="true" className="absolute inset-0 -z-10 m-auto size-72 rounded-full bg-violet/30 blur-3xl" />
            {[0, 1].map((r) => (
              <span
                key={r}
                aria-hidden="true"
                className="absolute inset-0 -z-10 m-auto rounded-full border border-violet-bright/20 animate-ping-slow motion-reduce:hidden"
                style={{ width: `${70 + r * 20}%`, height: `${70 + r * 20}%`, animationDelay: `${r * 0.8}s`, animationDuration: '3.5s' }}
              />
            ))}
            <Photo member={member} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      }
    >
      <h2 className="text-4xl font-bold">{member.name}</h2>
      <p className="mt-2 text-lg text-violet-bright">{member.role}</p>
      <p className="mt-4 text-lg leading-relaxed text-fg-muted">{member.bio}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {member.skills.map((s) => (
          <span key={s} className="rounded-full border border-line px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
      {sections.map(([key, title]) => (
        <div key={key}>
          <h3 className="mt-8 mb-4 text-sm font-semibold tracking-widest text-violet-bright uppercase">{title}</h3>
          <Bullets items={member[key]} check />
        </div>
      ))}
    </Layout>
  )
}

/* 5. Skills, achievements and projects in tabs */
function Tabs({ member, reverse }) {
  const tabs = [['skills', 'Skills', Code], ...sections.map(([k, t, I]) => [k, t.replace('Key ', '').replace('Notable ', ''), I])]
  const [tab, setTab] = useState('skills')
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className={outline}>
          <Photo member={member} className={inner} />
        </div>
      }
    >
      <h2 className="text-4xl font-bold">{member.name}</h2>
      <p className="mt-2 text-lg text-violet-bright">{member.role}</p>
      <p className="mt-4 text-lg leading-relaxed text-fg-muted">{member.bio}</p>
      <div className="mt-8 inline-flex rounded-full bg-surface p-1 ring-1 ring-line">
        {tabs.map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              tab === key ? 'bg-linear-to-r from-brand to-violet text-white shadow-lg shadow-violet/30' : 'text-fg-muted hover:text-fg'
            }`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>
      <div key={tab} className="mt-6 min-h-40 animate-line-in">
        {tab === 'skills' ? (
          <div className="flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span key={s} className="rounded-full bg-elevated px-3 py-1.5 text-sm">
                {s}
              </span>
            ))}
          </div>
        ) : (
          <Bullets items={member[tab]} check />
        )}
      </div>
    </Layout>
  )
}

/* 6. Numbered sections with the glow line, like the About page's Why choose list */
function GlowLine({ member, reverse }) {
  const blocks = [
    ['Skills & Technologies', null],
    ...sections.map(([k, t]) => [t, k]),
  ]
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className={outline}>
          <Photo member={member} className={inner} />
        </div>
      }
    >
      <h2 className="text-4xl font-bold">{member.name}</h2>
      <p className="mt-2 text-lg text-violet-bright">{member.role}</p>
      <p className="mt-4 leading-relaxed text-fg-muted">{member.bio}</p>
      <ol className="relative mt-8 space-y-8 pl-14">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-4 w-0.5 bg-linear-to-b from-brand via-violet to-pink-500 opacity-60" />
        {blocks.map(([title, key], i) => (
          <li key={title} className="relative">
            <span className="absolute top-0 -left-14 flex size-8 items-center justify-center rounded-full bg-linear-to-br from-brand to-violet font-mono text-xs text-white shadow-lg shadow-violet/30">
              0{i + 1}
            </span>
            <h3 className="pt-1 text-lg font-semibold">{title}</h3>
            <div className="mt-3">
              {key ? (
                <Bullets items={member[key]} />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <span key={s} className="rounded-full bg-elevated px-3 py-1 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

/* 7. Three small dark cards under the bio */
function CardStack({ member, reverse }) {
  const card = (title, Icon, body) => (
    <div className={outline}>
      <div className={`theme-dark relative isolate overflow-hidden bg-[#07070d] p-5 ${inner}`}>
        <div aria-hidden="true" className={`absolute inset-0 -z-10 ${gridBg} opacity-60`} />
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <Icon className="size-4.5 text-violet-bright" /> {title}
        </h3>
        {body}
      </div>
    </div>
  )
  return (
    <Layout
      reverse={reverse}
      photo={
        <div className={outline}>
          <Photo member={member} className={inner} />
        </div>
      }
    >
      <h2 className="text-4xl font-bold">{member.name}</h2>
      <p className="mt-2 text-lg text-violet-bright">{member.role}</p>
      <p className="mt-4 leading-relaxed text-fg-muted">{member.bio}</p>
      <div className="mt-6 space-y-3">
        {card(
          'Skills & Technologies',
          Code,
          <div className="flex flex-wrap gap-2">
            {member.skills.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-sm">
                {s}
              </span>
            ))}
          </div>,
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map(([key, title, Icon]) => (
            <div key={key}>{card(title, Icon, <Bullets items={member[key]} />)}</div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

/* 8. Huge outlined first name behind everything */
function NameBackdrop({ member, reverse }) {
  const first = member.name.split(' ')[0]
  return (
    <div className="relative isolate">
      <span
        aria-hidden="true"
        className={`absolute top-1/2 -z-10 -translate-y-1/2 text-[clamp(5rem,16vw,13rem)] leading-none font-black tracking-tighter text-transparent uppercase select-none [-webkit-text-stroke:1.5px_var(--color-line)] ${
          reverse ? 'left-0' : 'right-0'
        }`}
      >
        {first}
      </span>
      <Layout
        reverse={reverse}
        photo={
          <div className={outline}>
            <Photo member={member} className={inner} />
          </div>
        }
      >
        <p className="text-sm font-semibold tracking-widest text-violet-bright uppercase">{member.role}</p>
        <h2 className="mt-2 text-5xl font-bold tracking-tight">{member.name}</h2>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">{member.bio}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {member.skills.map((s) => (
            <span key={s} className="rounded-full bg-elevated px-3 py-1 text-sm">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {sections.map(([key, title]) => (
            <div key={key}>
              <h3 className="mb-3 font-semibold">{title}</h3>
              <Bullets items={member[key]} />
            </div>
          ))}
        </div>
      </Layout>
    </div>
  )
}

const ideas = [
  ['What’s there now', 'The current look, for comparison.', Current],
  ['Match the About Page', 'Gradient-outlined photo, and the details in a dark grid panel with check marks.', AboutMatch],
  ['Gradient Accents', 'Role as a purple label, last name in italic purple, gradient icon squares, and a glow behind the photo.', GradientAccents],
  ['Photo on a Panel', 'The photo sits on a dark grid panel with soft rings pulsing out, like Our Mission.', PhotoOnPanel],
  ['Tabs', 'Skills, Achievements and Projects in tabs, so each person takes up less space.', Tabs],
  ['Glow Line', 'Skills, achievements and projects as numbered steps with the gradient line from Why choose.', GlowLine],
  ['Card Stack', 'The details split into small dark cards with gradient outlines.', CardStack],
  ['Name Backdrop', 'A huge outlined first name behind each person. A bold, magazine feel.', NameBackdrop],
]

export default function PortfolioIdeas() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold">Portfolio Page Looks</h1>
          <p className="mx-auto mt-4 max-w-2xl text-fg-muted">
            8 looks for the team section, all keeping the same layout. Each shows both of you, so you can see the
            alternating sides.
          </p>
        </header>

        {ideas.map(([title, description, Member], i) => (
          <section key={title} id={`idea-${i + 1}`} className="scroll-mt-20">
            <div className="mb-10 flex items-baseline gap-3 border-b border-dashed border-line pb-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-1 text-fg-muted">{description}</p>
              </div>
            </div>
            <div className="space-y-20">
              {team.map((m, n) => (
                <Member key={m.name} member={m} reverse={n % 2 === 1} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
