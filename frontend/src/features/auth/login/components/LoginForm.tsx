import { ReactElement } from "react"
import { useForm } from "@mantine/form"
import {
  Anchor,
  Button,
  Container,
  Flex,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core"
import styled from "styled-components"
import { useLoginMutation } from "@/store/api/authApi.ts"
import { Link, useNavigate } from "react-router-dom"
import useAppDispatch from "@/store/hooks/useAppDispatch.ts"
import { invalidateTags } from "@/store/api/vacancyApi.ts"
import { setEmail, setTokens } from "@/store/slice/authSlice.ts"
import routes from "@/routes/routes.tsx"
import { useMediaQuery } from "@mantine/hooks"
import { useState } from "react"
import { LoginResponseError } from "@/types/authTypes.ts"

const LoginForm = (): ReactElement => {
  const { colors } = useMantineTheme()
  const matches = useMediaQuery("(max-width: 512px)")
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Некорректная почта"),
    },
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setErrorMessage(null)
    try {
      const response = await login(form.values).unwrap()
      dispatch(invalidateTags(["Vacancy"]))
      dispatch(setTokens(response))
      dispatch(setEmail(response))
      navigate(routes.home.path, { state: { fromLogin: true } })
    } catch (err) {
      const error = err as LoginResponseError
      console.error(error)
      form.setFieldError("password", error.data.detail)
    }
  }

  return (
    <Container w={matches ? "100%" : 500}>
      <Form onSubmit={form.onSubmit(handleSubmit)}>
        {!matches && (
          <>
            <Title size={24}>Добро пожаловать!</Title>
            <Text size="sm" mt={5}>
              Нет аккаунта?&nbsp;
              <Anchor size="sm" component={Link} to={routes.register.path}>
                Создать Аккаунт
              </Anchor>
            </Text>
          </>
        )}

        <Paper
          shadow="md"
          p={30}
          pt={15}
          pb={matches ? 15 : 30}
          mt={15}
          radius="lg"
          w={"100%"}>
          <TextInput
            autoFocus
            autoComplete="email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Некорректная почта"}
            type={"email"}
            placeholder="mail@example.com"
            label="Почта"
            radius="md"
            required
          />

          <PasswordInput
            required
            autoComplete="current-password"
            label="Пароль"
            placeholder="********"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            radius="md"
          />

          {form.errors.password && (
            <Text size="sm" mt="md" c="red.9" ta="center">
              {form.errors.password}
            </Text>
          )}

          <Button
            type={"submit"}
            mt={errorMessage ? "md" : "xl"}
            fullWidth
            radius={"md"}
            loaderProps={{
              children: (
                <Flex align={"center"} gap={"xs"} pb={3}>
                  <Loader size={"xs"} color={colors.blue[5]} />
                  <span style={{ color: colors.blue[1] }}>Входим...</span>
                </Flex>
              ),
            }}
            loading={isLoading}>
            Войти
          </Button>

          {matches && (
            <Flex
              mt={"md"}
              justify={"center"}
              align={"center"}
              gap={"xs"}
              wrap={"wrap"}>
              <Anchor
                size="sm"
                component={Link}
                to={routes.register.path}
                style={{ textAlign: "center" }}>
                Создать Аккаунт
              </Anchor>
            </Flex>
          )}
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

export default LoginForm
