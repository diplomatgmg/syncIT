import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "@/constants.ts"
import { RootState } from "@/store/store.ts"
import { logout, setTokens } from "@/store/slice/authSlice.ts"
import { LoginResponse } from "@/types/authTypes.ts"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.token.access

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (!(result.error && result.error.status === 401)) {
    return result
  }

  const refreshToken = (api.getState() as RootState).auth.token.refresh

  if (!refreshToken) {
    api.dispatch(logout())
    return result
  }

  const refreshResult = await baseQuery(
    {
      url: "token/refresh/",
      method: "POST",
      body: { refresh: refreshToken },
    },
    api,
    extraOptions
  )

  if (refreshResult.data) {
    api.dispatch(setTokens(refreshResult.data as LoginResponse))
    result = await baseQuery(args, api, extraOptions)
  } else {
    api.dispatch(logout())
  }

  return result
}
export default baseQueryWithReauth
