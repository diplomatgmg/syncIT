import { ReactElement } from "react"
import { useForm } from "@mantine/form"
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import styled from "styled-components"
import { useRegisterMutation } from "@/store/api/authApi.ts"
import { Link, useNavigate } from "react-router-dom"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { setEmail } from "@/store/slice/authSlice.ts"
import routes from "@/routes/routes.tsx"
import { RegisterResponseError } from "@/types/authTypes.ts"

const RegisterForm = (): ReactElement => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Некорректная почта"),
      confirmPassword: (val, values) =>
        val !== values.password ? "Пароли не совпадают" : null,
    },
  })

  const dispatch = useAppDispatch()
  const [register] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const { email } = await register(form.values).unwrap()
      dispatch(setEmail({ email }))
      navigate(routes.login.path, { state: { fromRegister: true } })
    } catch (err) {
      const error = err as RegisterResponseError
      if (error.status === 400) {
        if (error.data.email) {
          form.setFieldError("email", error.data.email[0])
        } else if (error.data.password) {
          form.setFieldError("password", error.data.password[0])
        }
      }
      console.error("Ошибка входа: ", error)
    }
  }

  return (
    <Container>
      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <Title>Добро пожаловать!</Title>
        <Text size="sm" mt={5}>
          Есть аккаунт?&nbsp;
          <Anchor size="sm" component={Link} to={routes.login.path}>
            Войти
          </Anchor>
        </Text>

        <Paper shadow="md" p={30} pt={15} mt={30} radius="lg" w={500}>
          <TextInput
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && form.errors.email}
            placeholder="example@gmail.com"
            label="Почта"
            radius="md"
            required
          />

          <PasswordInput
            required
            label="Пароль"
            placeholder="********"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />

          <PasswordInput
            required
            label="Повтор пароля"
            placeholder="********"
            value={form.values.confirmPassword}
            onChange={(event) =>
              form.setFieldValue("confirmPassword", event.currentTarget.value)
            }
            radius="md"
            error={form.errors.confirmPassword}
          />

          <Button type={"submit"} mt="xl" fullWidth radius={"md"}>
            Зарегистрироваться
          </Button>
        </Paper>
      </Form>
    </Container>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default RegisterForm
