import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { useLoginMutation } from "@/store/api/authApi.ts"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import Input from "@/components/common/Input/Input.tsx"

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data).unwrap()
      dispatch(setTokens(response))
      dispatch(setEmail(response)) // TODO сделать отдельный endpoint /api/users/me
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type={"email"}
          autocomplete={"email"}
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
          autocomplete={"current-password"}
          label={"Password"}
          name={"password"}
          control={control}
          rules={{ required: "This field is required" }}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
