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

const Message = styled.span`
  position: absolute;
  right: 1rem;
  top: 50px;
  font-size: 0.9rem;
  color: ${colors.danger};
`

const Input: FC<InputProps> = ({ register, error, ...rest }) => {
  const id = useId()
  return (
    <StyledDiv>
      <Label htmlFor={id} label={rest.placeholder || ""} />
      <StyledInput id={id} {...register} {...rest} />
      {error && <Message>{error.message}</Message>}
    </StyledDiv>
  )
}

export default Input
