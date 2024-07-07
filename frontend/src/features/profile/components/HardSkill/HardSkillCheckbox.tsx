import { FC, type ReactElement } from "react"

interface HardSkillCheckboxProps {
  id: number
  name: string
  isSelected: boolean
  handleCheckboxChange: (id: number) => void
}

const HardSkillCheckbox: FC<HardSkillCheckboxProps> = ({
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

export default HardSkillCheckbox
