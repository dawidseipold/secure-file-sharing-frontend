"use client"

import React, { type FC } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const nativeSelectOptGroupVariants = tv({
    base: "",
})

interface NativeSelectOptGroupProps
    extends React.ComponentProps<"optgroup">, VariantProps<typeof nativeSelectOptGroupVariants> {
    className?: string
}

export const NativeSelectOptGroup: FC<NativeSelectOptGroupProps> = ({ className, ...props }) => {
    return (
        <optgroup
            data-slot="native-select-optgroup"
            className={nativeSelectOptGroupVariants({ className })}
            {...props}
        />
    )
}
