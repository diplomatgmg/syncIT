import { type ReactElement, useEffect } from "react"
import Login from "@/features/auth/login/components/Login.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"

const LoginPage = (): ReactElement => {
  const { isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile.path, { state: { fromLogin: true } })
    } else {
      const urlParams = new URLSearchParams(window.location.search)

      const access = urlParams.get("access")
      const refresh = urlParams.get("refresh")
      const email = urlParams.get("email")

      if (!(access && refresh && email)) {
        return
      }

      dispatch(setTokens({ token: { access, refresh } }))
      dispatch(setEmail({ email }))

      navigate(routes.profile.path, { state: { fromLogin: true } })
    }
  }, [isAuthenticated, navigate, dispatch])

  return (
    <CommonPage>
      <Login />
    </CommonPage>
  )
}

export default LoginPage
