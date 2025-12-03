"use client"

import React, { type FC } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>

export const Popover: FC<PopoverProps> = (props) => {
    return <PopoverPrimitive.Root data-slot="popover" {...props} />
}
