import { createApi } from "@reduxjs/toolkit/query/react"

import baseApi from "./baseApi.ts"
import { HardSkill } from "../../types/hardSkill.ts"

const hardSkillApi = createApi({
  reducerPath: "hardSkillApi",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    getHardSkills: builder.query<HardSkill[], void>({
      query: () => "hard_skills/",
    }),
  }),
})

export const { useGetHardSkillsQuery } = hardSkillApi
export default hardSkillApi
