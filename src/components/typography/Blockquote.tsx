import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const blockquoteVariants = tv({
    base: cn(
        "typography-base",
        "mt-4 border-l-4 border-slate-200 dark:border-slate-700",
        "pl-4 italic",
        "text-lg sm:text-xl",
        "leading-relaxed",
        "text-slate-700 dark:text-slate-200",
    ),
});

interface BlockquoteProps {
    children: ReactNode;
    className?: string;
}

export const Blockquote: FC<BlockquoteProps> = ({
                                                    children,
                                                    className,
                                                }) => {
    return (
        <blockquote className={cn(blockquoteVariants(), className)}>
            {children}
        </blockquote>
    );
};
