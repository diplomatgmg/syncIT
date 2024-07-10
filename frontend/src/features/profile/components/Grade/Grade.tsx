import { type ReactElement } from "react"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"
import { useGetGradesQuery } from "@/store/api/gradeApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

const Grade = (): ReactElement => {
  const { data: grades } = useGetGradesQuery()
  const { data: profileData } = useGetProfileDataQuery()

  const userGrades = profileData?.grades ?? []

  return <GradeList grades={grades ?? []} userGrades={userGrades} />
}

export default Grade
