import { type ReactElement } from "react"
import useAuth from "../../store/hooks/useAuth.ts"
import HardSkillList from "./HardSkill/HardSkillList.tsx"

const Profile = (): ReactElement => {
  const { email } = useAuth()

  return (
    <div>
      <h1>Profile</h1>
      <p>email - {email}</p>
      <HardSkillList />
    </div>
  )
}

export default Profile
