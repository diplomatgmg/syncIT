import { HardSkill } from "@/types/hardSkillTypes.ts"

export interface Vacancy {
  id: number
  uniqueHash: string
  name: string
  description: string
  salaryFrom: number
  salaryTo: number
  experience: string
  url: string
  company: number
  grade: number
  workFormats: number[]
  hardSkills: HardSkill[]
  profession: number
  createdAt: string
  publishedAt: string
} // TODO Пофиксить тип

export type PreviewVacancy = Pick<Vacancy, "id" | "name" | "url" | "hardSkills">
