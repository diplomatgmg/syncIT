import { type ReactElement, useEffect } from "react"
import LoginForm from "@/features/auth/login/components/LoginForm.tsx"
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useActivateAccountMutation } from "@/store/api/authApi.ts"
import routes from "@/routes/routes.tsx"

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  place-self: center;
  width: 100%;
`

// TODO Возможно, имеет смысл вынести активацию аккаунта в отдельный компонент.
//  После регистрации пользователю приходит письмо, после перехода по ссылке
//  у пользователя будет открыто 2 вкладки сайта. + Облегчится этот компонент
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

export default Login
