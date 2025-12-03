"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandSeparatorVariants = tv({
    base: "bg-border -mx-1 h-px",
})

interface CommandSeparatorProps extends React.ComponentProps<typeof CommandPrimitive.Separator> {
    className?: string
}

export const CommandSeparator: FC<CommandSeparatorProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={commandSeparatorVariants({ className })}
            {...props}
        />
    )
}
