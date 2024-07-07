import {
  type FC,
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
  type ReactElement,
  useId,
} from "react"
import { Controller, type FieldValues } from "react-hook-form"

interface InputProps {
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  autoComplete?: HTMLInputAutoCompleteAttribute
  control?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  rules?: FieldValues
}

const Input: FC<InputProps> = ({
  label,
  name,
  type,
  autoComplete,
  control,
  rules,
}): ReactElement => {
  const inputId = useId()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          <label htmlFor={inputId}>{label}</label>
          <input
            id={inputId}
            type={type ?? "text"}
            autoComplete={autoComplete ?? "off"}
            {...field}
            value={field.value ?? ""}
          />
        </div>
      )}
    />
  )
}

export default Input
