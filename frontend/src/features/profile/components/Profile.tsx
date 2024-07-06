import { type ReactElement } from "react"
import HardSkillList from "./HardSkillList.tsx"
import useAuth from "../../../store/hooks/useAuth.ts"

const Profile = (): ReactElement => {
  const { email } = useAuth()

  return (
    <div>
      <p>email - {email}</p>
      <HardSkillList />
    </div>
  )
}

export default Profile
