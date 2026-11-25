import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { preloadCurrentPage } from './routes.client'
import './index.css'
import './theme-night.css'

// The HTML already contains the prerendered page (for search engines and a
// fast first paint). Load this page's code, then let React take over.
preloadCurrentPage(window.location.pathname).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
})
