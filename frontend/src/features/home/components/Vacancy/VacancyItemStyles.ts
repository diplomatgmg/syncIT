import styled from "styled-components"
import { colors, transitionsSpeed } from "@/styles/theme.ts"

interface Styles {
  theme: {
    isViewed: boolean
  }
}

export const JobCard = styled.div<Styles>`
  border: 1px solid ${colors.textSecondary};
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  background-color: ${({ theme }) =>
    theme.isViewed ? colors.background : colors.primary};
  margin-bottom: 4rem;
  transition: ${transitionsSpeed.fast};

  &:hover {
    background-color: #131315ff;
  }

  @media (max-width: 1200px) {
    border: none;
    border-bottom: 1px solid ${colors.textSecondary};
    border-top: 1px solid ${colors.textSecondary};
    border-radius: 0;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`

export const JobHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.textSecondary};
  padding-bottom: 10px;
`

export const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const JobTitle = styled.h3`
  margin: 0;
  font-size: 2rem;

  a {
    text-decoration: none;
    color: ${colors.accent};

    &:hover {
      color: #6d7eec;
    }
  }

  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }
`

export const UnWatch = styled.img`
  align-self: start;
  width: 2.5rem;
  transition: ${transitionsSpeed.fast};
  user-select: none;

  &:hover {
    scale: 130%;
    cursor: pointer;
  }
`

export const Watched = styled.span`
  user-select: none;
  display: flex;
  align-items: center;
  margin-top: -1rem;
  color: ${colors.text};
`

export const Company = styled.p`
  margin: 5px 0 0;
  font-size: 1.25rem;
  color: ${colors.textSecondary};
`

export const JobDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 1rem;
  }
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

export const Profession = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Experience = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`

export const Relevance = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Salary = styled.p`
  display: flex;
  white-space: nowrap;
  color: ${colors.textSecondary};
  width: 30%;
  margin: 0;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
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
