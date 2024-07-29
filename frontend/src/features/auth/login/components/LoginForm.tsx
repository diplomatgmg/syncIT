// LoginForm.tsx
import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useLoginMutation } from "@/store/api/authApi.ts"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import { ReactElement } from "react"
import Form from "@/features/auth/Form.tsx"
import Input from "@/components/common/Input/Input.tsx"

interface Inputs {
  email: string
  password: string
}

const LoginForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data).unwrap()
      dispatch(setTokens(response))
      dispatch(setEmail(response))
      navigate(routes.home.path)
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        register={register("email", { required: "Обязательное поле" })}
        error={errors.email}
        autoComplete={"email"}
      />
      <Input
        type="password"
        placeholder="Password"
        register={register("password", { required: "Обязательное поле" })}
        error={errors.password}
        autoComplete={"current-password"}
      />
      <Button
        type="submit"
        style={{
          margin: "2rem -4rem -4rem -4rem",
          borderRadius: "0 0 1rem 1rem",
        }}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
