import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ModuleProvider } from './ModuleContext/ModuleProvider';  // Importer le contexte
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModuleProvider>
    <App />
    </ModuleProvider>
  </StrictMode>,
)
