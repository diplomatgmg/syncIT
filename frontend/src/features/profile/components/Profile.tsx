import { type ReactElement } from "react"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import Grade from "@/features/profile/components/Grade/Grade.tsx"

const Profile = (): ReactElement => {
  const { email } = useAuth()

  return (
    <div>
      <span>email - {email}</span>
      <br />
      <hr />
      <HardSkill />
      <br />
      <hr />
      <Grade />
    </div>
  )
}

export default Profile
