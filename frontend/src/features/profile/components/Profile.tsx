import { type ReactElement } from "react"
import Grade from "@/features/profile/components/Grade/Grade.tsx"
import WorkFormat from "@/features/profile/components/WorkFormat/WorkFormat.tsx"
import Profession from "@/features/profile/components/Profession/Profession.tsx"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"
import styled, { createGlobalStyle } from "styled-components"
import { colors } from "@/styles/theme.ts"

const GlobalStyle = createGlobalStyle`
  body {
      overflow: hidden;
      height: 100vh;

      @media (max-width: 1200px) {
          overflow-y: auto;
          height: fit-content;
      }
  }
`

const Profile = (): ReactElement => {
  return (
    <>
      <GlobalStyle />
      <ProfileContainer>
        <LeftSide>
          <LeftSelect>
            <Tile>
              <Grade />
            </Tile>
            <Tile>
              <WorkFormat />
            </Tile>
          </LeftSelect>
          <RightSelect>
            <Tile>
              <Profession />
            </Tile>
          </RightSelect>
        </LeftSide>
        <RightSide>
          <HardSkill />
        </RightSide>
      </ProfileContainer>
    </>
  )
}

export default Profile

// Верстка ебанина полная.
const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  gap: 2rem;
  height: 94vh;
  user-select: none;
  position: fixed;
  left: 0;
  right: 0;
  padding-right: 180px;

  @media (max-width: 1200px) {
    flex-direction: column;
    min-height: 1200px;
    margin: 2rem;
    padding-right: 0;
    position: relative;
    width: 100%;
  }
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;

  @media (max-width: 1200px) {
    flex-direction: row;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    height: 52%;
  }

  & > * {
    overflow-y: auto;
  }
`

const LeftSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1200px) {
    flex: 0.5;
  }

  @media (max-width: 700px) {
    flex-direction: row;
  }

  & > *:first-child {
    flex: 1;
  }
`

const RightSide = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${colors.textSecondary};
  overflow-y: auto;
  flex: 1.7;

  @media (max-width: 1200px) {
    width: auto;
    margin-bottom: 2rem;
  }
`

const RightSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;

  @media (max-width: 700px) {
    display: contents;
  }

  & > *:last-child {
    height: 100%;
  }
`

const Tile = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.textSecondary};
  border-radius: 0.5rem;
  min-height: fit-content;
  overflow-y: auto;
  padding: 0.5rem 1rem;

  @media (max-width: 700px) {
    flex: 0.7;
  }
`
