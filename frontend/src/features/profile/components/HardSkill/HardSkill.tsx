import { type ReactElement } from "react"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"

const HardSkill = (): ReactElement => {
  const { data: hardSkills, isLoading } = useGetHardSkillsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <HardSkillList hardSkills={hardSkills ?? []} />
}

export default HardSkill
