import type { FC } from "react"
import { useMemo } from "react"
import { cn } from "@/utils/styles"
import { tv } from "tailwind-variants"

const fieldErrorVariants = tv({
    base: "text-destructive text-sm font-normal",
})

interface FieldErrorProps extends React.ComponentProps<"div"> {
    className?: string
    errors?: Array<{ message?: string } | undefined>
}

export const FieldError: FC<FieldErrorProps> = ({ className, children, errors, ...props }) => {
    const content = useMemo(() => {
        if (children) {
            return children
        }

        if (!errors?.length) {
            return null
        }

        const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

        if (uniqueErrors?.length === 1) {
            return uniqueErrors[0]?.message
        }

        return (
            <ul className="ml-4 flex list-disc flex-col gap-1">
                {uniqueErrors.map(
                    (error, index) => error?.message && <li key={index}>{error.message}</li>,
                )}
            </ul>
        )
    }, [children, errors])

    if (!content) {
        return null
    }

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn(fieldErrorVariants({ className }))}
            {...props}
        >
            {content}
        </div>
    )
}
