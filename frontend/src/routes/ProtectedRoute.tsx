import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../store/hooks/useAuth.ts"
import routes from "./routes.tsx"

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login.path} />
}

export default ProtectedRoute
