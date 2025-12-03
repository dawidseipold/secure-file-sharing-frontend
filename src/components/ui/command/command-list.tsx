"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandListVariants = tv({
    base: "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
})

interface CommandListProps extends React.ComponentProps<typeof CommandPrimitive.List> {
    className?: string
}

export const CommandList: FC<CommandListProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={commandListVariants({ className })}
            {...props}
        />
    )
}
