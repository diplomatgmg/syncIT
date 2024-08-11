import { type ReactElement } from "react"
import RegisterForm from "@/features/auth/register/components/RegisterForm.tsx"
import styled from "styled-components"

const Register = (): ReactElement => {
  return (
    <StyledRegister>
      <RegisterForm />
    </StyledRegister>
  )
}

const StyledRegister = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`

export default Register
