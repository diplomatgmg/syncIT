import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useRegisterMutation } from "@/store/api/authApi.ts"
import { setEmail } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"

interface Inputs {
  email: string
  password: string
  re_password: string
}

function RegisterForm() {
  const {
    control,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type={"email"}
          autoComplete={"email"}
          label={"Email"}
          name={"email"}
          control={control}
          rules={{ required: "This field is required" }}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <Input
          type={"password"}
          autoComplete={"current-password"}
          label={"Password"}
          name={"password"}
          control={control}
          rules={{ required: "This field is required" }}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <Input
          type={"password"}
          autoComplete={"new-password"}
          label={"Repeat password"}
          name={"re_password"}
          control={control}
          rules={{
            required: "This field is required",
            validate: (value: string) =>
              value === watch("password") || "Пароли не совпадают",
          }}
        />
        {errors.re_password && <span>{errors.re_password.message}</span>}
      </div>

      <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm
