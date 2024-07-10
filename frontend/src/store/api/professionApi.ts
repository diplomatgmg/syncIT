import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { Profession } from "@/types/professionTypes.ts"

const professionApi = createApi({
  reducerPath: "professionApi",
  baseQuery,
  endpoints: (builder) => ({
    getProfessions: builder.query<Profession[], void>({
      query: () => "professions/",
    }),
  }),
})

export const { useGetProfessionsQuery } = professionApi
export default professionApi
