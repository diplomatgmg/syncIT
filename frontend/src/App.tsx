import useAuth from "./store/hooks/useAuth.ts"
import { SubmitHandler, useForm } from "react-hook-form"
import useAppDispatch from "./store/hooks/useAppDispatch.ts"
import { useLoginMutation } from "./store/api/authApi.ts"
import { logout, setTokens } from "./store/slice/authSlice.ts"

interface Inputs {
  username: string
  password: string
}

function App() {
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
      const { access, refresh } = await login(data).unwrap()
      dispatch(setTokens({ access, refresh }))
    } catch (err) {
      console.error("Ошибка входа: ", err)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>is auth - {String(isAuthenticated)}</h1>
      <div>
        <label>Username</label>
        <input
          type="text"
          autoComplete="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}
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

      <button type={"button"} onClick={handleLogout}>
        Logout
      </button>
    </form>
  )
}

export default App
