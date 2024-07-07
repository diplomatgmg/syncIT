import { type ReactElement } from "react"
import GradeList from "@/features/profile/components/Grade/GradeList.tsx"
import { useGetGradesQuery } from "@/store/api/gradeApi.ts"

const Grade = (): ReactElement => {
  const { data: grades } = useGetGradesQuery()

  return <GradeList grades={grades ?? []} />
}

export default Grade
