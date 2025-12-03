"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandGroupVariants = tv({
    base: "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
})

interface CommandGroupProps extends React.ComponentProps<typeof CommandPrimitive.Group> {
    className?: string
}

export const CommandGroup: FC<CommandGroupProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={commandGroupVariants({ className })}
            {...props}
        />
    )
}
