import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldTitleVariants = tv({
    base: "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
})

interface FieldTitleProps extends React.ComponentProps<"div"> {
    className?: string
}

export const FieldTitle: FC<FieldTitleProps> = ({ className, ...props }) => {
    return (
        <div data-slot="field-label" className={cn(fieldTitleVariants({ className }))} {...props} />
    )
}
