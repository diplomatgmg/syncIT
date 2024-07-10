import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import { useGetWorkFormatsQuery } from "@/store/api/workFormatApi.ts"
import { useGetProfileDataQuery } from "@/store/api/profileApi.ts"

const WorkFormat = (): ReactElement => {
  const { data: workFormats } = useGetWorkFormatsQuery()
  const { data: profileData } = useGetProfileDataQuery()

  const userWorkFormats = profileData?.workFormats ?? []

  return (
    <WorkFormatList
      workFormats={workFormats ?? []}
      userWorkFormats={userWorkFormats}
    />
  )
}

export default WorkFormat
