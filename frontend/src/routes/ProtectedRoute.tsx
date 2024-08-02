import { Outlet, useNavigate } from "react-router-dom"
import useAuth from "@/store/hooks/useAuth.ts"
import routes from "@/routes/routes.tsx"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login.path, {
        replace: true,
        state: { fromProtectedRoute: true },
      })
    }
  }, [isAuthenticated, navigate])

  return <Outlet />
}

export default ProtectedRoute
