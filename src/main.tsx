
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/landing/animations.css'
import { DriveProvider } from './contexts/DriveContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DriveProvider>
      <App />
    </DriveProvider>
  </React.StrictMode>,
)
