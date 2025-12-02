import type { FC, ReactNode } from "react"
import { tv } from "tailwind-variants"
import { cn } from "@/utils/styles.ts"
import { CardIcon } from "@/components/ui/card/card-icon.tsx"
import { CardTitle } from "@/components/ui/card/card-title.tsx"

const cardVariants = tv({
    base: "glass-panel p-4 rounded-3xl border border-blue-50 shadow-sm transition-all duration-200 flex flex-col gap-4",
})

interface CardProps {
    children?: ReactNode
    className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => {
    return (
        <div className={cn(cardVariants({}), className)}>
            <header className={"flex items-center gap-4"}>
                <CardIcon />
                <CardTitle text={"Upload"} />
            </header>

            <main>{children}</main>

            <footer></footer>
        </div>
    )
}
