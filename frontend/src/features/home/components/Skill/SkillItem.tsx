import { FC, type ReactElement } from "react"
import { Badge, Tooltip } from "@mantine/core"

interface SkillItemProps {
  skillName: string
  isSkillSelected: boolean
}

const SkillItem: FC<SkillItemProps> = ({
  skillName,
  isSkillSelected = true,
}): ReactElement => {
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

export default SkillItem
