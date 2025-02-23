import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { Skill } from "@/types/skillTypes.ts"

const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery,
  endpoints: (builder) => ({
    getSkills: builder.query<Skill[], void>({
      query: () => "skills/",
    }),
  }),
})

export const { useGetSkillsQuery } = skillApi
export default skillApi
