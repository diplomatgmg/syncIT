import { type ReactElement } from "react"
import useAuth from "@/store/hooks/useAuth.ts"
import Grade from "@/features/profile/components/Grade/Grade.tsx"
import WorkFormat from "@/features/profile/components/WorkFormat/WorkFormat.tsx"
import Profession from "@/features/profile/components/Profession/Profession.tsx"
import { useGetProfileStatusQuery } from "@/store/api/profileApi.ts"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"

const Profile = (): ReactElement => {
  const { email } = useAuth()
  const { data: profileStatus } = useGetProfileStatusQuery()

  return (
    <div>
      <span>email - {email}</span>
      <br />
      <span>
        profile completed = {String(profileStatus?.isCompleted ?? "unknown")}
      </span>
      <br />
      <hr />
      <HardSkill />
      <br />
      <hr />
      <Grade />
      <br />
      <hr />
      <WorkFormat />
      <br />
      <hr />
      <Profession />
    </div>
  )
}

export default Profile
