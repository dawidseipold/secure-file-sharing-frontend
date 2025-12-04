import { type FC, type ReactNode } from "react"
import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles.ts"
import { CardIcon, type CardIconProps } from "@/components/ui/card/card-icon.tsx"
import { CardTitle } from "@/components/ui/card/card-title.tsx"

const cardVariants = tv({
    base: "glass-panel p-4 rounded-3xl border border-blue-50 shadow-sm transition-all duration-200 flex flex-col gap-4",
})

interface CardProps {
    children?: ReactNode
    title?: string
    icon?: Pick<CardIconProps, "icon" | "color">
    className?: string
}

export const Card: FC<CardProps> = ({ children, title, icon, className }) => {
    return (
        <div className={cn(cardVariants({}), className)}>
            {(title || icon) && (
                <header className="flex items-center gap-4">
                    {icon && <CardIcon icon={icon.icon} color={icon.color} />}
                    {title && <CardTitle text={title} />}
                </header>
            )}

            {children && <main>{children}</main>}

            <footer></footer>
        </div>
    )
}
