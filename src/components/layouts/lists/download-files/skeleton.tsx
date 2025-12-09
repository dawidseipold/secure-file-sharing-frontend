import { type FC } from "react"
import { skeletonVariants } from "./variants"

export const SkeletonItem: FC = () => {
    const { base, content, line1, line2, button } = skeletonVariants()
    return (
        <div className={base()}>
            <div className={content()}>
                <div className={line1()} />
                <div className={line2()} />
            </div>
            <div className={button()} />
        </div>
    )
}
