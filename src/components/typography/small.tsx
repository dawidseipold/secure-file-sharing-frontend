import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { type FC, type ReactNode } from "react"

const smallVariants = tv({
    base: cn(
        "typography-base",
        "text-xs sm:text-sm",
        "font-normal leading-relaxed",
        "text-slate-500 dark:text-slate-400",
    ),
})

interface SmallProps {
    children: ReactNode
    className?: string
}

export const Small: FC<SmallProps> = ({ children, className }) => {
    return <p className={cn(smallVariants(), className)}>{children}</p>
}
