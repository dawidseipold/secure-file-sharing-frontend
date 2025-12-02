import type { FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import { cn } from "@/utils/styles.ts"
import type { TailwindColor } from "@/types/styles.ts"
import { COLORS_MAP } from "@/constants/styles.ts"

const cardIconVariants = tv({
    base: "flex items-center justify-center aspect-square w-max h-max p-2 rounded-2xl",
})

interface CardIconProps extends VariantProps<typeof cardIconVariants> {
    className?: string
    color?: TailwindColor
    icon?: Extract<IconName, "camera" | "anchor">
}

export const CardIcon: FC<CardIconProps> = ({ className, color = "sky", icon = "camera" }) => {
    const colors = COLORS_MAP[color]

    return (
        <div className={cn(cardIconVariants({}), colors.bg, className)}>
            <DynamicIcon name={icon} size={24} className={cn(colors.text)} />
        </div>
    )
}
