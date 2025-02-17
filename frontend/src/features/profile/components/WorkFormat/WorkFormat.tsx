import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
} from "@/store/api/profileApi.ts"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const WorkFormat = (): ReactElement => {
  const { data: profileReference, isLoading: profileReferenceIsLoading } =
    useGetProfileReferenceDataQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (profileReferenceIsLoading || profileIsLoading) {
    return <CustomSkeleton />
  }

  return (
    <Container>
      <WorkFormatList
        workFormats={profileReference?.workFormats ?? []}
        userWorkFormats={profileData?.workFormats ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default WorkFormat
