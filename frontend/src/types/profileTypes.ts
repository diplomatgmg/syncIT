import { HardSkill } from "@/types/hardSkillTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { Profession } from "@/types/professionTypes.ts"

export interface ProfileStatus {
  isCompleted: boolean
}

export interface Profile {
  isCompleted: boolean
  hardSkills: HardSkill[]
  grades: Grade[]
  workFormats: WorkFormat[]
  professions: Profession[]
}
