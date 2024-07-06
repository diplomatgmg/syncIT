import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store.ts"

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()

export default useAppDispatch
