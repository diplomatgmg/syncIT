import { createApi } from "@reduxjs/toolkit/query/react"
import { HardSkillTypes } from "@/types/hardSkillTypes.ts"
import baseQuery from "@/store/api/baseQuery.ts"

const hardSkillApi = createApi({
  reducerPath: "hardSkillApi",
  baseQuery,
  endpoints: (builder) => ({
    getHardSkills: builder.query<HardSkillTypes[], void>({
      query: () => "user/hard_skills/",
    }),
  }),
})

export const { useGetHardSkillsQuery } = hardSkillApi
export default hardSkillApi
