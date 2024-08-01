import { type ReactElement } from "react"
import Login from "@/features/auth/login/components/Login.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"

const LoginPage = (): ReactElement => {
  return (
    <CommonPage>
      <Login />
    </CommonPage>
  )
}

export default LoginPage
