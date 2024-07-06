import { type ReactElement } from "react"
import Header from "../components/layout/Header/Header.tsx"
import Login from "../features/auth/login/components/Login.tsx"
import Footer from "../components/layout/Footer/Footer.tsx"

const LoginPage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Login</h3>
      <Login />
      <Footer />
    </>
  )
}

export default LoginPage
