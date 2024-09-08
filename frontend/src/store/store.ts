import { configureStore } from "@reduxjs/toolkit"
import authApi from "@/store/api/authApi.ts"
import profileApi from "@/store/api/profileApi.ts"
import gradeApi from "@/store/api/gradeApi.ts"
import hardSkillApi from "@/store/api/hardSkillApi.ts"
import workFormatApi from "@/store/api/workFormatApi.ts"
import professionApi from "@/store/api/professionApi.ts"
import authReducer from "@/store/slice/authSlice.ts"
import profileReducer from "@/store/slice/profileSlice"
import vacancyApi from "@/store/api/vacancyApi.ts"

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [hardSkillApi.reducerPath]: hardSkillApi.reducer,
    [workFormatApi.reducerPath]: workFormatApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
    [vacancyApi.reducerPath]: vacancyApi.reducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      gradeApi.middleware,
      hardSkillApi.middleware,
      workFormatApi.middleware,
      professionApi.middleware,
      vacancyApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
