import { type ReactElement } from "react"
import useAuth from "../../store/hooks/useAuth.ts"

const Profile = (): ReactElement => {
  const { email } = useAuth()

  return (
    <div>
      <h1>Profile</h1>
      <p>email - {email}</p>
    </div>
  )
}

export default Profile
