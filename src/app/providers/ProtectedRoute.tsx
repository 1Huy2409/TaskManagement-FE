import { Navigate, useLocation } from "react-router"
import { useToken } from "@/app/providers/TokenProvider"
import { useUser } from "@/app/providers/UserProvider"
import { useEffect, useState } from "react"
import { api } from "@/shared/api/api.shared"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { getAccessToken, clearAccessToken } = useToken()
  const { user, clearUser } = useUser()
  const location = useLocation()
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  
  const token = getAccessToken()

  useEffect(() => {
    const validateToken = async () => {
      if (!token || !user) {
        setIsValidating(false)
        setIsValid(false)
        return
      }

      try {
        await api.auth.verifyToken()

        setIsValid(true)
      } catch (error) {
        console.error('Token validation failed:', error)
        clearAccessToken()
        clearUser()
        setIsValid(false)
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token, user, clearAccessToken, clearUser])

  // Đang validate token
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Verifying...</p>
        </div>
      </div>
    )
  }

  // Token invalid hoặc không có token
  if (!isValid || !token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Token valid -> Render children
  return <>{children}</>
}
