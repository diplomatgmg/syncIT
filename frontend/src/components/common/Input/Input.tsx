import { FC, InputHTMLAttributes, useId } from "react"
import styled from "styled-components"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { colors } from "@/styles/theme.ts"
import Label from "@/components/common/Input/Label.tsx"

const StyledInput = styled.input`
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn
  error?: FieldError
}

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Input: FC<InputProps> = ({ register, error, ...rest }) => {
  const id = useId()
  return (
    <StyledDiv>
      <Label htmlFor={id} label={rest.placeholder || ""} />
      <StyledInput id={id} {...register} {...rest} />
      {error && <span>{error.message}</span>}
    </StyledDiv>
  )
}

export default Input
