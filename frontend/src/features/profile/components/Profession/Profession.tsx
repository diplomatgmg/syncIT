import { type ReactElement } from "react"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import { useGetProfessionsQuery } from "@/store/api/professionApi.ts"
import ProfessionList from "@/features/profile/components/Profession/ProfessionList.tsx"

const Profession = (): ReactElement => {
  const { data: professions } = useGetProfessionsQuery()
  const { data: profileData } = useGetProfileDataQuery()

  const userProfessions = profileData?.professions ?? []

  return (
    <ProfessionList
      professions={professions ?? []}
      userProfessions={userProfessions}
    />
  )
}

export default Profession
