import { FC, type ReactElement, useId } from "react"
import styled from "styled-components"
import { colors } from "@/styles/theme.ts"

interface CheckboxProps {
  name: string
  isSelected: boolean
  handleCheckboxChange: () => void
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  isSelected,
  handleCheckboxChange,
}): ReactElement => {
  const inputId = useId()

  return (
    <Container>
      <Input
        type="checkbox"
        id={inputId}
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <Label htmlFor={inputId}>{name}</Label>
    </Container>
  )
}

export default Checkbox

const Container = styled.div`
  margin-top: 0.25rem;
`

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked + label::before {
    right: 5px;
    border-color: ${colors.accent};
    background-color: ${colors.accent};
  }

  &:not(:disabled):not(:checked) + label:hover::before {
    background-color: ${colors.accent};
    opacity: 0.25;
  }

  &:not(:disabled):active + label::before {
    background-color: ${colors.accent};
    border-color: ${colors.accent};
  }

  &:disabled + label::before {
    background-color: ${colors.accent};
  }
`

const Label = styled.label`
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  user-select: none;

  &::before {
    content: "";
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid ${colors.textSecondary};
    border-radius: 1rem;
    margin-right: 0.5rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 65% 65%;
  }
`
