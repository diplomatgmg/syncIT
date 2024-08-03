import { toast, ToastOptions, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles.css"

const baseConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: false,
  theme: "dark",
  transition: Zoom,
  closeButton: false,
}

export const popup = {
  error: (msg: string) => {
    toast.error(msg, { ...baseConfig })
  },
  warn: (msg: string) => {
    toast.warn(msg, { ...baseConfig })
  },
  success: (msg: string) => {
    toast.success(msg, { ...baseConfig })
  },
}
