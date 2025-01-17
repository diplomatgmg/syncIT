import { FC, type ReactElement } from "react"
import { Badge, Tooltip } from "@mantine/core"

interface HardSkillItemProps {
  skillName: string
  isSkillSelected: boolean
}

const HardSkillItem: FC<HardSkillItemProps> = ({
  skillName,
  isSkillSelected,
}): ReactElement => {
  console.log(isSkillSelected)

  return (
    <Tooltip
      label={!isSkillSelected && "Скилл не выбран"}
      disabled={isSkillSelected}
      position="bottom"
      withArrow>
      <Badge
        color={isSkillSelected ? "dark" : "#510000"}
        radius="sm"
        size="lg"
        p="md"
        style={{ textTransform: "none" }}>
        {skillName}
      </Badge>
    </Tooltip>
  )
}

export default HardSkillItem
