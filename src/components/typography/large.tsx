import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { type FC, type ReactNode } from "react"

const largeVariants = tv({
    base: cn("typography-base", "text-lg sm:text-xl", "font-medium leading-relaxed"),
})

interface LargeProps {
    children: ReactNode
    className?: string
}

export const Large: FC<LargeProps> = ({ children, className }) => {
    return <p className={cn(largeVariants(), className)}>{children}</p>
}
