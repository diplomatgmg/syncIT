import { ReactElement } from "react"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"

const HardSkill = (): ReactElement | null => {
  const { data: hardSkills, isLoading: skillsIsLoading } =
    useGetHardSkillsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  if (skillsIsLoading || profileIsLoading) {
    return null
  }

  return (
    <HardSkillList
      hardSkills={hardSkills ?? []}
      userHardSkills={userHardSkills}
    />
  )
}

export default HardSkill
