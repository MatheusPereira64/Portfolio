import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Chatbot from './components/Chatbot'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'
import './section-titles-mobile.css'

function AppShell() {
  const { language, translations } = useLanguage()
  const t = translations[language]

  return (
    <div className="App">
      <a className="skip-link" href="#conteudo">
        {t.nav.skipLink || 'Skip to content'}
      </a>
      <Navbar />
      <main id="conteudo">
        <Home />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Stats />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
