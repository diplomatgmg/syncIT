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
            <Tile style={{ overflow: "hidden", paddingBottom: "2.5rem" }}>
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  gap: 2rem;
  height: 94vh;

  @media (max-width: 1200px) {
    flex-direction: column;
    min-height: 1200px;
    margin: 2rem;
  }
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: row;
  }

  & > * {
    overflow-y: auto;
  }
`

const LeftSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

const RightSide = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${colors.textSecondary};
  padding: 1rem 1rem 0;
  overflow-y: auto;
  width: 100%;

  @media (max-width: 1200px) {
    width: auto;
  }
`

const RightSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > *:last-child {
    height: 100%;
  }
`

const Tile = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.textSecondary};
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: fit-content;
  overflow-y: auto;
`
