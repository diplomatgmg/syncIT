import {
  ButtonHTMLAttributes,
  CSSProperties,
  FC,
  type ReactElement,
  ReactNode,
} from "react"
import styled, { ThemeProvider } from "styled-components"
import { colors, transitionsSpeed } from "@/styles/theme.ts"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: CSSProperties
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  backgroundColor?: CSSProperties["backgroundColor"]
  textColor?: CSSProperties["color"]
  borderRadius?: CSSProperties["borderRadius"]
}

interface StyledButtonProps {
  style?: CSSProperties
  theme: {
    disabled?: boolean
    backgroundColor?: CSSProperties["backgroundColor"]
    textColor: CSSProperties["color"]
  }
}

const StyledButton = styled.button<StyledButtonProps>`
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  font-size: 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius ?? "2rem"};
  padding: 0.75rem 3rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  transition: ${transitionsSpeed.fast} linear;
  font-family: "Nunito", sans-serif;
  display: flex;
  justify-content: center;
  cursor: ${({ theme }) => (theme.disabled ? "not-allowed" : "pointer")};
  opacity: ${({ theme }) => (theme.disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${({ theme }) =>
      theme.disabled ? theme.backgroundColor : theme.textColor};
    color: ${({ theme }) =>
      theme.disabled ? theme.textColor : theme.backgroundColor};
  }
`

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  style,
  type = "button",
  backgroundColor = colors.accent,
  textColor = colors.text,
  borderRadius,
}): ReactElement => {
  return (
    <ThemeProvider
      theme={{ backgroundColor, textColor, borderRadius, disabled }}>
      <StyledButton
        style={style}
        onClick={!disabled ? onClick : undefined}
        type={type}
        disabled={disabled}>
        {children}
      </StyledButton>
    </ThemeProvider>
  )
}

export default Button
