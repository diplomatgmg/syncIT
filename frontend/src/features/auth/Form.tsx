import { FC, type ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { colors } from "@/styles/theme.ts"

interface FormProps {
  children: ReactNode
  onSubmit: () => void
}

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  padding: 3rem 3rem 4rem;
  border-radius: 1rem;
`

const Form: FC<FormProps> = ({ children, onSubmit }): ReactElement => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

export default Form
