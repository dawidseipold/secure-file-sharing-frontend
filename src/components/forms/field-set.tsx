import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldSetVariants = tv({
    base: "flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
})

interface FieldSetProps extends React.ComponentProps<"fieldset"> {
    className?: string
}

export const FieldSet: FC<FieldSetProps> = ({ className, ...props }) => {
    return (
        <fieldset
            data-slot="field-set"
            className={cn(
                fieldSetVariants({
                    className,
                }),
            )}
            {...props}
        />
    )
}
