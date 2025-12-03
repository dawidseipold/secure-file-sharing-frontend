"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

export const DialogTrigger: FC<DialogTriggerProps> = (props) => {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}
