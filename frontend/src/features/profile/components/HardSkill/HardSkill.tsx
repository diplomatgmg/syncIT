import { ReactElement } from "react"
import { useGetHardSkillsQuery } from "@/store/api/hardSkillApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"
import HardSkillList from "@/features/profile/components/HardSkill/HardSkillList.tsx"

const HardSkill = (): ReactElement => {
  const { data: hardSkills, isLoading: skillsIsLoading } =
    useGetHardSkillsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  const userHardSkills = profileData?.hardSkills ?? []

  if (skillsIsLoading || profileIsLoading) {
    // Если прокинуть data без этого условия пропсы не обновятся в дочерних компонентах
    // Скорее всего из-за долгого ответа бекенда к эндпоинту /api/hard_skills
    return <div>Loading...</div>
  }

  return (
    <HardSkillList
      hardSkills={hardSkills ?? []}
      userHardSkills={userHardSkills}
    />
  )
}

export default HardSkill
