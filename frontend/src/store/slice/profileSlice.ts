import { Profession } from "@/types/professionTypes.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { Skill } from "@/types/skillTypes.ts"

export interface ProfileState {
  isChanged: boolean
  professions: Profession[]
  workFormats: WorkFormat[]
  grades: Grade[]
  skills: Omit<Skill, "children" | "selectable">[]
}

const initialState: ProfileState = {
  isChanged: false,
  professions: [],
  workFormats: [],
  grades: [],
  skills: [],
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfessions: (
      state,
      action: PayloadAction<ProfileState["professions"]>
    ) => {
      state.professions = action.payload
    },
    setWorkFormats: (
      state,
      action: PayloadAction<ProfileState["workFormats"]>
    ) => {
      state.workFormats = action.payload
    },
    setGrades: (state, action: PayloadAction<ProfileState["grades"]>) => {
      state.grades = action.payload
    },
    setSkills: (state, action: PayloadAction<ProfileState["skills"]>) => {
      state.skills = action.payload
    },
    setProfileIsChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload
    },
  },
})

export const {
  setProfessions,
  setWorkFormats,
  setGrades,
  setSkills,
  setProfileIsChanged,
} = profileSlice.actions
export default profileSlice.reducer
