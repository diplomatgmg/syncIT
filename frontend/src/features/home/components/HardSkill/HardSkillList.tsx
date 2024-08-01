import { FC, type ReactElement } from "react"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import HardSkillItem from "@/features/home/components/HardSkill/HardSkillItem.tsx"
import styled from "styled-components"

interface HardSkillListProps {
  hardSkills: HardSkill[]
}

const StyledHardSkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`

const HardSkillList: FC<HardSkillListProps> = ({
  hardSkills,
}): ReactElement => {
  return (
    <StyledHardSkillList>
      {hardSkills.map(({ id, name }) => (
        <HardSkillItem key={id} skillName={name} />
      ))}
    </StyledHardSkillList>
  )
}

export default HardSkillList
