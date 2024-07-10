import { ReactElement } from "react"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

const HardSkill = (): ReactElement => {
  const { data: hardSkills } = useGetHardSkillsQuery()
  const { data: profileData } = useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  return (
    <HardSkillList
      hardSkills={hardSkills ?? []}
      userHardSkills={userHardSkills}
    />
  )
}

export default HardSkill
