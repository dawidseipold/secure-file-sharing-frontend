import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/utils/styles"
import { type FC, type ReactNode } from "react"

const mutedVariants = tv({
    base: "typography-base text-sm leading-relaxed text-slate-500 dark:text-slate-400 transition-colors",
    variants: {
        hover: {
            true: "hover:text-slate-700 dark:hover:text-slate-200",
        },
    },
})

interface MutedProps extends VariantProps<typeof mutedVariants> {
    children: ReactNode
    className?: string
}

export const Muted: FC<MutedProps> = ({ children, className, hover }) => {
    return <p className={cn(mutedVariants({ hover }), className)}>{children}</p>
}
