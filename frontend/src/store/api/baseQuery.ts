import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "@/store/store.ts"
import { logout, setTokens } from "@/store/slice/authSlice.ts"
import { LoginResponse } from "@/types/authTypes.ts"
import { Mutex } from "async-mutex"

export const API_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:8000/api"

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.token.access

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    console.error(result)
  }

  if (!result.error || result.error.status !== 401) {
    return result
  }

  const refreshToken = (api.getState() as RootState).auth.token.refresh

  if (!refreshToken) {
    api.dispatch(logout())
    return result
  }

  if (!mutex.isLocked()) {
    const release = await mutex.acquire()
    try {
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
    } finally {
      release()
    }
  } else {
    await mutex.waitForUnlock()
    result = await baseQuery(args, api, extraOptions)
  }

  return result
}
export default baseQueryWithReauth
