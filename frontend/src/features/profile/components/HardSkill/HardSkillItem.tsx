import { FC, type ReactElement } from "react"

interface HardSkillItemProps {
  name: string
}

const HardSkillItem: FC<HardSkillItemProps> = ({ name }): ReactElement => {
  return <li>{name}</li>
}

export default HardSkillItem
