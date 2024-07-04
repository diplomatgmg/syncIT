import Login from "./components/Auth/Login.tsx"
import Register from "./components/Auth/Register.tsx"
import useAuth from "./store/hooks/useAuth.ts"
import { logout } from "./store/slice/authSlice.ts"
import useAppDispatch from "./store/hooks/useAppDispatch.ts"
import { useTestQuery } from "./store/api/authApi.ts"

function App() {
  const { isAuthenticated, email } = useAuth()
  const { data } = useTestQuery(undefined, { skip: !isAuthenticated })
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <Login />
      <hr />
      <Register />
      <hr />
      is Auth = {String(isAuthenticated)}
      <br />
      email = {email}
      <br />
      data = {JSON.stringify(data)}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default App
