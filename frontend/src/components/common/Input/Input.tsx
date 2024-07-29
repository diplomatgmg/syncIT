import {
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
  type ReactElement,
  useId,
} from "react"
import { Control, Controller, type FieldValues, Path } from "react-hook-form"
import Label from "@/components/common/Input/Label.tsx"
import InputField from "@/components/common/Input/InputField.tsx"
import styled from "styled-components"

interface InputProps<T extends FieldValues> {
  label: string
  error?: string
  name: Path<T>
  type?: HTMLInputTypeAttribute
  autoComplete?: HTMLInputAutoCompleteAttribute
  control?: Control<T>
  rules?: FieldValues
}

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const StyledError = styled.span`
  position: absolute;
  font-size: 0.9rem;
  color: red;
  left: 22px;
  bottom: 50px;
  pointer-events: none;
`

const Input = <T extends FieldValues>({
  label,
  error,
  name,
  type,
  autoComplete,
  control,
  rules,
}: InputProps<T>): ReactElement => {
  const inputId = useId()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <StyledDiv>
          <Label htmlFor={inputId} label={label} />
          <InputField
            id={inputId}
            type={type}
            autoComplete={autoComplete}
            field={field}
          />
          {error && <StyledError>{error}</StyledError>}
        </StyledDiv>
      )}
    />
  )
}

export default Input
