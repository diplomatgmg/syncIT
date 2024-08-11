import { type ReactElement, useEffect } from "react"
import Login from "@/features/auth/login/components/Login.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"

const LoginPage = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile.path)
    }
  }, [isAuthenticated, navigate])

  return (
    <CommonPage>
      <Login />
    </CommonPage>
  )
}

export default LoginPage
