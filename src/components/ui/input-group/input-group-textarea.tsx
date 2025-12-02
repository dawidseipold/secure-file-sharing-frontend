import type { FC } from "react"
import * as React from "react"
import { Textarea } from "@/components/ui/textarea.tsx"
import { cn } from "@/utils/styles.ts"
import { tv, type VariantProps } from "tailwind-variants"

const inputGroupTextareaVariants = tv({
    base: "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
})

interface InputGroupTextareaProps
    extends React.ComponentProps<"textarea">, VariantProps<typeof inputGroupTextareaVariants> {
    className?: string
}

export const InputGroupTextarea: FC<InputGroupTextareaProps> = ({ className, ...props }) => {
    return (
        <Textarea
            data-slot="input-group-control"
            className={cn(inputGroupTextareaVariants({}), className)}
            {...props}
        />
    )
}
