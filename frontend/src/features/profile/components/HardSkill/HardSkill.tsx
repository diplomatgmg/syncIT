import { ReactElement } from "react"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const HardSkill = (): ReactElement => {
  const { data: hardSkills, isLoading: skillsIsLoading } =
    useGetHardSkillsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  if (skillsIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <HardSkillList
      hardSkills={hardSkills ?? []}
      userHardSkills={userHardSkills}
    />
  )
}

export default HardSkill
