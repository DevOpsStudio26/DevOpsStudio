import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import PortfolioIdeas from './pages/PortfolioIdeas'
import CtaIdeas from './pages/CtaIdeas'
import TeamHeaderIdeas from './pages/TeamHeaderIdeas'
import PortfolioExtras from './pages/PortfolioExtras'
import BackgroundIdeas from './pages/BackgroundIdeas'
import ContactIdeas from './pages/ContactIdeas'
import FooterIdeas from './pages/FooterIdeas'
import RecentWorkIdeas from './pages/RecentWorkIdeas'
import ClientsSayIdeas from './pages/ClientsSayIdeas'
import NavbarIdeas from './pages/NavbarIdeas'
import StepsBackgroundIdeas from './pages/StepsBackgroundIdeas'
import HomeFlowIdeas from './pages/HomeFlowIdeas'
import BookendIdeas from './pages/BookendIdeas'
import ProjectsPageIdeas from './pages/ProjectsPageIdeas'
import ProjectsToolbarIdeas from './pages/ProjectsToolbarIdeas'
import ProjectsHeroIdeas from './pages/ProjectsHeroIdeas'
import ProjectsHeroCompare from './pages/ProjectsHeroCompare'
import ProjectsEffectsIdeas from './pages/ProjectsEffectsIdeas'
import ServicesIdeas from './pages/ServicesIdeas'
import LightColorIdeas from './pages/LightColorIdeas'
import NotFound from './pages/NotFound'

// New page: start at the top, or at the #section in the link, if there is one.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* The bottom padding (phones only) leaves room so the floating menu never covers the footer */}
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio-ideas" element={<PortfolioIdeas />} />
          <Route path="/cta-ideas" element={<CtaIdeas />} />
          <Route path="/team-header-ideas" element={<TeamHeaderIdeas />} />
          <Route path="/portfolio-extras" element={<PortfolioExtras />} />
          <Route path="/background-ideas" element={<BackgroundIdeas />} />
          <Route path="/contact-ideas" element={<ContactIdeas />} />
          <Route path="/footer-ideas" element={<FooterIdeas />} />
          <Route path="/recent-work-ideas" element={<RecentWorkIdeas />} />
          <Route path="/clients-say-ideas" element={<ClientsSayIdeas />} />
          <Route path="/navbar-ideas" element={<NavbarIdeas />} />
          <Route path="/steps-background-ideas" element={<StepsBackgroundIdeas />} />
          <Route path="/home-flow-ideas" element={<HomeFlowIdeas />} />
          <Route path="/bookend-ideas" element={<BookendIdeas />} />
          <Route path="/projects-page-ideas" element={<ProjectsPageIdeas />} />
          <Route path="/projects-toolbar-ideas" element={<ProjectsToolbarIdeas />} />
          <Route path="/projects-hero-ideas" element={<ProjectsHeroIdeas />} />
          <Route path="/projects-hero-compare" element={<ProjectsHeroCompare />} />
          <Route path="/projects-effects-ideas" element={<ProjectsEffectsIdeas />} />
          <Route path="/services-ideas" element={<ServicesIdeas />} />
          <Route path="/light-color-ideas" element={<LightColorIdeas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  )
}
