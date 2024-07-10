import { type ReactElement } from "react"
import { useGetUserProfessionsQuery } from "@/store/api/profileApi.ts"
import { useGetProfessionsQuery } from "@/store/api/professionApi.ts"
import ProfessionList from "@/features/profile/components/Profession/ProfessionList.tsx"

const Profession = (): ReactElement => {
  const { data: professions } = useGetProfessionsQuery()
  const { data: userProfessions } = useGetUserProfessionsQuery()

  return (
    <ProfessionList
      professions={professions ?? []}
      userProfessions={userProfessions ?? []}
    />
  )
}

export default Profession
