"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { tv } from "tailwind-variants"

const commandItemVariants = tv({
    base: "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
})

interface CommandItemProps extends React.ComponentProps<typeof CommandPrimitive.Item> {
    className?: string
}

export const CommandItem: FC<CommandItemProps> = ({ className, ...props }) => {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={commandItemVariants({ className })}
            {...props}
        />
    )
}
