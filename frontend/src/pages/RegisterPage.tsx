import { type ReactElement, useEffect } from "react"
import Register from "@/features/auth/register/components/Register.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import styled from "styled-components"

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
      <StyledRegister>
        <Register />
      </StyledRegister>
    </CommonPage>
  )
}

const StyledRegister = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 22%;

  @media (max-width: 1200px) {
    margin-top: 13%;
  }
`

export default RegisterPage
