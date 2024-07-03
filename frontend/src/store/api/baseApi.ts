import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store.ts"
import { BASE_URL } from "../../constants.ts"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.access

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`)
    }
    return headers
  },
})

export default baseQuery
