import { FC, type ReactElement } from "react"
import Skeleton, { SkeletonProps } from "react-loading-skeleton"
import "./style.css"
import { useMantineTheme } from "@mantine/core"

const CustomSkeleton: FC<SkeletonProps> = (props): ReactElement => {
  const { colors } = useMantineTheme()

  return (
    <Skeleton
      containerClassName={"skeleton-container"}
      baseColor={colors.dark[9]}
      highlightColor={colors.dark[7]}
      {...props}
    />
  )
}

export default CustomSkeleton
