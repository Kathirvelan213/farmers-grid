import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SasProvider } from './assets/global/components/SasProvider.jsx'
import { AuthProvider } from './assets/global/components/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SasProvider>
        <App/>
      </SasProvider>
    </AuthProvider>
  </StrictMode>
)
