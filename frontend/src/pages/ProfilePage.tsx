import { type ReactElement } from "react"
import Profile from "@/features/profile/components/Profile.tsx"
import CommonPage from "@/components/layout/CommonPage.tsx"

const ProfilePage = (): ReactElement => {
  return (
    <CommonPage>
      <Profile />
    </CommonPage>
  )
}

export default ProfilePage
