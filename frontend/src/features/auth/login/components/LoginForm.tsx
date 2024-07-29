import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useLoginMutation } from "@/store/api/authApi.ts"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import { ReactElement } from "react"
import Form from "@/features/auth/Form.tsx"

interface Inputs {
  email: string
  password: string
}

const LoginForm = (): ReactElement => {
  const {
    control,
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
        type={"email"}
        autoComplete={"email"}
        label={"Email"}
        name={"email"}
        control={control}
        rules={{ required: "Обязательное поле" }}
        error={errors?.email?.message}
      />

      <Input
        type={"password"}
        autoComplete={"current-password"}
        label={"Password"}
        name={"password"}
        control={control}
        rules={{ required: "Обязательное поле" }}
        error={errors?.password?.message}
      />

      <Button
        type="submit"
        style={{
          margin: "2rem -4rem -4rem -4rem",
          borderRadius: "0 0 1rem 1rem",
        }}
        borderRadius={"0"}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
