import * as React from "react"
import { cn } from "@/utils/styles.ts"
import type { FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const inputGroupTextVariants = tv({
    base: "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
})

interface InputGroupTextProps
    extends React.ComponentProps<"span">, VariantProps<typeof inputGroupTextVariants> {
    className?: string
}

export const InputGroupText: FC<InputGroupTextProps> = ({ className, ...props }) => {
    return <span className={cn(inputGroupTextVariants({}), className)} {...props} />
}
