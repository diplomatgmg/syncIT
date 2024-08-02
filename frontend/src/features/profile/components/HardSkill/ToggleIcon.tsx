import OpenTreeSvg from "@/assets/svg/open-tree.svg"
import CloseTreeSvg from "@/assets/svg/close-tree.svg"
import { FC, ReactElement } from "react"
import styled, { ThemeProvider } from "styled-components"

interface ToggleIconProps {
  isOpen: boolean
  onClick: () => void
}

const ToggleIcon: FC<ToggleIconProps> = ({ isOpen, onClick }): ReactElement => (
  <ThemeProvider theme={{ isOpen, onClick }}>
    <IconContainer onClick={onClick}>
      {!isOpen && <TreeIcon src={OpenTreeSvg} />}
      {isOpen && <TreeIcon src={CloseTreeSvg} />}
    </IconContainer>
  </ThemeProvider>
)

const IconContainer = styled.div`
  cursor: pointer;
`

interface TreeIconTheme {
  theme: {
    isOpen: boolean
  }
}

const TreeIcon = styled.img<TreeIconTheme>`
  width: 2rem;
  transition: 0.3s ease;
  position: relative;
  bottom: -2px;
`

export default ToggleIcon
