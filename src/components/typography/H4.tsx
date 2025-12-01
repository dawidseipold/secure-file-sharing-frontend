import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const h4Variants = tv({
    base: cn(
        "typography-base",
        "scroll-m-20 text-xl sm:text-2xl",
        "font-semibold tracking-tight leading-snug",
    ),
});

interface H4Props {
    children: ReactNode;
    className?: string;
}

export const H4: FC<H4Props> = ({
                                    children,
                                    className,
                                }) => {
    return <h4 className={cn(h4Variants(), className)}>{children}</h4>;
};
