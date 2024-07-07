import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { Grade } from "@/types/gradeTypes.ts"

const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery,
  endpoints: (builder) => ({
    getGrades: builder.query<Grade[], void>({
      query: () => "grades/",
    }),
  }),
})

export const { useGetGradesQuery } = gradeApi
export default gradeApi
