"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>

export const DialogClose: FC<DialogCloseProps> = (props) => {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}
