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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Register
