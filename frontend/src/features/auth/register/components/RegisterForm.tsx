import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useRegisterMutation } from "@/store/api/authApi.ts"
import { setEmail } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"
import { ReactElement } from "react"
import Form from "@/features/auth/Form.tsx"

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email } = await registerUser(data).unwrap()
      dispatch(setEmail({ email }))
      navigate(routes.login.path)
    } catch (err) {
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
        placeholder={"Email"}
        register={register("email", { required: "Обязательное поле" })}
        error={errors.email}
      />

      <Input
        type={"password"}
        placeholder={"Password"}
        register={register("password", { required: "Обязательное поле" })}
        error={errors.password}
      />

      <Input
        type={"password"}
        placeholder={"Repeat password"}
        register={register("re_password", {
          required: "Обязательное поле",
          validate: (value: string) =>
            value === watch("password") || "Пароли не совпадают",
        })}
        error={errors.re_password}
      />

      <Button
        disabled={disabled}
        type="submit"
        style={{
          margin: "2rem -4rem -6.2rem -4rem",
          borderRadius: "0 0 1rem 1rem",
        }}
        borderRadius={"0"}>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
