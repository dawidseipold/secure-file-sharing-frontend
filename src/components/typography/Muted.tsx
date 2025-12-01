import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const mutedVariants = tv({
    base: cn(
        "typography-base",
        "text-sm",
        "leading-relaxed",
        "text-slate-500 dark:text-slate-400",
    ),
});

interface MutedProps {
    children: ReactNode;
    className?: string;
}

export const Muted: FC<MutedProps> = ({
                                          children,
                                          className,
                                      }) => {
    return <p className={cn(mutedVariants(), className)}>{children}</p>;
};
