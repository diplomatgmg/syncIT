import { type ReactElement } from "react"
import Register from "@/features/auth/register/components/Register.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"

const RegisterPage = (): ReactElement => {
  return (
    <CommonPage>
      <Register />
    </CommonPage>
  )
}

export default RegisterPage
