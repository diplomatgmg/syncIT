import { useLoginMutation } from "../../store/api/authApi.ts"
import useAppDispatch from "../../store/hooks/useAppDispatch.ts"
import { SubmitHandler, useForm } from "react-hook-form"
import { setCredentials } from "../../store/slice/authSlice.ts"
import useAuth from "../../store/hooks/useAuth.ts"

interface Inputs {
  email: string
  password: string
}

function Login() {
  const { isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await login(data).unwrap()
      dispatch(setCredentials(response))
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>is auth - {String(isAuthenticated)}</h3>
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
