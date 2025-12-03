"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { tv, type VariantProps } from "tailwind-variants"

const dialogDescriptionVariants = tv({
    base: "text-muted-foreground text-sm",
})

interface DialogDescriptionProps
    extends
        React.ComponentProps<typeof DialogPrimitive.Description>,
        VariantProps<typeof dialogDescriptionVariants> {
    className?: string
}

export const DialogDescription: FC<DialogDescriptionProps> = ({ className, ...props }) => {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={dialogDescriptionVariants({ className })}
            {...props}
        />
    )
}
