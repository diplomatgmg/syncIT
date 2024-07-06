import { createApi } from "@reduxjs/toolkit/query/react"
import { LoginResponse, RegisterResponse } from "@/types/authTypes.ts"
import baseQuery from "@/store/api/baseQuery.ts"

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, unknown>({
      query: (credentials) => ({
        url: "token/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, unknown>({
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
