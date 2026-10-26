import { useState, useEffect } from 'react'
import Icon from './Icon'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div 
      className={`scroll-up-btn ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <Icon name="angle-up" />
    </div>
  )
}

export default ScrollToTop

