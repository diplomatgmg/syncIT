import { createApi } from "@reduxjs/toolkit/query/react"
import {
  ActivateAccountRequest,
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
        url: "token/create/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "user/register/",
        method: "POST",
        body: credentials,
      }),
    }),
    activateAccount: builder.mutation<void, ActivateAccountRequest>({
      query: (data) => ({
        url: "user/activate/",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useActivateAccountMutation,
} = authApi
export default authApi
