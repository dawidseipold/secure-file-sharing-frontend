import { tv, type VariantProps } from "tailwind-variants"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleQuestionMark } from "lucide-react"
import type { FC } from "react"
import { Small } from "@/components/typography"
import { cn } from "@/utils/styles.ts"

const questionMarkTooltipVariants = tv({
    base: "",
})

interface PageTooltipProps extends VariantProps<typeof questionMarkTooltipVariants> {
    text: string
    className?: string
}

export const QuestionMarkTooltip: FC<PageTooltipProps> = ({ text, className }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <CircleQuestionMark className={"size-4 text-muted-foreground"} />
            </TooltipTrigger>

            <TooltipContent className={cn(questionMarkTooltipVariants({}), className)}>
                <Small className={"text-white"}>{text}</Small>
            </TooltipContent>
        </Tooltip>
    )
}
