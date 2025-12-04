"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandVariants = tv({
    base: "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
})

interface CommandProps extends React.ComponentProps<typeof CommandPrimitive> {
    className?: string
}

export const Command: FC<CommandProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive
            data-slot="command"
            className={commandVariants({ className })}
            {...props}
        />
    )
}
