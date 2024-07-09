import { type ReactElement } from "react"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"
import useAuth from "@/store/hooks/useAuth.ts"
import Grade from "@/features/profile/components/Grade/Grade.tsx"
import WorkFormat from "@/features/profile/components/WorkFormat/WorkFormat.tsx"

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
      <br />
      <hr />
      <WorkFormat />
    </div>
  )
}

export default Profile
