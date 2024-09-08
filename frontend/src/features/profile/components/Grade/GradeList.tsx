import SelectableList from "@/features/profile/components/Selectable/SelectableList.tsx"
import { FC } from "react"
import { WorkFormat } from "@/types/workFormatTypes.ts"

interface GradeListProps {
  grades: WorkFormat[]
  userGrades: WorkFormat[]
}

const GradeList: FC<GradeListProps> = ({ grades, userGrades }) => (
  <SelectableList items={grades} userItems={userGrades} itemsName="grade" />
)

export default GradeList
