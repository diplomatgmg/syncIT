import { Profession } from "@/types/professionTypes.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkFormat } from "@/types/workFormatTypes.ts"
import { Grade } from "@/types/gradeTypes.ts"
import { HardSkill } from "@/types/hardSkillTypes.ts"

export interface ProfileState {
  isChanged: boolean
  professions: Profession[]
  workFormats: WorkFormat[]
  grades: Grade[]
  hardSkills: Omit<HardSkill, "children" | "selectable">[]
}

const initialState: ProfileState = {
  isChanged: false,
  professions: [],
  workFormats: [],
  grades: [],
  hardSkills: [],
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
    setHardSkills: (
      state,
      action: PayloadAction<ProfileState["hardSkills"]>
    ) => {
      state.hardSkills = action.payload
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
  setHardSkills,
  setProfileIsChanged,
} = profileSlice.actions
export default profileSlice.reducer
