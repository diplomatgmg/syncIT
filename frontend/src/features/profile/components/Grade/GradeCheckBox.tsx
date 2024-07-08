import { FC, type ReactElement } from "react"

interface GradeCheckboxProps {
  id: number
  name: string
  isSelected: boolean
  handleCheckboxChange: (id: number) => void
}

const GradeCheckbox: FC<GradeCheckboxProps> = ({
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

export default GradeCheckbox
