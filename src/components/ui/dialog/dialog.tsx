"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>

export const Dialog: FC<DialogProps> = (props) => {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />
}
