import { type ReactElement, useEffect } from "react"
import LoginForm from "@/features/auth/login/components/LoginForm.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useActivateAccountMutation } from "@/store/api/authApi.ts"
import routes from "@/routes/routes.tsx"
import styled from "styled-components"

const Login = (): ReactElement => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [activateAccount, { isSuccess, isError }] = useActivateAccountMutation()

  useEffect(() => {
    if (uid && token) {
      activateAccount({ uid, token })
    }
  }, [uid, token, activateAccount])

  useEffect(() => {
    if (isSuccess || isError) {
      navigate(routes.login.path, {
        state: { fromActivate: true, isSuccess: isSuccess, isError: isError },
      })
    }
  }, [isSuccess, isError, navigate])

  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`

export default Login
