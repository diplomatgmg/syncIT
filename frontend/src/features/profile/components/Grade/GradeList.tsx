import { FC, type ReactElement } from "react"
import { Grade } from "@/types/gradeTypes.ts"

interface GradeListProps {
  grades: Grade[]
}

const GradeList: FC<GradeListProps> = ({ grades }): ReactElement => {
  return <div>{JSON.stringify(grades)}</div>
}

export default GradeList
