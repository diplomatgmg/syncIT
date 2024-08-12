import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import { useGetWorkFormatsQuery } from "@/store/api/workFormatApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import styled from "styled-components"

const WorkFormat = (): ReactElement | null => {
  const { data: workFormats, isLoading: workFormatIsLoading } =
    useGetWorkFormatsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (workFormatIsLoading || profileIsLoading) {
    return null
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
