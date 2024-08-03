import { createApi } from "@reduxjs/toolkit/query/react"
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/authTypes.ts"
import baseQuery from "@/store/api/baseQuery.ts"

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/token/create/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "auth/register/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
export default authApi
