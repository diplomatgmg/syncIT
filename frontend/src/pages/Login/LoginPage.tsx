import { type ReactElement } from "react"
import Header from "../../components/Header/Header.tsx"
import Login from "../../components/Auth/Login.tsx"

const LoginPage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Login</h3>
      <Login />
    </>
  )
}

export default LoginPage
