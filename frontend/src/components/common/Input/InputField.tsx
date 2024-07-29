import { ChangeEvent, FC, InputHTMLAttributes } from "react"
import styled from "styled-components"
import { colors } from "@/styles/theme.ts"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  field: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: string | number
  }
}

const StyledInputField = styled.input`
  outline: none;
  border: 2px solid ${colors.accent};
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  font-family: "Nunito", sans-serif;
`

const InputField: FC<InputFieldProps> = (props) => (
  <StyledInputField {...props} {...props.field} />
)

export default InputField
