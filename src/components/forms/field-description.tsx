import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldDescriptionVariants = tv({
    base: "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
})

interface FieldDescriptionProps extends React.ComponentProps<"p"> {
    className?: string
}

export const FieldDescription: FC<FieldDescriptionProps> = ({ className, ...props }) => {
    return (
        <p
            data-slot="field-description"
            className={cn(fieldDescriptionVariants({ className }))}
            {...props}
        />
    )
}
