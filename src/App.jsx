import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Chatbot from './components/Chatbot'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { getProjectBySlug } from './data/projects'
import { useAppPath } from './utils/routes'
import './App.css'
import './section-titles-mobile.css'

function AppShell() {
  const { language, translations } = useLanguage()
  const t = translations[language]
  const path = useAppPath()
  const slugMatch = path.match(/^\/projetos\/([^/]+)$/)
  const slug = slugMatch ? decodeURIComponent(slugMatch[1]) : null
  const project = slug ? getProjectBySlug(slug) : null

  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0)
      return
    }
    const pending = sessionStorage.getItem('portfolio:scroll')
    if (!pending) return
    sessionStorage.removeItem('portfolio:scroll')
    requestAnimationFrame(() => {
      document.getElementById(pending)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [path, slug])

  useEffect(() => {
    if (path !== '/') return undefined
    const hash = window.location.hash.match(/^#project-(\d+)/)
    if (!hash) return undefined
    const known = {
      1: 'sistema-inteligente-de-manufatura',
      2: 'parametrizacao-de-maquinas-com-ia',
      3: 'monitoramento-de-producao',
    }[hash[1]]
    if (!known) return undefined
    window.history.replaceState({}, '', `${import.meta.env.BASE_URL}projetos/${known}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
    return undefined
  }, [path])

  return (
    <div className="App">
      <a className="skip-link" href="#conteudo">
        {t.nav.skipLink || 'Skip to content'}
      </a>
      <Navbar />
      <main id="conteudo">
        {slug ? (
          <ProjectCaseStudy project={project} />
        ) : (
          <>
            <Home />
            <Projects />
            <Experience />
            <About />
            <Blog />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
