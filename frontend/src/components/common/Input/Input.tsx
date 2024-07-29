import {
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
  type ReactElement,
  useId,
} from "react"
import { Control, Controller, type FieldValues, Path } from "react-hook-form"

interface InputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  type?: HTMLInputTypeAttribute
  autoComplete?: HTMLInputAutoCompleteAttribute
  control?: Control<T>
  rules?: FieldValues
}

const Input = <T extends FieldValues>({
  label,
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
