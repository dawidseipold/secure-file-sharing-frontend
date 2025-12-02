import type { FC } from "react"
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>

export const Tooltip: FC<TooltipProps> = ({ ...props }) => {
    return (
        <TooltipProvider>
            <TooltipPrimitive.Root data-slot="tooltip" {...props} />
        </TooltipProvider>
    )
}
