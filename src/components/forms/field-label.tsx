import type { FC } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldLabelVariants = tv({
    base: "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
})

interface FieldLabelProps extends React.ComponentProps<typeof Label> {
    className?: string
}

export const FieldLabel: FC<FieldLabelProps> = ({ className, ...props }) => {
    return (
        <Label
            data-slot="field-label"
            className={cn(fieldLabelVariants({ className }))}
            {...props}
        />
    )
}
