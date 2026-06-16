import { useState, useEffect } from 'react'
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
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'
import './section-titles-mobile.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <Home />
          <About />
          <Services />
          <Skills />
          <Experience />
          <Projects />
          <Stats />
          <Blog />
          <Contact />
          <Footer />
          <ScrollToTop />
          <Chatbot />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

