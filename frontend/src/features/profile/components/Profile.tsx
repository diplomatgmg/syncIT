import { type ReactElement } from "react"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"
import useAuth from "@/store/hooks/useAuth.ts"

const Profile = (): ReactElement => {
  const { email } = useAuth()

  return (
    <div>
      <p>email - {email}</p>
      <HardSkill />
    </div>
  )
}

export default Profile
