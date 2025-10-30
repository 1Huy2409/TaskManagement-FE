import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App'
import DashboardLayout from './app/dashboard/DashboardLayout'
import DashboardHome from './pages/home/ui/DashboardHome'
import UserDetailPage from './pages/user-detail/ui/UserDetail'
import { TokenProvider } from '@/app/providers/TokenProvider'
import { UserProvider } from '@/app/providers/UserProvider'
import { ProtectedRoute } from '@/app/providers/ProtectedRoute'
import OAuthSuccess from './pages/oauth-success/ui/OAuthSuccess'
import RegisterPage from './pages/register/ui/Register'
import Otp from './pages/register/ui/Otp'
import CompleteRegister from './pages/register/ui/CompleteRegister'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <UserProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes - No authentication required */}
            <Route path='/login' element={<App />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/register/verify-otp' element={<Otp />} />
            <Route path='/register/complete-register' element={<CompleteRegister />} />
            <Route path='/oauth/success' element={<OAuthSuccess />} />
 
            {/* Protected Routes - Require authentication */}
            <Route path='/' element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path='home' element={<DashboardHome />} />
              <Route path='account' element={<UserDetailPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </UserProvider>
    </TokenProvider>
  </StrictMode>,
)
