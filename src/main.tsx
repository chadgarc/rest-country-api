import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/input.css'
import './css/main.scss'
import App from './App.tsx'
import Providers from './Providers/Providers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
