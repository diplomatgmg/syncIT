import { HardSkill } from "@/types/hardSkillTypes.ts"
import { Company } from "@/types/companyTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { Profession } from "@/types/professionTypes.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"

// Краткая информация о вакансии
export interface Vacancy {
  id: number
  name: string
  salaryFrom: number | null
  salaryTo: number | null
  currency: string | null
  experience: string
  url: string
  company: Company
  grade: Grade
  profession: Profession
  workFormats: WorkFormat[]
  hardSkills: HardSkill[]
  description: string
}

export interface UserVacancy {
  id: number
  isViewed: boolean
  suitability: number
  vacancy: Vacancy
}

export interface UpdateVacancyViewStatusRequest {
  vacancy: number
}

export interface UpdateVacancyViewStatusResponse {
  status: string
}
