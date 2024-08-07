import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import { useGetWorkFormatsQuery } from "@/store/api/workFormatApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import styled from "styled-components"
import CustomSkeleton from "@/components/common/CustomSkeleton/CustomSkeleton.tsx"

const WorkFormat = (): ReactElement => {
  const { data: workFormats, isLoading: workFormatIsLoading } =
    useGetWorkFormatsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (workFormatIsLoading || profileIsLoading) {
    return <CustomSkeleton height={135} />
  }

  return (
    <Container>
      <WorkFormatList
        workFormats={workFormats ?? []}
        userWorkFormats={profileData?.workFormats ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default WorkFormat
