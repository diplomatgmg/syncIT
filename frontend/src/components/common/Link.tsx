import { CSSProperties, FC, ReactElement } from "react"
import styled, { ThemeProvider } from "styled-components"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom"
import { colors, transitionsSpeed } from "@/styles/theme.ts"

interface LinkProps extends RouterLinkProps {
  backgroundColor?: CSSProperties["backgroundColor"]
  textColor?: CSSProperties["color"]
  borderRadius?: CSSProperties["borderRadius"]
}

interface StyledLinkProps {
  theme: {
    backgroundColor?: CSSProperties["backgroundColor"]
    textColor: CSSProperties["color"]
    borderRadius?: CSSProperties["borderRadius"]
  }
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.75rem 2.5rem;
  transition: ${transitionsSpeed.fast} linear;

  &:hover {
    background-color: ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.backgroundColor};
  }
`

const Link: FC<LinkProps> = ({
  backgroundColor = "transparent",
  textColor = colors.text,
  borderRadius,
  ...props
}): ReactElement => {
  return (
    <ThemeProvider theme={{ backgroundColor, textColor, borderRadius }}>
      <StyledLink {...props} />
    </ThemeProvider>
  )
}

export default Link
