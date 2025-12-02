import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type { FC } from "react"

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>

export const TooltipTrigger: FC<TooltipTriggerProps> = ({ ...props }) => {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}
