import { Container, Grid, Group, useMantineTheme } from "@mantine/core"
import Profession from "@/features/profile/components/Profession/Profession.tsx"
import WorkFormat from "@/features/profile/components/WorkFormat/WorkFormat.tsx"
import Grade from "@/features/profile/components/Grade/Grade.tsx"
import HardSkill from "@/features/profile/components/HardSkill/HardSkill.tsx"
import { useMediaQuery } from "@mantine/hooks"

export const PRIMARY_COL_HEIGHT = "85vh"
export const FIRST_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-xl) / 3)`
export const SECOND_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 6 - var(--mantine-spacing-xl) / 3)`
export const THIRD_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 3 - var(--mantine-spacing-xl) / 3)`

const LG_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 3 - var(--mantine-spacing-xl) / 3)`

const Profile = () => {
  const theme = useMantineTheme()
  const bgStyle = {
    backgroundColor: theme.colors.dark[9],
    borderRadius: theme.radius.md,
  }
  const matchesLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`)
  const matchesSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const bigSpan = matchesSm ? 12 : matchesLg ? 4 : 12
  const smallSpan = matchesSm ? 6 : matchesLg ? 4 : 12

  return (
    <Container my={"xl"} size={"xl"}>
      <Grid justify={"center"}>
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Grid
            justify={matchesLg ? "space-between" : "flex-start"}
            style={{
              flexDirection: matchesLg ? "row" : "column",
            }}>
            <Grid.Col span={bigSpan}>
              <Group
                h={matchesLg ? LG_HEIGHT : FIRST_COL_HEIGHT}
                style={{ ...bgStyle, overflowY: "auto", overflowX: "hidden" }}>
                <Profession />
              </Group>
            </Grid.Col>
            <Grid.Col span={smallSpan}>
              <Group
                h={matchesLg ? LG_HEIGHT : SECOND_COL_HEIGHT}
                style={bgStyle}>
                <WorkFormat />
              </Group>
            </Grid.Col>
            <Grid.Col span={smallSpan}>
              <Group
                h={matchesLg ? LG_HEIGHT : THIRD_COL_HEIGHT}
                style={{ ...bgStyle, overflowY: "auto" }}>
                <Grade />
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Group
            h={PRIMARY_COL_HEIGHT}
            style={{ ...bgStyle, overflowY: "auto" }}>
            <HardSkill />
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Profile
