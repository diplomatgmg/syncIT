import { FC } from "react"
import styled from "styled-components"

interface LabelProps {
  htmlFor: string
  label: string
}

const StyledLabel = styled.label`
  font-size: 1.25rem;
  padding-bottom: 0.75rem;
  color: #fff;
`

const Label: FC<LabelProps> = ({ htmlFor, label }) => (
  <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>
)

export default Label
