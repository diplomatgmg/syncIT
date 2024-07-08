import { type ReactElement } from "react"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"
import { useGetGradesQuery } from "@/store/api/gradeApi.ts"
import { useGetUserGradesQuery } from "@/store/api/profileApi.ts"

const Grade = (): ReactElement => {
  const { data: grades } = useGetGradesQuery()
  const { data: userGrades } = useGetUserGradesQuery()

  return <GradeList grades={grades ?? []} userGrades={userGrades ?? []} />
}

export default Grade
