import { FC, type ReactElement } from "react"

interface CheckboxProps {
  id: number
  name: string
  isSelected: boolean
  handleCheckboxChange: (id: number) => void
}

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  isSelected,
  handleCheckboxChange,
}): ReactElement => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCheckboxChange(id)}
        />
        {name}
      </label>
    </li>
  )
}

export default Checkbox
