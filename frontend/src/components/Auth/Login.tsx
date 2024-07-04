import { useLoginMutation } from "../../store/api/authApi.ts"
import useAppDispatch from "../../store/hooks/useAppDispatch.ts"
import { SubmitHandler, useForm } from "react-hook-form"
import { setTokens } from "../../store/slice/authSlice.ts"

interface Inputs {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { access, refresh } = await login(data).unwrap()
      dispatch(setTokens({ access, refresh }))
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
