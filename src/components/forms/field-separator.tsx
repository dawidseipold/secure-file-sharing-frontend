import type { FC } from "react"
import { cn } from "@/utils/styles"
import { Separator } from "@/components/ui/separator"
import { tv } from "tailwind-variants"

const fieldSeparatorVariants = tv({
    base: "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
})

interface FieldSeparatorProps extends React.ComponentProps<"div"> {
    className?: string
    children?: React.ReactNode
}

export const FieldSeparator: FC<FieldSeparatorProps> = ({ children, className, ...props }) => {
    return (
        <div
            data-slot="field-separator"
            data-content={!!children}
            className={cn(fieldSeparatorVariants({ className }))}
            {...props}
        >
            <Separator className="absolute inset-0 top-1/2" />
            {children && (
                <span
                    className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
                    data-slot="field-separator-content"
                >
                    {children}
                </span>
            )}
        </div>
    )
}
