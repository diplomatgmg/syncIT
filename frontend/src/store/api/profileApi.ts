import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { HardSkill } from "@/types/hardSkillTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { Profession } from "@/types/professionTypes.ts"
import { Profile } from "@/types/ProfileTypes.ts"

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getProfileData: builder.query<Profile, void>({
      query: () => "profile/",
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
    setUserWorkFormats: builder.mutation<WorkFormat[], WorkFormat[]>({
      query: (data) => ({
        url: "profile/work_formats/",
        method: "PATCH",
        body: data,
      }),
    }),
    setUserProfessions: builder.mutation<Profession[], Profession[]>({
      query: (data) => ({
        url: "profile/professions/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetProfileDataQuery,
  useSetUserHardSkillsMutation,
  useSetUserGradesMutation,
  useSetUserWorkFormatsMutation,
  useSetUserProfessionsMutation,
} = profileApi
export default profileApi
