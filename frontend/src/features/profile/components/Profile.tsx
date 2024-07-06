import { type ReactElement } from "react"
import useAuth from "../../../store/hooks/useAuth.ts"
import HardSkill from "./HardSkill/HardSkill.tsx"

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
