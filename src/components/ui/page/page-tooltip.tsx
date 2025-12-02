import { tv, type VariantProps } from "tailwind-variants"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleQuestionMark } from "lucide-react"
import type { FC } from "react"
import { Small } from "@/components/typography"
import { cn } from "@/utils/styles.ts"

const pageTooltipVariants = tv({
    base: "",
})

interface PageTooltipProps extends VariantProps<typeof pageTooltipVariants> {
    text: string
    className?: string
}

export const PageTooltip: FC<PageTooltipProps> = ({ text, className }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <CircleQuestionMark className={"size-4 text-muted-foreground"} />
            </TooltipTrigger>

            <TooltipContent className={cn(pageTooltipVariants({}), className)}>
                <Small className={"text-white"}>{text}</Small>
            </TooltipContent>
        </Tooltip>
    )
}
