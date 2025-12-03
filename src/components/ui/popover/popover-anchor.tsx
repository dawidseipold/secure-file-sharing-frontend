"use client"

import React, { type FC } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>

export const PopoverAnchor: FC<PopoverAnchorProps> = (props) => {
    return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}
