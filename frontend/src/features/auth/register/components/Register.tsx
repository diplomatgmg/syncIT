import { type ReactElement } from "react"
import RegisterForm from "@/features/auth/register/components/RegisterForm.tsx"
import styled from "styled-components"

const StyledRegister = styled.div`
  display: flex;
  justify-content: center;
  place-self: center;
  width: 100%;
`

const Register = (): ReactElement => {
  return (
    <StyledRegister>
      <RegisterForm />
    </StyledRegister>
  )
}

export default Register
