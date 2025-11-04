import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router"
import './index.css'
import { TokenProvider } from '@/app/providers/TokenProvider'
import { UserProvider } from '@/app/providers/UserProvider'
import { ProtectedRoute } from '@/app/providers/ProtectedRoute'

// Lazy load components
const App = lazy(() => import('./App'))
const DashboardLayout = lazy(() => import('./app/dashboard/DashboardLayout'))
const DashboardHome = lazy(() => import('./pages/home/ui/DashboardHome'))
const UserDetailPage = lazy(() => import('./pages/user-detail/ui/UserDetail'))
const OAuthSuccess = lazy(() => import('./pages/oauth-success/ui/OAuthSuccess'))
const RegisterPage = lazy(() => import('./pages/register/ui/Register'))
const Otp = lazy(() => import('./pages/register/ui/Otp'))
const CompleteRegister = lazy(() => import('./pages/register/ui/CompleteRegister'))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <UserProvider>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path='/login' element={<App />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/register/verify-otp' element={<Otp />} />
              <Route path='/register/complete-register' element={<CompleteRegister />} />
              <Route path='/oauth/success' element={<OAuthSuccess />} />
   
              {/* Protected Routes */}
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
          </Suspense>
        </HashRouter>
      </UserProvider>
    </TokenProvider>
  </StrictMode>,
)