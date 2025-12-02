import type { FC } from "react"
import { cn } from "@/utils/styles"
import { tv, type VariantProps } from "tailwind-variants"

const fieldLegendVariants = tv({
    base: "mb-3 font-medium",
    variants: {
        variant: {
            legend: "text-base",
            label: "text-sm",
        },
    },
    defaultVariants: {
        variant: "legend",
    },
})

interface FieldLegendProps
    extends React.ComponentProps<"legend">, VariantProps<typeof fieldLegendVariants> {
    className?: string
}

export const FieldLegend: FC<FieldLegendProps> = ({ className, variant, ...props }) => {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn(fieldLegendVariants({ variant, className }))}
            {...props}
        />
    )
}
