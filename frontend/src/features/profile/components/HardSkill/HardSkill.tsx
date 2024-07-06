import { type ReactElement } from "react"
import HardSkillList from "./HardSkillList.tsx"
import { useGetHardSkillsQuery } from "../../../../store/api/hardSkillApi.ts"

const HardSkill = (): ReactElement => {
  const { data: hardSkills, isLoading } = useGetHardSkillsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <HardSkillList hardSkills={hardSkills ?? []} />
}

export default HardSkill
