"use client"

import React, { type FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const dialogHeaderVariants = tv({
    base: "flex flex-col gap-2 text-center sm:text-left",
})

interface DialogHeaderProps
    extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogHeaderVariants> {
    className?: string
}

export const DialogHeader: FC<DialogHeaderProps> = ({ className, ...props }) => {
    return (
        <div data-slot="dialog-header" className={dialogHeaderVariants({ className })} {...props} />
    )
}
