import { FC, type ReactElement } from "react"
import { colors } from "@/styles/theme.ts"
import Skeleton, { SkeletonProps } from "react-loading-skeleton"
import "./style.css"

const CustomSkeleton: FC<SkeletonProps> = (props): ReactElement => {
  return (
    <Skeleton
      containerClassName={"skeleton-container"}
      width={"100%"}
      baseColor={colors.backgroundSecondary}
      highlightColor={colors.textSecondary}
      {...props}
    />
  )
}

export default CustomSkeleton
