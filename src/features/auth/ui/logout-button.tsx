import { Button } from "@/shared/ui/button"
import { api } from "@/shared/api/api.shared"
import { useToken } from "@/app/providers/TokenProvider"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const { setAccessToken } = useToken()

  const handleLogout = async () => {
    try {
      await api.auth.logout()
      setAccessToken(null)
      window.location.href = '/#/login'
    } catch (err: any) {
      console.error('Logout failed:', err)
      // Vẫn clear token và redirect về login dù API fail
      setAccessToken(null)
      window.location.href = '/#/login'
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  )
}
