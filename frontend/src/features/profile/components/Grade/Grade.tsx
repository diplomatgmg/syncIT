import { type ReactElement } from "react"
import {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
} from "@/store/api/profileApi.ts"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"

const Grade = (): ReactElement => {
  const { data: profileReference, isLoading: profileReferenceIsLoading } =
    useGetProfileReferenceDataQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (profileReferenceIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <Container>
      <GradeList
        grades={profileReference?.grades ?? []}
        userGrades={profileData?.grades ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default Grade
