import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useLoginMutation } from "@/store/api/authApi.ts"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes.tsx"
import Button from "@/components/common/Button.tsx"

interface Inputs {
  email: string
  password: string
}

function LoginForm() {
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

      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
