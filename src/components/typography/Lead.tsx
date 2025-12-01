import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const leadVariants = tv({
    base: cn(
        "typography-base",
        "text-lg sm:text-xl",
        "leading-relaxed",
        "text-slate-600 dark:text-slate-300",
    ),
});

interface LeadProps {
    children: ReactNode;
    className?: string;
}

export const Lead: FC<LeadProps> = ({
                                        children,
                                        className,
                                    }) => {
    return <p className={cn(leadVariants(), className)}>{children}</p>;
};
