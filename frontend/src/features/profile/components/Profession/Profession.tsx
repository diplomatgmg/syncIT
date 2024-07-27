import { type ReactElement } from "react"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import { useGetProfessionsQuery } from "@/store/api/professionApi.ts"
import ProfessionList from "@/features/profile/components/Profession/ProfessionList.tsx"

const Profession = (): ReactElement => {
  const { data: professions, isLoading: professionsIsLoading } =
    useGetProfessionsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (professionsIsLoading || profileIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <ProfessionList
      professions={professions ?? []}
      userProfessions={profileData?.professions ?? []}
    />
  )
}

export default Profession
