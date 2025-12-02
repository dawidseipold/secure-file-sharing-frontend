import type { FC } from "react"
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>

export const TooltipProvider: FC<TooltipProviderProps> = ({ delayDuration = 0, ...props }) => {
    return (
        <TooltipPrimitive.Provider
            data-slot="tooltip-provider"
            delayDuration={delayDuration}
            {...props}
        />
    )
}
