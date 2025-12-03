"use client"

import React, { type FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Command } from "./command"
import { tv } from "tailwind-variants"

const commandDialogVariants = tv({
    slots: {
        dialogContent: "overflow-hidden p-0",
        command:
            "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
    },
})

interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
    title?: string
    description?: string
    className?: string
    showCloseButton?: boolean
}

export const CommandDialog: FC<CommandDialogProps> = ({
    title = "Command Palette",
    description = "Search for a command to run...",
    children,
    className,
    showCloseButton = true,
    ...props
}) => {
    const { dialogContent, command } = commandDialogVariants()

    return (
        <Dialog {...props}>
            <DialogHeader className="sr-only">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogContent
                className={dialogContent({ className })}
                showCloseButton={showCloseButton}
            >
                <Command className={command()}>{children}</Command>
            </DialogContent>
        </Dialog>
    )
}
