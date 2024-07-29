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
  style?: CSSProperties
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  backgroundColor?: CSSProperties["backgroundColor"]
  textColor?: CSSProperties["color"]
  borderRadius?: CSSProperties["borderRadius"]
}

interface StyledButtonProps {
  style?: CSSProperties
  theme: {
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

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.backgroundColor};
  }
`

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  style,
  type = "button",
  backgroundColor = colors.accent,
  textColor = colors.text,
  borderRadius,
}): ReactElement => {
  return (
    <ThemeProvider theme={{ backgroundColor, textColor, borderRadius }}>
      <StyledButton style={style} onClick={onClick} type={type}>
        {children}
      </StyledButton>
    </ThemeProvider>
  )
}

export default Button
