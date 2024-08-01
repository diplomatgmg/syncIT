import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import Register from "@/features/auth/register/components/Register.tsx"

const RegisterPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Register />
    </>
  )
}

export default RegisterPage
