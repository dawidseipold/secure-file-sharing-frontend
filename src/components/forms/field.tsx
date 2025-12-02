import type { FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/utils/styles"

const fieldVariants = tv({
    base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
    variants: {
        orientation: {
            vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
            horizontal: [
                "flex-row items-center",
                "[&>[data-slot=field-label]]:flex-auto",
                "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ],
            responsive: [
                "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
                "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
                "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
            ],
        },
    },
    defaultVariants: {
        orientation: "vertical",
    },
})

interface FieldProps extends React.ComponentProps<"div">, VariantProps<typeof fieldVariants> {
    className?: string
}

export const Field: FC<FieldProps> = ({ className, orientation, ...props }) => {
    return (
        <div
            role="group"
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation, className }))}
            {...props}
        />
    )
}
