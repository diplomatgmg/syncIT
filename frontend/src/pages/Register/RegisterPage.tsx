import { type ReactElement } from "react"
import Header from "../../components/Header/Header.tsx"
import Register from "../../components/Auth/Register.tsx"

const RegisterPage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Register</h3>
      <Register />
    </>
  )
}

export default RegisterPage
