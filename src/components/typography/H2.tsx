import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const h2Variants = tv({
    base: cn(
        "typography-base",
        "scroll-m-20 text-3xl sm:text-4xl",
        "font-semibold tracking-tight leading-snug",
    ),
});

interface H2Props {
    children: ReactNode;
    className?: string;
}

export const H2: FC<H2Props> = ({
                                    children,
                                    className,
                                }) => {
    return <h2 className={cn(h2Variants(), className)}>{children}</h2>;
};
