"use client"

import React, { type FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const dialogFooterVariants = tv({
    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
})

interface DialogFooterProps
    extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogFooterVariants> {
    className?: string
}

export const DialogFooter: FC<DialogFooterProps> = ({ className, ...props }) => {
    return (
        <div data-slot="dialog-footer" className={dialogFooterVariants({ className })} {...props} />
    )
}
