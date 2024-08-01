import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import Login from "@/features/auth/login/components/Login.tsx"

const LoginPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Login />
    </>
  )
}

export default LoginPage
