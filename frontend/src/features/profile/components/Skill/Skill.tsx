import { ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
} from "@/store/api/profileApi.ts"
import SkillList from "@/features/profile/components/Skill/SkillList.tsx"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const Skill = (): ReactElement => {
  const { data: profileReference, isLoading: profileReferenceIsLoading } =
    useGetProfileReferenceDataQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  const userSkills = profileData?.skills ?? []

  if (profileReferenceIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <SkillList
      skills={profileReference?.skills ?? []}
      userSkills={userSkills}
    />
  )
}

export default Skill
