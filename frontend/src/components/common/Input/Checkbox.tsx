import { FC, type ReactElement } from "react"

interface CheckboxProps {
  id: number
  name: string
  isSelected: boolean
  handleCheckboxChange: (id: number) => void
}

const Checkbox2: FC<CheckboxProps> = ({
  id,
  name,
  isSelected,
  handleCheckboxChange,
}): ReactElement => {
  return (
    <label>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleCheckboxChange(id)}
      />
      {name}
    </label>
  )
}

export default Checkbox2
