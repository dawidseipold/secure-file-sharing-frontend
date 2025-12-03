"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { tv, type VariantProps } from "tailwind-variants"

const dialogTitleVariants = tv({
    base: "text-lg leading-none font-semibold",
})

interface DialogTitleProps
    extends
        React.ComponentProps<typeof DialogPrimitive.Title>,
        VariantProps<typeof dialogTitleVariants> {
    className?: string
}

export const DialogTitle: FC<DialogTitleProps> = ({ className, ...props }) => {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={dialogTitleVariants({ className })}
            {...props}
        />
    )
}
