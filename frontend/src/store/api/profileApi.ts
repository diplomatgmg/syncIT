import { createApi } from "@reduxjs/toolkit/query/react"
import { HardSkillTypes, PatchHardSkillTypes } from "@/types/hardSkillTypes.ts"
import baseQuery from "@/store/api/baseQuery.ts"

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getHardSkills: builder.query<HardSkillTypes[], void>({
      query: () => "hard_skills/",
    }),
    getUserHardSkills: builder.query<HardSkillTypes["id"][], void>({
      query: () => ({
        url: "profile/hard_skills/",
        method: "GET",
      }),
    }),
    setHardSkills: builder.mutation<
      PatchHardSkillTypes,
      HardSkillTypes["id"][]
    >({
      query: (hardSkills) => ({
        url: "profile/hard_skills/",
        method: "PATCH",
        body: { hard_skills: hardSkills },
      }),
    }),
  }),
})

export const {
  useGetHardSkillsQuery,
  useGetUserHardSkillsQuery,
  useSetHardSkillsMutation,
} = profileApi
export default profileApi
