import { FC } from "react"
import {
  Checkbox as MantineCheckbox,
  Text,
  UnstyledButton,
} from "@mantine/core"

interface CheckboxProps {
  name: string
  isSelected: boolean
  handleCheckboxChange: () => void
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  isSelected,
  handleCheckboxChange,
}) => {
  return (
    <UnstyledButton
      onClick={handleCheckboxChange}
      style={{ display: "flex", alignItems: "center" }}>
      <MantineCheckbox
        onChange={() => {}}
        checked={isSelected}
        styles={{ input: { cursor: "pointer" } }}
      />

      <Text ml={"sm"} fw={400} fz={"xl"}>
        {name}
      </Text>
    </UnstyledButton>
  )
}

export default Checkbox
