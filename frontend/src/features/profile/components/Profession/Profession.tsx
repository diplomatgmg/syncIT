import { type ReactElement } from "react"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import { useGetProfessionsQuery } from "@/store/api/professionApi.ts"
import ProfessionList from "@/features/profile/components/Profession/ProfessionList.tsx"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const Profession = (): ReactElement => {
  const { data: professions, isLoading: professionsIsLoading } =
    useGetProfessionsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (professionsIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <Container>
      <ProfessionList
        professions={professions ?? []}
        userProfessions={profileData?.professions ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default Profession
