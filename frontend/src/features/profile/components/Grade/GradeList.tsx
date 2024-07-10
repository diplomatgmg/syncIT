import SelectableList from "@/features/profile/components/Selectable/SelectableList.tsx"
import { FC } from "react"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { useSetUserGradesMutation } from "@/store/api/profileApi.ts"

interface GradeListProps {
  grades: WorkFormat[]
  userGrades: WorkFormat[]
}

const GradeList: FC<GradeListProps> = ({ grades, userGrades }) => (
  <SelectableList
    items={grades}
    userItems={userGrades}
    mutation={useSetUserGradesMutation}
  />
)

export default GradeList
