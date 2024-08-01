import { type ReactElement } from "react"
import LoginForm from "@/features/auth/login/components/LoginForm.tsx"
import styled from "styled-components"

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  place-self: center;
  width: 100%;
`

const Login = (): ReactElement => {
  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  )
}

export default Login
