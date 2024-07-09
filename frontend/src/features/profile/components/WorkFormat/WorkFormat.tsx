import { type ReactElement } from "react"
import WorkFormatList from "@/features/profile/components/WorkFormat/WorkFormatList.tsx"
import { useGetWorkFormatsQuery } from "@/store/api/workFormatApi.ts"
import { useGetUserWorkFormatsQuery } from "@/store/api/profileApi.ts"

const WorkFormat = (): ReactElement => {
  const { data: workFormats } = useGetWorkFormatsQuery()
  const { data: userWorkFormats } = useGetUserWorkFormatsQuery()

  return (
    <WorkFormatList
      workFormats={workFormats ?? []}
      userWorkFormats={userWorkFormats ?? []}
    />
  )
}

export default WorkFormat
