import { type ReactElement } from "react"
import Header from "../../components/Header/Header.tsx"
import Profile from "../../components/Profile/Profile.tsx"

const ProfilePage = (): ReactElement => {
  return (
    <>
      <Header />
      <Profile />
    </>
  )
}

export default ProfilePage
