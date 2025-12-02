import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldGroupVariants = tv({
    base: "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
})

interface FieldGroupProps extends React.ComponentProps<"div"> {
    className?: string
}

export const FieldGroup: FC<FieldGroupProps> = ({ className, ...props }) => {
    return (
        <div
            data-slot="field-group"
            className={cn(
                fieldGroupVariants({
                    className,
                }),
            )}
            {...props}
        />
    )
}
