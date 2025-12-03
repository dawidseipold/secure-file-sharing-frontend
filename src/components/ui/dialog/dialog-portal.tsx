"use client"

import React, { type FC } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>

export const DialogPortal: FC<DialogPortalProps> = (props) => {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}
