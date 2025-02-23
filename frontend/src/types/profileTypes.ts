import { Skill } from "@/types/skillTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { Profession } from "@/types/professionTypes.ts"

export interface ProfileStatus {
  id: number
  isCompleted: boolean
}

export interface Profile {
  isCompleted: boolean
  skills: Skill[]
  grades: Grade[]
  workFormats: WorkFormat[]
  professions: Profession[]
}

export interface ProfileReference {
  skills: Skill[]
  grades: Grade[]
  workFormats: WorkFormat[]
  professions: Profession[]
}
