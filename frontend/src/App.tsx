import { BrowserRouter } from "react-router-dom"
import Router from "./routes/Router.tsx"
import { logout } from "./store/slice/authSlice.ts"
import useAppDispatch from "./store/hooks/useAppDispatch.ts"
import useAuth from "./store/hooks/useAuth.ts"

function App() {
  const { isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <hr />
      <p>isAuthenticated - {isAuthenticated.toString()}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default App
