import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import "@/style.css"
import store from "@/store/store.ts"
import App from "@/App.tsx"

const rootElement = document.getElementById("root")!

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

if (process.env.NODE_ENV === "development") {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>{app}</React.StrictMode>
  )
} else {
  ReactDOM.createRoot(rootElement).render(app)
}
