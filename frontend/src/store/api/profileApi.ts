import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { HardSkill } from "@/types/hardSkillTypes.ts"

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getUserHardSkills: builder.query<HardSkill[], void>({
      query: () => ({
        url: "profile/hard_skills/",
        method: "GET",
      }),
    }),
    setUserHardSkills: builder.mutation<HardSkill[], HardSkill[]>({
      query: (hardSkills) => ({
        url: "profile/hard_skills/",
        method: "PATCH",
        body: hardSkills,
      }),
    }),
  }),
})

export const { useGetUserHardSkillsQuery, useSetUserHardSkillsMutation } =
  profileApi
export default profileApi
