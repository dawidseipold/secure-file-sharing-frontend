"use client"

import React, { type FC } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"
import { tv } from "tailwind-variants"

const commandInputVariants = tv({
    slots: {
        wrapper: "flex h-9 items-center gap-2 border-b px-3",
        icon: "size-4 shrink-0 opacity-50",
        input: "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
    },
})

interface CommandInputProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
    className?: string
}

export const CommandInput: FC<CommandInputProps> = ({ className, ...props }) => {
    const { wrapper, icon, input } = commandInputVariants()

    return (
        <div data-slot="command-input-wrapper" className={wrapper()}>
            <SearchIcon className={icon()} />
            <CommandPrimitive.Input
                data-slot="command-input"
                className={input({ className })}
                {...props}
            />
        </div>
    )
}
