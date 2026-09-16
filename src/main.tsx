import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/input.css'
import './styles/main.scss'
import App from './App.tsx'
import Providers from './Contexts and Providers/Providers.tsx'

/**
 * Application entry point.
 * Renders the root React element with `StrictMode` and `Providers`
 * wrapping the main `App` component.
 * Imports the main SCSS stylesheet (`./css/main.scss`) and
 * the CSS entry point (`./css/input.css`).
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
