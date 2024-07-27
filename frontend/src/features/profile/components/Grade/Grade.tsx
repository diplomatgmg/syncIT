import { type ReactElement } from "react"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"
import { useGetGradesQuery } from "@/store/api/gradeApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

const Grade = (): ReactElement => {
  const { data: grades, isLoading: gradesIsLoading } = useGetGradesQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (gradesIsLoading || profileIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <GradeList grades={grades ?? []} userGrades={profileData?.grades ?? []} />
  )
}

export default Grade
