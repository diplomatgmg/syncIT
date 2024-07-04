import { useRegisterMutation } from "../../store/api/authApi.ts"
import useAppDispatch from "../../store/hooks/useAppDispatch.ts"
import { SubmitHandler, useForm } from "react-hook-form"
import { setEmail } from "../../store/slice/authSlice.ts"

interface Inputs {
  email: string
  password: string
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const [registerUser] = useRegisterMutation()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email } = await registerUser(data).unwrap()
      dispatch(setEmail({ email }))
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

      <button type="submit">Register</button>
    </form>
  )
}

export default Register
