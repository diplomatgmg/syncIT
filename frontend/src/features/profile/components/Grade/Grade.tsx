import { type ReactElement } from "react"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"
import { useGetGradesQuery } from "@/store/api/gradeApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import styled from "styled-components"

const Grade = (): ReactElement | null => {
  const { data: grades, isLoading: gradesIsLoading } = useGetGradesQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (gradesIsLoading || profileIsLoading) {
    return null
  }

  return (
    <Container>
      <GradeList grades={grades ?? []} userGrades={profileData?.grades ?? []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.5rem 1rem;
`

export default Grade
