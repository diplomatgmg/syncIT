import { FC, type ReactElement } from "react"
import { Badge } from "@mantine/core"

interface HardSkillItemProps {
  skillName: string
}

const HardSkillItem: FC<HardSkillItemProps> = ({ skillName }): ReactElement => {
  return (
    <Badge
      color={"dark"}
      radius={"sm"}
      size={"lg"}
      p={"md"}
      style={{ textTransform: "none" }}>
      {skillName}
    </Badge>
  )
}

export default HardSkillItem
