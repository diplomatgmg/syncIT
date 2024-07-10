import SelectableList from "@/features/profile/components/Selectable/SelectableList.tsx"
import { FC } from "react"
import { Profession } from "@/types/professionTypes.ts"
import { useSetUserProfessionsMutation } from "@/store/api/profileApi.ts"

interface ProfessionListProps {
  professions: Profession[]
  userProfessions: Profession[]
}

const ProfessionList: FC<ProfessionListProps> = ({
  professions,
  userProfessions,
}) => (
  <SelectableList
    items={professions}
    userItems={userProfessions}
    mutation={useSetUserProfessionsMutation}
  />
)

export default ProfessionList
