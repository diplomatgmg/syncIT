import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "@/store/api/baseQuery.ts"
import {
  Profile,
  ProfileReference,
  ProfileStatus,
} from "@/types/profileTypes.ts"
import { ProfileState } from "@/store/slice/profileSlice.ts"

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfileData: builder.query<Profile, void>({
      query: () => "profile/",
    }),
    getProfileReferenceData: builder.query<ProfileReference, void>({
      query: () => "profile/reference/",
    }),
    getProfileStatus: builder.query<ProfileStatus, void>({
      query: () => "profile/is_completed/",
      providesTags: ["Profile"],
    }),
    setProfileData: builder.mutation<void, ProfileState>({
      query: (data) => ({
        url: "profile/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
})

export const {
  useGetProfileDataQuery,
  useGetProfileReferenceDataQuery,
  useGetProfileStatusQuery,
  useSetProfileDataMutation,
} = profileApi
export default profileApi
