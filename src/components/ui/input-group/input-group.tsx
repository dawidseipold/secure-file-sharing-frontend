import type { FC } from "react"
import * as React from "react"

import { cn } from "@/utils/styles"
import { tv, type VariantProps } from "tailwind-variants"

const inputGroupVariants = tv({
    base: cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
    ),
})

interface InputGroupProps
    extends React.ComponentProps<"div">, VariantProps<typeof inputGroupVariants> {
    className?: string
}

export const InputGroup: FC<InputGroupProps> = ({ className, ...props }) => {
    return (
        <div
            data-slot="input-group"
            role="group"
            className={cn(inputGroupVariants({}), className)}
            {...props}
        />
    )
}
