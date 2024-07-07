import { type ReactElement } from "react"
import { useGetUserHardSkillsQuery } from "@/store/api/profileApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"

const HardSkill = (): ReactElement => {
  const { data: hardSkills } = useGetHardSkillsQuery()
  const { data: userHardSkills } = useGetUserHardSkillsQuery()

  return (
    <HardSkillList
      hardSkills={hardSkills ?? []}
      userHardSkills={userHardSkills ?? []}
    />
  )
}

export default HardSkill
