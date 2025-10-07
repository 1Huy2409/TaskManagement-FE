import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App'
import HomePage from './pages/Home'
import { TokenProvider } from '@/auth/TokenProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </HashRouter>
    </TokenProvider>
  </StrictMode>,
)
