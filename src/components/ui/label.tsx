import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/utils/styles"
import type { ComponentPropsWithoutRef, FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const labelVariants = tv({
    base: "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
})

interface LabelProps
    extends
        ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
        VariantProps<typeof labelVariants> {
    className?: string
}

export const Label: FC<LabelProps> = ({ className, ...props }) => {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(labelVariants({}), className)}
            {...props}
        />
    )
}
