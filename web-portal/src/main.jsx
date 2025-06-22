import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SasProvider } from './assets/global/components/SasProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SasProvider>
      <App />
    </SasProvider>
  </StrictMode>,
)
