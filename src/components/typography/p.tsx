import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { type FC, type ReactNode } from "react"

const pVariants = tv({
    base: cn(
        "typography-base",
        "text-base sm:text-[15px]",
        "leading-relaxed",
        "text-slate-800 dark:text-slate-100",
    ),
})

interface PProps {
    children: ReactNode
    className?: string
}

export const P: FC<PProps> = ({ children, className }) => {
    return <p className={cn(pVariants(), className)}>{children}</p>
}
