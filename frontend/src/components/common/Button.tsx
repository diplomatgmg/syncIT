import { CSSProperties, FC, type ReactElement, ReactNode } from "react"
import styled, { ThemeProvider } from "styled-components"
import { colors, sizes, transitionsSpeed } from "@/styles/theme.ts"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  backgroundColor?: CSSProperties["backgroundColor"]
  textColor?: CSSProperties["color"]
  borderRadius?: CSSProperties["borderRadius"]
}

interface StyledButtonProps {
  theme: {
    backgroundColor?: CSSProperties["backgroundColor"]
    textColor: CSSProperties["color"]
  }
}

const StyledButton = styled.button<StyledButtonProps>`
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  border: none;
  font-size: ${sizes.lg};
  border-radius: ${({ theme }) => theme.borderRadius ?? "1.25rem"};
  padding: 0.5rem 2.25rem;
  letter-spacing: 1px;
  font-weight: bold;
  transition: ${transitionsSpeed.fast} linear;
  font-family: "Nunito", sans-serif;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.backgroundColor};
  }
`

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  backgroundColor = colors.accent,
  textColor = colors.text,
  borderRadius,
}): ReactElement => {
  return (
    <ThemeProvider theme={{ backgroundColor, textColor, borderRadius }}>
      <StyledButton onClick={onClick} type={type}>
        {children}
      </StyledButton>
    </ThemeProvider>
  )
}

export default Button
