"use client"

import React, { type FC } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>

export const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
    return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}
