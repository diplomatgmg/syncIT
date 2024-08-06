import { type ReactElement, useEffect } from "react"
import Login from "@/features/auth/login/components/Login.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import styled from "styled-components"

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
      <StyledLogin>
        <Login />
      </StyledLogin>
    </CommonPage>
  )
}

const StyledLogin = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 25%;

  @media (max-width: 1200px) {
    margin-top: 20%;
  }
`

export default LoginPage
