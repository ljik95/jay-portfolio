import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are self-hosted rather than pulled from Google Fonts: one less origin
// to connect to, no render-blocking stylesheet, and the woff2 files ship with
// the bundle so first paint is not waiting on a third party.
import '@fontsource-variable/newsreader/wght.css'
import '@fontsource-variable/newsreader/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
