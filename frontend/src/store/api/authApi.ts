import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "./baseApi.ts"

interface TokenResponse {
  access: string
  refresh: string
}

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, unknown>({
      query: (credentials) => ({
        url: "token/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<TokenResponse, unknown>({
      query: (credentials) => ({
        url: "register/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
export default authApi
