import { Navigate, useLocation } from "react-router"
import { useToken } from "@/app/providers/TokenProvider"
import { useUser } from "@/app/providers/UserProvider"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { getAccessToken } = useToken()
  const { user } = useUser()
  const location = useLocation()
  
  const token = getAccessToken()
  
  // Nếu không có token hoặc không có user info -> redirect login
  if (!token || !user) {
    // Save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
