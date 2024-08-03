import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useRegisterMutation } from "@/store/api/authApi.ts"
import { setEmail } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import { ReactElement, useState } from "react"
import Form from "@/features/auth/Form.tsx"
import { RegisterResponseError } from "@/types/authTypes.ts"
import AuthErrors from "@/features/auth/AuthErrors.tsx"

interface Inputs {
  email: string
  password: string
  re_password: string // Snake case для удобной передачи бекенду
}

const RegisterForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const [registerUser] = useRegisterMutation()
  const navigate = useNavigate()
  const [emailErrors, setEmailsError] = useState<
    RegisterResponseError["data"]["email"]
  >([])
  const [passwordErrors, setPasswordErrors] = useState<
    RegisterResponseError["data"]["password"]
  >([])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email } = await registerUser(data).unwrap()
      dispatch(setEmail({ email }))
      navigate(routes.login.path, { state: { fromRegister: true } })
    } catch (err) {
      const error = err as RegisterResponseError
      setEmailsError(error.data?.email ?? [])
      setPasswordErrors(error.data?.password ?? [])
      console.error("Ошибка входа: ", err)
    }
  }

  const disabled = Boolean(
    errors.email || errors.password || errors.re_password
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type={"email"}
        placeholder={"Почта"}
        register={register("email", { required: "Обязательное поле" })}
        error={errors.email}
        autoComplete={"email"}
      />

      <AuthErrors errors={emailErrors} />

      <Input
        type={"password"}
        placeholder={"Пароль"}
        register={register("password", { required: "Обязательное поле" })}
        error={errors.password}
        autoComplete={"new-password"}
      />

      <Input
        type={"password"}
        placeholder={"Повтор пароля"}
        register={register("re_password", {
          required: "Обязательное поле",
          validate: (value: string) =>
            value === watch("password") || "Пароли не совпадают",
        })}
        error={errors.re_password}
        autoComplete={"new-password"}
      />

      <AuthErrors errors={passwordErrors} />

      <Button
        disabled={disabled}
        type="submit"
        style={{
          margin: "2rem -4rem -6.2rem -4rem",
          borderRadius: "0 0 1rem 1rem",
        }}
        borderRadius={"0"}>
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export default RegisterForm
