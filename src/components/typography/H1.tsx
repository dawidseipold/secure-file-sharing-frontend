import {tv} from "tailwind-variants";
import {cn} from "@/utils/styles";
import {type FC, type ReactNode} from "react";

const h1Variants = tv({
    base: cn(
        "typography-base",
        "scroll-m-20 text-4xl sm:text-5xl lg:text-6xl",
        "font-semibold tracking-tight leading-tight",
    ),
});

interface H1Props {
    children: ReactNode;
    className?: string;
}

export const H1: FC<H1Props> = ({
                                    children,
                                    className,
                                }) => {
    return <h1 className={cn(h1Variants(), className)}>{children}</h1>;
};
