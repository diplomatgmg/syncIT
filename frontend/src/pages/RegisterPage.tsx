import { type ReactElement, useEffect } from "react"
import Register from "@/features/auth/register/components/Register.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"

const RegisterPage = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile.path)
    }
  }, [isAuthenticated, navigate])

  return (
    <CommonPage>
      <Register />
    </CommonPage>
  )
}

export default RegisterPage
