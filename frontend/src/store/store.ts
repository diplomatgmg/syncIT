import { configureStore } from "@reduxjs/toolkit"
import authApi from "@/store/api/authApi.ts"
import profileApi from "@/store/api/profileApi.ts"
import gradeApi from "@/store/api/gradeApi.ts"
import hardSkillApi from "@/store/api/hardSkillApi.ts"
import authReducer from "@/store/slice/authSlice.ts"

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [hardSkillApi.reducerPath]: hardSkillApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      gradeApi.middleware,
      hardSkillApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
