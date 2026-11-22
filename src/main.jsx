import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './reveal.css'
import { SITE_PROFILE } from './constants/siteProfile'
import { initAnalytics } from './utils/analytics'

initAnalytics(import.meta.env.VITE_PLAUSIBLE_DOMAIN || SITE_PROFILE.plausibleDomain)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

