import * as React from "react"
import { Input } from "@/components/ui/input.tsx"
import { cn } from "@/utils/styles.ts"
import { tv, type VariantProps } from "tailwind-variants"
import type { FC } from "react"

const inputGroupInputVariants = tv({
    base: "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
})

interface InputGroupInputProps
    extends React.ComponentProps<"input">, VariantProps<typeof inputGroupInputVariants> {
    className?: string
}

export const InputGroupInput: FC<InputGroupInputProps> = ({ className, ...props }) => {
    return (
        <Input
            data-slot="input-group-control"
            className={cn(inputGroupInputVariants({}), className)}
            {...props}
        />
    )
}
