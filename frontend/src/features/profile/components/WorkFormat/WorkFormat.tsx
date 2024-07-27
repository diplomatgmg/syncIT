import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import { useGetWorkFormatsQuery } from "@/store/api/workFormatApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

const WorkFormat = (): ReactElement => {
  const { data: workFormats, isLoading: workFormatIsLoading } =
    useGetWorkFormatsQuery()
  const { data: profileData, isLoading: profileIsLoading } =
    useGetProfileDataQuery()

  if (workFormatIsLoading || profileIsLoading) {
    return <div>Loading...</div>
  }

  return (
    <WorkFormatList
      workFormats={workFormats ?? []}
      userWorkFormats={profileData?.workFormats ?? []}
    />
  )
}

export default WorkFormat
