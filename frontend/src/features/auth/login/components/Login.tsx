import { type ReactElement, useEffect } from "react"
import LoginForm from "@/features/auth/login/components/LoginForm.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { useActivateAccountMutation } from "@/store/api/authApi.ts"
import routes from "@/routes/routes.tsx"
import styled from "styled-components"

const Login = (): ReactElement => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [activateAccount, { isSuccess, isError, error }] =
    useActivateAccountMutation()

  useEffect(() => {
    if (uid && token) {
      activateAccount({ uid, token })
    }
  }, [uid, token, activateAccount])

  useEffect(() => {
    if (isSuccess || isError) {
      const isRecentlyActivated =
        isError &&
        // @ts-expect-error - FIXME. djoser response 403 == Устаревший токен. Возникает как при повторной активировании почты, так и при истечении токена
        error.status === 403

      navigate(routes.login.path, {
        state: {
          fromActivate: true,
          isSuccess,
          isError: isError && !isRecentlyActivated,
          isRecentlyActivated,
        },
      })
    }
  }, [isSuccess, isError, error, navigate])

  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
`

export default Login
