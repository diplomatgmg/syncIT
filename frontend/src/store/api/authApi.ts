import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "./baseApi.ts"

export interface LoginResponse {
  email: string
  token: {
    access: string
    refresh: string
  }
}

export interface RegisterResponse {
  email: string
}

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
    test: builder.query({
      query: () => "test/",
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useTestQuery } = authApi
export default authApi
