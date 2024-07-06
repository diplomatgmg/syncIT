import { type ReactElement } from "react"
import Header from "../components/layout/Header/Header.tsx"
import Register from "../features/auth/register/components/Register.tsx"
import Footer from "../components/layout/Footer/Footer.tsx"

const RegisterPage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Register</h3>
      <Register />
      <Footer />
    </>
  )
}

export default RegisterPage
