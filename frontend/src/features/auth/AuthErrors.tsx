import { FC, type ReactElement } from "react"
import styled from "styled-components"
import { colors } from "@/styles/theme.ts"

interface AuthErrorsProps {
  errors: string[]
}

const ErrorList = styled.ul`
  list-style: none;
  margin-top: -1rem;
`

const Error = styled.li`
  text-align: center;
  color: ${colors.danger};
  font-size: 1rem;
`

const AuthErrors: FC<AuthErrorsProps> = ({ errors }): ReactElement | null => {
  if (errors.length === 0) return null

  return (
    <ErrorList>
      {errors.map((error) => (
        <Error key={error}>{error}</Error>
      ))}
    </ErrorList>
  )
}

export default AuthErrors
