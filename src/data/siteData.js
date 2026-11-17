import blairImage from '../assets/Blair.jpg'
import tylerImage from '../assets/Tyler.PNG'
import vfwImage from '../assets/vfw.png'
import tjsTradingPostImage from '../assets/tjs_trading_post.png'
import sportsmansJournalImage from '../assets/sportsman_journal.png'
import bradsBeesImage from '../assets/brads_bees.png'
import bettingOnTheRacesImage from '../assets/betting_on_the_races.png'
import theGoatImage from '../assets/halo_background.png'
import diceGameImage from '../assets/dice_rolling_simulator.png'
import gameCollectionManagerImage from '../assets/game_collection_manager_terminal.png'

// Images stored in src/assets are imported so Vite can bundle and resolve them.

// The studio's email address, used on the Contact and Portfolio pages and for the team's email buttons.
export const contactEmail = 'devopsstudio26@gmail.com'
// Shown on the Contact page; `contactPhoneLink` is what phones dial when it's tapped.
export const contactPhone = '(228) 363-3068'
export const contactPhoneLink = 'tel:+12283633068'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

// Real client quotes only, used with the client's permission.
// The home page hides this section on the live site until at least one is added.
// Example entry:
// {
//   quote: 'What the client said about working with you.',
//   name: 'Jane Smith',
//   role: 'Owner',
//   company: 'Smith Landscaping',
//   rating: 5,                          // optional, 1-5
//   photo: '/images/testimonials/jane.jpg', // optional; initials are shown without it
// },
export const testimonials = []

// The first project is shown largest on the Projects page. Kept in step with the Portfolio site's project list.
//
// Adding a project:
//   1. Put its picture in src/assets, import it at the top of this file, and add an entry below.
//   2. `url`: the live site, or the GitHub repo for code-only projects. The popup's button says "Visit live site",
//      or "View on GitHub" for a github.com link. Left empty, the button shows greyed out.
//
// Adding a terminal project visitors can run in its popup (like the Dice Game):
//   3. Add "(Terminal)" to its title and set `play` to a short name, e.g. play: 'my-game'.
//   4. Add an entry with that same name in src/lib/terminal/terminalPrograms.js:
//      - Python: put the script in public/projects/<name>/main.py and copy the 'dice-game' entry, changing the path.
//      - Other languages (Java etc.) need a JavaScript version of the program, like gameCollectionManager.js.
export const projects = [
  {
    title: 'Veterans of Foreign Wars',
    category: 'Web Development',
    year: 2026,
    image: vfwImage,
    description:
      'Website for the Warren E. Campbell VFW Post 4488 in Grenada, Mississippi, with an event gallery, online donations and membership sign-ups.',
    tags: ['React', 'HTML', 'CSS'],
    url: 'https://grenadamsvfwwebsite-production.up.railway.app',
  },
  {
    title: "TJ's Trading Post",
    category: 'Web Development',
    year: 2026,
    image: tjsTradingPostImage,
    description:
      'A marketplace for collectibles, antiques and handmade goods where people can buy, sell and propose trades with other collectors.',
    tags: ['React', 'HTML', 'CSS'],
    url: 'https://tj-s-trading-post-production-4894.up.railway.app',
  },
  {
    title: "Sportsman's Journal",
    category: 'Web Development',
    year: 2025,
    image: sportsmansJournalImage,
    description:
      'A personal field app designed for hunters and anglers who value accurate records and lasting memories. Log your hunts, record your catches, and build a personal outdoor journal.',
    tags: ['Django', 'HTML', 'CSS'],
    url: 'https://web-production-e5e3.up.railway.app/',
  },
  {
    title: "Brad's Honey & Bee Removal",
    category: 'Web Development',
    year: 2025,
    image: bradsBeesImage,
    description: 'Professional bee remover and locally harvested honey business website.',
    tags: ['Django', 'HTML', 'CSS'],
    url: 'https://brads-bees-production.up.railway.app/',
  },
  {
    title: 'Betting on the Races',
    category: 'Web Development',
    year: 2025,
    image: bettingOnTheRacesImage,
    description:
      'Put your racing knowledge to the test by betting on your favorite drivers. Pick who you think will win and place your bet.',
    tags: ['React', 'HTML', 'CSS'],
    url: 'https://betting-on-the-races-react-production.up.railway.app',
  },
  {
    title: 'The Goat',
    category: 'Web Development',
    year: 2025,
    image: theGoatImage,
    description:
      'Master Chief is more than a warrior; he is a symbol of hope and courage. In the face of impossible odds, he stands unbroken, fighting not for himself, but for the survival of humanity.',
    tags: ['HTML', 'CSS'],
    url: 'https://goat-project-production.up.railway.app',
  },
  {
    title: 'Dice Game (Terminal)',
    category: 'App Development',
    year: 2025,
    image: diceGameImage,
    description:
      'A simple Python terminal dice game where the player rolls a virtual die to get a random number between 1 and 6, with results displayed in the console. Players can roll repeatedly and try to beat their previous rolls.',
    tags: ['Python'],
    url: 'https://github.com/Tyler32J/Dice-Game-Terminal-',
    // Real code that visitors can run in the project popup (see lib/terminal/terminalPrograms.js)
    play: 'dice-game',
  },
  {
    title: 'Game Collection Manager (Terminal)',
    category: 'App Development',
    year: 2025,
    image: gameCollectionManagerImage,
    description:
      'A Java terminal application designed to help users manage their personal video game library. Users can add new games, view their collection, update information, and remove games they no longer own.',
    tags: ['Java'],
    url: 'https://github.com/Tyler32J/Game-Collection-Manager-Terminal-',
    // Browser version visitors can run in the project popup (see lib/terminal/terminalPrograms.js)
    play: 'game-collection-manager',
  },
]

export const team = [
  {
    name: 'Tyler Farrell',
    role: 'Co-Founder & Lead Developer',
    image: tylerImage,
    bio: 'Full-stack developer with 5+ years of experience in building scalable web applications. Passionate about clean code and modern web technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
    // Only list things a customer could check. Notable projects should match the Projects page.
    achievements: [
      'Co-founded DevOps Studio',
      `Built ${projects.length} websites and apps for clients and personal projects`,
      'Builds with Django, React, Python and Java',
    ],
    notableProjects: [
      'Veterans of Foreign Wars Post 4488 website',
      "TJ's Trading Post marketplace",
      "Sportsman's Journal hunting and fishing log",
    ],
    links: { github: '#', linkedin: '#', email: `mailto:${contactEmail}` },
  },
  {
    name: 'Blair Farrell',
    role: 'Co-Founder & Creative Director',
    image: blairImage,
    bio: 'UI/UX designer and frontend developer specializing in creating beautiful, user-friendly interfaces. Expert in modern design systems and user experience.',
    skills: ['UI/UX Design', 'React', 'Tailwind CSS', 'Figma', 'Adobe Creative Suite', 'Motion Design', 'Brand Identity', 'User Research'],
    achievements: [
      'Co-founded DevOps Studio',
      'Leads the look and feel of every DevOps Studio site',
      'Designs with Figma and Tailwind CSS',
    ],
    // TODO: add Blair's other 2 notable projects.
    notableProjects: [
      'Veterans of Foreign Wars Post 4488 website',
    ],
    links: { github: '#', linkedin: '#', email: `mailto:${contactEmail}` },
  },
]
