import { type ReactElement } from "react"
import routes from "../../routes/routes.tsx"

const Header = (): ReactElement => {
  return (
    <ul>
      <li>
        <a href={routes.home.path}>Home</a>
      </li>
      <li>
        <a href={routes.login.path}>Login</a>
      </li>
      <li>
        <a href={routes.register.path}>Register</a>
      </li>
      <li>
        <a href={routes.profile.path}>Profile</a>
      </li>
    </ul>
  )
}

export default Header
