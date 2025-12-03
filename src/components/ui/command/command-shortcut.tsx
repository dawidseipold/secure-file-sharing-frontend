"use client"

import React, { type FC } from "react"
import { tv } from "tailwind-variants"

const commandShortcutVariants = tv({
    base: "text-muted-foreground ml-auto text-xs tracking-widest",
})

interface CommandShortcutProps extends React.ComponentProps<"span"> {
    className?: string
}

export const CommandShortcut: FC<CommandShortcutProps> = ({ className, ...props }) => {
    return (
        <span
            data-slot="command-shortcut"
            className={commandShortcutVariants({ className })}
            {...props}
        />
    )
}
