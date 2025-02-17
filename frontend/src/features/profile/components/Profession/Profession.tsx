import { type ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
} from "@/store/api/profileApi.ts"
import ProfessionList from "@/features/profile/components/Profession/ProfessionList.tsx"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const Profession = (): ReactElement => {
  const { data: profileReference, isLoading: profileReferenceIsLoading } =
    useGetProfileReferenceDataQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (profileReferenceIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <Container>
      <ProfessionList
        professions={profileReference?.professions ?? []}
        userProfessions={profileData?.professions ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default Profession
