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
  disabled?: boolean
}

interface StyledLinkProps {
  theme: {
    disabled?: boolean
    backgroundColor?: CSSProperties["backgroundColor"]
    textColor: CSSProperties["color"]
    borderRadius?: CSSProperties["borderRadius"]
  }
}

const StyledLink = styled(RouterLink)<StyledLinkProps>`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  padding: 0.75rem 2.5rem;
  transition: ${transitionsSpeed.fast} linear;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  cursor: ${({ theme }) => (theme.disabled ? "not-allowed" : "pointer")};
  opacity: ${({ theme }) => (theme.disabled ? 0.25 : 1)};

  &:hover {
    background-color: ${colors.primary};
    color: ${({ theme }) =>
      theme.disabled ? theme.textColor : theme.backgroundColor};
  }
`

const Link: FC<LinkProps> = ({
  backgroundColor,
  textColor = colors.text,
  borderRadius,
  disabled,
  ...props
}): ReactElement => {
  // Костыль для отключения ссылок, если кнопка неактивна
  const normalizedProps = {
    ...props,
    to: disabled ? "" : props.to,
  }

  return (
    <ThemeProvider
      theme={{
        backgroundColor,
        textColor,
        borderRadius,
        disabled,
      }}>
      <StyledLink {...normalizedProps} />
    </ThemeProvider>
  )
}

export default Link
