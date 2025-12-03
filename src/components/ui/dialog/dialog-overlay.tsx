"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { tv, type VariantProps } from "tailwind-variants"

const dialogOverlayVariants = tv({
    base: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
})

interface DialogOverlayProps
    extends
        React.ComponentProps<typeof DialogPrimitive.Overlay>,
        VariantProps<typeof dialogOverlayVariants> {
    className?: string
}

export const DialogOverlay: FC<DialogOverlayProps> = ({ className, ...props }) => {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={dialogOverlayVariants({ className })}
            {...props}
        />
    )
}
