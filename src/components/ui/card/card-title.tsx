import { tv, type VariantProps } from "tailwind-variants"
import type { FC } from "react"
import { H4 } from "@/components/typography"
import { cn } from "@/utils/styles.ts"

const cardTitleVariants = tv({
    base: "",
})

interface CardTitleProps extends VariantProps<typeof cardTitleVariants> {
    text: string
    className?: string
}

export const CardTitle: FC<CardTitleProps> = ({ text, className }) => {
    return <H4 className={cn(cardTitleVariants({}), className)}>{text}</H4>
}
