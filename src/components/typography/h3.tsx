import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { type FC, type ReactNode } from "react"

const h3Variants = tv({
    base: cn(
        "typography-base",
        "scroll-m-20 text-2xl sm:text-3xl",
        "font-semibold tracking-tight leading-snug",
    ),
})

interface H3Props {
    children: ReactNode
    className?: string
}

export const H3: FC<H3Props> = ({ children, className }) => {
    return <h3 className={cn(h3Variants(), className)}>{children}</h3>
}
