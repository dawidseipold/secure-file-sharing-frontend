import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldContentVariants = tv({
    base: "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
})

interface FieldContentProps extends React.ComponentProps<"div"> {
    className?: string
}

export const FieldContent: FC<FieldContentProps> = ({ className, ...props }) => {
    return (
        <div
            data-slot="field-content"
            className={cn(fieldContentVariants({ className }))}
            {...props}
        />
    )
}
