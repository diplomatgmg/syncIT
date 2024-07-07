import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { HardSkill } from "@/types/hardSkillTypes.ts"

const hardSkillApi = createApi({
  reducerPath: "hardSkillApi",
  baseQuery,
  endpoints: (builder) => ({
    getHardSkills: builder.query<HardSkill[], void>({
      query: () => "hard_skills/",
    }),
  }),
})

export const { useGetHardSkillsQuery } = hardSkillApi
export default hardSkillApi
