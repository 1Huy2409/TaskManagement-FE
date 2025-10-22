import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App'
import HomePage from './pages/home/ui/Home'
import { TokenProvider } from '@/app/providers/TokenProvider'
import OAuthSuccess from './pages/oauth-success/ui/OAuthSuccess'
import RegisterPage from './pages/register/ui/Register'
import Otp from './pages/register/ui/Otp'
import CompleteRegister from './pages/register/ui/CompleteRegister'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <HashRouter>
        <Routes>
          <Route path='/login' element={<App />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/register/verify-otp' element={<Otp />} />
          <Route path='/register/complete-register' element={<CompleteRegister />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/oauth/success' element={<OAuthSuccess />} />
        </Routes>
      </HashRouter>
    </TokenProvider>
  </StrictMode>,
)
