import {
  type FC,
  type ReactElement,
  type HTMLInputTypeAttribute,
  type HTMLInputAutoCompleteAttribute,
  useId,
} from "react"
import { Controller, type FieldValues } from "react-hook-form"

interface InputProps {
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  autocomplete?: HTMLInputAutoCompleteAttribute
  control?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  rules: FieldValues
}

const Input: FC<InputProps> = ({
  label,
  name,
  type,
  autocomplete,
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
            autoComplete={autocomplete ?? "off"}
            {...field}
            value={field.value ?? ""}
          />
        </div>
      )}
    />
  )
}

export default Input
