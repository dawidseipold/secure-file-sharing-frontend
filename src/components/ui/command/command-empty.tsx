"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandEmptyVariants = tv({
    base: "py-6 text-center text-sm",
})

interface CommandEmptyProps extends React.ComponentProps<typeof CommandPrimitive.Empty> {
    className?: string
}

export const CommandEmpty: FC<CommandEmptyProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className={commandEmptyVariants({ className })}
            {...props}
        />
    )
}
