"use client"

import React, { type FC } from "react"
import { ChevronDownIcon } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"

const nativeSelectVariants = tv({
    slots: {
        wrapper: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        select: [
            "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        ],
        icon: "text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none",
    },
})

interface NativeSelectProps
    extends React.ComponentProps<"select">, VariantProps<typeof nativeSelectVariants> {
    className?: string
}

export const NativeSelect: FC<NativeSelectProps> = ({ className, ...props }) => {
    const { wrapper, select, icon } = nativeSelectVariants()

    return (
        <div data-slot="native-select-wrapper" className={wrapper()}>
            <select data-slot="native-select" className={select({ className })} {...props} />
            <ChevronDownIcon aria-hidden="true" data-slot="native-select-icon" className={icon()} />
        </div>
    )
}
