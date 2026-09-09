import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App'
import './index.css'
import { SITE_PROFILE } from './constants/siteProfile'

const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || SITE_PROFILE.plausibleDomain
if (plausibleDomain && typeof document !== 'undefined') {
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = plausibleDomain
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

