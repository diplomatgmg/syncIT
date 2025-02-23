export interface Skill {
  id: number
  name: string
  selectable: boolean
  children: Skill[]
}
