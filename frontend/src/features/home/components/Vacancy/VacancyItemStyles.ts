import styled from "styled-components"
import { colors, transitionsSpeed } from "@/styles/theme.ts"

export const UnWatch = styled.img`
  align-self: start;
  width: 2.5rem;
  transition: ${transitionsSpeed.fast};
  user-select: none;
  position: relative;
  top: -10px;

  &:hover {
    scale: 130%;
    cursor: pointer;
  }
`

export const Watched = styled.span`
  user-select: none;
  display: flex;
  align-items: center;
  color: ${colors.text};
  position: relative;
  top: -10px;
  font-size: 1.25rem;
`

export const Format = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ToggleDescription = styled.input.attrs({ type: "checkbox" })`
  display: none;
`

export const ToggleLabel = styled.label`
  display: block;
  margin-top: 1.5rem;
  color: ${colors.accent};
  cursor: pointer;
  text-align: center;

  user-select: none;

  &:hover {
    color: #6d7eec;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const JobDescription = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;

  pre {
    margin-bottom: 0;
    white-space: pre-wrap;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    line-height: 1.15rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  ${ToggleDescription}:checked ~ & {
    max-height: 600px;
    transition: max-height 0.3s ease-in;
  }
`
