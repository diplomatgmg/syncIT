import { type ReactElement } from "react"
import Header from "@/components/layout/Header/Header.tsx"
import Profile from "@/features/profile/components/Profile.tsx"
import Footer from "@/components/layout/Footer/Footer.tsx"

const ProfilePage = (): ReactElement => {
  return (
    <>
      <Header />
      <h3>Profile</h3>
      <Profile />
      <Footer />
    </>
  )
}

export default ProfilePage
