import { FC, type ReactElement } from "react"
import styled from "styled-components"

interface HardSkillItemProps {
  skillName: string
}

const StyledHardSkillItem = styled.li`
  white-space: nowrap;
  margin: 0.25rem;
  padding: 0.5rem 0.75rem;
  background-color: rgb(47, 51, 53);
  font-size: 1rem;
`

const HardSkillItem: FC<HardSkillItemProps> = ({ skillName }): ReactElement => {
  return <StyledHardSkillItem>{skillName}</StyledHardSkillItem>
}

export default HardSkillItem
