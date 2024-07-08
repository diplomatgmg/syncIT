import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getUserHardSkills: builder.query<HardSkill[], void>({
      query: () => "profile/hard_skills/",
    }),
    getUserGrades: builder.query<Grade[], void>({
      query: () => "profile/grades/",
    }),
    setUserHardSkills: builder.mutation<HardSkill[], HardSkill[]>({
      query: (data) => ({
        url: "profile/hard_skills/",
        method: "PATCH",
        body: data,
      }),
    }),
    setUserGrades: builder.mutation<Grade[], Grade[]>({
      query: (data) => ({
        url: "profile/grades/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetUserHardSkillsQuery,
  useGetUserGradesQuery,
  useSetUserHardSkillsMutation,
  useSetUserGradesMutation,
} = profileApi
export default profileApi
