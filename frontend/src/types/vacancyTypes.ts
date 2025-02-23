import { Skill } from "@/types/skillTypes.ts"
import { Company } from "@/types/companyTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { Profession } from "@/types/professionTypes.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"

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
  skills: Skill[]
  description: string
}

export interface UserVacancyResult {
  id: number
  isViewed: boolean
  suitability: number
  vacancy: Vacancy
}

export interface UserVacancy {
  count: number
  previous: string | null
  next: string | null
  results: UserVacancyResult[]
  totalVacancies: number
}

export interface UpdateVacancyViewStatusRequest {
  vacancy: number
}

export interface UpdateVacancyViewStatusResponse {
  status: string
}
