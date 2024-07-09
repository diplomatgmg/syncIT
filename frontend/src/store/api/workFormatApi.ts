import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import { WorkFormat } from "@/types/workFormatTypes.ts"

const workFormatsApi = createApi({
  reducerPath: "workFormatApi",
  baseQuery,
  endpoints: (builder) => ({
    getWorkFormats: builder.query<WorkFormat[], void>({
      query: () => "work_formats/",
    }),
  }),
})

export const { useGetWorkFormatsQuery } = workFormatsApi
export default workFormatsApi
