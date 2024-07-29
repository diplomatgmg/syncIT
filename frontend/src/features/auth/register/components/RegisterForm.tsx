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
import styled from "styled-components"

interface Inputs {
  email: string
  password: string
  re_password: string
}

const StyledPasswordContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const RegisterForm = (): ReactElement => {
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
    console.log(data)
    try {
      const { email } = await registerUser(data).unwrap()
      dispatch(setEmail({ email }))
      navigate(routes.login.path)
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

      <StyledPasswordContainer>
        <Input
          type={"password"}
          autoComplete={"current-password"}
          label={"Password"}
          name={"password"}
          control={control}
          rules={{ required: "Обязательное поле" }}
          error={errors?.password?.message}
        />

        <Input
          type={"password"}
          autoComplete={"new-password"}
          label={"Repeat password"}
          name={"re_password"}
          control={control}
          error={errors?.re_password?.message}
          rules={{
            required: "Обязательное поле",
            validate: (value: string) =>
              value === watch("password") || "Пароли не совпадают",
          }}
        />
      </StyledPasswordContainer>

      <Button
        type="submit"
        style={{
          margin: "2rem -4rem -4rem -4rem",
          borderRadius: "0 0 1rem 1rem",
        }}
        borderRadius={"0"}>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
