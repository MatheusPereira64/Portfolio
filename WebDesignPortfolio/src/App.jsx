import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />
        <Home />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  )
}

export default App

