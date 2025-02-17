import { ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
} from "@/store/api/profileApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const HardSkill = (): ReactElement => {
  const { data: profileReference, isLoading: profileReferenceIsLoading } =
    useGetProfileReferenceDataQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  if (profileReferenceIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <HardSkillList
      hardSkills={profileReference?.hardSkills ?? []}
      userHardSkills={userHardSkills}
    />
  )
}

export default HardSkill
